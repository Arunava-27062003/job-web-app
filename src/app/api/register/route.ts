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
  });

  if (existing) {
    // This seat (class + section + roll + stream) is already registered —
    // no duplicate accounts, even if the submitted name matches. Returning
    // students should use Log in instead.
    const sameName = existing.name.trim().toLowerCase() === name.toLowerCase();
    return NextResponse.json(
      {
        error: sameName
          ? `You're already registered! Please use Log in instead of registering again.`
          : `Roll ${roll} in Class ${className}-${section} is already registered under a different name. Please double-check your details, or ask your teacher if you think this is a mistake.`,
        alreadyRegistered: sameName,
      },
      { status: 409 }
    );
  }

  const student = await prisma.student.create({
    data: { name, className, stream, section, roll },
    include: { selectedCareer: true },
  });

  await setStudentCookie(student.id);

  return NextResponse.json({ student });
}
