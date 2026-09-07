import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/session";

export async function GET(req: NextRequest) {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ error: "Not registered" }, { status: 401 });

  const stream = (req.nextUrl.searchParams.get("stream") ?? student.stream) as
    | "SCIENCE"
    | "HUMANITIES";

  const top = await prisma.student.findMany({
    where: { stream },
    orderBy: { xp: "desc" },
    take: 10,
    select: {
      id: true,
      name: true,
      className: true,
      section: true,
      xp: true,
      selectedCareer: { select: { name: true, icon: true } },
    },
  });

  return NextResponse.json({ leaderboard: top, you: student.id });
}
