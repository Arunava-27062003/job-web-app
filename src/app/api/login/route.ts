import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { setStudentCookie } from "@/lib/session";
import { parseStudentInput } from "@/lib/studentInput";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = parseStudentInput(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const { name, className, stream, section, roll } = parsed.data;

  const existing = await prisma.student.findUnique({
    where: { className_section_roll_stream: { className, section, roll, stream } },
    include: { selectedCareer: true },
  });

  if (!existing) {
    return NextResponse.json(
      {
        error:
          "We couldn't find an account with these details. New here? Switch to Register instead.",
      },
      { status: 404 }
    );
  }

  if (existing.name.trim().toLowerCase() !== name.toLowerCase()) {
    return NextResponse.json(
      {
        error:
          "These details don't match our records. Please check your name, class, section and roll number.",
      },
      { status: 403 }
    );
  }

  await setStudentCookie(existing.id);
  return NextResponse.json({ student: existing });
}
