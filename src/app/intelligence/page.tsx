import { fleetRecords } from "@/data/fleet-data";
import { getFleetTotals } from "@/lib/fleet-functions";

export default function IntelligencePage() {
  const totals = getFleetTotals(fleetRecords);

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl p-6 md:p-10">
      <h1 className="text-3xl font-semibold text-white">Strategic Intelligence</h1>
      <p className="mt-2 text-slate-400">AI-guided executive insight board for operational and readiness signals.</p>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-sm text-slate-400">Active Fleet Index</p>
          <p className="mt-2 text-3xl font-semibold text-white">{totals.active}</p>
          <p className="mt-2 text-sm text-emerald-300">Nodes in-motion right now</p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-sm text-slate-400">Maintenance Pressure</p>
          <p className="mt-2 text-3xl font-semibold text-white">{totals.maintenance}</p>
          <p className="mt-2 text-sm text-amber-300">Units requiring immediate attention</p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-sm text-slate-400">AI Briefing Status</p>
          <p className="mt-2 text-3xl font-semibold text-white">Ready</p>
          <p className="mt-2 text-sm text-cyan-300">Executive audio summary can be generated</p>
        </article>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-xl font-semibold text-white">Cold Start Roadmap</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6 text-sm text-slate-300">
          <li>Ingest baseline asset registry (vehicles, crews, depots).</li>
          <li>Enable telemetry heartbeat and route anomaly alerting.</li>
          <li>Generate first executive briefing and KPI benchmark.</li>
        </ol>
      </section>
    </main>
  );
}
