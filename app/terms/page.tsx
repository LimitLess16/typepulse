import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the TypePulse terms of service for using our typing platform.",
};

export default function TermsPage() {
  return (
    <InfoPage eyebrow="Terms of Service" title="Terms for using TypePulse.">
      <p>By using TypePulse, you agree to use the service lawfully and respectfully. TypePulse is provided as a typing practice and measurement tool.</p>
      <p>Typing scores and statistics are estimates intended for practice. We do not guarantee a particular result, ranking, availability level, or improvement outcome.</p>
      <p>You are responsible for keeping your account credentials secure and for activity performed through your account. Do not attempt to disrupt, abuse, or misuse the service.</p>
      <p>We may update, suspend, or discontinue features when necessary to operate and improve TypePulse.</p>
      <p>Questions about these terms can be sent to contact@typepulse.app.</p>
    </InfoPage>
  );
}
