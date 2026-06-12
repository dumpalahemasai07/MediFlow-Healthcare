import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Building2, CheckCircle2, GraduationCap, Languages, MapPin, MessageSquare, Star, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { getDoctorById, reviews, type Doctor } from "@/lib/mockData";

export const Route = createFileRoute("/doctors/$id")({
  loader: ({ params }) => {
    const doctor = getDoctorById(params.id);
    if (!doctor) throw notFound();
    return { doctor };
  },
  head: ({ loaderData }) => ({
    meta: loaderData?.doctor ? [
      { title: `${loaderData.doctor.name} — ${loaderData.doctor.specialty} | MediFlow` },
      { name: "description", content: loaderData.doctor.about.slice(0, 155) },
      { property: "og:title", content: `${loaderData.doctor.name} — ${loaderData.doctor.specialty}` },
      { property: "og:description", content: loaderData.doctor.about.slice(0, 155) },
      { property: "og:image", content: loaderData.doctor.image },
    ] : [],
  }),
  component: DoctorDetail,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Doctor not found</h1>
        <Button asChild className="mt-4"><Link to="/doctors">Browse doctors</Link></Button>
      </div>
    </div>
  ),
  errorComponent: () => <div className="p-8 text-center">Something went wrong loading this profile.</div>,
});

function DoctorDetail() {
  const { doctor: d } = Route.useLoaderData() as { doctor: Doctor };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24">
        {/* Profile header */}
        <section className="bg-gradient-hero border-b border-border py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[200px_1fr_auto] gap-6 items-center">
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              src={d.image}
              alt={d.name}
              className="h-40 w-40 lg:h-48 lg:w-48 rounded-3xl object-cover shadow-elevated border-4 border-card"
            />
            <div className="min-w-0 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl sm:text-4xl font-bold">{d.name}</h1>
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-primary-soft text-primary border-0">{d.specialty}</Badge>
                <span className="text-sm text-muted-foreground">{d.qualification}</span>
                <span className="text-sm text-muted-foreground">· {d.experience} years experience</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Building2 className="h-4 w-4" /> {d.hospital}</span>
                <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {d.city}</span>
                <span className="inline-flex items-center gap-1"><Languages className="h-4 w-4" /> {d.languages.join(", ")}</span>
              </div>
              <div className="inline-flex items-center gap-1 text-sm font-semibold">
                <Star className="h-4 w-4 fill-warning text-warning" /> {d.rating}
                <span className="text-muted-foreground font-normal">({d.reviews} patient reviews)</span>
              </div>
            </div>
            <div className="rounded-2xl bg-card border border-border p-5 shadow-elevated min-w-[240px]">
              <div className="text-xs text-muted-foreground">Consultation fee</div>
              <div className="text-3xl font-bold">${d.fee}</div>
              <div className={`mt-1 text-xs font-semibold ${d.available ? "text-success" : "text-muted-foreground"}`}>
                {d.available ? `Available ${d.nextSlot}` : `Next: ${d.nextSlot}`}
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <Button asChild className="bg-gradient-primary">
                  <Link to="/book/$doctorId" params={{ doctorId: d.id }}>Book appointment</Link>
                </Button>
                <Button variant="outline"><Video className="h-4 w-4" /> Video consult</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_320px] gap-10">
            <Tabs defaultValue="about" className="space-y-6">
              <TabsList className="bg-muted">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="awards">Awards</TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="space-y-4">
                <h2 className="text-xl font-bold">About Dr. {d.name.replace(/^Dr\.\s*/, "")}</h2>
                <p className="text-muted-foreground leading-relaxed">{d.about}</p>
                <div className="grid sm:grid-cols-3 gap-3 pt-2">
                  {[
                    { l: "Experience", v: `${d.experience} years` },
                    { l: "Patients treated", v: `${(d.reviews * 12).toLocaleString()}+` },
                    { l: "Satisfaction", v: `${Math.round(d.rating * 19)}%` },
                  ].map((s) => (
                    <div key={s.l} className="rounded-2xl border border-border bg-card p-4">
                      <div className="text-xs text-muted-foreground">{s.l}</div>
                      <div className="text-xl font-bold mt-1">{s.v}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="education" className="space-y-3">
                {d.education.map((e) => (
                  <div key={e.degree} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-primary-soft text-primary grid place-items-center">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold">{e.degree}</div>
                      <div className="text-sm text-muted-foreground">{e.institute} · {e.year}</div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="reviews" className="space-y-3">
                {reviews.map((r) => (
                  <div key={r.id} className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground text-xs font-bold">
                          {r.patient[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{r.patient}</div>
                          <div className="text-xs text-muted-foreground">{r.when}</div>
                        </div>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-warning text-warning" : "text-muted"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">{r.text}</p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="awards" className="space-y-3">
                {d.awards.map((a) => (
                  <div key={a} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-warning/15 text-warning grid place-items-center">
                      <Award className="h-5 w-5" />
                    </div>
                    <div className="font-medium">{a}</div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>

            <aside className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="font-semibold mb-3">Quick actions</div>
                <div className="flex flex-col gap-2">
                  <Button asChild className="bg-gradient-primary">
                    <Link to="/book/$doctorId" params={{ doctorId: d.id }}>Book in-clinic</Link>
                  </Button>
                  <Button variant="outline"><Video className="h-4 w-4" /> Video consultation</Button>
                  <Button variant="outline"><MessageSquare className="h-4 w-4" /> Message</Button>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
                <div className="font-semibold">Languages spoken</div>
                <div className="flex flex-wrap gap-2">
                  {d.languages.map((l) => <Badge key={l} variant="secondary">{l}</Badge>)}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
