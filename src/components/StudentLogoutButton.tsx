"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StudentLogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch("/api/me", { method: "DELETE" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      disabled={loading}
      title="Log out"
      className={
        className ??
        "rounded-full bg-white px-3 py-1 font-medium text-violet-700 ring-1 ring-violet-200 hover:bg-violet-50 disabled:opacity-60"
      }
    >
      {loading ? "…" : "Log out"}
    </button>
  );
}
