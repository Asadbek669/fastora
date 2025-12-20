
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HeroSliderClient({ items }) {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const startX = useRef(0);
  const startY = useRef(0);
  const startTime = useRef(0);

  if (!items || items.length < 2) return null;

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

    // Vertical scroll — ignore
    if (Math.abs(dy) > SWIPE_Y) return;

    // Swipe
    if (Math.abs(dx) > SWIPE_X && dt < 300) {
      setIndex((i) =>
        dx < 0
          ? (i + 1) % items.length
          : (i - 1 + items.length) % items.length
      );
      return;
    }

    // Tap
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20 && dt < TAP_TIME) {
      const url = items[index]?.page_url;
      if (url) router.push(url);
    }
  };

  return (
    <>
      {/* 🖼 CLIENT IMAGE (2+ slaydlar uchun) */}
      {index !== 0 && (
        <div className="absolute inset-0 z-10">
          <Image
            src={items[index].backdrop_url}
            alt={items[index].title}
            fill
            sizes="100vw"
            className="object-cover"
            priority={false} // ❗ LCP EMAS
          />
        </div>
      )}

      {/* 🔤 CLIENT TITLE (2+ slaydlar uchun) */}
      {index !== 0 && (
        <div className="absolute left-4 bottom-4 md:left-8 md:bottom-8 z-20 max-w-xl">
          <h2 className="text-xl md:text-3xl font-semibold text-white leading-tight line-clamp-2">
            {items[index].title}
          </h2>

          {items[index].subtitle && (
            <p className="text-sm md:text-base text-white/75 mt-1 line-clamp-2">
              {items[index].subtitle}
            </p>
          )}
        </div>
      )}

      {/* 🖐 TOUCH LAYER */}
      <div
        className="absolute inset-0 z-30"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      />

      {/* 🔘 DOTS */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {items.slice(0, 5).map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setIndex(i);
            }}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </>
  );
}
