"use client";

import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { getTypingTestTime, getUserTypingTests } from "@/lib/typing-tests";
import type { TypingTest } from "@/lib/typing-tests";
import { DashboardNav } from "@/components/DashboardNav";

export default function HistoryPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tests, setTests] = useState<TypingTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.replace("/login");
        return;
      }
      setUser(currentUser);
      void getUserTypingTests(currentUser.uid)
        .then((items) => {
          if (active) setTests(items);
        })
        .catch(() => {
          if (active) setError("We could not load your test history.");
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, [router]);

  if (loading || !user) {
    return <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-300">Loading your history...</main>;
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <DashboardNav links={[{ href: "/dashboard", label: "Dashboard" }, { href: "/progress", label: "Progress" }, { href: "/leaderboard", label: "Leaderboard" }]} />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="font-semibold uppercase tracking-widest text-indigo-600">Your history</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">Every test, all in one place.</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">{tests.length} saved {tests.length === 1 ? "test" : "tests"}, newest first.</p>
        {error && <p className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}
        {error ? (
          <div className="mt-10 rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
            <p className="text-slate-600 dark:text-slate-400">Please try refreshing the page in a moment.</p>
          </div>
        ) : tests.length === 0 ? (
          <div className="mt-10 rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
            <p className="text-slate-600 dark:text-slate-400">Complete your first test to start building a history.</p>
            <Link href="/typing-test" className="mt-5 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white">Start a test</Link>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {tests.map((test) => (
                <div key={test.id} className="grid gap-3 px-5 py-5 sm:grid-cols-5 sm:items-center">
                  <div><p className="text-2xl font-bold text-slate-900 dark:text-white">{test.wpm.toFixed(1)} <span className="text-sm font-medium text-slate-500">WPM</span></p><p className="text-sm text-slate-500">{formatDate(getTypingTestTime(test))}</p></div>
                  <Stat label="Accuracy" value={`${test.accuracy.toFixed(1)}%`} />
                  <Stat label="Mistakes" value={(test.mistakes ?? 0).toString()} />
                  <Stat label="Duration" value={test.duration ? `${test.duration}s` : "—"} />
                  <Link href="/typing-test" className="text-sm font-semibold text-indigo-600 hover:underline sm:text-right">Test again →</Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div><p className="text-xs uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 font-semibold text-slate-700 dark:text-slate-200">{value}</p></div>;
}

function formatDate(timestamp: number) {
  return timestamp ? new Date(timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "Recently";
}
