import { DataTable } from "@/components/data-table";
import { StatCard } from "@/components/stat-card";

const stats = [
  { title: "Active Vehicles", value: "128", delta: "+6% vs last week", positive: true },
  { title: "On-Time Deliveries", value: "97.4%", delta: "+1.2% this month", positive: true },
  { title: "Fuel Efficiency", value: "24.8 mpg", delta: "-0.6 mpg today", positive: false },
  { title: "Open Maintenance", value: "14", delta: "3 critical alerts", positive: false },
];

const vehicles = [
  { vehicle: "Truck FL-204", driver: "A. Walker", status: "In Transit", route: "Dallas → Austin", eta: "10:15 AM" },
  { vehicle: "Van FL-188", driver: "J. Kim", status: "Idle", route: "Houston Hub", eta: "Awaiting assignment" },
  {
    vehicle: "Truck FL-176",
    driver: "M. Rivera",
    status: "Maintenance",
    route: "San Antonio Depot",
    eta: "Back by 2:30 PM",
  },
  { vehicle: "Van FL-199", driver: "R. Patel", status: "In Transit", route: "Fort Worth → Waco", eta: "11:05 AM" },
] as const;

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 p-6 md:p-10">
      <header className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-gradient-to-r from-primary/20 via-slate-900 to-accent/20 p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-accent">FleetPulse Platform</p>
        <h1 className="text-3xl font-semibold text-white md:text-4xl">Fleet Management Web App</h1>
        <p className="max-w-3xl text-slate-300">
          Monitor vehicle health, dispatch status, and route performance in real time with a fast Next.js + React + Tailwind dashboard.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      <DataTable records={[...vehicles]} />
    </main>
  );
}
