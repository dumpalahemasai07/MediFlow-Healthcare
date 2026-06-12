import { Ambulance, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Emergency() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl p-8 lg:p-12 bg-destructive text-destructive-foreground shadow-elevated">
          <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-6 justify-between">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 shrink-0 rounded-2xl bg-white/15 grid place-items-center">
                <Ambulance className="h-7 w-7" />
              </div>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-widest opacity-80">24×7 Emergency</div>
                <h3 className="text-2xl lg:text-3xl font-bold mt-1">Ambulance at your doorstep in 15 minutes</h3>
                <p className="opacity-90 text-sm mt-1">GPS-tracked ICU ambulances available across 60+ cities.</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button size="lg" variant="secondary" className="font-semibold">
                <PhoneCall className="h-4 w-4" /> Call 1-800-MEDIFLOW
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
