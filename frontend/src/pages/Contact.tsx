import { useState } from "react";
import Layout from "@/components/Layout";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Send, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const testimonials = [
  { name: "Sarah Chen", role: "CTO, TechNova", text: "PixelWeft transformed our vision into a product that exceeded all expectations." },
  { name: "Marcus Rodriguez", role: "Founder, LaunchPad", text: "Working with PixelWeft felt like having a world-class team in-house." },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", details: "" });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", details: "" });
  };

  return (
    <Layout>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-7 px-6 md:px-12 lg:px-20">
        <AnimatedBackground />
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="badge-subtle">
                Get In Touch
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Let's Build Together
              </h1>
              <p className="text-muted-foreground text-lg">Tell us about your project and we'll craft the perfect solution.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="bg-card/60 border-border/60 h-12"
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="bg-card/60 border-border/60 h-12"
              />
              <Textarea
                placeholder="Tell us about your project..."
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                required
                rows={5}
                className="bg-card/60 border-border/60 resize-none"
              />
              <Button variant="primary" size="lg" type="submit" className="w-full">
                Send Message <Send size={16} className="ml-1" />
              </Button>
            </form>
          </div>

          {/* Info + Testimonials */}
          <div className="space-y-8">
            <div className="glass p-8 space-y-4">
              <h3 className="font-display text-lg font-semibold text-foreground">Contact Info</h3>
              <a href="mailto:hello@pixelweft.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-200">
                <Mail size={18} /> hello@pixelweft.com
              </a>
              <div className="flex gap-4 pt-2">
                {["Twitter", "GitHub", "LinkedIn", "Dribbble"].map((s) => (
                  <span key={s} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer">{s}</span>
                ))}
              </div>
            </div>

            {testimonials.map((t) => (
              <div key={t.name} className="glass p-6 space-y-3">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={12} className="fill-foreground/60 text-foreground/60" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm italic">"{t.text}"</p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
