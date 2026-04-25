import { insurancePolicies, operatingCosts, payrollDisbursements } from "@/lib/finance-data";

export default function FinancePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl p-6 md:p-10">
      <h1 className="text-3xl font-semibold text-white">Compliance & Ledgers</h1>
      <p className="mt-2 text-slate-400">Operating costs, payroll controls, and asset protection visibility.</p>

      <section className="mt-6 grid gap-4 xl:grid-cols-3">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-semibold text-white">Operating Costs</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {operatingCosts.map((item) => (
              <li key={item.category} className="flex items-center justify-between">
                <span>{item.category}</span>
                <span>${item.amount.toLocaleString("en-US")}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-semibold text-white">Payroll Control</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {payrollDisbursements.map((item) => (
              <li key={item.person} className="rounded border border-slate-800 p-2">
                <p className="font-medium text-slate-100">{item.person}</p>
                <p>
                  {item.role} • ${item.amount.toLocaleString("en-US")} • {item.status}
                </p>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-semibold text-white">Asset Protection</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {insurancePolicies.map((item) => (
              <li key={item.policy} className="rounded border border-slate-800 p-2">
                <p className="font-medium text-slate-100">{item.carrier}</p>
                <p>
                  {item.policy} • Renewal {item.renewal}
                </p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
