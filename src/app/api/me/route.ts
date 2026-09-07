import { NextResponse } from "next/server";
import { getCurrentStudent, clearStudentCookie } from "@/lib/session";

export async function GET() {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ student: null }, { status: 200 });
  return NextResponse.json({ student });
}

export async function DELETE() {
  await clearStudentCookie();
  return NextResponse.json({ ok: true });
}
