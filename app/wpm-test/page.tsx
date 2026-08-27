import type { Metadata } from "next";
import SeoLanding from "../seo-landing";

export const metadata: Metadata = {
  title: "WPM Test | Check Your Words Per Minute",
  description: "Check your typing speed with a free WPM test. See words per minute and accuracy instantly with TypePulse.",
  alternates: { canonical: "/wpm-test" },
};

export default function WpmTestPage() {
  return <SeoLanding eyebrow="Words per minute test" title="Find your typing speed in WPM" description="Measure words per minute with a free typing speed test, then use your results to guide focused practice." />;
}
