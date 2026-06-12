import { Clock, FileLock2, ShieldCheck, Sparkles, Video, Wallet } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified specialists",
    desc: "Every doctor is license-verified and continuously rated by real patients.",
  },
  {
    icon: Video,
    title: "Video consultations",
    desc: "Join HD video visits from your phone or laptop. No downloads, no waiting rooms.",
  },
  {
    icon: FileLock2,
    title: "Encrypted records",
    desc: "Your prescriptions, reports and scans live in one HIPAA-grade vault.",
  },
  {
    icon: Clock,
    title: "Same-day slots",
    desc: "Need care now? Filter for doctors with openings within the next hour.",
  },
  {
    icon: Wallet,
    title: "Transparent pricing",
    desc: "See every fee upfront. Insurance, FSA and HSA all supported.",
  },
  {
    icon: Sparkles,
    title: "AI symptom triage",
    desc: "Describe what you feel and we'll guide you to the right specialty.",
  },
];

export function WhyUs() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            Why MediFlow
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Healthcare built around you
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-gradient-card p-6 hover:shadow-elevated transition-shadow"
            >
              <div className="h-11 w-11 rounded-xl grid place-items-center bg-primary-soft text-primary mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-1.5">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
