import type { Metadata } from "next";
import SeoLanding from "../seo-landing";

export const metadata: Metadata = {
  title: "1 Minute Typing Test | Free WPM Test",
  description: "Take a free one-minute typing test to measure your WPM, accuracy, and typing consistency.",
  alternates: { canonical: "/1-minute-test" },
};

export default function OneMinuteTestPage() {
  return <SeoLanding eyebrow="1-minute typing test" title="How fast can you type in one minute?" description="Use a one-minute typing test for a quick, reliable snapshot of your typing speed and accuracy." duration="1 minute" />;
}
