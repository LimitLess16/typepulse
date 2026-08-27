import type { Metadata } from "next";
import SeoLanding from "../seo-landing";

export const metadata: Metadata = {
  title: "Typing Practice Online | Improve Speed and Accuracy",
  description: "Practice typing online for free with TypePulse. Improve speed, accuracy, and consistency with progress tracking.",
  alternates: { canonical: "/typing-practice" },
};

export default function TypingPracticePage() {
  return <SeoLanding eyebrow="Typing practice" title="Practice typing and improve every day" description="Short, regular practice sessions can build speed without sacrificing accuracy. Start free and track your improvement with TypePulse." />;
}
