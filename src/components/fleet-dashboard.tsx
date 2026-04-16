"use client";

import { useMemo, useState } from "react";
import { DataTable } from "@/components/data-table";
import { MaintenancePanel } from "@/components/maintenance-panel";
import { StatCard } from "@/components/stat-card";
import { filterFleetRecords, getFleetTotals, type FleetSortBy, sortFleetRecords } from "@/lib/fleet-functions";
import type { FleetVehicleRecord, VehicleStatus } from "@/types/fleet";

const statuses: Array<VehicleStatus | "All"> = ["All", "In Transit", "Idle", "Maintenance"];

export function FleetDashboard({ records }: { records: FleetVehicleRecord[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<VehicleStatus | "All">("All");
  const [sortBy, setSortBy] = useState<FleetSortBy>("vehicle");

  const filteredRecords = useMemo(() => {
    const filtered = filterFleetRecords(records, query, status);
    return sortFleetRecords(filtered, sortBy);
  }, [query, records, sortBy, status]);

  const totals = useMemo(() => getFleetTotals(filteredRecords), [filteredRecords]);

  return (
    <>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Visible Vehicles" value={String(filteredRecords.length)} delta="Filtered fleet count" positive />
        <StatCard title="In Transit" value={String(totals.active)} delta="Vehicles currently moving" positive />
        <StatCard
          title="Maintenance"
          value={String(totals.maintenance)}
          delta={totals.maintenance > 0 ? "Requires attention" : "No active incidents"}
          positive={totals.maintenance === 0}
        />
        <StatCard
          title="Avg Fuel Level"
          value={`${totals.avgFuel.toFixed(1)}%`}
          delta={`Avg utilization ${totals.avgUtilization.toFixed(1)}%`}
          positive={totals.avgFuel >= 50}
        />
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/40">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Fleet Filters</h2>
            <p className="mt-1 text-sm text-slate-400">Search by vehicle, driver, or route and narrow by status.</p>
          </div>
          <div className="grid w-full gap-3 md:w-auto md:grid-cols-[minmax(260px,1fr)_180px_180px]">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search vehicle, driver, or route"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-accent/40 transition focus:ring-2"
            />
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as VehicleStatus | "All")}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-accent/40 transition focus:ring-2"
            >
              {statuses.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as FleetSortBy)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-accent/40 transition focus:ring-2"
            >
              <option value="vehicle">Sort: Vehicle</option>
              <option value="fuel-high">Fuel High → Low</option>
              <option value="fuel-low">Fuel Low → High</option>
              <option value="utilization-high">Utilization High → Low</option>
            </select>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <DataTable records={filteredRecords} />
        <MaintenancePanel records={filteredRecords} />
      </section>
    </>
  );
}
