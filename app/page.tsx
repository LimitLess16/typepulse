import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold text-indigo-600">TypePulse</Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">Log in</Link>
            <Link href="/register" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Create account</Link>
          </div>
        </div>
      </nav>
      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <p className="font-semibold uppercase tracking-widest text-indigo-600">Free typing practice</p>
        <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-6xl">Build speed with every session.</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
          Choose a one, two, or three-minute challenge, type a fresh paragraph, and see your WPM and accuracy instantly.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/typing-test" className="rounded-xl bg-indigo-600 px-7 py-4 font-semibold text-white shadow-sm hover:bg-indigo-700">Start typing test</Link>
          <Link href="/typing-test" className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-7 py-4 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Practice now</Link>
        </div>
        <div className="mt-16 grid gap-4 text-left sm:grid-cols-3">
          {[
            ["Live feedback", "See WPM, accuracy, mistakes, and time remaining while you type."],
            ["Fresh paragraphs", "Reload the session whenever you want a new paragraph."],
            ["Track progress", "Sign in to save sessions and follow your improvement."],
          ].map(([title, description]) => (
            <div key={title} className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-colors">
              <h2 className="font-bold text-slate-900 dark:text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
