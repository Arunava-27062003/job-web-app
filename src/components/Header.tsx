"use client";

import Link from "next/link";
import type { Student } from "@/lib/types";
import StudentLogoutButton from "@/components/StudentLogoutButton";

export default function Header({ student }: { student: Student | null }) {
  return (
    <header className="sticky top-0 z-20 border-b border-violet-200/60 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/careers" className="flex items-center gap-2 font-extrabold text-violet-800">
          <span className="text-xl">🎯</span>
          <span>CareerQuest</span>
        </Link>
        {student && (
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/dashboard"
              className="hidden sm:flex items-center gap-1 rounded-full bg-violet-100 px-3 py-1 font-semibold text-violet-800 hover:bg-violet-200"
            >
              ⭐ {student.xp} XP
            </Link>
            <Link
              href="/careers"
              className="rounded-full bg-white px-3 py-1 font-medium text-violet-700 ring-1 ring-violet-200 hover:bg-violet-50"
            >
              Careers
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-full bg-violet-700 px-3 py-1 font-medium text-white hover:bg-violet-800"
            >
              <span className="hidden sm:inline">{student.name}</span>
              <span aria-hidden>👤</span>
            </Link>
            <StudentLogoutButton />
          </div>
        )}
      </div>
    </header>
  );
}
