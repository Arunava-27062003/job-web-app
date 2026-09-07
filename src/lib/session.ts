import { cookies } from "next/headers";
import { prisma } from "./prisma";

const COOKIE_NAME = "cbt_student_id";

export async function getStudentIdFromCookie(): Promise<string | null> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value ?? null;
}

export async function setStudentCookie(studentId: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, studentId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

export async function clearStudentCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getCurrentStudent() {
  const id = await getStudentIdFromCookie();
  if (!id) return null;
  return prisma.student.findUnique({
    where: { id },
    include: { selectedCareer: true },
  });
}
