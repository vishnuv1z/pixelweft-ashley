import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedBackground from "@/components/AnimatedBackground";
import SectionHeading from "@/components/SectionHeading";
import TestimonialShowcase from "@/components/TestimonialShowcase";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code, Smartphone, Brain, ArrowRight, PenTool, Cloud, Bot, Activity } from "lucide-react";

const allServices = [
  { id: 1, icon: Code, title: "Web Development", desc: "Stunning, performant web applications built with cutting-edge frameworks." },
  { id: 2, icon: Smartphone, title: "Mobile App Development", desc: "Native and cross-platform mobile experiences that users love." },
  { id: 3, icon: PenTool, title: "UI/UX Design", desc: "Premium, minimal interfaces that drive deep user engagement." },
  { id: 4, icon: Cloud, title: "SaaS Development", desc: "Scalable software-as-a-service architecture engineered for rapid growth." },
  { id: 5, icon: Bot, title: "AI Tools & Chatbots", desc: "Custom AI integrations that streamline your workflow and unlock new possibilities." },
  { id: 6, icon: Activity, title: "Automation Workflow", desc: "Automate repetitive tasks and supercharge your team's operational efficiency." },
];

function StackedCard({ service, index, scrollYProgress }: { key?: number, service: any, index: number, scrollYProgress: any }) {
  const startEnter = index * 0.14; 
  const fullyEntered = startEnter + 0.10;
  
  const opacity = useTransform(scrollYProgress, [startEnter, fullyEntered], [0, 1]);
  
  const combinedY = useTransform(scrollYProgress, (p: number) => {
      let currentY = 0;
      if (p < startEnter) currentY = 300;
      else if (p < fullyEntered) {
         const ratio = (p - startEnter) / (fullyEntered - startEnter);
         const easeRatio = 1 - Math.pow(1 - ratio, 3);
         currentY = 300 * (1 - easeRatio);
      } else currentY = 0;
  
      let currentTransY = 0;
      if (p >= fullyEntered) {
          const numAhead = (p - fullyEntered) / 0.14;
          const ahead = Math.max(0, Math.min(numAhead, 5 - index));
          currentTransY = ahead * -35;
      }
      return currentY + currentTransY;
  });

  const scale = useTransform(scrollYProgress, (p: number) => {
      if (p < fullyEntered) return 1;
      const numAhead = (p - fullyEntered) / 0.14;
      const ahead = Math.max(0, Math.min(numAhead, 5 - index));
      return 1 - ahead * 0.05;
  });

  return (
    <motion.div
      layout
      layoutId={`card-${service.id}`}
      style={{
        y: combinedY,
        scale,
        opacity,
        zIndex: index,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="absolute w-full max-w-lg glass rounded-[2.5rem] p-10 flex flex-col items-center text-center gap-5 shadow-2xl border border-white/10"
    >
      <div className="p-5 rounded-3xl bg-white/5 border border-white/10 shadow-inner">
        <service.icon size={40} className="text-indigo-400" />
      </div>
      <h3 className="text-3xl font-display font-semibold text-foreground tracking-tight">{service.title}</h3>
      <p className="text-muted-foreground text-lg leading-relaxed font-light">{service.desc}</p>
    </motion.div>
  );
}

function ScrollServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [isGrid, setIsGrid] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setIsGrid(latest >= 0.88); 
    });
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full mb-40 lg:mb-64">
      <div className="sticky top-0 min-h-screen w-full flex flex-col items-center pt-24 md:pt-28">
        
        <div className="text-center z-20 mb-6 md:mb-8 px-6">
          <SectionHeading tag="What We Do" title="Services Built for Scale" description="From concept to launch, we deliver end-to-end digital solutions." />
        </div>

        <div className="relative flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 pb-20">
          {isGrid ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full place-items-center">
               {allServices.map((service) => (
                  <motion.div
                    key={service.id}
                    layout
                    layoutId={`card-${service.id}`}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="glass rounded-3xl p-5 md:p-6 lg:p-8 flex flex-col items-start gap-3 lg:gap-4 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] hover:border-indigo-500/30 transition-colors duration-300 w-full"
                  >
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <service.icon size={22} className="text-indigo-400" />
                    </div>
                    <h3 className="text-lg md:text-xl font-display font-semibold text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{service.desc}</p>
                  </motion.div>
               ))}
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              {allServices.map((service, index) => (
                <StackedCard key={service.id} service={service} index={index} scrollYProgress={scrollYProgress} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const featuredProjects = [
  { title: "NeuralVault", category: "AI / ML", year: "2025", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop" },
  { title: "SwiftCart", category: "Mobile App", year: "2024", image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=800&auto=format&fit=crop" },
  { title: "CloudSync Pro", category: "Web Dev", year: "2025", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" },
  { title: "HealthPulse", category: "AI / ML", year: "2024", image: "https://thumbs.dreamstime.com/b/health-control-application-smartphone-pulse-arterial-pressure-concept-modern-medical-technology-131215608.jpg" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO, TechNova",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "PixelWeft completely transformed our vision into a product that exceeded every expectation we had. From the initial discovery sessions to the final pixel-perfect handoff, their attention to detail, technical depth, and design sensibility were absolutely unmatched. They didn't just build what we asked for — they challenged our assumptions and pushed us toward a far better product.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Founder, LaunchPad",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Working with PixelWeft felt like having a world-class engineering and design team embedded right inside our company. They understood our startup's pace, adapted to shifting priorities without missing a beat, and delivered ahead of schedule. The level of craft in every screen and interaction was something we'd never experienced with any other agency before.",
    rating: 5,
  },
  {
    name: "Emily Watkins",
    role: "Product Lead, Orbis",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "The quality of work, creative problem-solving, and genuine partnership set PixelWeft apart from every agency we've collaborated with over the past decade. They brought fresh ideas to the table at every stage, maintained impeccable communication throughout, and delivered a product that our entire team is genuinely proud to ship. I can't recommend them highly enough.",
    rating: 5,
  },
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
          <span className="font-pixel text-[1.0em] align-baseline tracking-wider">Pixels</span>
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
    {/* Services */}
    <ScrollServices />

    {/* Featured Projects */}
    <section className="section-padding relative">
      <SectionHeading tag="Portfolio" title="Featured Projects" description="A glimpse into the digital products we've brought to life." />
      <div className="max-w-6xl mx-auto staggered-grid">
        {featuredProjects.map((p, i) => (
          <div key={p.title} className="project-card animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="project-card-preview group overflow-hidden relative">
              <img 
                src={p.image} 
                alt={p.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-[600ms] ease-out" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
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
      <div className="max-w-6xl mx-auto">
        <TestimonialShowcase testimonials={testimonials} autoPlayDuration={5000} />
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
