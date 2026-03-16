import { useState, useEffect, useRef, useCallback } from "react";
import "../index.css";

export interface SlideItem {
  href: string;
  backgroundImage: string;
}

interface HeroSliderProps {
  slides: SlideItem[];
  autoPlayInterval?: number;
}

export default function HeroSlider({
  slides,
  autoPlayInterval = 3500,
}: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const total = slides.length;

  // Clone slides: [clone_end, ...original, clone_start]
  const allSlides = [...slides, ...slides, ...slides];

  const getOffset = useCallback(() => {
    if (!trackRef.current || !wrapperRef.current) return 0;
    const item = trackRef.current.querySelector<HTMLElement>(".slider-item");
    if (!item) return 0;

    const style = window.getComputedStyle(item);
    const marginLeft = parseFloat(style.marginLeft) || 0;
    const marginRight = parseFloat(style.marginRight) || 0;
    
    const itemW = item.offsetWidth + marginLeft + marginRight;
    const wrapW = wrapperRef.current.offsetWidth;
    const activeIndex = total + current;

    // Tengah slide aktif tepat di tengah wrapper
    return activeIndex * itemW + itemW / 2 - wrapW / 2;
  }, [current, total]);

  const applyTransform = useCallback(
    (animate: boolean) => {
      if (!trackRef.current) return;
      trackRef.current.style.transition = animate
        ? "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        : "none";
      trackRef.current.style.transform = `translateX(-${getOffset()}px)`;
    },
    [getOffset]
  );

  const resetAuto = useCallback(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, autoPlayInterval);
  }, [autoPlayInterval, total]);

  const goTo = (index: number) => {
    const normalized = ((index % total) + total) % total;
    setIsAnimating(true);
    setCurrent(normalized);
    resetAuto();
  };

  const handlePrev = () => goTo(current - 1);
  const handleNext = () => goTo(current + 1);

  // Initial render tanpa animasi
  useEffect(() => {
    applyTransform(false);
  }, []);

  // Render setelah current berubah
  useEffect(() => {
    applyTransform(isAnimating);
  }, [current, applyTransform, isAnimating]);

  // Auto-play
  useEffect(() => {
    resetAuto();
    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
  }, [resetAuto]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => applyTransform(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [applyTransform]);

  return (
    <section className="hero-slider">
      {/* Track */}
      <div className="slider-wrapper" ref={wrapperRef}>
        <div className="slider-track" ref={trackRef}>
          {allSlides.map((slide, i) => {
            const originalIndex = i % total;
            const isActive = originalIndex === current;
            return (
              <a
                key={i}
                href={slide.href}
                className={`slider-item ${isActive ? "active" : ""}`}
                style={{ backgroundImage: `url('${slide.backgroundImage}')` }}
                aria-hidden={!isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={(e) => {
                  if (slide.href === "#") e.preventDefault();
                }}
              />
            );
          })}
        </div>

        {/* Prev Button */}
        <button
          className="slider-nav prev"
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          className="slider-nav next"
          onClick={handleNext}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="slider-dots" role="tablist" aria-label="Slides">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? "active" : ""}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}