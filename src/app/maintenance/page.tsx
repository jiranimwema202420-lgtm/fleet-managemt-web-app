"use client";

import { MaintenancePanel } from "@/components/maintenance-panel";
import { fleetRecords } from "@/data/fleet-data";
import { getMaintenanceAlerts } from "@/lib/fleet-functions";
import { useFleetApi } from "@/lib/use-fleet-api";
import type { FleetVehicleRecord } from "@/types/fleet";

export default function MaintenancePage() {
  const fallback = getMaintenanceAlerts(fleetRecords);
  const { data: alerts, loading, error } = useFleetApi<FleetVehicleRecord[]>("/api/maintenance", fallback);

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl p-6 md:p-10">
      <h1 className="text-3xl font-semibold text-white">Maintenance</h1>
      <p className="mt-2 text-slate-400">Track vehicles requiring service attention and risk follow-up.</p>

      {loading && <p className="mt-4 text-sm text-slate-400">Loading maintenance alerts...</p>}
      {error && <p className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">{error}</p>}

      <section className="mt-6">
        <MaintenancePanel records={alerts} />
      </section>
    </main>
  );
}
