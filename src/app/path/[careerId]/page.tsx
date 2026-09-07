"use client";

import { useEffect, useState, use as usePromise } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import type { PathNode, Student, Career } from "@/lib/types";

function NodeIcon({ status }: { status: PathNode["status"] }) {
  if (status === "LOCKED") return <span aria-hidden>🔒</span>;
  if (status === "COMPLETED") return <span aria-hidden>✅</span>;
  return <span aria-hidden>▶️</span>;
}

function statusClasses(status: PathNode["status"], kind: PathNode["kind"]) {
  if (status === "LOCKED") return "bg-gray-200 text-gray-400 border-gray-300";
  if (status === "COMPLETED")
    return kind === "CAPSTONE"
      ? "bg-amber-400 text-amber-950 border-amber-500"
      : "bg-emerald-500 text-white border-emerald-600";
  return kind === "CAPSTONE"
    ? "bg-amber-300 text-amber-950 border-amber-500 node-pulse"
    : "bg-violet-600 text-white border-violet-700 node-pulse";
}

export default function CareerPathPage({
  params,
}: {
  params: Promise<{ careerId: string }>;
}) {
  const { careerId } = usePromise(params);
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [career, setCareer] = useState<Career | null>(null);
  const [nodes, setNodes] = useState<PathNode[]>([]);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const meRes = await fetch("/api/me");
      const me = await meRes.json();
      if (!me.student) {
        router.replace("/");
        return;
      }
      setStudent(me.student);

      const res = await fetch(`/api/path?careerId=${careerId}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? "Could not load this career path.");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setCareer(data.career);
      setNodes(data.nodes);
      setFinished(data.finished);
      setLoading(false);
    }
    load();
  }, [careerId, router]);

  if (loading) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p className="text-violet-700">Loading your path…</p>
      </main>
    );
  }

  if (errorMsg) {
    return (
      <>
        <Header student={student} />
        <main className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center px-4 text-center">
          <p className="mb-4 text-violet-800">{errorMsg}</p>
          <a href="/careers" className="font-semibold text-violet-700 underline">
            Back to careers
          </a>
        </main>
      </>
    );
  }

  return (
    <>
      <Header student={student} />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
        <div className="mb-6 text-center">
          <div className="text-5xl">{career?.icon}</div>
          <h1 className="mt-1 text-2xl font-extrabold text-violet-900">{career?.name}</h1>
          <p className="text-violet-600">{career?.tagline}</p>
        </div>

        {finished && (
          <div className="pop-in mb-8 rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-yellow-100 p-6 text-center shadow-lg">
            <div className="text-4xl">🏆</div>
            <h2 className="mt-2 text-xl font-extrabold text-amber-900">
              You reached your dream job: {career?.name}!
            </h2>
            <p className="mt-1 text-amber-800">
              Every level on this path is cleared. Pick another career to explore, or replay
              levels to raise your stars.
            </p>
          </div>
        )}

        <div className="relative">
          <div
            className="absolute top-4 bottom-4 left-1/2 w-1 -translate-x-1/2 rounded-full bg-violet-200"
            aria-hidden
          />
          <ol className="relative flex flex-col gap-8">
            {nodes.map((node, i) => {
              const align = i % 2 === 0 ? "justify-start" : "justify-end";
              const clickable = node.status !== "LOCKED";
              return (
                <li key={node.levelId} className={`flex ${align}`}>
                  <button
                    disabled={!clickable}
                    onClick={() => router.push(`/play/${node.levelId}?careerId=${careerId}`)}
                    className={`pop-in relative w-64 rounded-2xl border-2 p-4 text-left shadow-md transition ${statusClasses(
                      node.status,
                      node.kind
                    )} ${clickable ? "hover:-translate-y-0.5 hover:shadow-lg" : "cursor-not-allowed"}`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide opacity-80">
                      <span>
                        {node.kind === "CAPSTONE" ? "🏁 Capstone" : `Level ${node.order}`}
                      </span>
                      <NodeIcon status={node.status} />
                    </div>
                    <h3 className="mt-1 font-extrabold">{node.title}</h3>
                    <p className="mt-0.5 text-xs opacity-90">{node.subject}</p>
                    {node.status === "COMPLETED" && (
                      <p className="mt-2 text-xs font-semibold">
                        {"⭐".repeat(node.stars)} · Best {node.bestScore}%
                      </p>
                    )}
                    {node.status === "UNLOCKED" && (
                      <p className="mt-2 text-xs font-semibold">
                        {node.questionCount} questions · Pass at {node.passScore}%
                      </p>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-10 text-center">
          <a href="/careers" className="text-sm font-semibold text-violet-700 underline">
            ← Explore a different career
          </a>
        </div>
      </main>
    </>
  );
}
