import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/session";

export async function GET(req: NextRequest) {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ error: "Not registered" }, { status: 401 });

  const careerId = req.nextUrl.searchParams.get("careerId");
  if (!careerId) return NextResponse.json({ error: "careerId required" }, { status: 400 });

  const career = await prisma.career.findUnique({ where: { id: careerId } });
  if (!career) return NextResponse.json({ error: "Career not found" }, { status: 404 });

  const path = await prisma.careerPath.findMany({
    where: { careerId },
    orderBy: { order: "asc" },
    include: { level: true },
  });

  const progressRows = await prisma.progress.findMany({
    where: { studentId: student.id, careerId },
  });
  const progressByLevel = new Map(progressRows.map((p) => [p.levelId, p]));

  const nodes = path.map((entry) => {
    const progress = progressByLevel.get(entry.levelId);
    // A custom career's generic capstone is displayed under the student's
    // own typed career name, so it reads as tailored rather than shared.
    const personalize = career.isCustom && entry.level.isGenericCapstone;
    return {
      order: entry.order,
      levelId: entry.levelId,
      subject: personalize ? career.name : entry.level.subject,
      title: personalize ? `${career.name} Challenge` : entry.level.title,
      description: entry.level.description,
      kind: entry.level.kind,
      passScore: entry.level.passScore,
      baseXp: entry.level.baseXp,
      questionCount: undefined as number | undefined,
      status: progress?.status ?? "LOCKED",
      bestScore: progress?.bestScore ?? 0,
      stars: progress?.stars ?? 0,
      attempts: progress?.attempts ?? 0,
    };
  });

  const questionCounts = await prisma.question.groupBy({
    by: ["levelId"],
    where: { levelId: { in: path.map((p) => p.levelId) } },
    _count: { _all: true },
  });
  const countByLevel = new Map(questionCounts.map((q) => [q.levelId, q._count._all]));
  for (const n of nodes) n.questionCount = countByLevel.get(n.levelId) ?? 0;

  const completed = nodes.filter((n) => n.status === "COMPLETED").length;

  return NextResponse.json({
    career,
    nodes,
    completed,
    total: nodes.length,
    finished: completed === nodes.length && nodes.length > 0,
  });
}
