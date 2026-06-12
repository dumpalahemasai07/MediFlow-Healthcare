import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays } from "date-fns";
import { toast } from "sonner";
import {
  Building2, Calendar, CheckCircle2, ChevronLeft, ChevronRight, Clock, CreditCard,
  Lock, Mail, MessageSquare, ShieldCheck, Sun, Sunset, User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { getDoctorById, hospitals, generateSlots, type Doctor } from "@/lib/mockData";

export const Route = createFileRoute("/book/$doctorId")({
  loader: ({ params }) => {
    const doctor = getDoctorById(params.doctorId);
    if (!doctor) throw notFound();
    return { doctor };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Book ${loaderData?.doctor.name ?? "doctor"} — MediFlow` },
      { name: "description", content: "Complete your appointment booking in a few steps." },
    ],
  }),
  component: BookingPage,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center">
      <Button asChild><Link to="/doctors">Browse doctors</Link></Button>
    </div>
  ),
  errorComponent: () => <div className="p-8 text-center">Something went wrong.</div>,
});

const steps = ["Hospital", "Date", "Slot", "Details", "Payment", "Confirm"] as const;

function BookingPage() {
  const { doctor } = Route.useLoaderData() as { doctor: Doctor };
  const matchingHospitals = hospitals.filter((h) => h.city === doctor.city).length
    ? hospitals.filter((h) => h.city === doctor.city)
    : hospitals;

  const [step, setStep] = useState(0);
  const [hospitalId, setHospitalId] = useState<string>(matchingHospitals[0]?.id ?? hospitals[0].id);
  const [dateOffset, setDateOffset] = useState(0);
  const date = addDays(new Date(), dateOffset);
  const slots = generateSlots(date);
  const [slot, setSlot] = useState<string | null>(null);
  const [patient, setPatient] = useState({ name: "", email: "", phone: "", reason: "", gender: "male" });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [appointmentId] = useState(() => "MF-" + Math.random().toString(36).slice(2, 8).toUpperCase());

  const selectedHospital = hospitals.find((h) => h.id === hospitalId)!;

  const canNext = () => {
    if (step === 0) return !!hospitalId;
    if (step === 1) return dateOffset >= 0;
    if (step === 2) return !!slot;
    if (step === 3) return patient.name && patient.email && patient.phone;
    if (step === 4) return !!paymentMethod;
    return true;
  };

  const next = () => {
    if (!canNext()) return toast.error("Please complete this step first");
    if (step === 4) toast.success("Payment processed (demo)", { description: `Appointment ${appointmentId} confirmed` });
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Stepper */}
          <div className="mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {steps.map((label, i) => (
                <div key={label} className="flex items-center gap-2 shrink-0">
                  <div className={cn(
                    "h-8 w-8 rounded-full grid place-items-center text-xs font-bold transition-colors",
                    i < step ? "bg-success text-success-foreground" :
                    i === step ? "bg-gradient-primary text-primary-foreground shadow-glow" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                  </div>
                  <span className={cn("text-xs font-semibold whitespace-nowrap", i === step ? "text-foreground" : "text-muted-foreground")}>
                    {label}
                  </span>
                  {i < steps.length - 1 && <div className="w-6 h-px bg-border" />}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_340px] gap-8">
            {/* Step content */}
            <div className="rounded-3xl border border-border bg-card shadow-soft p-6 sm:p-8 min-h-[480px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {step === 0 && (
                    <>
                      <header>
                        <h2 className="text-2xl font-bold">Choose a hospital or clinic</h2>
                        <p className="text-muted-foreground text-sm">Pick the location convenient for you.</p>
                      </header>
                      <RadioGroup value={hospitalId} onValueChange={setHospitalId} className="space-y-3">
                        {matchingHospitals.map((h) => (
                          <label key={h.id} className={cn(
                            "flex items-start gap-4 rounded-2xl border-2 p-4 cursor-pointer transition-colors",
                            hospitalId === h.id ? "border-primary bg-primary-soft/40" : "border-border hover:border-primary/40"
                          )}>
                            <RadioGroupItem value={h.id} className="mt-1" />
                            <div className="h-12 w-12 rounded-xl bg-primary-soft text-primary grid place-items-center shrink-0">
                              <Building2 className="h-6 w-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold">{h.name}</div>
                              <div className="text-xs text-muted-foreground">{h.city} · {h.beds} beds · Est. {h.established}</div>
                            </div>
                          </label>
                        ))}
                      </RadioGroup>
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <header>
                        <h2 className="text-2xl font-bold">Select a date</h2>
                        <p className="text-muted-foreground text-sm">Choose from the next 14 days.</p>
                      </header>
                      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-2">
                        {Array.from({ length: 14 }).map((_, i) => {
                          const d = addDays(new Date(), i);
                          const active = i === dateOffset;
                          return (
                            <button
                              key={i}
                              onClick={() => setDateOffset(i)}
                              className={cn(
                                "rounded-2xl border p-3 text-center transition-all",
                                active ? "border-primary bg-primary text-primary-foreground shadow-glow" : "border-border bg-card hover:border-primary/40"
                              )}
                            >
                              <div className="text-[10px] uppercase tracking-wide opacity-80">{format(d, "EEE")}</div>
                              <div className="text-xl font-bold mt-1">{format(d, "d")}</div>
                              <div className="text-[10px] opacity-80">{format(d, "MMM")}</div>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <header>
                        <h2 className="text-2xl font-bold">Pick a time slot</h2>
                        <p className="text-muted-foreground text-sm">{format(date, "EEEE, MMMM d")} · Booked slots are disabled.</p>
                      </header>

                      <div className="space-y-5">
                        {(["morning", "evening"] as const).map((period) => (
                          <div key={period}>
                            <div className="flex items-center gap-2 mb-3 text-sm font-semibold">
                              {period === "morning" ? <Sun className="h-4 w-4 text-warning" /> : <Sunset className="h-4 w-4 text-primary" />}
                              {period === "morning" ? "Morning" : "Evening"}
                            </div>
                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                              {slots.filter((s) => s.period === period).map((s) => {
                                const active = slot === s.time;
                                return (
                                  <button
                                    key={s.time}
                                    disabled={s.booked}
                                    onClick={() => setSlot(s.time)}
                                    className={cn(
                                      "rounded-xl border p-2.5 text-sm font-semibold transition-all",
                                      s.booked && "bg-muted text-muted-foreground line-through cursor-not-allowed",
                                      !s.booked && active && "border-primary bg-primary text-primary-foreground shadow-glow",
                                      !s.booked && !active && "border-border bg-card hover:border-primary/40 hover:text-primary"
                                    )}
                                  >
                                    {s.time}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <header>
                        <h2 className="text-2xl font-bold">Patient details</h2>
                        <p className="text-muted-foreground text-sm">We'll send the appointment confirmation here.</p>
                      </header>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Full name</Label>
                          <Input value={patient.name} onChange={(e) => setPatient({ ...patient, name: e.target.value })} placeholder="Jane Doe" />
                        </div>
                        <div className="space-y-2">
                          <Label>Gender</Label>
                          <Select value={patient.gender} onValueChange={(v) => setPatient({ ...patient, gender: v })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input type="email" value={patient.email} onChange={(e) => setPatient({ ...patient, email: e.target.value })} placeholder="you@email.com" />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone</Label>
                          <Input value={patient.phone} onChange={(e) => setPatient({ ...patient, phone: e.target.value })} placeholder="+1 555 0117" />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label>Reason for visit (optional)</Label>
                          <Textarea value={patient.reason} onChange={(e) => setPatient({ ...patient, reason: e.target.value })} placeholder="Briefly describe your symptoms…" rows={3} />
                        </div>
                      </div>
                    </>
                  )}

                  {step === 4 && (
                    <>
                      <header>
                        <h2 className="text-2xl font-bold">Payment</h2>
                        <p className="text-muted-foreground text-sm">Secure payment · No charge if you cancel 24h before.</p>
                      </header>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                        {[
                          { id: "card", label: "Credit / Debit card", icon: CreditCard },
                          { id: "upi", label: "UPI / Net banking", icon: ShieldCheck },
                          { id: "clinic", label: "Pay at clinic", icon: Building2 },
                        ].map((p) => (
                          <label key={p.id} className={cn(
                            "flex items-center gap-3 rounded-2xl border-2 p-4 cursor-pointer transition-colors",
                            paymentMethod === p.id ? "border-primary bg-primary-soft/40" : "border-border hover:border-primary/40"
                          )}>
                            <RadioGroupItem value={p.id} />
                            <p.icon className="h-5 w-5 text-primary" />
                            <span className="font-medium">{p.label}</span>
                          </label>
                        ))}
                      </RadioGroup>
                      {paymentMethod === "card" && (
                        <div className="grid sm:grid-cols-2 gap-4 rounded-2xl border border-border bg-muted/40 p-5">
                          <div className="sm:col-span-2 space-y-2">
                            <Label>Card number</Label>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-9" placeholder="1234 5678 9012 3456" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Expiry</Label>
                            <Input placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <Label>CVV</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-9" placeholder="123" />
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {step === 5 && (
                    <div className="text-center space-y-5 py-6">
                      <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="mx-auto h-20 w-20 rounded-full bg-success/15 text-success grid place-items-center"
                      >
                        <CheckCircle2 className="h-10 w-10" />
                      </motion.div>
                      <div>
                        <h2 className="text-2xl font-bold">Appointment confirmed!</h2>
                        <p className="text-muted-foreground text-sm mt-1">A confirmation has been sent to {patient.email || "your email"}.</p>
                      </div>
                      <div className="inline-flex flex-col gap-2 rounded-2xl border border-border bg-muted/40 p-5 text-left">
                        <Badge variant="secondary" className="self-start">Appointment ID</Badge>
                        <div className="font-mono text-lg font-bold">{appointmentId}</div>
                        <div className="text-sm text-muted-foreground">
                          {doctor.name} · {selectedHospital.name}<br />
                          {format(date, "EEEE, MMMM d")} at {slot}
                        </div>
                      </div>
                      <div className="flex justify-center gap-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" /> Email sent</span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1"><MessageSquare className="h-3 w-3" /> SMS sent</span>
                      </div>
                      <div className="flex justify-center gap-2 pt-2">
                        <Button asChild variant="outline"><Link to="/doctors">Book another</Link></Button>
                        <Button asChild className="bg-gradient-primary"><Link to="/">Back to home</Link></Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {step < 5 && (
                <div className="mt-8 flex items-center justify-between">
                  <Button variant="ghost" onClick={back} disabled={step === 0}>
                    <ChevronLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button onClick={next} className="bg-gradient-primary">
                    {step === 4 ? "Pay $" + doctor.fee : "Continue"} <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Summary card */}
            <aside className="space-y-4">
              <div className="rounded-3xl border border-border bg-card shadow-soft p-5 space-y-4 lg:sticky lg:top-24">
                <div className="flex gap-3">
                  <img src={doctor.image} alt={doctor.name} className="h-16 w-16 rounded-2xl object-cover" />
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{doctor.name}</div>
                    <div className="text-xs text-primary">{doctor.specialty}</div>
                    <div className="text-xs text-muted-foreground">{doctor.qualification}</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm border-t border-border pt-4">
                  <div className="flex items-start gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground">Hospital</div>
                      <div className="font-medium">{selectedHospital.name}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground">Date</div>
                      <div className="font-medium">{format(date, "EEE, MMM d")}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground">Time</div>
                      <div className="font-medium">{slot ?? "—"}</div>
                    </div>
                  </div>
                  {patient.name && (
                    <div className="flex items-start gap-2">
                      <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-xs text-muted-foreground">Patient</div>
                        <div className="font-medium">{patient.name}</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="border-t border-border pt-4 space-y-1.5 text-sm">
                  <div className="flex justify-between text-muted-foreground"><span>Consultation</span><span>${doctor.fee}</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>Platform fee</span><span>$2</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>Taxes</span><span>$5</span></div>
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
                    <span>Total</span><span>${doctor.fee + 7}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground rounded-xl bg-success/10 p-3">
                  <ShieldCheck className="h-4 w-4 text-success shrink-0" />
                  Free cancellation up to 24 hours before your visit
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
