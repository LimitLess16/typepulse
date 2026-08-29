import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "About TypePulse",
  description: "Learn about TypePulse and our free online typing practice tools.",
};

export default function AboutPage() {
  return (
    <InfoPage eyebrow="About TypePulse" title="Build typing confidence, one session at a time.">
      <p>TypePulse is a free online typing practice platform designed to help you measure speed, accuracy, and improvement.</p>
      <p>Our typing tests provide live feedback and practical statistics, including words per minute, accuracy, mistakes, and saved progress for signed-in users.</p>
      <p>We are building TypePulse to make focused typing practice simple, accessible, and useful on desktop and mobile devices.</p>
    </InfoPage>
  );
}
