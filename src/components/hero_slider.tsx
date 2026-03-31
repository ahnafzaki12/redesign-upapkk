import { useState, useEffect, useRef, useCallback } from "react";
import "../index.css";

export interface SlideItem {
  backgroundImage: string;
}

interface HeroSliderProps {
  slides: SlideItem[];
  autoPlayInterval?: number;
}

export default function HeroSlider({
  slides,
  autoPlayInterval = 6000, // Diperlama dari 3500 menjadi 6000 (6 detik)
}: HeroSliderProps) {
  const total = slides.length;
  // Ubah inisialisasi state untuk memulai dari index bagian tengah (cloned)
  const [currentIndex, setCurrentIndex] = useState(total);
  const [isAnimating, setIsAnimating] = useState(true);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);

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
    const activeIndex = currentIndex; // Gunakan angka absolut

    // Tengah slide aktif tepat di tengah wrapper
    return activeIndex * itemW + itemW / 2 - wrapW / 2;
  }, [currentIndex]);

  const applyTransform = useCallback(
    (animate: boolean, additionalOffset = 0) => {
      if (!trackRef.current) return;
      trackRef.current.style.transition = animate
        ? "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        : "none";
      trackRef.current.style.transform = `translateX(calc(-${getOffset()}px + ${additionalOffset}px))`;
    },
    [getOffset]
  );

  const resetAuto = useCallback(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsAnimating(true);
    }, autoPlayInterval);
  }, [autoPlayInterval]);

  const goTo = (index: number) => {
    setIsAnimating(true);
    setCurrentIndex(index);
    resetAuto();
  };

  const handlePrev = () => goTo(currentIndex - 1);
  const handleNext = () => goTo(currentIndex + 1);

  // Initial render tanpa animasi
  useEffect(() => {
    applyTransform(false);
  }, [applyTransform]);

  // Render setelah current berubah
  useEffect(() => {
    applyTransform(isAnimating, 0);
  }, [currentIndex, applyTransform, isAnimating]);

  // Efek teleportasi ilusi seamless (ketika animasi selesai)
  useEffect(() => {
    if (!isAnimating) return;
    const timeout = setTimeout(() => {
      // Jika nyasar ke clone bagian awal
      if (currentIndex <= total - 1) {
        setIsAnimating(false); // Matikan animasi sementara
        setCurrentIndex(currentIndex + total); // Lompat diam-diam ke tengah
      } 
      // Jika nyasar ke clone bagian akhir
      else if (currentIndex >= 2 * total) {
        setIsAnimating(false);
        setCurrentIndex(currentIndex - total);
      }
    }, 500); // 500ms adalah durasi CSS transition
    return () => clearTimeout(timeout);
  }, [currentIndex, isAnimating, total]);

  // Hapus state drag jika mouse/jari keluar sepenuhnya dari area Windows
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (dragStart.current !== null) {
        dragStart.current = null;
        setIsAnimating(true);
        applyTransform(true, 0);
        resetAuto();
      }
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [applyTransform, resetAuto]);

  // Drag / Swipe handlers
  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    // Mencegah interaksi drag di atas tombol prev/next atau dots
    if ((e.target as HTMLElement).closest('.slider-nav') || (e.target as HTMLElement).closest('.slider-dots')) return;
    
    // Cegah perilaku "Ghost Dragging" bawaan browser untuk tag <a href> dan <img>
    if (e.type === "mousedown") e.preventDefault();
    
    if (autoTimer.current) clearInterval(autoTimer.current);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStart.current = clientX;
    
    // Jangan set isAnimating menjadi false dulu, langsung terapkan transform saja
    trackRef.current!.style.transition = "none";
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStart.current === null) return;
    
    // Cegah interaksi bawaan browser jika sedang di-drag pakai sentuhan
    if ('touches' in e) e.preventDefault(); 
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - dragStart.current;
    
    // Terapkan pergeseran secara real-time langsung ke elemen
    const currentOffset = getOffset();
    trackRef.current!.style.transform = `translateX(calc(-${currentOffset}px + ${diff}px))`;
  };

  const handlePointerUp = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStart.current === null) return;
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = clientX - dragStart.current;
    dragStart.current = null;
    
    setIsAnimating(true); // Pastikan animasi nyala sebelum pindah status
    
    // Jika geserannya melebihi 70px (dinaikkan sedikit sensitivitasnya)
    if (diff > 70) {
      setCurrentIndex(prev => prev - 1);
      resetAuto();
    } else if (diff < -70) {
      setCurrentIndex(prev => prev + 1);
      resetAuto();
    } else {
      // Jika geseran tanggung, kembalikan ke titik semula dengan animasi
      applyTransform(true, 0);
      resetAuto();
    }
  };

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
      <div 
        className="slider-wrapper" 
        ref={wrapperRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        <div className="slider-track" ref={trackRef}>
          {allSlides.map((slide, i) => {
            // Kalkulasi originalIndex dari currentIndex aktual 
            const currentOriginal = ((currentIndex % total) + total) % total;
            const itemOriginal = i % total;
            const isActive = itemOriginal === currentOriginal;
            return (
              <div
                key={i}
                className={`slider-item ${isActive ? "active" : ""}`}
                style={{ backgroundImage: `url('${slide.backgroundImage}')` }}
                aria-hidden={!isActive}
                tabIndex={isActive ? 0 : -1}
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
        {slides.map((_, i) => {
          const currentOriginal = ((currentIndex % total) + total) % total;
          return (
            <button
              key={i}
              className={`dot ${i === currentOriginal ? "active" : ""}`}
              onClick={() => goTo(total + i)} // Go ke pertengahan (index original)
              role="tab"
              aria-selected={i === currentOriginal}
              aria-label={`Slide ${i + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
}