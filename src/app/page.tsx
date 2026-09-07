"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Mode = "register" | "login";

export default function HomePage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("register");
  const [suggestSwitch, setSuggestSwitch] = useState(false);

  const [name, setName] = useState("");
  const [className, setClassName] = useState("11");
  const [stream, setStream] = useState<"SCIENCE" | "HUMANITIES">("SCIENCE");
  const [section, setSection] = useState("");
  const [roll, setRoll] = useState("");

  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.student) {
          router.replace(data.student.selectedCareerId ? `/path/${data.student.selectedCareerId}` : "/careers");
        } else {
          setChecking(false);
        }
      })
      .catch(() => setChecking(false));
  }, [router]);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setSuggestSwitch(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuggestSwitch(false);
    if (!name.trim() || !section.trim() || !roll.trim()) {
      setError("Please fill in every field.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(mode === "register" ? "/api/register" : "/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, className, stream, section, roll }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setSuggestSwitch(true);
        setSubmitting(false);
        return;
      }
      router.push("/careers");
    } catch {
      setError("Could not reach the server. Please try again.");
      setSubmitting(false);
    }
  }

  if (checking) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p className="text-violet-700">Loading CareerQuest…</p>
      </main>
    );
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-2 text-5xl">🎯</div>
          <h1 className="text-3xl font-extrabold text-violet-900">CareerQuest</h1>
          <p className="mt-2 text-violet-700">
            Pick your dream career, level up through real class 11 &amp; 12 challenges, and
            reach the top.
          </p>
        </div>

        <div className="pop-in mb-4 flex rounded-full bg-violet-100 p-1">
          <button
            type="button"
            onClick={() => switchMode("register")}
            className={`flex-1 rounded-full py-2 text-sm font-bold transition ${
              mode === "register" ? "bg-white text-violet-900 shadow" : "text-violet-500"
            }`}
          >
            New student — Register
          </button>
          <button
            type="button"
            onClick={() => switchMode("login")}
            className={`flex-1 rounded-full py-2 text-sm font-bold transition ${
              mode === "login" ? "bg-white text-violet-900 shadow" : "text-violet-500"
            }`}
          >
            Returning — Log in
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="pop-in space-y-4 rounded-2xl border border-violet-200 bg-white/80 p-6 shadow-xl shadow-violet-200/40 backdrop-blur"
        >
          <div>
            <label className="mb-1 block text-sm font-semibold text-violet-900">Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aditi Sharma"
              className="w-full rounded-lg border border-violet-200 px-3 py-2 outline-none focus:border-violet-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-violet-900">Class</label>
              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full rounded-lg border border-violet-200 px-3 py-2 outline-none focus:border-violet-500"
              >
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-violet-900">Stream</label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value as "SCIENCE" | "HUMANITIES")}
                className="w-full rounded-lg border border-violet-200 px-3 py-2 outline-none focus:border-violet-500"
              >
                <option value="SCIENCE">Science</option>
                <option value="HUMANITIES">Humanities</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-violet-900">Section</label>
              <input
                value={section}
                onChange={(e) => setSection(e.target.value)}
                placeholder="e.g. A"
                className="w-full rounded-lg border border-violet-200 px-3 py-2 outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-violet-900">Roll no.</label>
              <input
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                placeholder="e.g. 23"
                className="w-full rounded-lg border border-violet-200 px-3 py-2 outline-none focus:border-violet-500"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              <p className="font-medium">{error}</p>
              {suggestSwitch && (
                <button
                  type="button"
                  onClick={() => switchMode(mode === "register" ? "login" : "register")}
                  className="mt-2 font-bold text-red-800 underline"
                >
                  Switch to {mode === "register" ? "Log in" : "Register"} →
                </button>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-violet-700 py-2.5 font-bold text-white shadow-lg shadow-violet-400/40 transition hover:bg-violet-800 disabled:opacity-60"
          >
            {submitting
              ? mode === "register"
                ? "Starting your quest…"
                : "Logging in…"
              : mode === "register"
              ? "Start my quest 🚀"
              : "Log in and continue →"}
          </button>
          <p className="text-center text-xs text-violet-500">
            No password needed — just the same details every time to{" "}
            {mode === "register" ? "start" : "continue"} on this device.
          </p>
        </form>

        <p className="mt-6 text-center">
          <a href="/admin/login" className="text-xs text-violet-300 hover:text-violet-500 hover:underline">
            Teacher / admin login
          </a>
        </p>
      </div>
    </main>
  );
}
