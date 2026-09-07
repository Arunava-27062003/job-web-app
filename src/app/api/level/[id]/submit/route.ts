import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/session";

type SubmitBody = {
  careerId: string;
  answers: Record<string, number>; // questionId -> selected option index
  hintedQuestionIds: string[];
};

function starsFor(score: number, passScore: number) {
  if (score >= 90) return 3;
  if (score >= 75) return 2;
  if (score >= passScore) return 1;
  return 0;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ error: "Not registered" }, { status: 401 });

  const { id: levelId } = await params;
  const body = (await req.json().catch(() => null)) as SubmitBody | null;
  if (!body?.careerId || !body.answers) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }
  const { careerId, answers, hintedQuestionIds = [] } = body;

  const progress = await prisma.progress.findUnique({
    where: { studentId_careerId_levelId: { studentId: student.id, careerId, levelId } },
  });
  if (!progress || progress.status === "LOCKED") {
    return NextResponse.json({ error: "This level is locked." }, { status: 403 });
  }

  const level = await prisma.level.findUnique({
    where: { id: levelId },
    include: { questions: { orderBy: { order: "asc" } } },
  });
  if (!level) return NextResponse.json({ error: "Level not found" }, { status: 404 });

  let correctCount = 0;
  const results = level.questions.map((q) => {
    const yourAnswer = answers[q.id];
    const isCorrect = yourAnswer === q.correctIndex;
    if (isCorrect) correctCount++;
    return {
      questionId: q.id,
      text: q.text,
      options: JSON.parse(q.options) as string[],
      correctIndex: q.correctIndex,
      yourAnswer: yourAnswer ?? null,
      isCorrect,
      explanation: q.explanation,
      hintUsed: hintedQuestionIds.includes(q.id),
    };
  });

  const total = level.questions.length;
  const score = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const passed = score >= level.passScore;
  const stars = starsFor(score, level.passScore);
  const hintPenalty = hintedQuestionIds.length * 5;
  const xpEarned = Math.max(0, Math.round(level.baseXp * (score / 100)) - hintPenalty);

  const isNewBest = score > progress.bestScore;
  const xpDelta = isNewBest ? Math.max(0, xpEarned - progress.xpEarned) : 0;

  await prisma.progress.update({
    where: { id: progress.id },
    data: {
      attempts: { increment: 1 },
      hintsUsed: { increment: hintedQuestionIds.length },
      bestScore: isNewBest ? score : progress.bestScore,
      stars: isNewBest ? stars : progress.stars,
      xpEarned: isNewBest ? xpEarned : progress.xpEarned,
      status: passed ? "COMPLETED" : progress.status,
      completedAt: passed ? new Date() : progress.completedAt,
    },
  });

  if (xpDelta > 0) {
    await prisma.student.update({
      where: { id: student.id },
      data: { xp: { increment: xpDelta } },
    });
  }

  let unlockedNext: { id: string; title: string } | null = null;
  if (passed) {
    const currentEntry = await prisma.careerPath.findFirst({ where: { careerId, levelId } });
    if (currentEntry) {
      const nextEntry = await prisma.careerPath.findFirst({
        where: { careerId, order: currentEntry.order + 1 },
        include: { level: true },
      });
      if (nextEntry) {
        const nextProgress = await prisma.progress.findUnique({
          where: {
            studentId_careerId_levelId: { studentId: student.id, careerId, levelId: nextEntry.levelId },
          },
        });
        if (!nextProgress) {
          await prisma.progress.create({
            data: { studentId: student.id, careerId, levelId: nextEntry.levelId, status: "UNLOCKED" },
          });
          unlockedNext = { id: nextEntry.levelId, title: nextEntry.level.title };
        } else if (nextProgress.status === "LOCKED") {
          await prisma.progress.update({ where: { id: nextProgress.id }, data: { status: "UNLOCKED" } });
          unlockedNext = { id: nextEntry.levelId, title: nextEntry.level.title };
        }
      }
    }
  }

  const updatedStudent = await prisma.student.findUnique({ where: { id: student.id } });

  return NextResponse.json({
    score,
    passed,
    stars,
    correctCount,
    total,
    xpEarned: isNewBest ? xpEarned : progress.xpEarned,
    xpAwarded: xpDelta,
    totalXp: updatedStudent?.xp ?? student.xp,
    results,
    unlockedNext,
  });
}
