type StatCardProps = {
  title: string;
  value: string;
  delta: string;
  positive?: boolean;
};

export function StatCard({ title, value, delta, positive = true }: StatCardProps) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/40">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
      <p className={`mt-2 text-sm ${positive ? "text-emerald-400" : "text-rose-400"}`}>{delta}</p>
    </article>
  );
}
