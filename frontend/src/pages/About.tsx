import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import AnimatedBackground from "@/components/AnimatedBackground";
import SectionHeading from "@/components/SectionHeading";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
  { num: "01", title: "Discovery", desc: "We immerse ourselves in your business, users, and competitive landscape to define clear objectives." },
  { num: "02", title: "Design", desc: "Our designers craft intuitive, stunning interfaces through rapid prototyping and iteration." },
  { num: "03", title: "Development", desc: "We build with modern frameworks, clean architecture, and rigorous testing at every stage." },
  { num: "04", title: "Launch", desc: "We deploy, monitor, and iterate — ensuring your product thrives in the real world." },
];

/* ── Stats ───────────────────────────────────────────────── */
const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "15+", label: "Team Members" },
  { value: "3+", label: "Years of Excellence" },
];

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
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {processSteps.map((step, i) => (
          <div
            key={step.num}
            className="process-card animate-fade-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <span className="process-card-num">{step.num}</span>
            <h3 className="font-display text-xl font-semibold text-foreground mt-4 mb-2">
              {step.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Stats */}
    <section className="section-padding">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="text-center animate-fade-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <p className="font-display text-4xl md:text-5xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground mt-2">{s.label}</p>
          </div>
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
