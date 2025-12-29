
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HeroSliderClient({ items }) {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const startX = useRef(0);
  const startY = useRef(0);
  const startTime = useRef(0);
  const autoSwipeRef = useRef();

  if (!items || items.length < 1) return null;

  // 🔹 Touch handlers
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
      setIndex((i) => (dx < 0 ? (i + 1) % items.length : (i - 1 + items.length) % items.length));
      resetAutoSwipe();
      return;
    }

    // Tap
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20 && dt < TAP_TIME) {
      const url = items[index]?.page_url;
      if (url) router.push(url);
    }
  };

  // 🔹 Auto swipe every 4s
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

  const resetAutoSwipe = () => {
    startAutoSwipe();
  };

  // 🔹 Navigate with buttons
  const goPrev = () => {
    setIndex((i) => (i - 1 + items.length) % items.length);
    resetAutoSwipe();
  };

  const goNext = () => {
    setIndex((i) => (i + 1) % items.length);
    resetAutoSwipe();
  };

  return (
    <div className="relative w-full aspect-[16/9] md:h-[500px] rounded-xl overflow-hidden">
      {/* Images */}
      {items.map((item, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={item.backdrop_url}
            alt={item.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority={i === 0} // first image is LCP
          />
        </div>
      ))}

      {/* Title */}
      <div className="absolute left-4 bottom-4 md:left-8 md:bottom-8 z-20 max-w-xl text-white">
        <h2 className="text-xl md:text-3xl font-semibold leading-tight line-clamp-2">
          {items[index].title}
        </h2>
        {items[index].subtitle && (
          <p className="text-sm md:text-base text-white/75 mt-1 line-clamp-2">
            {items[index].subtitle}
          </p>
        )}
      </div>

      {/* Touch layer */}
      <div
        className="absolute inset-0 z-30"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      />

      {/* Navigation buttons */}
      <button
        onClick={goPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-40 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
        aria-label="Previous slide"
      >
        ◀
      </button>
      <button
        onClick={goNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-40 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
        aria-label="Next slide"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-40">
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
