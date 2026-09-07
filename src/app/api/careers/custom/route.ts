import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/session";
import { slugify, iconForName } from "@/lib/slug";

const GENERIC_SUBJECTS: Record<"SCIENCE" | "HUMANITIES", string[]> = {
  SCIENCE: ["Physics", "Chemistry", "Biology", "Mathematics"],
  HUMANITIES: ["History", "Geography", "Political Science", "Economics"],
};

async function ensureProgressForPath(studentId: string, careerId: string) {
  const path = await prisma.careerPath.findMany({ where: { careerId }, orderBy: { order: "asc" } });
  for (const [i, entry] of path.entries()) {
    const existing = await prisma.progress.findUnique({
      where: { studentId_careerId_levelId: { studentId, careerId, levelId: entry.levelId } },
    });
    if (!existing) {
      await prisma.progress.create({
        data: { studentId, careerId, levelId: entry.levelId, status: i === 0 ? "UNLOCKED" : "LOCKED" },
      });
    }
  }
}

export async function POST(req: NextRequest) {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ error: "Not registered" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const rawName = String(body?.name ?? "").trim();

  if (rawName.length < 2 || rawName.length > 60) {
    return NextResponse.json(
      { error: "Please enter a job title between 2 and 60 characters." },
      { status: 400 }
    );
  }

  const stream = student.stream;

  // If it matches a real curated career in their stream, just send them
  // there instead — it already has proper tailored content.
  // (SQLite has no case-insensitive `equals` filter, so compare in JS.)
  const rawNameLower = rawName.toLowerCase();
  const curatedCareers = await prisma.career.findMany({ where: { stream, isCustom: false } });
  const realMatch = curatedCareers.find((c) => c.name.trim().toLowerCase() === rawNameLower);
  if (realMatch) {
    await prisma.student.update({ where: { id: student.id }, data: { selectedCareerId: realMatch.id } });
    await ensureProgressForPath(student.id, realMatch.id);
    return NextResponse.json({ careerId: realMatch.id });
  }

  // Reuse a custom career this same student already made with this name,
  // instead of spawning a fresh duplicate every time they retype it.
  const studentCustomCareers = await prisma.career.findMany({
    where: { stream, isCustom: true, createdByStudentId: student.id },
  });
  const existingCustom = studentCustomCareers.find((c) => c.name.trim().toLowerCase() === rawNameLower);
  if (existingCustom) {
    await prisma.student.update({ where: { id: student.id }, data: { selectedCareerId: existingCustom.id } });
    await ensureProgressForPath(student.id, existingCustom.id);
    return NextResponse.json({ careerId: existingCustom.id });
  }

  const subjectLevels = await prisma.level.findMany({
    where: { stream, kind: "SUBJECT", subject: { in: GENERIC_SUBJECTS[stream] } },
  });
  const subjectByName = new Map(subjectLevels.map((l) => [l.subject, l]));
  const orderedSubjectLevels = GENERIC_SUBJECTS[stream]
    .map((s) => subjectByName.get(s))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  const genericCapstone = await prisma.level.findFirst({
    where: { stream, isGenericCapstone: true },
  });

  if (orderedSubjectLevels.length === 0 || !genericCapstone) {
    return NextResponse.json(
      { error: "Career content isn't set up yet. Please try again later." },
      { status: 500 }
    );
  }

  const career = await prisma.career.create({
    data: {
      slug: `custom-${slugify(rawName)}-${Math.random().toString(36).slice(2, 8)}`,
      name: rawName,
      stream,
      tagline: "Your own path, your own challenge.",
      description: `A personalized path toward becoming a ${rawName}.`,
      icon: iconForName(rawName),
      order: 9999,
      isCustom: true,
      createdByStudentId: student.id,
    },
  });

  let order = 1;
  for (const level of orderedSubjectLevels) {
    await prisma.careerPath.create({ data: { careerId: career.id, levelId: level.id, order: order++ } });
  }
  await prisma.careerPath.create({ data: { careerId: career.id, levelId: genericCapstone.id, order: order++ } });

  await prisma.student.update({ where: { id: student.id }, data: { selectedCareerId: career.id } });
  await ensureProgressForPath(student.id, career.id);

  return NextResponse.json({ careerId: career.id });
}
