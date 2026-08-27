import type { Metadata } from "next";
import SeoLanding from "../seo-landing";

export const metadata: Metadata = {
  title: "2 Minute Typing Test | Free Typing Practice",
  description: "Improve your typing speed with a free two-minute typing test and track your WPM and accuracy.",
  alternates: { canonical: "/2-minute-test" },
};

export default function TwoMinuteTestPage() {
  return <SeoLanding eyebrow="2-minute typing test" title="Build typing stamina in two minutes" description="Practice at a steady pace with a two-minute test designed to help you improve consistency and accuracy." duration="2 minutes" />;
}
