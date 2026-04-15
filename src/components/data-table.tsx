type VehicleRecord = {
  vehicle: string;
  driver: string;
  status: "In Transit" | "Idle" | "Maintenance";
  route: string;
  eta: string;
};

const statusClasses: Record<VehicleRecord["status"], string> = {
  "In Transit": "bg-emerald-500/20 text-emerald-300",
  Idle: "bg-amber-500/20 text-amber-300",
  Maintenance: "bg-rose-500/20 text-rose-300",
};

export function DataTable({ records }: { records: VehicleRecord[] }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="text-xl font-semibold text-white">Live Fleet Activity</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="px-4 py-2 font-medium">Vehicle</th>
              <th className="px-4 py-2 font-medium">Driver</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">Route</th>
              <th className="px-4 py-2 font-medium">ETA</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.vehicle} className="border-t border-slate-800 text-slate-200">
                <td className="px-4 py-3 font-medium">{record.vehicle}</td>
                <td className="px-4 py-3">{record.driver}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusClasses[record.status]}`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-4 py-3">{record.route}</td>
                <td className="px-4 py-3">{record.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
