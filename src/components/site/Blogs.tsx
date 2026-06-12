import { Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/mockData";

export function Blogs() {
  return (
    <section className="py-20 lg:py-28 bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              Health library
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">Expert health articles, written by doctors</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {blogPosts.map((b) => (
            <article
              key={b.id}
              className="group rounded-2xl border border-border bg-card p-6 hover:shadow-elevated hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className="inline-flex items-center rounded-full bg-primary-soft text-primary px-2.5 py-0.5 text-xs font-semibold">
                {b.category}
              </div>
              <h3 className="mt-4 font-semibold text-lg leading-snug group-hover:text-primary transition-colors">
                {b.title}
              </h3>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>{b.author}</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {b.readMin} min read</span>
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
