"use client";

import { useEffect, useState } from "react";
import { AddVehicleForm } from "@/components/add-vehicle-form";
import { DataTable } from "@/components/data-table";
import { fleetRecords } from "@/data/fleet-data";
import { useFleetApi } from "@/lib/use-fleet-api";
import type { FleetVehicleRecord } from "@/types/fleet";

export default function VehiclesPage() {
  const { data, loading, error } = useFleetApi<FleetVehicleRecord[]>("/api/vehicles", fleetRecords);
  const [vehicles, setVehicles] = useState<FleetVehicleRecord[]>(fleetRecords);

  useEffect(() => {
    setVehicles(data);
  }, [data]);

  async function deleteVehicle(id: string) {
    const response = await fetch(`/api/vehicles/${id}`, { method: "DELETE" });
    if (response.ok) {
      setVehicles((current) => current.filter((record) => record.id !== id));
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 p-6 md:p-10">
      <header>
        <h1 className="text-3xl font-semibold text-white">Vehicles</h1>
        <p className="mt-2 text-slate-400">Full vehicle inventory with live status, route and telemetry details.</p>
      </header>

      <AddVehicleForm onVehicleAdded={(vehicle) => setVehicles((current) => [vehicle, ...current])} />

      {loading && <p className="text-sm text-slate-400">Loading vehicles...</p>}
      {error && <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">{error}</p>}

      <DataTable records={vehicles} />

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-lg font-semibold text-white">Quick Delete</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {vehicles.map((record) => (
            <button
              key={record.id}
              onClick={() => deleteVehicle(record.id)}
              className="rounded border border-rose-500/40 bg-rose-500/10 px-3 py-1 text-xs text-rose-200"
            >
              Remove {record.vehicle}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
