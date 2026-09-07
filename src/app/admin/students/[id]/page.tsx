import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { id } = await params;

  const student = await prisma.student.findUnique({
    where: { id },
    include: { selectedCareer: true },
  });
  if (!student) notFound();

  const progress = await prisma.progress.findMany({
    where: { studentId: id },
    include: { level: true },
    orderBy: [{ careerId: "asc" }, { updatedAt: "desc" }],
  });

  const careerIds = Array.from(new Set(progress.map((p) => p.careerId)));
  const careers = await prisma.career.findMany({ where: { id: { in: careerIds } } });
  const careerById = new Map(careers.map((c) => [c.id, c]));

  const paths = await prisma.careerPath.findMany({
    where: { careerId: { in: careerIds } },
    orderBy: { order: "asc" },
  });
  const orderByCareerAndLevel = new Map(paths.map((p) => [`${p.careerId}:${p.levelId}`, p.order]));

  const byCareer = new Map<string, typeof progress>();
  for (const p of progress) {
    const list = byCareer.get(p.careerId) ?? [];
    list.push(p);
    byCareer.set(p.careerId, list);
  }
  for (const [careerId, list] of byCareer) {
    list.sort(
      (a, b) =>
        (orderByCareerAndLevel.get(`${careerId}:${a.levelId}`) ?? 0) -
        (orderByCareerAndLevel.get(`${careerId}:${b.levelId}`) ?? 0)
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl bg-slate-950 px-4 py-8 text-slate-100">
      <Link href="/admin" className="text-sm font-semibold text-indigo-400 hover:underline">
        ← Back to all students
      </Link>

      <div className="mt-4 mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-extrabold">{student.name}</h1>
        <p className="mt-1 text-slate-400">
          Class {student.className}-{student.section} · Roll {student.roll} ·{" "}
          {student.stream === "SCIENCE" ? "Science" : "Humanities"} · Registered{" "}
          {new Date(student.createdAt).toLocaleString()}
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="rounded-xl bg-slate-800 px-4 py-2">
            <p className="text-xl font-extrabold text-amber-400">{student.xp}</p>
            <p className="text-xs text-slate-400">Total XP</p>
          </div>
          {student.selectedCareer && (
            <div className="rounded-xl bg-slate-800 px-4 py-2">
              <p className="text-xl font-extrabold">
                {student.selectedCareer.icon} {student.selectedCareer.name}
              </p>
              <p className="text-xs text-slate-400">Current career</p>
            </div>
          )}
        </div>
      </div>

      {Array.from(byCareer.entries()).map(([careerId, list]) => {
        const career = careerById.get(careerId);
        return (
          <div key={careerId} className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-3 text-lg font-bold">
              {career ? `${career.icon} ${career.name}` : "Unknown career"}
              {career?.isCustom && (
                <span className="ml-2 rounded bg-indigo-900 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-300">
                  student-typed / generic content
                </span>
              )}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-slate-400">
                  <tr>
                    <th className="py-1 pr-4 font-semibold">Level</th>
                    <th className="py-1 pr-4 font-semibold">Status</th>
                    <th className="py-1 pr-4 font-semibold">Best score</th>
                    <th className="py-1 pr-4 font-semibold">Stars</th>
                    <th className="py-1 pr-4 font-semibold">Attempts</th>
                    <th className="py-1 pr-4 font-semibold">Hints used</th>
                    <th className="py-1 pr-4 font-semibold">Completed at</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {list.map((p) => (
                    <tr key={p.id}>
                      <td className="py-1.5 pr-4 font-medium">
                        {p.level.title}
                        <span className="ml-1 text-xs text-slate-500">({p.level.subject})</span>
                      </td>
                      <td className="py-1.5 pr-4">
                        <StatusPill status={p.status} />
                      </td>
                      <td className="py-1.5 pr-4">{p.bestScore}%</td>
                      <td className="py-1.5 pr-4">{"⭐".repeat(p.stars) || "—"}</td>
                      <td className="py-1.5 pr-4">{p.attempts}</td>
                      <td className="py-1.5 pr-4">{p.hintsUsed}</td>
                      <td className="py-1.5 pr-4 text-slate-400">
                        {p.completedAt ? new Date(p.completedAt).toLocaleString() : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {byCareer.size === 0 && (
        <p className="text-slate-500">This student hasn&apos;t started any career path yet.</p>
      )}
    </main>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    LOCKED: "bg-slate-700 text-slate-300",
    UNLOCKED: "bg-indigo-600 text-white",
    COMPLETED: "bg-emerald-600 text-white",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${styles[status] ?? ""}`}>
      {status}
    </span>
  );
}
