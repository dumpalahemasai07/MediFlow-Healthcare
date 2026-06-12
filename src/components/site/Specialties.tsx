import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity, Baby, Bone, Brain, Ear, Eye, Flower2, HeartPulse,
  Microscope, Smile, Sparkles, Stethoscope,
} from "lucide-react";
import { specialties } from "@/lib/mockData";

const iconMap: Record<string, typeof HeartPulse> = {
  HeartPulse, Brain, Bone, Baby, Eye, Sparkles, Flower2, Microscope,
  Stethoscope, Smile, Ear, Activity,
};

export function Specialties() {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            Specialties
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">Care across every department</h2>
          <p className="mt-3 text-muted-foreground">
            From routine check‑ups to complex surgeries — connect with board‑certified specialists in seconds.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {specialties.map(({ icon, name, count, slug }, i) => {
            const Icon = iconMap[icon] ?? Stethoscope;
            return (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.05 }}
              >
                <Link
                  to="/doctors"
                  search={{ specialty: name }}
                  className="block group rounded-2xl border border-border bg-card p-6 hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary-soft text-primary grid place-items-center mb-4 group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="font-semibold">{name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{count} specialists</div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
