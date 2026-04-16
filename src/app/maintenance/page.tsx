import { MaintenancePanel } from "@/components/maintenance-panel";
import { fleetRecords } from "@/data/fleet-data";

export default function MaintenancePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl p-6 md:p-10">
      <h1 className="text-3xl font-semibold text-white">Maintenance</h1>
      <p className="mt-2 text-slate-400">Track vehicles requiring service attention and risk follow-up.</p>

      <section className="mt-6">
        <MaintenancePanel records={fleetRecords} />
      </section>
    </main>
  );
}
