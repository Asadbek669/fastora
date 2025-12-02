"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function HeroSlider() {
  const [items, setItems] = useState([]);
  const [idx, setIdx] = useState(0);

  const AUTOPLAY = 7000; 
  const TRANSITION = 2000;

  const timerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const router = useRouter();

  // Load slides
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/heroes");
      const data = await res.json();
      setItems(data);
    }
    load();
  }, []);

  // Autoplay
  useEffect(() => {
    if (!items.length) return;

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIdx((i) => (i + 1) % items.length);
    }, AUTOPLAY);

    return () => clearTimeout(timerRef.current);
  }, [idx, items]);

  // Navigate
  function next() {
    setIdx((i) => (i + 1) % items.length);
  }
  function prev() {
    setIdx((i) => (i - 1 + items.length) % items.length);
  }

  // Touch swipe
  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchMove(e) {
    touchEndX.current = e.touches[0].clientX;
  }
  function onTouchEnd() {
    const dx = touchEndX.current - touchStartX.current;

    if (Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    } else {
      // small tap → open page
      const url = items[idx]?.page_url;
      if (url) router.push(url);
    }
  }

  if (!items.length) return null;

  const current = items[idx];

  return (
    <div
      className="relative w-full aspect-video rounded-xl overflow-hidden select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClick={() => router.push(current.page_url)}
    >
      {/* Fade Slides */}
      {items.map((it, i) => (
        <div
          key={it.id}
          className="absolute inset-0 transition-opacity ease-linear"
          style={{
            transitionDuration: `${TRANSITION}ms`,
            opacity: i === idx ? 1 : 0,
            backgroundImage: `url(${it.backdrop_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />

      {/* Title ONLY */}
      <div className="absolute bottom-6 left-4 right-4 z-50 text-white">
        <h2 className="text-2xl font-bold drop-shadow-lg">
          {current.title}
        </h2>
      </div>
    </div>
  );
}
