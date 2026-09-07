"use client";

import { Suspense, useEffect, useMemo, useState, use as usePromise } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import type { QuizQuestion, Student, SubmitResponse } from "@/lib/types";

type Phase = "loading" | "quiz" | "submitting" | "result" | "error";

function QuizInner({ levelId }: { levelId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const careerId = searchParams.get("careerId") ?? "";

  const [student, setStudent] = useState<Student | null>(null);
  const [phase, setPhase] = useState<Phase>("loading");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [levelTitle, setLevelTitle] = useState("");
  const [levelSubject, setLevelSubject] = useState("");
  const [passScore, setPassScore] = useState(60);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [hintedIds, setHintedIds] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState<SubmitResponse | null>(null);

  useEffect(() => {
    async function load() {
      const meRes = await fetch("/api/me");
      const me = await meRes.json();
      if (!me.student) {
        router.replace("/");
        return;
      }
      setStudent(me.student);

      if (!careerId) {
        setErrorMsg("Missing career context. Please return to your path.");
        setPhase("error");
        return;
      }

      const res = await fetch(`/api/level/${levelId}?careerId=${careerId}`);
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Could not load this level.");
        setPhase("error");
        return;
      }
      setLevelTitle(data.level.title);
      setLevelSubject(data.level.subject);
      setPassScore(data.level.passScore);
      setQuestions(data.questions);
      setPhase("quiz");
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelId, careerId]);

  const current = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const isLast = currentIndex === questions.length - 1;
  const canAdvance = current ? answers[current.id] !== undefined : false;

  function selectOption(qId: string, idx: number) {
    setAnswers((prev) => ({ ...prev, [qId]: idx }));
  }

  function revealHint() {
    if (!current) return;
    setShowHint(true);
    setHintedIds((prev) => new Set(prev).add(current.id));
  }

  function goNext() {
    setShowHint(false);
    setCurrentIndex((i) => Math.min(i + 1, questions.length - 1));
  }
  function goBack() {
    setShowHint(false);
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }

  async function finishQuiz() {
    setPhase("submitting");
    const res = await fetch(`/api/level/${levelId}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        careerId,
        answers,
        hintedQuestionIds: Array.from(hintedIds),
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setErrorMsg(data.error ?? "Could not submit your answers.");
      setPhase("error");
      return;
    }
    setResult(data);
    setPhase("result");
  }

  function retry() {
    setAnswers({});
    setHintedIds(new Set());
    setCurrentIndex(0);
    setShowHint(false);
    setResult(null);
    setPhase("quiz");
  }

  const progressPct = useMemo(
    () => (questions.length ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0),
    [currentIndex, questions.length]
  );

  if (phase === "loading") {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p className="text-violet-700">Loading level…</p>
      </main>
    );
  }

  if (phase === "error") {
    return (
      <>
        <Header student={student} />
        <main className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center px-4 text-center">
          <p className="mb-4 text-violet-800">{errorMsg}</p>
          <a
            href={careerId ? `/path/${careerId}` : "/careers"}
            className="font-semibold text-violet-700 underline"
          >
            Back to path
          </a>
        </main>
      </>
    );
  }

  if (phase === "result" && result) {
    return (
      <>
        <Header student={student} />
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
          <div
            className={`pop-in mb-6 rounded-2xl border-2 p-6 text-center shadow-lg ${
              result.passed
                ? "border-emerald-400 bg-emerald-50"
                : "border-rose-300 bg-rose-50"
            }`}
          >
            <div className="text-4xl">{result.passed ? "🎉" : "💡"}</div>
            <h1 className="mt-2 text-2xl font-extrabold text-violet-900">
              {result.passed ? "Level cleared!" : "Not quite — try again"}
            </h1>
            <p className="mt-1 text-violet-700">
              You scored <b>{result.score}%</b> ({result.correctCount}/{result.total} correct).
              {" "}
              {result.passed ? `${"⭐".repeat(result.stars)}` : `Need ${passScore}% to pass.`}
            </p>
            <p className="mt-1 text-sm font-semibold text-amber-700">
              {result.xpAwarded > 0 ? `+${result.xpAwarded} XP earned` : "No new XP this attempt"}
              {" · "}Total: {result.totalXp} XP
            </p>
            {result.unlockedNext && (
              <p className="mt-2 text-sm font-semibold text-violet-800">
                🔓 Unlocked next: {result.unlockedNext.title}
              </p>
            )}
          </div>

          <div className="mb-6 space-y-3">
            {result.results.map((r, i) => (
              <div
                key={r.questionId}
                className={`rounded-xl border p-3 text-sm ${
                  r.isCorrect ? "border-emerald-200 bg-emerald-50/60" : "border-rose-200 bg-rose-50/60"
                }`}
              >
                <p className="font-semibold text-violet-900">
                  {i + 1}. {r.text}
                </p>
                <p className="mt-1">
                  Your answer:{" "}
                  <span className={r.isCorrect ? "text-emerald-700" : "text-rose-700"}>
                    {r.yourAnswer !== null ? r.options[r.yourAnswer] : "Not answered"}
                  </span>
                  {!r.isCorrect && (
                    <>
                      {" "}
                      · Correct: <span className="text-emerald-700">{r.options[r.correctIndex]}</span>
                    </>
                  )}
                  {r.hintUsed && <span className="ml-2 text-xs text-amber-600">(hint used)</span>}
                </p>
                <p className="mt-1 text-violet-600">{r.explanation}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={retry}
              className="rounded-lg bg-white px-4 py-2 font-semibold text-violet-700 ring-1 ring-violet-300 hover:bg-violet-50"
            >
              Retry this level
            </button>
            <button
              onClick={() => router.push(`/path/${careerId}`)}
              className="rounded-lg bg-violet-700 px-4 py-2 font-semibold text-white hover:bg-violet-800"
            >
              Back to path →
            </button>
          </div>
        </main>
      </>
    );
  }

  if (!current) return null;

  return (
    <>
      <Header student={student} />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm font-semibold text-violet-700">
            <span>
              {levelSubject} · {levelTitle}
            </span>
            <span>
              Question {currentIndex + 1} / {questions.length}
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-violet-100">
            <div
              className="h-full rounded-full bg-violet-600 transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="pop-in rounded-2xl border border-violet-200 bg-white/90 p-6 shadow-md">
          <p className="text-lg font-bold text-violet-900">{current.text}</p>

          <div className="mt-4 space-y-2">
            {current.options.map((opt, idx) => {
              const selected = answers[current.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => selectOption(current.id, idx)}
                  className={`w-full rounded-lg border-2 px-4 py-2.5 text-left transition ${
                    selected
                      ? "border-violet-600 bg-violet-100 font-semibold text-violet-900"
                      : "border-violet-200 bg-white hover:border-violet-300"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between">
            {!showHint ? (
              <button
                onClick={revealHint}
                className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800 hover:bg-amber-200"
              >
                💡 Get a hint
              </button>
            ) : (
              <p className="rounded-lg bg-amber-50 px-3 py-1 text-sm text-amber-800">
                💡 {current.hint}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={goBack}
            disabled={currentIndex === 0}
            className="rounded-lg bg-white px-4 py-2 font-semibold text-violet-700 ring-1 ring-violet-300 hover:bg-violet-50 disabled:opacity-40"
          >
            ← Back
          </button>
          <span className="text-xs text-violet-500">{answeredCount}/{questions.length} answered</span>
          {isLast ? (
            <button
              onClick={finishQuiz}
              disabled={!canAdvance || phase === "submitting"}
              className="rounded-lg bg-emerald-600 px-4 py-2 font-bold text-white hover:bg-emerald-700 disabled:opacity-40"
            >
              {phase === "submitting" ? "Submitting…" : "Finish test ✅"}
            </button>
          ) : (
            <button
              onClick={goNext}
              disabled={!canAdvance}
              className="rounded-lg bg-violet-700 px-4 py-2 font-bold text-white hover:bg-violet-800 disabled:opacity-40"
            >
              Next →
            </button>
          )}
        </div>
      </main>
    </>
  );
}

export default function PlayPage({ params }: { params: Promise<{ levelId: string }> }) {
  const { levelId } = usePromise(params);
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 items-center justify-center">
          <p className="text-violet-700">Loading level…</p>
        </main>
      }
    >
      <QuizInner levelId={levelId} />
    </Suspense>
  );
}
