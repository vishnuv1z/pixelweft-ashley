import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import AnimatedBackground from "@/components/AnimatedBackground";
import SectionHeading from "@/components/SectionHeading";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, PenTool, Code2, Rocket } from "lucide-react";

/* ── Storytelling slides ─────────────────────────────────── */
const storySlides = [
  {
    image: "/images/story-discovery.png",
    label: "Discovery",
    caption: "Understanding your vision, audience, and goals — the foundation of every great product.",
  },
  {
    image: "/images/story-design.png",
    label: "Design",
    caption: "Crafting interfaces that captivate and convert. Every pixel, intentional.",
  },
  {
    image: "/images/story-development.png",
    label: "Development",
    caption: "Engineering robust, scalable systems with cutting-edge technology.",
  },
  {
    image: "/images/story-launch.png",
    label: "Launch",
    caption: "Deploying polished products that make an impact from day one.",
  },
];

/* ── Process steps ───────────────────────────────────────── */
const processSteps = [
  { num: "01", title: "Discovery", icon: Compass, desc: "We begin by immersing ourselves in your business ecosystem. Through collaborative workshops and deep-dive research, we analyze your competitive landscape, understand user pain points, and define a clear, strategic roadmap that ensures every pixel aligns with your ultimate business objectives." },
  { num: "02", title: "Design", icon: PenTool, desc: "Our design philosophy centers on form meeting function. We craft intuitive, stunningly minimal interfaces through rapid prototyping, wireframing, and continuous iteration. The result is a premium user experience that feels both effortless and deeply engaging." },
  { num: "03", title: "Development", icon: Code2, desc: "Transformation from design to reality happens here. We build using cutting-edge, scalable frameworks and clean, modular architecture. With rigorous automated testing and adherence to performance best practices, we ensure the final product is lightning-fast and universally robust." },
  { num: "04", title: "Launch", icon: Rocket, desc: "Deployment is just the beginning. We implement smooth, zero-downtime launches backed by comprehensive monitoring and analytics. We continue to iterate post-launch, ensuring your digital product not only thrives in the real world but adapts to future market demands." },
];

/* ── Stats ───────────────────────────────────────────────── */
const stats = [
  { target: 50, suffix: "+", label: "Projects Delivered" },
  { target: 30, suffix: "+", label: "Happy Clients" },
  { target: 15, suffix: "+", label: "Team Members" },
  { target: 3, suffix: "+", label: "Years of Excellence" },
];

/* ── Count-up Animation ──────────────────────────────────── */
function useCountUp(target: number, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
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
      <p className="font-display text-4xl md:text-5xl font-bold text-foreground tabular-nums">
        {count}{suffix}
      </p>
      <p className="text-sm text-muted-foreground mt-2">{label}</p>
    </div>
  );
}

/* ── Scroll Storytelling ─────────────────────────────────── */
function ScrollStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollableHeight = el.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const rawProgress = -rect.top / scrollableHeight;
      setProgress(Math.max(0, Math.min(1, rawProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalSlides = storySlides.length;
  const translateX = -(progress * (totalSlides - 1) * 100);

  // Determine which slide is "active" for the caption
  const activeIndex = Math.min(
    Math.floor(progress * totalSlides),
    totalSlides - 1
  );

  return (
    <div
      ref={containerRef}
      className="story-container"
      style={{ height: `${totalSlides * 100}vh` }}
    >
      <div className="story-sticky">
        {/* Track */}
        <div
          className="story-track"
          style={{ transform: `translateX(${translateX}vw)` }}
        >
          {storySlides.map((slide, i) => (
            <div key={slide.label} className="story-slide">
              <img
                src={slide.image}
                alt={slide.label}
                className="story-slide-img"
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div className="story-slide-overlay" />
            </div>
          ))}
        </div>

        {/* Label + caption overlay — always visible */}
        <div className="story-caption">
          <span className="story-caption-num">
            {String(activeIndex + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
          </span>
          <h3 className="story-caption-title" key={activeIndex}>
            {storySlides[activeIndex].label}
          </h3>
          <p className="story-caption-text" key={`t-${activeIndex}`}>
            {storySlides[activeIndex].caption}
          </p>
        </div>

        {/* Progress bar */}
        <div className="story-progress-track">
          <div
            className="story-progress-bar"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── About page ──────────────────────────────────────────── */
const About = () => (
  <Layout>
    {/* Hero */}
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-7">
      <AnimatedBackground />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
        <h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.1] animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          We Build What
          <br />
          <span className="font-serif italic font-semibold">Others Imagine</span>
        </h1>
        <p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          PixelWeft is a collective of designers, developers, and strategists united by a single
          obsession: building extraordinary digital products that move industries forward.
        </p>
      </div>
    </section>

    {/* Scroll Storytelling */}
    <ScrollStorytelling />

    {/* Our Process */}
    <section className="section-padding">
      <SectionHeading
        tag="How We Work"
        title="Our Process"
        description="Four deliberate phases that turn ambitious ideas into polished digital products."
      />
      <div className="max-w-5xl mx-auto flex flex-col gap-8 md:gap-12">
        {processSteps.map((step, i) => {
          const isReversed = i % 2 !== 0;
          return (
            <div
              key={step.num}
              className={`glass rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 animate-fade-up ${
                isReversed ? "md:flex-row-reverse" : ""
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Title & Icon side */}
              <div className={`flex-shrink-0 md:w-1/3 flex flex-col gap-2 ${isReversed ? 'items-end text-right' : 'items-start text-left'}`}>
                <span className="text-sm font-mono text-muted-foreground/60 tracking-widest">{step.num}</span>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {step.title}
                </h3>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md inline-flex mt-2">
                  <step.icon size={28} className="text-foreground/90" strokeWidth={1.5} />
                </div>
              </div>

              {/* Description side */}
              <div className={`flex-1 ${isReversed ? 'text-right' : 'text-left'}`}>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>

    {/* Stats */}
    <section className="section-padding">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((s, i) => (
          <StatItem
            key={s.label}
            target={s.target}
            suffix={s.suffix}
            label={s.label}
            delay={i * 0.1}
          />
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding text-center">
      <div className="max-w-3xl mx-auto glass p-12 md:p-16 space-y-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Ready to Start Something Extraordinary?
        </h2>
        <p className="text-muted-foreground text-lg">
          Let's turn your vision into a digital masterpiece.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="primary" size="lg" asChild>
            <Link to="/contact">Start a Project <ArrowRight className="ml-1" size={16} /></Link>
          </Button>
          <Button variant="outline-subtle" size="lg" asChild>
            <Link to="/projects">View Our Work</Link>
          </Button>
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
