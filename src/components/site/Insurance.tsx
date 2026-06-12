import { insurancePartners } from "@/lib/mockData";

export function Insurance() {
  return (
    <section className="py-14 bg-surface/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
          Insurance partners — cashless treatment accepted
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {insurancePartners.map((name) => (
            <div
              key={name}
              className="h-14 rounded-xl border border-border bg-card grid place-items-center text-sm font-bold text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
