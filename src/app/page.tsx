"use client";

import { FleetDashboard } from "@/components/fleet-dashboard";
import { fleetRecords } from "@/data/fleet-data";
import { useFleetApi } from "@/lib/use-fleet-api";
import type { FleetVehicleRecord } from "@/types/fleet";

export default function Home() {
  const { data, loading, error } = useFleetApi<FleetVehicleRecord[]>("/api/vehicles", fleetRecords);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 p-6 md:p-10">
      <header className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-gradient-to-r from-primary/20 via-slate-900 to-accent/20 p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-accent">Opulent FleetPro</p>
        <h1 className="text-3xl font-semibold text-white md:text-4xl">Command & Control Center</h1>
        <p className="max-w-3xl text-slate-300">
          Monitor vehicle health, dispatch status, and route performance in real time with filtering and operational KPIs.
        </p>
      </header>

      {loading && <p className="text-sm text-slate-400">Loading fleet data...</p>}
      {error && <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">{error}</p>}

      <FleetDashboard records={data} />
    </main>
  );
}
