"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Login failed.");
      setSubmitting(false);
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-slate-950 px-4 py-10 text-slate-100">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mb-2 text-4xl">🛡️</div>
          <h1 className="text-2xl font-extrabold">CareerQuest Admin</h1>
          <p className="mt-1 text-sm text-slate-400">
            Teacher/administrator access only — monitor tests and results.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
        >
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-200">Admin password</label>
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 outline-none focus:border-indigo-500"
            />
          </div>
          {error && <p className="text-sm font-medium text-rose-400">{error}</p>}
          <button
            type="submit"
            disabled={submitting || !password}
            className="w-full rounded-lg bg-indigo-600 py-2.5 font-bold text-white transition hover:bg-indigo-500 disabled:opacity-60"
          >
            {submitting ? "Checking…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
