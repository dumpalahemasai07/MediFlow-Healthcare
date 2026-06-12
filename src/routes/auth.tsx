import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, ShieldCheck, Stethoscope, User, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import heroImg from "@/assets/hero-doctor.jpg";

const searchSchema = z.object({
  role: z.enum(["patient", "doctor", "admin"]).default("patient"),
  mode: z.enum(["login", "register"]).default("login"),
});

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sign in — MediFlow" },
      { name: "description", content: "Sign in to MediFlow to book doctors and access your records." },
    ],
  }),
  component: AuthPage,
});

const roleConfig = {
  patient: {
    label: "Patient",
    icon: User,
    blurb: "Book appointments and manage your records.",
  },
  doctor: {
    label: "Doctor",
    icon: Stethoscope,
    blurb: "Manage your schedule, patients and earnings.",
  },
  admin: {
    label: "Admin",
    icon: UserCog,
    blurb: "Operate the MediFlow platform.",
  },
} as const;

function AuthPage() {
  const { role, mode } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const cfg = roleConfig[role as keyof typeof roleConfig];
  const isLogin = mode === "login";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Auth integration is wired in the next phase.
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    toast.success(
      isLogin ? "Signed in (demo)" : "Account created (demo)",
      { description: "Live auth lands in the next phase." },
    );
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-10 text-primary-foreground overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 -z-10 opacity-40">
          <img src={heroImg} alt="" className="w-full h-full object-cover mix-blend-overlay" />
        </div>
        <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground">
          <span className="grid place-items-center h-9 w-9 rounded-xl bg-white/15 backdrop-blur">
            <Stethoscope className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold">MediFlow</span>
        </Link>

        <div className="space-y-6 max-w-md">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1.5 text-xs font-medium">
            <ShieldCheck className="h-3.5 w-3.5" />
            HIPAA‑grade security
          </div>
          <h2 className="text-4xl font-bold leading-tight">
            Welcome to a calmer way to manage your health.
          </h2>
          <p className="text-primary-foreground/80">
            Specialists, scans, prescriptions and bills — finally in one place.
          </p>

          <div className="grid grid-cols-3 gap-3 pt-4">
            {[
              { v: "120k+", l: "Patients" },
              { v: "1,800", l: "Doctors" },
              { v: "4.9★", l: "Avg rating" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-white/10 backdrop-blur p-4">
                <div className="text-2xl font-bold">{s.v}</div>
                <div className="text-xs text-primary-foreground/80">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-primary-foreground/70">
          © {new Date().getFullYear()} MediFlow Health
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex flex-col p-6 sm:p-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <div className="flex-1 grid place-items-center py-10">
          <div className="w-full max-w-md space-y-7">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">
                {isLogin ? `${cfg.label} sign in` : `Create ${cfg.label.toLowerCase()} account`}
              </h1>
              <p className="text-sm text-muted-foreground">{cfg.blurb}</p>
            </div>

            {/* Role switcher */}
            <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-muted">
              {(Object.keys(roleConfig) as Array<keyof typeof roleConfig>).map((r) => {
                const RIcon = roleConfig[r].icon;
                const active = r === role;
                return (
                  <button
                    key={r}
                    onClick={() => navigate({ search: (s: z.infer<typeof searchSchema>) => ({ ...s, role: r }) })}
                    className={cn(
                      "flex flex-col items-center gap-1 py-3 rounded-xl text-xs font-medium transition-all",
                      active
                        ? "bg-card text-foreground shadow-soft"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <RIcon className="h-4 w-4" />
                    {roleConfig[r].label}
                  </button>
                );
              })}
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="name" placeholder="Jane Doe" className="pl-9 h-11" required />
                  </div>
                </div>
              )}

              {!isLogin && role === "doctor" && (
                <div className="space-y-2">
                  <Label htmlFor="license">Medical license number</Label>
                  <Input id="license" placeholder="e.g. MD-784512" className="h-11" required />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@email.com" className="pl-9 h-11" required />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {isLogin && (
                    <button type="button" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-9 pr-10 h-11"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                    Remember me on this device
                  </Label>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full bg-gradient-primary shadow-soft"
              >
                {loading ? "Please wait…" : isLogin ? "Sign in" : "Create account"}
              </Button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-background px-2 text-muted-foreground">or continue with</span>
                </div>
              </div>

              <Button type="button" variant="outline" size="lg" className="w-full">
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
                </svg>
                Continue with Google
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              {isLogin ? "New to MediFlow? " : "Already have an account? "}
              <button
                onClick={() => navigate({ search: (s: z.infer<typeof searchSchema>) => ({ ...s, mode: isLogin ? ("register" as const) : ("login" as const) }) })}
                className="text-primary font-semibold hover:underline"
              >
                {isLogin ? "Create account" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
