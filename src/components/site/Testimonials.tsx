import { Quote, Star } from "lucide-react";

const items = [
  {
    name: "Priya N.",
    role: "Mother of two",
    text: "Booked a pediatrician at 8 AM, on a video call by 9. The prescription was in our records before lunch. Life-changing.",
  },
  {
    name: "Daniel R.",
    role: "Software engineer",
    text: "I've moved every report, scan and prescription into MediFlow. Seeing 6 years of history in one timeline is incredible.",
  },
  {
    name: "Aiko T.",
    role: "Marathon runner",
    text: "Orthopedist video consult, MRI booked in the same flow, results uploaded automatically. Felt premium end-to-end.",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            Patient stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            120,000 patients, one trusted platform
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl bg-card border border-border p-7 shadow-soft relative"
            >
              <Quote className="absolute top-5 right-5 h-8 w-8 text-primary/15" />
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-foreground/90">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-5 pt-5 border-t border-border">
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
