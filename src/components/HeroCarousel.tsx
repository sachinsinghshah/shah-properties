"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa";

interface CarouselSlide {
  type: "image" | "video";
  src: string;
  alt: string;
  videoUrl?: string;
  startTime?: number; // in seconds
  endTime?: number; // in seconds
}

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Create slides from properties data - Videos first
  const slides: CarouselSlide[] = useMemo(
    () => [
      // Static image slides only - removed video slides for performance
      {
        type: "image",
        src: "/images/image1.jpg",
        alt: "Beautiful residential property in Dehradun with mountain views",
      },
      {
        type: "image",
        src: "/images/image2.jpg",
        alt: "Premium residential plot in Kalyanpur, Dehradun",
      },
      {
        type: "image",
        src: "/images/image3.jpg",
        alt: "Modern property development in Pondha, Dehradun",
      },
      {
        type: "image",
        src: "/images/image4.jpg",
        alt: "Scenic property location in Dholas, Dehradun",
      },
    ],
    []
  );

  // Calculate slide duration
  const getSlideDuration = useCallback((slide: CarouselSlide) => {
    if (slide.type === "video" && slide.startTime && slide.endTime) {
      return (slide.endTime - slide.startTime) * 1000 + 1000; // Add 1 second buffer
    }
    return 5000; // Default 5 seconds for images
  }, []);

  // Define callback functions first
  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  // Auto-advance slideshow with dynamic timing and progress tracking
  useEffect(() => {
    if (isPaused) return;

    const currentSlideData = slides[currentSlide];
    const slideDuration = getSlideDuration(currentSlideData);

    // Reset progress when slide changes
    setProgress(0);

    // Progress tracking
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (slideDuration / 100);
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100);

    // Slide transition
    const slideTimeout = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, slideDuration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideTimeout);
    };
  }, [currentSlide, slides, isPaused, getSlideDuration]);

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

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getVideoId = (url: string): string => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "";
  };

  const buildEmbedUrl = (
    videoUrl: string,
    startTime?: number,
    endTime?: number
  ): string => {
    const videoId = getVideoId(videoUrl);
    if (!videoId) return videoUrl;

    const params = new URLSearchParams();
    params.set("autoplay", "1");
    params.set("mute", "1");
    params.set("loop", "1");
    params.set("playlist", videoId);
    params.set("start", (startTime || 0).toString());
    if (endTime) {
      params.set("end", endTime.toString());
    }
    params.set("controls", "0");
    params.set("showinfo", "0");
    params.set("rel", "0");
    params.set("modestbranding", "1");
    params.set("playsinline", "1");
    params.set("enablejsapi", "1");

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  };

  return (
    <div className="absolute inset-0 group aspect-video-hero">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              currentSlide === index
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            {slide.type === "image" ? (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover w-full h-full"
                quality={85}
              />
            ) : (
              <div className="w-full h-full relative bg-black video-container overflow-hidden">
                {/* Echo Pillarboxing Background using thumbnail */}
                <div
                  className="absolute inset-0 w-full h-full echo-background-image"
                  style={{
                    backgroundImage: `url(https://img.youtube.com/vi/${getVideoId(
                      slide.videoUrl!
                    )}/maxresdefault.jpg), 
                                     linear-gradient(135deg, #1a1a2e, #16213e, #0f3460, #1a1a2e)`,
                  }}
                ></div>

                {/* Main Video - Centered with proper aspect ratio */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="relative aspect-video w-full h-full max-w-full max-h-full flex items-center justify-center">
                    {/* TimeframeVideo component was removed, so this will be empty or a placeholder */}
                    {/* For now, we'll just show a placeholder message */}
                    <p className="text-white text-lg">Video content removed.</p>
                  </div>
                </div>

                {/* Additional gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20 pointer-events-none z-5"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

      {/* Enhanced Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-1 sm:left-2 md:left-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white p-1.5 sm:p-2 md:p-4 rounded-full transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 border border-white/20"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" />
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute right-1 sm:right-2 md:right-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white p-1.5 sm:p-2 md:p-4 rounded-full transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 border border-white/20"
        aria-label="Next slide"
      >
        <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={togglePause}
        className="absolute top-2 sm:top-4 md:top-6 right-2 sm:right-4 md:right-6 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white p-1.5 sm:p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
      >
        {isPaused ? (
          <FaPlay className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        ) : (
          <FaPause className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        )}
      </button>

      {/* Enhanced Progress Bar */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-32 sm:w-48 md:w-64">
        <div className="bg-black/40 backdrop-blur-sm rounded-full p-0.5 sm:p-1 border border-white/20">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-0.5 sm:h-1 md:h-2 rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Enhanced Slideshow Indicators */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-1.5 sm:space-x-2 md:space-x-3 mt-8 sm:mt-12 md:mt-16">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`group relative transition-all duration-300 hover:scale-125 ${
              currentSlide === index ? "scale-110" : "scale-100"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full shadow-lg transition-all duration-300 ${
                currentSlide === index
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 ring-1 sm:ring-2 ring-white/50"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            ></div>

            {/* Slide type indicator */}
            <div className="absolute -top-4 sm:-top-6 md:-top-8 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {slide.type === "video" ? "🎥 Video" : "🖼️ Image"}
            </div>
          </button>
        ))}
      </div>

      {/* Keyboard Navigation Hint */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black/40 backdrop-blur-sm text-white text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/20">
          Use ← → keys to navigate
        </div>
      </div>
    </div>
  );
}
