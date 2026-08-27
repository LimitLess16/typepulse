import type { Metadata } from "next";
import TypingTestClient from "./typing-test-client";

export const metadata: Metadata = {
  title: "Free Typing Test | Measure Your WPM and Accuracy",
  description: "Take a free online typing test with TypePulse and measure your words per minute and typing accuracy.",
  alternates: { canonical: "/typing-test" },
};

export default function TypingTestPage() {
  return <TypingTestClient />;
}
