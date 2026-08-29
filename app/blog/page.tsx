import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Typing Guides and Practice Tips",
  description: "Read practical TypePulse guides about typing speed, accuracy, touch typing, and better practice habits.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <nav className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold text-indigo-600">TypePulse</Link>
          <div className="flex items-center gap-3"><ThemeToggle /><Link href="/typing-test" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Take a test</Link></div>
        </div>
      </nav>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="font-semibold uppercase tracking-widest text-indigo-600">TypePulse guides</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">Learn, practice, and type with confidence.</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">Helpful, practical articles for improving typing speed, accuracy, comfort, and consistency.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {articles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-indigo-300 dark:bg-slate-900 dark:ring-slate-800">
              <p className="text-sm text-slate-500">{article.readTime}</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">{article.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{article.description}</p>
              <span className="mt-5 inline-block font-semibold text-indigo-600">Read guide →</span>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
