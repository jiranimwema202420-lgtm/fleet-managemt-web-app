"use client";

import { useState, type FormEvent } from "react";
import { DataTable } from "@/components/data-table";
import { fleetRecords } from "@/data/fleet-data";
import { useFleetApi } from "@/lib/use-fleet-api";
import type { FleetVehicleRecord, VehicleStatus } from "@/types/fleet";

const statusOptions: VehicleStatus[] = ["In Transit", "Idle", "Maintenance"];

export default function VehiclesPage() {
  const { data, loading, error } = useFleetApi<FleetVehicleRecord[]>("/api/vehicles", fleetRecords);
  const [form, setForm] = useState({
    vehicle: "",
    driver: "",
    status: "Idle" as VehicleStatus,
    route: "",
    eta: "",
  });
  const [submitting, setSubmitting] = useState(false);

  async function createVehicle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to create vehicle.");

      window.location.reload();
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteVehicle(id: string) {
    const response = await fetch(`/api/vehicles/${id}`, { method: "DELETE" });
    if (response.ok) {
      window.location.reload();
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 p-6 md:p-10">
      <header>
        <h1 className="text-3xl font-semibold text-white">Vehicles</h1>
        <p className="mt-2 text-slate-400">Full vehicle inventory with live status, route and telemetry details.</p>
      </header>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-lg font-semibold text-white">Add Vehicle</h2>
        <form onSubmit={createVehicle} className="mt-4 grid gap-3 md:grid-cols-5">
          <input
            required
            value={form.vehicle}
            onChange={(event) => setForm((prev) => ({ ...prev, vehicle: event.target.value }))}
            placeholder="Vehicle"
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          />
          <input
            required
            value={form.driver}
            onChange={(event) => setForm((prev) => ({ ...prev, driver: event.target.value }))}
            placeholder="Driver"
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          />
          <select
            value={form.status}
            onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value as VehicleStatus }))}
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            required
            value={form.route}
            onChange={(event) => setForm((prev) => ({ ...prev, route: event.target.value }))}
            placeholder="Route"
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          />
          <input
            required
            value={form.eta}
            onChange={(event) => setForm((prev) => ({ ...prev, eta: event.target.value }))}
            placeholder="ETA"
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {submitting ? "Adding..." : "Add Vehicle"}
          </button>
        </form>
      </section>

      {loading && <p className="text-sm text-slate-400">Loading vehicles...</p>}
      {error && <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">{error}</p>}

      <DataTable records={data} />

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-lg font-semibold text-white">Quick Delete</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {data.map((record) => (
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
