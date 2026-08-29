import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-8 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} TypePulse. Free online typing tests and practice for everyone.</p>
        <nav className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/blog" className="hover:text-indigo-600">Typing guides</Link>
          <Link href="/about" className="hover:text-indigo-600">About</Link>
          <Link href="/contact" className="hover:text-indigo-600">Contact</Link>
          <Link href="/privacy" className="hover:text-indigo-600">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-indigo-600">Terms of Service</Link>
        </nav>
      </div>
    </footer>
  );
}
