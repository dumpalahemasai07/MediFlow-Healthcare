import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How quickly can I see a doctor?",
    a: "Most specialties offer same-day video consultations. In-person appointments at partner hospitals are typically available within 24–48 hours.",
  },
  {
    q: "Is my medical data secure?",
    a: "Yes. All records are encrypted at rest and in transit using AES-256, and our platform is HIPAA compliant. Only doctors you grant access to can view your history.",
  },
  {
    q: "Do you accept insurance?",
    a: "MediFlow supports most major US insurers, plus FSA and HSA cards. You'll see your covered cost before confirming any appointment.",
  },
  {
    q: "Can I upload my own reports?",
    a: "Absolutely. Drop PDFs, scans, or images into your record. Your doctor can review them ahead of your visit.",
  },
  {
    q: "How are doctors verified?",
    a: "Each clinician undergoes license verification, credential checks, and patient-review monitoring before joining the platform.",
  },
];

export function Faq() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Questions, answered
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`q-${i}`}
              className="rounded-2xl border border-border bg-card px-5 data-[state=open]:shadow-soft"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
