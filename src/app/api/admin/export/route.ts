import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

function csvEscape(value: string | number): string {
  const s = String(value);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const students = await prisma.student.findMany({
    orderBy: { xp: "desc" },
    include: {
      selectedCareer: { select: { name: true } },
      progress: { select: { status: true, attempts: true, bestScore: true, hintsUsed: true } },
    },
  });

  const header = [
    "Name",
    "Class",
    "Section",
    "Roll",
    "Stream",
    "Selected Career",
    "Total XP",
    "Levels Completed (all careers)",
    "Total Attempts",
    "Total Hints Used",
    "Registered At",
  ];

  const rows = students.map((s) => {
    const completed = s.progress.filter((p) => p.status === "COMPLETED").length;
    const attempts = s.progress.reduce((a, p) => a + p.attempts, 0);
    const hints = s.progress.reduce((a, p) => a + p.hintsUsed, 0);
    return [
      s.name,
      s.className,
      s.section,
      s.roll,
      s.stream,
      s.selectedCareer?.name ?? "",
      s.xp,
      completed,
      attempts,
      hints,
      new Date(s.createdAt).toISOString(),
    ];
  });

  const csv = [header, ...rows]
    .map((row) => row.map(csvEscape).join(","))
    .join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="careerquest-students-${Date.now()}.csv"`,
    },
  });
}
