import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedBackground from "@/components/AnimatedBackground";
import SectionHeading from "@/components/SectionHeading";
import { Code, Smartphone, Brain, ArrowRight, Star } from "lucide-react";

const services = [
  { icon: Code, title: "Web Development", desc: "Stunning, performant web applications built with cutting-edge frameworks." },
  { icon: Smartphone, title: "Mobile Apps", desc: "Native and cross-platform mobile experiences that users love." },
  { icon: Brain, title: "AI Tools & Automation", desc: "We build custom AI tools and automation workflows that streamline your business and unlock new possibilities." },
];

const featuredProjects = [
  { title: "NeuralVault", category: "AI / ML", year: "2025" },
  { title: "SwiftCart", category: "Mobile App", year: "2024" },
  { title: "CloudSync Pro", category: "Web Dev", year: "2025" },
  { title: "HealthPulse", category: "AI / ML", year: "2024" },
];

const testimonials = [
  { name: "Sarah Chen", role: "CTO, TechNova", text: "PixelWeft transformed our vision into a product that exceeded all expectations. Their attention to detail is unmatched.", rating: 5 },
  { name: "Marcus Rodriguez", role: "Founder, LaunchPad", text: "Working with PixelWeft felt like having a world-class team in-house. They delivered ahead of schedule.", rating: 5 },
  { name: "Emily Watkins", role: "Product Lead, Orbis", text: "The quality of work and creative problem-solving set PixelWeft apart from every agency we've worked with.", rating: 5 },
];

const stats = [
  { target: 50, suffix: "+", label: "Projects Delivered" },
  { target: 30, suffix: "+", label: "Happy Clients" },
  { target: 99, suffix: "%", label: "Client Satisfaction" },
  { target: 3, suffix: "+", label: "Years of Excellence" },
];

// Count-up animation hook
function useCountUp(target: number, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      if (current !== start) {
        start = current;
        setCount(current);
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [trigger, target, duration]);

  return count;
}

// Individual stat with count-up
function StatItem({ target, suffix, label, delay }: { target: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(target, target > 10 ? 2000 : 1200, visible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center animate-fade-up" style={{ animationDelay: `${delay}s` }}>
      <p className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tabular-nums">
        {count}{suffix}
      </p>
      <p className="text-xs md:text-sm text-muted-foreground mt-2">{label}</p>
    </div>
  );
}

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-7">
      <AnimatedBackground />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] text-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="font-display">Weaving </span>
          <span className="font-pixel text-[0.75em] align-baseline tracking-wider">Pixels</span>
          <br />
          <span className="font-display">Into </span>
          <span className="font-serif italic font-semibold">Reality</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
          PixelWeft is where bold ideas meet exceptional execution. We design and build digital products that captivate, convert, and scale.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Button variant="primary" size="lg" asChild>
            <Link to="/contact">Start a Project <ArrowRight className="ml-1" size={16} /></Link>
          </Button>
          <Button variant="outline-subtle" size="lg" asChild>
            <Link to="/projects">Explore Our Work</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Stats — Separate section with gap */}
    <section className="py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
          {stats.map((s, i) => (
            <StatItem key={s.label} target={s.target} suffix={s.suffix} label={s.label} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="section-padding relative">
      <SectionHeading tag="What We Do" title="Services Built for Scale" description="From concept to launch, we deliver end-to-end digital solutions." />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <div key={s.title} className="glass hover-lift p-8 space-y-4 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-border/60 flex items-center justify-center">
              <s.icon size={22} className="text-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Featured Projects */}
    <section className="section-padding relative">
      <SectionHeading tag="Portfolio" title="Featured Projects" description="A glimpse into the digital products we've brought to life." />
      <div className="max-w-6xl mx-auto staggered-grid">
        {featuredProjects.map((p, i) => (
          <div key={p.title} className="project-card animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="project-card-preview group">
              <span className="text-muted-foreground/20 font-display text-6xl md:text-7xl font-bold select-none transition-colors duration-300 group-hover:text-muted-foreground/30">
                {p.title.charAt(0)}
              </span>
            </div>
            <div className="project-card-meta">
              <h3 className="font-display text-lg font-semibold text-foreground">{p.title}</h3>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{p.category}</span>
                <span className="text-xs text-muted-foreground/50">•</span>
                <span className="text-xs text-muted-foreground">{p.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-14">
        <Button variant="outline-subtle" size="lg" asChild>
          <Link to="/projects">View All Projects <ArrowRight className="ml-1" size={16} /></Link>
        </Button>
      </div>
    </section>

    {/* Testimonials */}
    <section className="section-padding relative">
      <SectionHeading tag="Testimonials" title="What Our Clients Say" />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={t.name} className="glass p-8 space-y-4 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex gap-1">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} size={14} className="fill-foreground/60 text-foreground/60" />
              ))}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed italic">"{t.text}"</p>
            <div>
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding relative text-center">
      <div className="max-w-3xl mx-auto glass p-12 md:p-16 space-y-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Ready to Build Something Amazing?</h2>
        <p className="text-muted-foreground text-lg">Let's turn your vision into a digital masterpiece.</p>
        <Button variant="primary" size="lg" asChild>
          <Link to="/contact">Start Your Project <ArrowRight className="ml-1" size={16} /></Link>
        </Button>
      </div>
    </section>
  </Layout>
);

export default Index;
