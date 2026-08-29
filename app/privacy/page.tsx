import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the TypePulse privacy policy and learn how information is handled.",
};

export default function PrivacyPage() {
  return (
    <InfoPage eyebrow="Privacy Policy" title="Your privacy matters.">
      <p>TypePulse collects only the information needed to provide the service. If you create an account, Firebase Authentication stores your email address and securely manages sign-in.</p>
      <p>When signed-in users complete a test, we store typing results such as WPM, accuracy, mistakes, duration, and timestamps in Firestore to provide history and progress features.</p>
      <p>TypePulse may use Google AdSense, which can use cookies or similar technologies to serve and measure advertising in accordance with Google&apos;s policies.</p>
      <p>You can request help with your account or ask questions about your information by contacting us at contact@typepulse.app.</p>
      <p>This policy may be updated as TypePulse grows. The latest version will always be published on this page.</p>
    </InfoPage>
  );
}
