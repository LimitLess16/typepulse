import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SiteFooter } from "@/components/SiteFooter";

type InfoPageProps = {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
};

export function InfoPage({ eyebrow, title, children }: InfoPageProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <nav className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold text-indigo-600">TypePulse</Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/typing-test" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Take a test</Link>
          </div>
        </div>
      </nav>
      <article className="mx-auto max-w-3xl px-6 py-16">
        <p className="font-semibold uppercase tracking-widest text-indigo-600">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">{title}</h1>
        <div className="mt-8 space-y-6 leading-7 text-slate-600 dark:text-slate-300">{children}</div>
      </article>
      <SiteFooter />
    </main>
  );
}
