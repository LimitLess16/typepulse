import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TypePulse - Free Online Typing Test",
    template: "%s | TypePulse",
  },
  description:
    "Take a free online typing test and measure your typing speed, WPM, accuracy and errors. Practice typing and improve your speed with TypePulse.",
  keywords: [
    "typing test",
    "typing speed test",
    "typing test online",
    "free typing test",
    "typing practice",
    "WPM test",
  ],
  authors: [{ name: "TypePulse" }],
  creator: "TypePulse",
  openGraph: {
    title: "TypePulse - Free Online Typing Test",
    description:
      "Test your typing speed, accuracy and WPM with TypePulse.",
    type: "website",
    siteName: "TypePulse",
  },
  robots: {
    index: true,
    follow: true,
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
        {children}
      </body>
    </html>
  );
}