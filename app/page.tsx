import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-2xl font-bold text-indigo-600">TypePulse</Link>
        <div className="flex gap-3">
          <Link href="/login" className="rounded-lg px-4 py-2 font-semibold text-slate-700">Log in</Link>
          <Link href="/register" className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white">Get started</Link>
        </div>
      </nav>
      <section className="mx-auto max-w-4xl px-6 pb-24 pt-24 text-center">
        <p className="font-semibold uppercase tracking-widest text-indigo-600">Type smarter</p>
        <h1 className="mt-5 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Turn every keystroke into progress.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Build speed, improve accuracy, and track your typing journey with simple, focused practice.
        </p>
        <Link href="/register" className="mt-10 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-indigo-700">
          Create free account
        </Link>
      </section>
    </main>
  );
}
