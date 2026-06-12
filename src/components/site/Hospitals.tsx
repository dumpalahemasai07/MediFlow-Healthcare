import { Building2, MapPin, BedDouble } from "lucide-react";
import { hospitals } from "@/lib/mockData";
import hospitalImg from "@/assets/hospital-1.jpg";

export function Hospitals() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            Trusted hospitals
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            A nationwide network of accredited hospitals
          </h2>
          <p className="mt-3 text-muted-foreground">
            JCI, NABH and HIMSS Stage 7 accredited facilities — all bookable through MediFlow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {hospitals.map((h) => (
            <article
              key={h.id}
              className="group rounded-2xl overflow-hidden border border-border bg-card shadow-soft hover:shadow-elevated transition-all"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={hospitalImg}
                  alt={h.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold truncate">{h.name}</h3>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {h.city}</span>
                  <span className="inline-flex items-center gap-1"><BedDouble className="h-3 w-3" /> {h.beds} beds</span>
                  <span>Est. {h.established}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
