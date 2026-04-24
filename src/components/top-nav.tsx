import Link from "next/link";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/intelligence", label: "Intelligence" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/drivers", label: "Drivers" },
  { href: "/maintenance", label: "Maintenance" },
  { href: "/finance", label: "Finance" },
  { href: "/onboarding", label: "Onboarding" },
];

export function TopNav() {
  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-5 text-sm text-slate-300">
        <span className="font-semibold text-white">Opulent FleetPro</span>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="rounded px-2 py-1 transition hover:bg-slate-800 hover:text-white">
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
