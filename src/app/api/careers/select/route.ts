import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/session";

export async function POST(req: NextRequest) {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ error: "Not registered" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const careerId = body?.careerId as string | undefined;
  if (!careerId) return NextResponse.json({ error: "careerId required" }, { status: 400 });

  const career = await prisma.career.findUnique({ where: { id: careerId } });
  if (!career) return NextResponse.json({ error: "Career not found" }, { status: 404 });

  const path = await prisma.careerPath.findMany({
    where: { careerId },
    orderBy: { order: "asc" },
  });
  if (path.length === 0) {
    return NextResponse.json({ error: "This career has no path configured yet." }, { status: 400 });
  }

  await prisma.student.update({
    where: { id: student.id },
    data: { selectedCareerId: careerId },
  });

  // Ensure progress rows exist for every level in this career's path.
  for (const [i, entry] of path.entries()) {
    const existing = await prisma.progress.findUnique({
      where: {
        studentId_careerId_levelId: {
          studentId: student.id,
          careerId,
          levelId: entry.levelId,
        },
      },
    });
    if (!existing) {
      await prisma.progress.create({
        data: {
          studentId: student.id,
          careerId,
          levelId: entry.levelId,
          status: i === 0 ? "UNLOCKED" : "LOCKED",
        },
      });
    }
  }

  return NextResponse.json({ ok: true, careerId });
}
