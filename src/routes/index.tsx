import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { Specialties } from "@/components/site/Specialties";
import { Doctors } from "@/components/site/Doctors";
import { Hospitals } from "@/components/site/Hospitals";
import { WhyUs } from "@/components/site/WhyUs";
import { Insurance } from "@/components/site/Insurance";
import { Emergency } from "@/components/site/Emergency";
import { MobileApp } from "@/components/site/MobileApp";
import { Blogs } from "@/components/site/Blogs";
import { Testimonials } from "@/components/site/Testimonials";
import { Faq } from "@/components/site/Faq";
import { CtaBand } from "@/components/site/CtaBand";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MediFlow — Book trusted doctors, instantly" },
      {
        name: "description",
        content:
          "MediFlow is the all-in-one platform to book verified specialists, store medical records, and consult by video — securely, anytime.",
      },
      { property: "og:title", content: "MediFlow — Book trusted doctors, instantly" },
      {
        property: "og:description",
        content:
          "Verified specialists, encrypted medical records and video consults. Healthcare built around you.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Specialties />
        <Doctors />
        <Hospitals />
        <Emergency />
        <WhyUs />
        <Insurance />
        <MobileApp />
        <Testimonials />
        <Blogs />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
