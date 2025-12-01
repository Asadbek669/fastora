"use client";

import { useEffect, useState, useRef } from "react";

export default function HeroSlider({ testData = [] }) {
  // 🟢 testData bo‘sh bo‘lsa — komponentni render qilmaymiz
  if (!testData || testData.length === 0) {
    return (
      <div className="w-full h-48 rounded-2xl bg-[#111] flex items-center justify-center text-gray-500">
        Ma’lumot topilmadi
      </div>
    );
  }

  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const slides = testData.slice(0, 5);

  useEffect(() => {
    if (slides.length === 0) return; // 🛑 xato chiqmasin

    startAutoSlide();
    return () => stopAutoSlide();
  }, [current, slides.length]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 4000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const startX = useRef(0);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    stopAutoSlide();
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;

    if (startX.current - endX > 50) {
      setCurrent(prev => (prev + 1) % slides.length);
    } else if (endX - startX.current > 50) {
      setCurrent(prev => (prev - 1 + slides.length) % slides.length);
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
          src={s.poster}  // 🟢 Senda poster_url emas — poster bor!
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700
            ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"}
          `}
        />
      ))}

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/40 text-center text-lg font-semibold">
        {slides[current]?.title}
      </div>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${i === current ? "bg-white" : "bg-white/40"}`}
          ></div>
        ))}
      </div>
    </div>
  );
}

