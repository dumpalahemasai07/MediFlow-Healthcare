import { Apple, Smartphone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import appImg from "@/assets/app-mockup.jpg";

const features = [
  "Book appointments in 30 seconds",
  "Video consults with HD quality",
  "Encrypted medical records",
  "Real-time prescription refills",
];

export function MobileApp() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="text-xs font-semibold tracking-widest uppercase text-primary">
            MediFlow Mobile
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Your hospital in your pocket
          </h2>
          <p className="text-muted-foreground max-w-lg">
            Get reminders, prescription refills, lab results and video consults — wherever you are.
            Trusted by 5M+ patients on iOS and Android.
          </p>
          <ul className="space-y-2.5">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm">
                <span className="h-5 w-5 rounded-full bg-success/15 text-success grid place-items-center">
                  <Check className="h-3 w-3" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
              <Apple className="h-4 w-4" /> App Store
            </Button>
            <Button size="lg" variant="outline">
              <Smartphone className="h-4 w-4" /> Google Play
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-primary blur-3xl opacity-20 rounded-full" />
          <img
            src={appImg}
            alt="MediFlow mobile app"
            className="relative rounded-3xl shadow-elevated border border-border w-full"
          />
        </div>
      </div>
    </section>
  );
}
