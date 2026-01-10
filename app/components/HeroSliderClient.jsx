
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

  if (!items?.length) return null;

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
  fetchpriority={i === 0 ? "high" : "auto"}
  loading={i === 0 ? "eager" : "lazy"}
  decoding="async"
  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
    i === index ? "opacity-100 z-10" : "opacity-0 z-0"
  }`}
/>
      ))}

      {/* 🔹 FAOL TITLE OSTI QORAMTIR STRIP (KICHIK) */}
      <div className="absolute bottom-2 left-0 w-full h-10 bg-black/50 z-20" />

      {/* 🔹 TITLE */}
      <div className="absolute bottom-2 left-0 w-full h-10 z-30 flex items-center justify-center px-4">
        <h2 className="text-white text-lg md:text-2xl font-semibold drop-shadow text-center line-clamp-1">
          {items[index].title}
        </h2>
      </div>

      {/* TOUCH LAYER */}
      <div
        className="absolute inset-0 z-40"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      />

  

      {/* ⚡ INDICATOR OLIB TASHLANDI */}

    </div>
  );
}
