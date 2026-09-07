import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/session";

export async function GET(req: NextRequest) {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ error: "Not registered" }, { status: 401 });

  const streamParam = req.nextUrl.searchParams.get("stream");
  const stream = (streamParam ?? student.stream) as "SCIENCE" | "HUMANITIES";

  const careers = await prisma.career.findMany({
    // Custom (student-typed) careers are personal — they don't clutter the
    // shared grid for everyone else in the stream.
    where: { stream, isCustom: false },
    orderBy: { order: "asc" },
  });

  // Attach lightweight progress summary per career for this student.
  const progress = await prisma.progress.findMany({
    where: { studentId: student.id },
    select: { careerId: true, status: true },
  });
  const completedByCareer = new Map<string, number>();
  for (const p of progress) {
    if (p.status === "COMPLETED") {
      completedByCareer.set(p.careerId, (completedByCareer.get(p.careerId) ?? 0) + 1);
    }
  }
  const totalLevelsByCareer = new Map<string, number>();
  const paths = await prisma.careerPath.findMany({
    where: { careerId: { in: careers.map((c) => c.id) } },
    select: { careerId: true },
  });
  for (const p of paths) {
    totalLevelsByCareer.set(p.careerId, (totalLevelsByCareer.get(p.careerId) ?? 0) + 1);
  }

  const result = careers.map((c) => ({
    ...c,
    completedLevels: completedByCareer.get(c.id) ?? 0,
    totalLevels: totalLevelsByCareer.get(c.id) ?? 0,
  }));

  return NextResponse.json({ careers: result, selectedCareerId: student.selectedCareerId });
}
