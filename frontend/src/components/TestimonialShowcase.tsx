import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar?: string;
}

interface TestimonialShowcaseProps {
  testimonials: Testimonial[];
  autoPlayDuration?: number; // ms
}

const MARQUEE_ITEMS = [
  "Trusted by Founders", 
  "Startups",
  "Businesses",
  "Creators",
  "Agencies",
  "Enterprises",
  "Visionaries",
];

// Generate avatar URL from name initials as fallback
function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// Repeating marquee text band
function MarqueeBand() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="testimonial-marquee-wrapper">
      <div className="testimonial-marquee-track">
        {items.map((item, i) => (
          <span key={i} className="testimonial-marquee-item">
            <span className="testimonial-marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 60 : -60,
    scale: 1.15,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -60 : 60,
    scale: 0.97,
  }),
};

export default function TestimonialShowcase({
  testimonials,
  autoPlayDuration = 5000,
}: TestimonialShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);
  const fillRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(currentIndex);
  const isPausedRef = useRef(isPaused);

  // Keep refs in sync with state
  currentIndexRef.current = currentIndex;
  isPausedRef.current = isPaused;

  const resetProgress = useCallback(() => {
    elapsedRef.current = 0;
    startTimeRef.current = 0;
    if (fillRef.current) {
      fillRef.current.style.width = '0%';
    }
  }, []);

  const goTo = useCallback(
    (newIndex: number, dir: number) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setDirection(dir);
      setCurrentIndex(newIndex);
      resetProgress();
    },
    [resetProgress]
  );

  const goNext = useCallback(() => {
    const next = (currentIndexRef.current + 1) % testimonials.length;
    goTo(next, 1);
  }, [testimonials.length, goTo]);

  const goPrev = useCallback(() => {
    const prev =
      (currentIndexRef.current - 1 + testimonials.length) %
      testimonials.length;
    goTo(prev, -1);
  }, [testimonials.length, goTo]);

  // Auto-play progress animation — direct DOM updates, no setState per frame
  useEffect(() => {
    if (isPaused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    startTimeRef.current = performance.now() - elapsedRef.current;

    const tick = (now: number) => {
      if (isPausedRef.current) return;

      const elapsed = now - startTimeRef.current;
      elapsedRef.current = elapsed;
      const pct = Math.min(elapsed / autoPlayDuration, 1);

      // Update DOM directly — avoids React re-render on every frame
      if (fillRef.current) {
        fillRef.current.style.width = `${pct * 100}%`;
      }

      if (pct >= 1) {
        const next =
          (currentIndexRef.current + 1) % testimonials.length;
        setDirection(1);
        setCurrentIndex(next);
        resetProgress();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [currentIndex, isPaused, autoPlayDuration, testimonials.length, resetProgress]);

  const current = testimonials[currentIndex];

  return (
    <div className="testimonial-showcase-section">
      {/* Marquee */}
      <MarqueeBand />

      {/* Main card */}
      <div
        className="testimonial-showcase-card"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="testimonial-showcase-inner"
          >
            {/* Left — Avatar + Info */}
            <div className="testimonial-showcase-left">
              <div className="testimonial-avatar-wrapper">
                {current.avatar ? (
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="testimonial-avatar-img"
                  />
                ) : (
                  <div className="testimonial-avatar-initials">
                    {getInitials(current.name)}
                  </div>
                )}
              </div>

              <div className="testimonial-client-info">
                <h4 className="testimonial-client-name">{current.name}</h4>
                <p className="testimonial-client-role">{current.role}</p>
              </div>

              {/* Quote icon accent */}
              <Quote
                size={80}
                className="testimonial-quote-accent"
                strokeWidth={1}
              />
            </div>

            {/* Right — Testimonial text */}
            <div className="testimonial-showcase-right">
              <p className="testimonial-text">"{current.text}"</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom bar — nav + progress inline */}
        <div className="testimonial-bottom-bar">
          <div className="testimonial-nav">
            <span className="testimonial-counter">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(testimonials.length).padStart(2, "0")}
            </span>

            <div className="testimonial-nav-right">
              {/* Inline progress bar */}
              <div className="testimonial-progress-track">
                <div
                  ref={fillRef}
                  className="testimonial-progress-fill"
                  style={{ width: '0%' }}
                />
              </div>

              <div className="testimonial-arrows">
                <button
                  onClick={goPrev}
                  className="testimonial-arrow-btn"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={goNext}
                  className="testimonial-arrow-btn"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
