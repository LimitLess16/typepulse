import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InfoPage } from "@/components/InfoPage";
import { articles } from "@/data/articles";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return {};
  return { title: article.title, description: article.description, authors: [{ name: "TypePulse Editorial Team" }] };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  return (
    <InfoPage eyebrow={`Typing guide · ${article.readTime}`} title={article.title}>
      <p className="text-lg">{article.description}</p>
      {article.sections.map((section) => (
        <section key={section.heading}>
          <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>
      ))}
      <div className="rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-950/40">
        <p className="font-semibold text-slate-900 dark:text-white">Ready to practice?</p>
        <Link href="/typing-test" className="mt-3 inline-block font-semibold text-indigo-600">Take a free typing test →</Link>
      </div>
    </InfoPage>
  );
}
