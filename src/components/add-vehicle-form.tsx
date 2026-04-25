"use client";

import { useState, type FormEvent } from "react";
import type { FleetVehicleRecord, VehicleStatus } from "@/types/fleet";

const statusOptions: VehicleStatus[] = ["In Transit", "Idle", "Maintenance"];

type AddVehicleFormProps = {
  onVehicleAdded: (vehicle: FleetVehicleRecord) => void;
};

export function AddVehicleForm({ onVehicleAdded }: AddVehicleFormProps) {
  const [form, setForm] = useState({
    vehicle: "",
    driver: "",
    status: "Idle" as VehicleStatus,
    route: "",
    eta: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createVehicle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to create vehicle.");
      }

      const payload = (await response.json()) as { data: FleetVehicleRecord };
      onVehicleAdded(payload.data);
      setForm({ vehicle: "", driver: "", status: "Idle", route: "", eta: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add vehicle.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
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
        <button type="submit" disabled={submitting} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-60">
          {submitting ? "Adding..." : "Add Vehicle"}
        </button>
      </form>

      {error && <p className="mt-3 rounded border border-rose-500/30 bg-rose-500/10 p-2 text-xs text-rose-300">{error}</p>}
    </section>
  );
}
