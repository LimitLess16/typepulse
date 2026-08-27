import type { Metadata } from "next";
import SeoLanding from "../seo-landing";

export const metadata: Metadata = {
  title: "5 Minute Typing Test | Advanced WPM Practice",
  description: "Take a free five-minute typing test for a deeper measure of typing speed, accuracy, and endurance.",
  alternates: { canonical: "/5-minute-test" },
};

export default function FiveMinuteTestPage() {
  return <SeoLanding eyebrow="5-minute typing test" title="Challenge your typing endurance" description="A longer typing test helps reveal your sustainable speed. Practice for five minutes and work toward a more consistent WPM." duration="5 minutes" />;
}
