import { useEffect, useMemo, useRef, useState } from "react";
import {
  HERO_SLIDES,
  type HeroSlide,
  AUTO_INTERVAL_MS,
  HERO_ARIA,
} from "../../constants/landingPage/heroConstants";

export default function HeroSection() {
  const slides: HeroSlide[] = useMemo(() => HERO_SLIDES, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchHandledRef = useRef<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () =>
      setPrefersReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () =>
      mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (isPaused || slides.length <= 1) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_INTERVAL_MS);
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused, slides.length]);

  const goTo = (index: number) => {
    const safeIndex = ((index % slides.length) + slides.length) % slides.length;
    setCurrentIndex(safeIndex);
  };
  const goNext = () => goTo(currentIndex + 1);
  const goPrev = () => goTo(currentIndex - 1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(slides.length - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);
    const touch = e.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    touchHandledRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchHandledRef.current) return;
    const startX = touchStartXRef.current;
    const startY = touchStartYRef.current;
    if (startX == null || startY == null) return;
    const touch = e.touches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    const horizontalSwipe =
      Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy) * 1.2;
    if (horizontalSwipe) {
      if (dx < 0) {
        goNext();
      } else {
        goPrev();
      }
      touchHandledRef.current = true;
      touchStartXRef.current = null;
      touchStartYRef.current = null;
    }
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    touchHandledRef.current = false;
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[75vh] md:h-[88vh] lg:h-[96vh] overflow-hidden bg-neutral-900 text-white"
      role="region"
      aria-roledescription="carousel"
      aria-label={HERO_ARIA.REGION_LABEL}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={
                `absolute inset-0 transition-opacity ${
                  prefersReducedMotion ? "duration-0" : "duration-700"
                } ease-in-out ` + (isActive ? "opacity-100" : "opacity-0")
              }
              aria-hidden={!isActive}
            >
              {/* Image */}
              <img
                src={slide.imageUrl}
                alt={slide.alt}
                className="w-full h-full object-cover"
                loading={isActive ? "eager" : "lazy"}
                decoding="async"
              />
              {/* Overlay gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/20" />
              {/* Text content */}
              {(slide.heading || slide.subheading || slide.ctaText) && (
                <div
                  className={`absolute inset-0 p-4 sm:p-6 md:p-10 flex items-center justify-center ${
                    prefersReducedMotion ? "" : ""
                  }`}
                >
                  <div className="max-w-4xl mx-auto text-center">
                    {slide.heading && (
                      <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold drop-shadow-md">
                        {slide.heading}
                      </h2>
                    )}
                    {slide.subheading && (
                      <p className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-white/90 max-w-3xl mx-auto">
                        {slide.subheading}
                      </p>
                    )}
                    {slide.ctaText && slide.ctaHref && (
                      <a
                        href={slide.ctaHref}
                        className="inline-block mt-5 md:mt-6 rounded-md bg-white/90 text-neutral-900 hover:bg-white focus-visible:bg-white px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-medium transition-colors"
                        aria-label={`${slide.ctaText} — ${
                          slide.heading ?? "Learn more"
                        }`}
                      >
                        {slide.ctaText}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Prev/Next controls */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="hidden md:inline-flex group absolute left-3 top-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 focus-visible:bg-black/60 ring-1 ring-white/30 hover:ring-white/50 focus:outline-none w-10 h-10 md:w-11 md:h-11 transition"
            aria-label={HERO_ARIA.PREV}
          >
            <svg
              className="w-5 h-5 text-white group-hover:scale-110 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            className="hidden md:inline-flex group absolute right-3 top-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 focus-visible:bg-black/60 ring-1 ring-white/30 hover:ring-white/50 focus:outline-none w-10 h-10 md:w-11 md:h-11 transition"
            aria-label={HERO_ARIA.NEXT}
          >
            <svg
              className="w-5 h-5 text-white group-hover:scale-110 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-3 md:bottom-5 flex items-center justify-center gap-2">
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                className={
                  "relative inline-flex items-center justify-center rounded-full transition-all " +
                  (isActive
                    ? "w-3.5 h-3.5 bg-white"
                    : "w-2.5 h-2.5 bg-white/60 hover:bg-white/80")
                }
                aria-label={HERO_ARIA.GO_TO_SLIDE(index + 1)}
                aria-current={isActive ? "true" : undefined}
                onClick={() => goTo(index)}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
