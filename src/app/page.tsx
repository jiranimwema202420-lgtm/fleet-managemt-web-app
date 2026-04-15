import { FleetDashboard } from "@/components/fleet-dashboard";
import { fleetRecords } from "@/data/fleet-data";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 p-6 md:p-10">
      <header className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-gradient-to-r from-primary/20 via-slate-900 to-accent/20 p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-accent">FleetPulse Platform</p>
        <h1 className="text-3xl font-semibold text-white md:text-4xl">Fleet Management Control Center</h1>
        <p className="max-w-3xl text-slate-300">
          Monitor vehicle health, dispatch status, and route performance in real time with filtering and operational KPIs.
        </p>
      </header>

      <FleetDashboard records={fleetRecords} />
    </main>
  );
}
