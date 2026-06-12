import { Link } from "@tanstack/react-router";
import { CheckCircle2, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { doctors } from "@/lib/mockData";

export function Doctors() {
  const featured = doctors.slice(0, 8);
  return (
    <section id="doctors" className="py-20 lg:py-28 bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              Meet our specialists
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Top‑rated doctors, ready today
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/doctors">See all doctors</Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((d, i) => (
            <motion.article
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.06, duration: 0.4 }}
              className="group rounded-2xl bg-card border border-border overflow-hidden shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
            >
              <Link to="/doctors/$id" params={{ id: d.id }} className="block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={d.image}
                    alt={d.name}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-card/90 backdrop-blur px-2 py-1 text-xs font-medium">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    {d.rating}
                  </div>
                  <div
                    className={`absolute top-3 right-3 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                      d.available ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {d.available ? "Available" : "Tomorrow"}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold truncate">{d.name}</h3>
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  </div>
                  <div className="text-sm text-primary font-medium">{d.specialty}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {d.qualification} · {d.experience} yrs
                  </div>
                </div>
              </Link>
              <div className="px-5 pb-5 flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">Consultation</div>
                  <div className="font-bold">${d.fee}</div>
                </div>
                <Button asChild size="sm" className="bg-gradient-primary">
                  <Link to="/book/$doctorId" params={{ doctorId: d.id }}>Book</Link>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
