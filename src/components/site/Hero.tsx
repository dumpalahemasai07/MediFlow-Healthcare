import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarCheck, PhoneCall, Search, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImg from "@/assets/hero-doctor.jpg";

export function Hero() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  return (
    <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 -left-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-3 py-1.5 text-xs font-medium shadow-soft">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span>NABH accredited • HIPAA compliant</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
            Your health,{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              one tap away.
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl">
            Book trusted specialists, store every prescription, and meet your doctor by
            video — all inside one secure medical record.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/doctors", search: { q } });
            }}
            className="rounded-2xl bg-card shadow-elevated border border-border p-3 flex flex-col sm:flex-row gap-2 max-w-xl"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search doctors, specialties, hospitals"
                className="pl-9 border-0 shadow-none focus-visible:ring-0 h-11"
              />
            </div>
            <Button type="submit" size="lg" className="bg-gradient-primary shadow-soft">
              Find care
            </Button>
          </form>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-card bg-gradient-primary"
                  />
                ))}
              </div>
              <div>
                <div className="font-semibold">120k+ patients</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Star className="h-3 w-3 fill-warning text-warning" /> 4.9 average rating
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-border bg-card">
            <img
              src={heroImg}
              alt="MediFlow doctor ready to consult"
              width={1280}
              height={1280}
              className="w-full h-full object-cover aspect-[4/5]"
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/80 to-transparent" />
          </div>

          <div className="absolute -left-4 top-10 sm:-left-8 bg-card rounded-2xl shadow-elevated border border-border p-4 flex items-center gap-3 animate-fade-in">
            <div className="h-10 w-10 rounded-xl grid place-items-center bg-success/15 text-success">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Next appointment</div>
              <div className="font-semibold text-sm">Today · 4:30 PM</div>
            </div>
          </div>

          <div className="absolute -right-4 bottom-12 sm:-right-8 bg-card rounded-2xl shadow-elevated border border-border p-4 flex items-center gap-3 animate-fade-in">
            <div className="h-10 w-10 rounded-xl grid place-items-center bg-primary/15 text-primary">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">24/7 Emergency</div>
              <div className="font-semibold text-sm">+1 415 555 0117</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
