import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Stethoscope, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-primary text-primary-foreground">
              <Stethoscope className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold">
              Medi<span className="text-primary">Flow</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Trusted healthcare, on demand. Book verified specialists, manage records,
            and receive care from anywhere.
          </p>
          <div className="flex gap-2">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <Button key={i} variant="ghost" size="icon" className="rounded-full">
                <Icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm">Quick links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["Find doctors", "Specialties", "Lab tests", "Health blog", "Careers"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-foreground transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-primary" />
              <span>14 Riverside Plaza, Floor 9<br />San Francisco, CA 94107</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span>+1 (415) 555‑0117</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <span>care@mediflow.health</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm">Health updates</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Wellness tips, screening reminders, and clinic news.
          </p>
          <form className="flex gap-2">
            <Input type="email" placeholder="you@email.com" />
            <Button type="submit" className="bg-gradient-primary">Join</Button>
          </form>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row gap-3 justify-between items-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} MediFlow Health, Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">HIPAA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
