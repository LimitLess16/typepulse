import Link from "next/link";

type DashboardNavProps = {
  links: Array<{ href: string; label: string }>;
};

export function DashboardNav({ links }: DashboardNavProps) {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          TypePulse
        </Link>
        <div className="flex gap-4 text-sm font-semibold text-slate-600">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
