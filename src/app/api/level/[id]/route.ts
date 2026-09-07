import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/session";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ error: "Not registered" }, { status: 401 });

  const { id: levelId } = await params;
  const careerId = req.nextUrl.searchParams.get("careerId");
  if (!careerId) return NextResponse.json({ error: "careerId required" }, { status: 400 });

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

  const career = await prisma.career.findUnique({ where: { id: careerId } });
  const personalize = Boolean(career?.isCustom) && level.isGenericCapstone;

  return NextResponse.json({
    career: career ? { id: career.id, name: career.name, icon: career.icon } : null,
    level: {
      id: level.id,
      subject: personalize ? career!.name : level.subject,
      title: personalize ? `${career!.name} Challenge` : level.title,
      description: level.description,
      passScore: level.passScore,
      baseXp: level.baseXp,
      kind: level.kind,
    },
    progress: { status: progress.status, bestScore: progress.bestScore, attempts: progress.attempts },
    questions: level.questions.map((q) => ({
      id: q.id,
      text: q.text,
      options: JSON.parse(q.options) as string[],
      hint: q.hint,
      difficulty: q.difficulty,
    })),
  });
}
