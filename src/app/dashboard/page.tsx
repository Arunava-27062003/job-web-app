"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import type { Student } from "@/lib/types";

type LeaderboardEntry = {
  id: string;
  name: string;
  className: string;
  section: string;
  xp: number;
  selectedCareer: { name: string; icon: string } | null;
};

export default function DashboardPage() {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const meRes = await fetch("/api/me");
      const me = await meRes.json();
      if (!me.student) {
        router.replace("/");
        return;
      }
      setStudent(me.student);

      const lbRes = await fetch("/api/leaderboard");
      const lbData = await lbRes.json();
      setLeaderboard(lbData.leaderboard ?? []);
      setLoading(false);
    }
    load();
  }, [router]);

  if (loading || !student) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p className="text-violet-700">Loading dashboard…</p>
      </main>
    );
  }

  return (
    <>
      <Header student={student} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <div className="pop-in mb-8 rounded-2xl border border-violet-200 bg-white/85 p-6 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-violet-900">{student.name}</h1>
              <p className="text-violet-600">
                Class {student.className} · Section {student.section} · Roll {student.roll} ·{" "}
                {student.stream === "SCIENCE" ? "Science" : "Humanities"}
              </p>
            </div>
            <div className="rounded-xl bg-amber-100 px-4 py-2 text-center">
              <p className="text-2xl font-extrabold text-amber-800">{student.xp}</p>
              <p className="text-xs font-semibold text-amber-700">Total XP</p>
            </div>
          </div>

          {student.selectedCareer ? (
            <div className="mt-4 flex items-center justify-between rounded-xl bg-violet-50 p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{student.selectedCareer.icon}</span>
                <div>
                  <p className="text-sm text-violet-600">Currently pursuing</p>
                  <p className="font-bold text-violet-900">{student.selectedCareer.name}</p>
                </div>
              </div>
              <button
                onClick={() => router.push(`/path/${student.selectedCareer!.id}`)}
                className="rounded-lg bg-violet-700 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-800"
              >
                Continue →
              </button>
            </div>
          ) : (
            <div className="mt-4 rounded-xl bg-violet-50 p-4 text-center">
              <p className="mb-2 text-violet-700">You haven&apos;t chosen a career path yet.</p>
              <button
                onClick={() => router.push("/careers")}
                className="rounded-lg bg-violet-700 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-800"
              >
                Choose a dream job →
              </button>
            </div>
          )}
        </div>

        <div className="pop-in rounded-2xl border border-violet-200 bg-white/85 p-6 shadow-md">
          <h2 className="mb-4 text-lg font-extrabold text-violet-900">
            🏆 {student.stream === "SCIENCE" ? "Science" : "Humanities"} Leaderboard
          </h2>
          <ol className="space-y-2">
            {leaderboard.map((entry, i) => (
              <li
                key={entry.id}
                className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                  entry.id === student.id ? "bg-amber-100" : "bg-violet-50/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center font-bold text-violet-500">{i + 1}</span>
                  <span>
                    <span className="font-semibold text-violet-900">{entry.name}</span>{" "}
                    <span className="text-xs text-violet-500">
                      (Class {entry.className}-{entry.section})
                    </span>
                  </span>
                  {entry.selectedCareer && (
                    <span className="text-sm">
                      {entry.selectedCareer.icon} {entry.selectedCareer.name}
                    </span>
                  )}
                </div>
                <span className="font-bold text-amber-700">{entry.xp} XP</span>
              </li>
            ))}
            {leaderboard.length === 0 && (
              <p className="text-sm text-violet-500">No students yet — be the first!</p>
            )}
          </ol>
        </div>
      </main>
    </>
  );
}
