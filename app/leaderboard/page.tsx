"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPublicLeaderboard } from "@/lib/typing-tests";
import type { TypingTest } from "@/lib/typing-tests";
import { DashboardNav } from "@/components/DashboardNav";

export default function LeaderboardPage() {
  const [tests, setTests] = useState<TypingTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    void getPublicLeaderboard()
      .then(setTests)
      .catch(() => setError("The public leaderboard is not available yet. Complete a test and check back soon."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <DashboardNav links={[{ href: "/typing-test", label: "Take a test" }, { href: "/login", label: "Log in" }]} />
      <section className="mx-auto max-w-4xl px-6 py-12">
        <p className="font-semibold uppercase tracking-widest text-indigo-600">Community scores</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">TypePulse leaderboard.</h1>
        <p className="mt-3 text-slate-600">Top public scores from the TypePulse community.</p>
        {loading && <p className="mt-10 text-slate-600">Loading leaderboard...</p>}
        {error && <div className="mt-10 rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200"><p className="font-semibold text-slate-900">Leaderboard coming soon</p><p className="mt-2 text-slate-600">{error}</p><Link href="/typing-test" className="mt-5 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white">Take a test</Link></div>}
        {!loading && !error && tests.length === 0 && <div className="mt-10 rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200"><p className="text-slate-600">No public scores yet. Be the first!</p><Link href="/typing-test" className="mt-5 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white">Take a test</Link></div>}
        {!loading && !error && tests.length > 0 && <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"><div className="grid grid-cols-[3rem_1fr_6rem_7rem] gap-4 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500"><span>#</span><span>Player</span><span>WPM</span><span>Accuracy</span></div><div className="divide-y divide-slate-100">{tests.map((test, index) => <div key={test.id} className="grid grid-cols-[3rem_1fr_6rem_7rem] items-center gap-4 px-5 py-4"><span className="font-bold text-indigo-600">{index + 1}</span><span className="truncate text-slate-700">Anonymous typist</span><span className="font-bold text-slate-900">{test.wpm.toFixed(1)}</span><span className="text-slate-600">{test.accuracy.toFixed(1)}%</span></div>)}</div></div>}
      </section>
    </main>
  );
}
