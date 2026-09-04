import Link from "next/link";
import type { Metadata } from "next";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SiteFooter } from "@/components/SiteFooter";
import { AdUnit } from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Free Online Typing Speed Test | TypePulse",
  description:
    "Take a free online typing speed test and improve your typing skills. Measure WPM, accuracy, and typing performance instantly with TypePulse.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Free Online Typing Speed Test | TypePulse",
    description:
      "Take a free online typing speed test and improve your typing skills. Measure WPM, accuracy, and typing performance instantly with TypePulse.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Free Online Typing Speed Test | TypePulse",
    description:
      "Take a free online typing speed test and improve your typing skills with TypePulse.",
  },
};

const faqs = [
  ["What is a typing speed test?", "A typing speed test measures how quickly and accurately you type a passage, usually as words per minute (WPM)."],
  ["How is WPM calculated?", "WPM is calculated from the number of correct characters typed, using five characters as one standard word, divided by the time in minutes."],
  ["Is TypePulse free?", "Yes. TypePulse is a free online typing test and practice tool with optional account features for saving results."],
  ["How can I improve my typing speed?", "Practice regularly, focus on accuracy, use proper finger placement, and review your results to target recurring mistakes."],
  ["What is considered a good typing speed?", "Around 40 to 60 WPM is a useful everyday range. A good score depends on your goals, accuracy, and consistency."],
];

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TypePulse",
    url: "https://typepulse-umber.vercel.app/",
    description: metadata.description,
  };
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "TypePulse Typing Speed Test",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    url: "https://typepulse-umber.vercel.app/typing-test",
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
      <AdUnit />
      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <p className="font-semibold uppercase tracking-widest text-indigo-600">Free typing practice</p>
        <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-6xl">Free online typing speed test for better skills.</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
          Take an online typing test free, choose a one, two, or three-minute challenge, and see your WPM and accuracy instantly.
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
      <section className="mx-auto max-w-6xl space-y-12 px-6 pb-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">What is a typing speed test?</h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">A typing speed test measures your words per minute and accuracy while you type real text. TypePulse gives instant feedback so you can understand your performance and build better typing habits.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">How to improve typing speed</h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">Practice in short, regular sessions. Keep your eyes on the text, use consistent finger placement, and prioritize typing accuracy before increasing your pace. <Link href="/blog/how-to-improve-typing-speed" className="font-semibold text-indigo-600 hover:underline">Read our improvement guide.</Link></p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Benefits of online typing practice</h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">Regular typing practice can make schoolwork, professional writing, coding, and everyday communication more comfortable. Saved results help students and professionals track steady progress.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">What is a good WPM score?</h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">Many people aim for 40 to 60 WPM for everyday work, but accuracy and consistency matter as much as speed. <Link href="/blog/what-is-a-good-wpm" className="font-semibold text-indigo-600 hover:underline">Explore WPM benchmarks.</Link></p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Free typing test for students and professionals</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600 dark:text-slate-400">Whether you are preparing assignments, writing reports, learning touch typing, or improving workplace efficiency, TypePulse offers a focused typing accuracy test and WPM test on desktop and mobile.</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Frequently asked questions</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {faqs.map(([question, answer]) => <div key={question} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"><h3 className="font-bold">{question}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{answer}</p></div>)}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
