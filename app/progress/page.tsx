"use client";

import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { getUserTypingTests } from "@/lib/typing-tests";
import type { TypingTest } from "@/lib/typing-tests";
import { DashboardNav } from "@/components/DashboardNav";

export default function ProgressPage() {
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
        .then((items) => { if (active) setTests(items); })
        .catch(() => { if (active) setError("We could not load your progress yet."); })
        .finally(() => { if (active) setLoading(false); });
    });
    return () => { active = false; unsubscribe(); };
  }, [router]);

  const recentTests = useMemo(() => tests.slice(0, 12).reverse(), [tests]);
  const averageWpm = tests.length ? tests.reduce((sum, test) => sum + test.wpm, 0) / tests.length : 0;
  const averageAccuracy = tests.length ? tests.reduce((sum, test) => sum + test.accuracy, 0) / tests.length : 0;
  const wpmChange = tests.length > 1 ? tests[0].wpm - tests[tests.length - 1].wpm : 0;
  const accuracyChange = tests.length > 1 ? tests[0].accuracy - tests[tests.length - 1].accuracy : 0;

  if (loading || !user) return <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-300">Loading your progress...</main>;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <DashboardNav links={[{ href: "/dashboard", label: "Dashboard" }, { href: "/history", label: "History" }, { href: "/leaderboard", label: "Leaderboard" }]} />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="font-semibold uppercase tracking-widest text-indigo-600">Progress</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">See your momentum.</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">Trends calculated from your saved Firestore tests.</p>
        {error && <p className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}
        {tests.length === 0 && !error ? (
          <div className="mt-10 rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"><p className="text-slate-600 dark:text-slate-400">Take a test to see your progress trends.</p><Link href="/typing-test" className="mt-5 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white">Start a test</Link></div>
        ) : (
          <>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><ProgressCard label="Average WPM" value={averageWpm.toFixed(1)} detail={`${formatChange(wpmChange)} vs. earliest test`} /><ProgressCard label="Average accuracy" value={`${averageAccuracy.toFixed(1)}%`} detail={`${formatChange(accuracyChange, "pp")} vs. earliest test`} /><ProgressCard label="Best WPM" value={Math.max(...tests.map((test) => test.wpm)).toFixed(1)} detail="Your top saved score" /><ProgressCard label="Tests completed" value={tests.length.toString()} detail="Keep practicing consistently" /></div>
            <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"><h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent trend</h2><div className="mt-6 space-y-4">{recentTests.map((test, index) => <div key={test.id}><div className="flex justify-between text-sm"><span className="text-slate-600 dark:text-slate-400">Test {index + 1}</span><span className="font-semibold text-slate-900 dark:text-slate-200">{test.wpm.toFixed(1)} WPM · {test.accuracy.toFixed(1)}%</span></div><div className="mt-2 h-3 rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-3 rounded-full bg-indigo-500" style={{ width: `${Math.min(100, Math.max(4, (test.wpm / Math.max(...tests.map((item) => item.wpm), 1)) * 100))}%` }} /></div></div>)}</div></div>
          </>
        )}
      </section>
    </main>
  );
}

function ProgressCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{value}</p><p className="mt-2 text-xs text-slate-500">{detail}</p></div>;
}

function formatChange(value: number, suffix = "WPM") {
  if (value === 0) return "No change";
  return `${value > 0 ? "+" : ""}${value.toFixed(1)} ${suffix}`;
}
