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
  const canonical = `/blog/${article.slug}`;
  return {
    title: article.seoTitle || article.title,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: "TypePulse Editorial Team" }],
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: article.seoTitle || article.title,
      description: article.description,
      url: canonical,
      siteName: "TypePulse",
      publishedTime: article.publishedTime,
    },
    twitter: {
      card: "summary",
      title: article.seoTitle || article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const faqSchema = article.faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  } : null;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://typepulse.app";
  const canonicalUrl = `${baseUrl}/blog/${article.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: { "@type": "Organization", name: "TypePulse Editorial Team" },
    publisher: { "@type": "Organization", name: "TypePulse" },
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    ...(article.publishedTime ? { datePublished: article.publishedTime, dateModified: article.publishedTime } : {}),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Typing Guides", item: `${baseUrl}/blog` },
      { "@type": "ListItem", position: 3, name: article.title, item: canonicalUrl },
    ],
  };
  return (
    <InfoPage eyebrow={`Typing guide · ${article.readTime}`} title={article.title}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <p className="text-lg">{article.description}</p>
      {article.sections.map((section) => (
        <section key={section.heading}>
          <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>
      ))}
      {article.table && (
        <section>
          <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">Average typing speed WPM chart</h2>
          <div className="overflow-hidden rounded-2xl ring-1 ring-slate-200 dark:ring-slate-800">
            <table className="w-full text-left">
              <thead className="bg-slate-100 dark:bg-slate-800"><tr><th className="px-4 py-3 font-semibold">User level</th><th className="px-4 py-3 font-semibold">WPM typing speed average</th></tr></thead>
              <tbody>{article.table.map((row) => <tr key={row.level} className="border-t border-slate-200 dark:border-slate-800"><td className="px-4 py-3">{row.level}</td><td className="px-4 py-3">{row.wpm}</td></tr>)}</tbody>
            </table>
          </div>
        </section>
      )}
      {article.faqs && (
        <section>
          <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">Frequently asked questions</h2>
          <div className="space-y-4">{article.faqs.map((faq) => <div key={faq.question}><h3 className="font-bold text-slate-900 dark:text-white">{faq.question}</h3><p>{faq.answer}</p></div>)}</div>
        </section>
      )}
      {article.relatedLinks && (
        <nav aria-label="Related TypePulse resources" className="rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-950/40">
          <h2 className="font-bold text-slate-900 dark:text-white">Continue practicing</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">{article.relatedLinks.map((link) => <li key={link.href}><Link href={link.href} className="font-semibold text-indigo-600 hover:underline">{link.label}</Link></li>)}</ul>
        </nav>
      )}
      <div className="rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-950/40">
        <p className="font-semibold text-slate-900 dark:text-white">Ready to practice?</p>
        <Link href="/typing-test" className="mt-3 inline-block font-semibold text-indigo-600">Take a free typing test →</Link>
      </div>
    </InfoPage>
  );
}
