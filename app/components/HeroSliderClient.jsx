
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HeroSliderClient({ items }) {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const startX = useRef(0);
  const startY = useRef(0);
  const startTime = useRef(0);
  const autoSwipeRef = useRef(null);

  if (!items || items.length < 1) return null;

  // =====================
  // TOUCH HANDLERS
  // =====================
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    startTime.current = Date.now();
  };

  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    const dy = e.changedTouches[0].clientY - startY.current;
    const dt = Date.now() - startTime.current;

    const SWIPE_X = 40;
    const SWIPE_Y = 30;
    const TAP_TIME = 250;

    if (Math.abs(dy) > SWIPE_Y) return;

    // Swipe
    if (Math.abs(dx) > SWIPE_X && dt < 300) {
      setIndex((i) =>
        dx < 0
          ? (i + 1) % items.length
          : (i - 1 + items.length) % items.length
      );
      resetAutoSwipe();
      return;
    }

    // Tap
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20 && dt < TAP_TIME) {
      const url = items[index]?.page_url;
      if (url) router.push(url);
    }
  };

  // =====================
  // AUTO SLIDE
  // =====================
  useEffect(() => {
    startAutoSwipe();
    return () => clearInterval(autoSwipeRef.current);
  }, [index, items.length]);

  const startAutoSwipe = () => {
    clearInterval(autoSwipeRef.current);
    autoSwipeRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 4000);
  };

  const resetAutoSwipe = () => startAutoSwipe();

  // =====================
  // NAVIGATION
  // =====================
  const goPrev = () => {
    setIndex((i) => (i - 1 + items.length) % items.length);
    resetAutoSwipe();
  };

  const goNext = () => {
    setIndex((i) => (i + 1) % items.length);
    resetAutoSwipe();
  };

  return (
    <div className="relative w-full aspect-[16/9] md:h-[500px] rounded-xl overflow-hidden bg-black">
      
      {/* IMAGES */}
      {items.map((item, i) => (
        <img
          key={i}
          src={item.backdrop_url}
          alt={item.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

      {/* TITLE BLOCK */}
      <div
        className="absolute left-4 bottom-4 md:left-8 md:bottom-8 z-30 max-w-xl
        bg-black/30 backdrop-blur-md rounded-lg p-3 md:p-4 text-white"
      >
        <h2 className="text-lg md:text-2xl font-medium tracking-tight drop-shadow line-clamp-2">
          {items[index].title}
        </h2>

        {items[index].subtitle && (
          <p className="text-xs md:text-sm text-white/80 mt-1 drop-shadow line-clamp-2">
            {items[index].subtitle}
          </p>
        )}
      </div>

      {/* TOUCH LAYER */}
      <div
        className="absolute inset-0 z-40"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      />

      {/* NAV BUTTONS */}
      <button
        onClick={goPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-50
        bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
        aria-label="Previous slide"
      >
        ◀
      </button>

      <button
        onClick={goNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-50
        bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
        aria-label="Next slide"
      >
        ▶
      </button>

      {/* DOTS */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setIndex(i);
              resetAutoSwipe();
            }}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
