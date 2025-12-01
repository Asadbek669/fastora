"use client";

import { useEffect, useState, useRef } from "react";

export default function HeroSlider({ testData = [] }) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const slides = testData.slice(0, 5); // faqat 5 ta banner

  // Autoplay
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [current]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000); // 4 soniyada slayd
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Touch (Swipe)
  const startX = useRef(0);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    stopAutoSlide();
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;

    if (startX.current - endX > 50) {
      // left swipe → next
      setCurrent((prev) => (prev + 1) % slides.length);
    } else if (endX - startX.current > 50) {
      // right swipe → prev
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }

    startAutoSlide();
  };

  return (
    <div
      className="relative w-full h-48 rounded-2xl overflow-hidden shadow-xl"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((s, index) => (
        <img
          key={index}
          src={s.poster_url}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out
            ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"}
          `}
        />
      ))}

      {/* Title overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/40 text-center text-lg font-semibold backdrop-blur-sm">
        {slides[current].title}
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-white" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
