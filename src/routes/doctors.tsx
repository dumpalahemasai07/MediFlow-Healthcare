import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, MapPin, Search, Star, Stethoscope, Building2, Languages, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { doctors, specialties, cities, hospitals } from "@/lib/mockData";

const searchSchema = z.object({
  q: z.string().optional(),
  specialty: z.string().optional(),
  city: z.string().optional(),
});

export const Route = createFileRoute("/doctors")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Find doctors near you — MediFlow" },
      { name: "description", content: "Search and book verified specialists by specialty, city, language and experience." },
    ],
  }),
  component: DoctorsPage,
});

function DoctorsPage() {
  const search = Route.useSearch();
  const [query, setQuery] = useState(search.q ?? "");
  const [specialty, setSpecialty] = useState<string>(search.specialty ?? "all");
  const [city, setCity] = useState<string>(search.city ?? "all");
  const [language, setLanguage] = useState<string>("all");
  const [hospital, setHospital] = useState<string>("all");
  const [minExp, setMinExp] = useState<number>(0);
  const [sort, setSort] = useState<string>("rating");

  const allLanguages = Array.from(new Set(doctors.flatMap((d) => d.languages))).sort();

  const filtered = useMemo(() => {
    let list = doctors.filter((d) => {
      if (specialty !== "all" && d.specialty.toLowerCase() !== specialty.toLowerCase()) return false;
      if (city !== "all" && d.city !== city) return false;
      if (language !== "all" && !d.languages.includes(language)) return false;
      if (hospital !== "all" && d.hospital !== hospital) return false;
      if (d.experience < minExp) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !d.name.toLowerCase().includes(q) &&
          !d.specialty.toLowerCase().includes(q) &&
          !d.hospital.toLowerCase().includes(q) &&
          !d.about.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "experience") list = [...list].sort((a, b) => b.experience - a.experience);
    if (sort === "fee_low") list = [...list].sort((a, b) => a.fee - b.fee);
    if (sort === "fee_high") list = [...list].sort((a, b) => b.fee - a.fee);
    return list;
  }, [query, specialty, city, language, hospital, minExp, sort]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24">
        {/* Search header */}
        <section className="bg-gradient-hero border-b border-border py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-5">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Find your doctor</h1>
              <p className="text-muted-foreground mt-1">
                {filtered.length} verified specialists ready to consult
              </p>
            </div>
            <div className="rounded-2xl bg-card shadow-elevated border border-border p-3 grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Doctor, symptom, hospital…"
                  className="pl-9 border-0 shadow-none focus-visible:ring-0 h-11"
                />
              </div>
              <Select value={specialty} onValueChange={setSpecialty}>
                <SelectTrigger className="h-11 min-w-[160px] border-0 shadow-none"><SelectValue placeholder="Specialty" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All specialties</SelectItem>
                  {specialties.map((s) => (
                    <SelectItem key={s.slug} value={s.name}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="h-11 min-w-[140px] border-0 shadow-none"><SelectValue placeholder="City" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All cities</SelectItem>
                  {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button size="lg" className="bg-gradient-primary"><Search className="h-4 w-4" /> Search</Button>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Filters */}
            <aside className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
                <div className="flex items-center gap-2 font-semibold">
                  <Filter className="h-4 w-4 text-primary" /> Filters
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground">Hospital</label>
                  <Select value={hospital} onValueChange={setHospital}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All hospitals</SelectItem>
                      {hospitals.map((h) => <SelectItem key={h.id} value={h.name}>{h.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground">Language</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All languages</SelectItem>
                      {allLanguages.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-muted-foreground">Min experience</span>
                    <span className="font-semibold">{minExp}+ yrs</span>
                  </div>
                  <Slider value={[minExp]} onValueChange={(v) => setMinExp(v[0])} max={25} step={1} />
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => { setQuery(""); setSpecialty("all"); setCity("all"); setLanguage("all"); setHospital("all"); setMinExp(0); }}
                >
                  Reset filters
                </Button>
              </div>
            </aside>

            {/* Results */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">{filtered.length} results</div>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Top rated</SelectItem>
                    <SelectItem value="experience">Most experienced</SelectItem>
                    <SelectItem value="fee_low">Fee: low to high</SelectItem>
                    <SelectItem value="fee_high">Fee: high to low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
                  No doctors match these filters. Try resetting.
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map((d, i) => (
                    <motion.article
                      key={d.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elevated transition-all"
                    >
                      <div className="grid grid-cols-[96px_1fr] sm:grid-cols-[120px_1fr_auto] gap-5 items-start">
                        <Link to="/doctors/$id" params={{ id: d.id }} className="shrink-0">
                          <img
                            src={d.image}
                            alt={d.name}
                            loading="lazy"
                            className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover"
                          />
                        </Link>
                        <div className="min-w-0 space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <Link to="/doctors/$id" params={{ id: d.id }} className="font-semibold text-lg hover:text-primary">
                              {d.name}
                            </Link>
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <Badge variant="secondary" className="bg-primary-soft text-primary border-0">{d.specialty}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">{d.qualification} · {d.experience} yrs experience</div>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1"><Building2 className="h-3 w-3" /> {d.hospital}</span>
                            <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {d.city}</span>
                            <span className="inline-flex items-center gap-1"><Languages className="h-3 w-3" /> {d.languages.join(", ")}</span>
                          </div>
                          <div className="flex items-center gap-3 pt-1">
                            <div className="inline-flex items-center gap-1 text-sm font-semibold">
                              <Star className="h-4 w-4 fill-warning text-warning" /> {d.rating}
                              <span className="text-xs text-muted-foreground font-normal">({d.reviews} reviews)</span>
                            </div>
                            <span className="text-xs text-muted-foreground">·</span>
                            <span className={`text-xs font-semibold ${d.available ? "text-success" : "text-muted-foreground"}`}>
                              {d.available ? `Available ${d.nextSlot}` : `Next: ${d.nextSlot}`}
                            </span>
                          </div>
                        </div>
                        <div className="col-span-2 sm:col-span-1 flex sm:flex-col items-end gap-2 justify-between sm:justify-start">
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">Consultation</div>
                            <div className="text-xl font-bold">${d.fee}</div>
                          </div>
                          <div className="flex gap-2">
                            <Button asChild variant="outline" size="sm">
                              <Link to="/doctors/$id" params={{ id: d.id }}>View profile</Link>
                            </Button>
                            <Button asChild size="sm" className="bg-gradient-primary">
                              <Link to="/book/$doctorId" params={{ doctorId: d.id }}>Book now</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// Reference unused import to keep tree-shaking happy
void Stethoscope;
