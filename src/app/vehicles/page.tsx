import { DataTable } from "@/components/data-table";
import { fleetRecords } from "@/data/fleet-data";

export default function VehiclesPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 p-6 md:p-10">
      <header>
        <h1 className="text-3xl font-semibold text-white">Vehicles</h1>
        <p className="mt-2 text-slate-400">Full vehicle inventory with live status, route and telemetry details.</p>
      </header>
      <DataTable records={fleetRecords} />
    </main>
  );
}
