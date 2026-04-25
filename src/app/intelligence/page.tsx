const intelligenceCards = [
  {
    title: "Active Fleet Index",
    value: "128",
    hint: "Nodes currently in motion",
    tone: "text-emerald-300",
  },
  {
    title: "Maintenance Pressure",
    value: "14",
    hint: "Units requiring intervention",
    tone: "text-amber-300",
  },
  {
    title: "Executive Briefing",
    value: "Ready",
    hint: "Audio briefing can be generated",
    tone: "text-cyan-300",
  },
];

export default function IntelligencePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl p-6 md:p-10">
      <h1 className="text-3xl font-semibold text-white">Strategic Intelligence</h1>
      <p className="mt-2 text-slate-400">AI-guided executive insight board for operational and readiness signals.</p>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {intelligenceCards.map((card) => (
          <article key={card.title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-sm text-slate-400">{card.title}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{card.value}</p>
            <p className={`mt-2 text-sm ${card.tone}`}>{card.hint}</p>
          </article>
        ))}
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
