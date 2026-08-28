"use client";

import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { getUserTypingTests } from "@/lib/typing-tests";
import type { TypingTest } from "@/lib/typing-tests";

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold text-slate-900">{value}</p></div>;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tests, setTests] = useState<TypingTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) {
      router.replace("/login");
      return;
    }
    setUser(currentUser);
    try {
      setTests(await getUserTypingTests(currentUser.uid));
    } catch {
      setError("We could not load your typing statistics yet.");
    } finally {
      setLoading(false);
    }
  }), [router]);

  async function handleLogout() {
    await signOut(auth);
    router.replace("/login");
  }

  const bestWpm = tests.length ? Math.max(...tests.map((test) => test.wpm)) : 0;
  const bestAccuracy = tests.length ? Math.max(...tests.map((test) => test.accuracy)) : 0;
  const averageWpm = tests.length ? tests.reduce((sum, test) => sum + test.wpm, 0) / tests.length : 0;

  if (loading) return <main className="flex min-h-screen items-center justify-center text-slate-600">Loading dashboard...</main>;

  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"><Link href="/" className="text-xl font-bold text-indigo-600">TypePulse</Link><button onClick={handleLogout} className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">Log out</button></div></nav>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Your dashboard</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Keep your momentum going.</h1>
        <p className="mt-3 text-slate-600">{user?.email}</p>
        {error && <p className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Best WPM" value={bestWpm.toFixed(0)} /><Stat label="Average WPM" value={averageWpm.toFixed(0)} /><Stat label="Total tests" value={tests.length.toString()} /><Stat label="Best accuracy" value={`${bestAccuracy.toFixed(1)}%`} />
        </div>
        <div className="mt-10 flex flex-wrap gap-4"><Link href="/typing-test" className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">Start a test</Link><Link href="/history" className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50">View history</Link><Link href="/progress" className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50">View progress</Link><Link href="/leaderboard" className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50">Leaderboard</Link></div>
      </div>
    </main>
  );
}
