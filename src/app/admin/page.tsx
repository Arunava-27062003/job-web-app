import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const [students, careers, careerPathCounts] = await Promise.all([
    prisma.student.findMany({
      orderBy: { xp: "desc" },
      include: {
        selectedCareer: { select: { id: true, name: true, icon: true, isCustom: true } },
        progress: { select: { status: true, attempts: true, bestScore: true, careerId: true } },
      },
    }),
    prisma.career.findMany({ select: { id: true, name: true, icon: true, stream: true } }),
    prisma.careerPath.groupBy({ by: ["careerId"], _count: { _all: true } }),
  ]);

  const totalLevelsByCareer = new Map(careerPathCounts.map((c) => [c.careerId, c._count._all]));

  const totalStudents = students.length;
  const scienceCount = students.filter((s) => s.stream === "SCIENCE").length;
  const humanitiesCount = totalStudents - scienceCount;
  const totalAttempts = students.reduce(
    (sum, s) => sum + s.progress.reduce((a, p) => a + p.attempts, 0),
    0
  );
  const completedRows = students.flatMap((s) => s.progress).filter((p) => p.status === "COMPLETED");
  const avgScore = completedRows.length
    ? Math.round(completedRows.reduce((a, p) => a + p.bestScore, 0) / completedRows.length)
    : 0;

  const popularityMap = new Map<string, number>();
  for (const s of students) {
    if (s.selectedCareerId) popularityMap.set(s.selectedCareerId, (popularityMap.get(s.selectedCareerId) ?? 0) + 1);
  }
  const popularCareers = careers
    .map((c) => ({ ...c, count: popularityMap.get(c.id) ?? 0 }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">🛡️ CareerQuest Admin</h1>
          <p className="text-sm text-slate-400">Monitor tests, progress, and results across all students.</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/api/admin/export"
            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-500"
          >
            ⬇ Download CSV
          </a>
          <AdminLogoutButton />
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total students" value={totalStudents} />
        <StatCard label="Science / Humanities" value={`${scienceCount} / ${humanitiesCount}`} />
        <StatCard label="Total attempts" value={totalAttempts} />
        <StatCard label="Avg. score (cleared levels)" value={`${avgScore}%`} />
      </div>

      {popularCareers.length > 0 && (
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="mb-3 text-lg font-bold">Most popular careers</h2>
          <div className="flex flex-wrap gap-3">
            {popularCareers.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1.5 text-sm"
              >
                <span>{c.icon}</span>
                <span className="font-semibold">{c.name}</span>
                <span className="text-slate-400">· {c.count} student{c.count === 1 ? "" : "s"}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 px-5 py-4">
          <h2 className="text-lg font-bold">Students ({totalStudents})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/60 text-slate-400">
              <tr>
                <th className="px-4 py-2 font-semibold">Name</th>
                <th className="px-4 py-2 font-semibold">Class</th>
                <th className="px-4 py-2 font-semibold">Stream</th>
                <th className="px-4 py-2 font-semibold">Career</th>
                <th className="px-4 py-2 font-semibold">Progress</th>
                <th className="px-4 py-2 font-semibold">XP</th>
                <th className="px-4 py-2 font-semibold">Attempts</th>
                <th className="px-4 py-2 font-semibold">Registered</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {students.map((s) => {
                const completedForSelected = s.progress.filter(
                  (p) => p.careerId === s.selectedCareerId && p.status === "COMPLETED"
                ).length;
                const totalForSelected = s.selectedCareerId
                  ? totalLevelsByCareer.get(s.selectedCareerId) ?? 0
                  : 0;
                const attempts = s.progress.reduce((a, p) => a + p.attempts, 0);
                return (
                  <tr key={s.id} className="hover:bg-slate-800/40">
                    <td className="px-4 py-2 font-semibold">{s.name}</td>
                    <td className="px-4 py-2 text-slate-300">
                      {s.className}-{s.section} · Roll {s.roll}
                    </td>
                    <td className="px-4 py-2 text-slate-300">
                      {s.stream === "SCIENCE" ? "Science" : "Humanities"}
                    </td>
                    <td className="px-4 py-2 text-slate-300">
                      {s.selectedCareer ? (
                        <>
                          {s.selectedCareer.icon} {s.selectedCareer.name}
                          {s.selectedCareer.isCustom && (
                            <span className="ml-1 rounded bg-indigo-900 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-300">
                              custom
                            </span>
                          )}
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-2 text-slate-300">
                      {s.selectedCareerId ? `${completedForSelected}/${totalForSelected}` : "—"}
                    </td>
                    <td className="px-4 py-2 font-semibold text-amber-400">{s.xp}</td>
                    <td className="px-4 py-2 text-slate-300">{attempts}</td>
                    <td className="px-4 py-2 text-slate-400">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <Link
                        href={`/admin/students/${s.id}`}
                        className="font-semibold text-indigo-400 hover:underline"
                      >
                        Details →
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {students.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-slate-500">
                    No students registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <p className="text-2xl font-extrabold text-white">{value}</p>
      <p className="text-xs font-semibold text-slate-400">{label}</p>
    </div>
  );
}
