import { motion } from "framer-motion";
import { Users, Stethoscope, Building2, Star } from "lucide-react";

const stats = [
  { icon: Users, value: "5M+", label: "Patients served" },
  { icon: Stethoscope, value: "10K+", label: "Verified doctors" },
  { icon: Building2, value: "1,200+", label: "Partner hospitals" },
  { icon: Star, value: "4.9/5", label: "Avg. patient rating" },
];

export function Stats() {
  return (
    <section className="py-16 border-y border-border bg-gradient-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="h-12 w-12 shrink-0 rounded-2xl bg-primary-soft text-primary grid place-items-center">
              <s.icon className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
