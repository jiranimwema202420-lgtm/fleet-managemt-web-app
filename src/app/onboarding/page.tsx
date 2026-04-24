const steps = [
  "Create your organization workspace and baseline fleet nodes.",
  "Register vehicles, attach insurance policies, and assign driver crews.",
  "Enable AI Operational Core and generate first Executive Briefing.",
  "Activate compliance alerts for service intervals and license expirations.",
];

export default function OnboardingPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl p-6 md:p-10">
      <h1 className="text-3xl font-semibold text-white">Onboarding Roadmap</h1>
      <p className="mt-2 text-slate-400">Cold-start launch guidance for new Opulent FleetPro environments.</p>

      <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <ol className="space-y-3 text-sm text-slate-300">
          {steps.map((step, index) => (
            <li key={step} className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/30 text-xs text-cyan-200">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
