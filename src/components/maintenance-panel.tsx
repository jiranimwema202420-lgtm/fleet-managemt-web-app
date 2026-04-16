import type { FleetVehicleRecord } from "@/types/fleet";

function daysUntil(dateString: string) {
  const now = new Date();
  const next = new Date(dateString);
  const ms = next.getTime() - now.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function MaintenancePanel({ records }: { records: FleetVehicleRecord[] }) {
  const alerts = records
    .filter((record) => record.status === "Maintenance" || record.fuelLevel < 40 || daysUntil(record.nextServiceDate) <= 14)
    .sort((a, b) => daysUntil(a.nextServiceDate) - daysUntil(b.nextServiceDate));

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/40">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Maintenance & Risk Alerts</h2>
        <span className="rounded-full bg-rose-500/20 px-3 py-1 text-xs font-medium text-rose-300">{alerts.length} alerts</span>
      </div>

      <ul className="mt-4 space-y-3">
        {alerts.length === 0 ? (
          <li className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-400">No active alerts.</li>
        ) : (
          alerts.map((vehicle) => (
            <li key={vehicle.vehicle} className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
              <p className="font-medium text-slate-100">{vehicle.vehicle}</p>
              <p className="mt-1 text-sm text-slate-400">
                Driver: {vehicle.driver} • Fuel: {vehicle.fuelLevel}% • Next Service: {vehicle.nextServiceDate}
              </p>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
