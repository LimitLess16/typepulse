import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

type DashboardNavProps = {
  links: Array<{ href: string; label: string }>;
};

export function DashboardNav({ links }: DashboardNavProps) {
  return (
    <nav className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          TypePulse
        </Link>
        <div className="flex items-center gap-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
