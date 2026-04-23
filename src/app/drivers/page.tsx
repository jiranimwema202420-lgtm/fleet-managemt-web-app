"use client";

import { fleetRecords } from "@/data/fleet-data";
import { getDriverSummaries, type DriverSummary } from "@/lib/fleet-functions";
import { useFleetApi } from "@/lib/use-fleet-api";

export default function DriversPage() {
  const fallback = getDriverSummaries(fleetRecords);
  const { data: summaries, loading, error } = useFleetApi<DriverSummary[]>("/api/drivers", fallback);

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl p-6 md:p-10">
      <h1 className="text-3xl font-semibold text-white">Drivers</h1>
      <p className="mt-2 text-slate-400">Driver efficiency snapshot generated from current fleet assignments.</p>

      {loading && <p className="mt-4 text-sm text-slate-400">Loading driver summaries...</p>}
      {error && <p className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">{error}</p>}

      <section className="mt-6 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <table className="min-w-full text-left text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="px-4 py-2 font-medium">Driver</th>
              <th className="px-4 py-2 font-medium">Assigned Vehicles</th>
              <th className="px-4 py-2 font-medium">Avg Fuel</th>
              <th className="px-4 py-2 font-medium">Avg Utilization</th>
            </tr>
          </thead>
          <tbody>
            {summaries.map((driver) => (
              <tr key={driver.driver} className="border-t border-slate-800 text-slate-200">
                <td className="px-4 py-3 font-medium">{driver.driver}</td>
                <td className="px-4 py-3">{driver.vehicles}</td>
                <td className="px-4 py-3">{driver.avgFuel.toFixed(1)}%</td>
                <td className="px-4 py-3">{driver.avgUtilization.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
