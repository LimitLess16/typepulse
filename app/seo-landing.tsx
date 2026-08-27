import Link from "next/link";

type SeoLandingProps = {
  eyebrow: string;
  title: string;
  description: string;
  duration?: string;
};

export default function SeoLanding({ eyebrow, title, description, duration }: SeoLandingProps) {
  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-2xl font-bold text-indigo-600">TypePulse</Link>
        <div className="flex gap-3">
          <Link href="/login" className="rounded-lg px-4 py-2 font-semibold text-slate-700">Log in</Link>
          <Link href="/register" className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white">Create account</Link>
        </div>
      </nav>
      <section className="mx-auto max-w-4xl px-6 pb-24 pt-20 text-center">
        <p className="font-semibold uppercase tracking-widest text-indigo-600">{eyebrow}</p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">{description}</p>
        <div className="mx-auto mt-10 grid max-w-2xl gap-4 text-left sm:grid-cols-3">
          {["Instant WPM score", "Accuracy tracking", "Free to practice"].map((feature) => (
            <div key={feature} className="rounded-xl bg-white p-4 text-center font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">{feature}</div>
          ))}
        </div>
        {duration && <p className="mt-8 text-sm text-slate-500">Test duration: {duration}</p>}
        <Link href="/register" className="mt-8 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">Start typing free</Link>
      </section>
    </main>
  );
}
