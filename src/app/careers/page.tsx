"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import type { Career, Student } from "@/lib/types";

export default function CareersPage() {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedCareerId, setSelectedCareerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [choosing, setChoosing] = useState<string | null>(null);

  const [customName, setCustomName] = useState("");
  const [customSubmitting, setCustomSubmitting] = useState(false);
  const [customError, setCustomError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const meRes = await fetch("/api/me");
      const me = await meRes.json();
      if (!me.student) {
        router.replace("/");
        return;
      }
      setStudent(me.student);

      const careersRes = await fetch("/api/careers");
      const data = await careersRes.json();
      setCareers(data.careers ?? []);
      setSelectedCareerId(data.selectedCareerId ?? null);
      setLoading(false);
    }
    load();
  }, [router]);

  async function chooseCareer(careerId: string) {
    setChoosing(careerId);
    const res = await fetch("/api/careers/select", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ careerId }),
    });
    if (res.ok) {
      router.push(`/path/${careerId}`);
    } else {
      setChoosing(null);
    }
  }

  async function createCustomCareer(e: React.FormEvent) {
    e.preventDefault();
    setCustomError(null);
    if (!customName.trim()) {
      setCustomError("Type in a job title first.");
      return;
    }
    setCustomSubmitting(true);
    const res = await fetch("/api/careers/custom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: customName.trim() }),
    });
    const data = await res.json();
    if (!res.ok) {
      setCustomError(data.error ?? "Could not build that path. Please try again.");
      setCustomSubmitting(false);
      return;
    }
    router.push(`/path/${data.careerId}`);
  }

  if (loading || !student) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p className="text-violet-700">Loading careers…</p>
      </main>
    );
  }

  return (
    <>
      <Header student={student} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-violet-900">
            What&apos;s your dream job, {student.name.split(" ")[0]}?
          </h1>
          <p className="mt-1 text-violet-700">
            Pick a career for the <b>{student.stream === "SCIENCE" ? "Science" : "Humanities"}</b>{" "}
            stream. Every path is a real gamified test journey — you can switch anytime and
            your progress on each is saved.
          </p>
        </div>

        {student.selectedCareer?.isCustom && !careers.some((c) => c.id === selectedCareerId) && (
          <div className="pop-in mb-6 flex items-center justify-between rounded-2xl border border-violet-300 bg-violet-50 p-4">
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
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {careers.map((c) => {
            const isSelected = c.id === selectedCareerId;
            const pct = c.totalLevels ? Math.round((c.completedLevels / c.totalLevels) * 100) : 0;
            return (
              <button
                key={c.id}
                onClick={() => chooseCareer(c.id)}
                disabled={choosing === c.id}
                className={`pop-in group flex flex-col rounded-2xl border p-4 text-left shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 ${
                  isSelected
                    ? "border-violet-500 bg-violet-50"
                    : "border-violet-200 bg-white/80"
                }`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-3xl">{c.icon}</span>
                  {isSelected && (
                    <span className="rounded-full bg-violet-600 px-2 py-0.5 text-xs font-bold text-white">
                      In progress
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-violet-900">{c.name}</h3>
                <p className="mt-1 text-sm text-violet-600">{c.tagline}</p>
                {c.totalLevels > 0 && (
                  <div className="mt-3">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-violet-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-violet-600"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-violet-500">
                      {c.completedLevels}/{c.totalLevels} levels cleared
                    </p>
                  </div>
                )}
                <span className="mt-3 text-sm font-semibold text-violet-700 group-hover:underline">
                  {choosing === c.id
                    ? "Loading…"
                    : c.completedLevels > 0
                    ? "Continue path →"
                    : "Start this path →"}
                </span>
              </button>
            );
          })}
        </div>

        <div className="pop-in mt-10 rounded-2xl border border-dashed border-violet-300 bg-white/60 p-6 text-center">
          <h2 className="text-lg font-bold text-violet-900">Didn&apos;t find your dream job above?</h2>
          <p className="mt-1 text-sm text-violet-600">
            Type it in and we&apos;ll build you a path to get there.
          </p>
          <form onSubmit={createCustomCareer} className="mx-auto mt-4 flex max-w-md flex-col gap-2 sm:flex-row">
            <input
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="e.g. Marine Biologist, Game Developer…"
              maxLength={60}
              className="flex-1 rounded-lg border border-violet-200 px-3 py-2 outline-none focus:border-violet-500"
            />
            <button
              type="submit"
              disabled={customSubmitting}
              className="rounded-lg bg-violet-700 px-4 py-2 font-bold text-white hover:bg-violet-800 disabled:opacity-60"
            >
              {customSubmitting ? "Building…" : "Build my path 🚀"}
            </button>
          </form>
          {customError && <p className="mt-2 text-sm font-medium text-red-600">{customError}</p>}
        </div>
      </main>
    </>
  );
}
