import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TypePulse",
  description: "Track your typing speed and accuracy with TypePulse.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://typepulse.app"),
  keywords: ["typing test", "WPM test", "typing speed test", "typing practice", "words per minute"],
  openGraph: {
    title: "TypePulse | Free Typing Tests and Practice",
    description: "Measure your typing speed, improve accuracy, and track your progress for free.",
    type: "website",
    siteName: "TypePulse",
  },
  twitter: {
    card: "summary",
    title: "TypePulse | Free Typing Tests and Practice",
    description: "Measure your typing speed, improve accuracy, and track your progress for free.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
