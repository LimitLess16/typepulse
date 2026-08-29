import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Contact TypePulse",
  description: "Contact the TypePulse team with questions, feedback, or support requests.",
};

export default function ContactPage() {
  return (
    <InfoPage eyebrow="Contact" title="We would love to hear from you.">
      <p>Have a question, found a problem, or have an idea for improving TypePulse? Send us a message and include as much detail as possible.</p>
      <p>
        Email us at{" "}
        <a className="font-semibold text-indigo-600 hover:underline" href="mailto:contact@typepulse.app">contact@typepulse.app</a>.
      </p>
      <p>For account or saved-result issues, please include the email address associated with your TypePulse account. Never send your password.</p>
    </InfoPage>
  );
}
