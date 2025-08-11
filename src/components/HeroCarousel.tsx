"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa";

interface CarouselSlide {
  src: string;
  alt: string;
}

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // Removed progress tracking state — not used in UI
  const touchStartXRef = useRef<number | null>(null);

  // Create slides from properties data - Videos first
  const slides: CarouselSlide[] = useMemo(
    () => [
      {
        src: "/images/image1.jpg",
        alt: "Beautiful residential property in Dehradun with mountain views",
      },
      {
        src: "/images/image2.jpg",
        alt: "Premium residential plot in Kalyanpur, Dehradun",
      },
      {
        src: "/images/image3.jpg",
        alt: "Modern property development in Pondha, Dehradun",
      },
      {
        src: "/images/image4.jpg",
        alt: "Scenic property location in Dholas, Dehradun",
      },
    ],
    []
  );

  // Fixed slide duration (images only)
  const slideDurationMs = 5000;

  // Define callback functions first
  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  // Touch gesture handlers for mobile swipe navigation
  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  }, []);

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      const startX = touchStartXRef.current;
      if (startX === null) return;

      const endX = event.changedTouches[0]?.clientX ?? startX;
      const deltaX = endX - startX;
      const swipeThresholdPx = 50;

      if (Math.abs(deltaX) >= swipeThresholdPx) {
        if (deltaX < 0) {
          goToNextSlide();
        } else {
          goToPrevSlide();
        }
      }

      touchStartXRef.current = null;
    },
    [goToNextSlide, goToPrevSlide]
  );

  // Auto-advance slideshow
  useEffect(() => {
    if (isPaused) return;

    const slideTimeout = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, slideDurationMs);

    return () => {
      clearTimeout(slideTimeout);
    };
  }, [currentSlide, slides, isPaused, slideDurationMs]);

  // Keyboard navigation - moved after all callback functions
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          goToPrevSlide();
          break;
        case "ArrowRight":
          event.preventDefault();
          goToNextSlide();
          break;
        case " ":
          event.preventDefault();
          togglePause();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevSlide, goToNextSlide, togglePause]);

  // Removed unused time formatting and video helpers

  return (
    <div
      className="absolute inset-0 group aspect-video-hero"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0" aria-hidden>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              currentSlide === index
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : undefined}
              sizes="100vw"
              className="object-cover w-full h-full"
              quality={72}
              placeholder={index === 0 ? "empty" : "empty"}
            />
          </div>
        ))}
      </div>

      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

      {/* Enhanced Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-1 sm:left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 md:hover:bg-black/60 backdrop-blur-sm text-white rounded-full transition-transform duration-300 md:hover:scale-110 opacity-100 md:opacity-0 md:group-hover:opacity-100 border border-white/20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" />
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute right-1 sm:right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 md:hover:bg-black/60 backdrop-blur-sm text-white rounded-full transition-transform duration-300 md:hover:scale-110 opacity-100 md:opacity-0 md:group-hover:opacity-100 border border-white/20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center"
        aria-label="Next slide"
      >
        <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={togglePause}
        className="absolute top-2 sm:top-4 md:top-6 right-2 sm:right-4 md:right-6 z-20 bg-black/40 md:hover:bg-black/60 backdrop-blur-sm text-white rounded-full transition-transform duration-300 md:hover:scale-110 border border-white/20 w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-12 flex items-center justify-center leading-none overflow-hidden"
        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
      >
        {isPaused ? (
          <FaPlay className="block w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          <FaPause className="block w-4 h-4 sm:w-5 sm:h-5" />
        )}
      </button>
      {/* Enhanced Slideshow Indicators */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-1.5 sm:space-x-2 md:space-x-3 mt-8 sm:mt-12 md:mt-16">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`group relative transition-all duration-300 md:hover:scale-125 ${
              currentSlide === index ? "scale-110" : "scale-100"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full shadow-lg transition-all duration-300 ${
                currentSlide === index
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 ring-1 sm:ring-2 ring-white/50"
                  : "bg-white/40 md:hover:bg-white/60"
              }`}
            ></div>
          </button>
        ))}
      </div>

      {/* Keyboard Navigation Hint */}
      <div className="hidden md:block absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black/40 backdrop-blur-sm text-white text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/20">
          Use ← → keys to navigate
        </div>
      </div>
    </div>
  );
}
