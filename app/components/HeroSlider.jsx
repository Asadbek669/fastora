
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Icons
const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default function HeroSlider() {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const AUTOPLAY_DURATION = 5000;
  const TRANSITION_DURATION = 600;

  const timerRef = useRef(null);
  const router = useRouter();

  // Mobile check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Load slides
  useEffect(() => {
    fetch("/api/heroes")
      .then(r => r.json())
      .then(setItems)
      .catch(() => {});
  }, []);

  // Autoplay
  useEffect(() => {
    if (!items.length || isAnimating || showPlayButton) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => setCurrentIndex((i) => (i + 1) % items.length),
      AUTOPLAY_DURATION
    );
    return () => clearTimeout(timerRef.current);
  }, [currentIndex, items.length, isAnimating, showPlayButton]);

  if (!items.length) {
    return (
      <div className="relative w-full aspect-[16/9] md:h-[500px] rounded-xl overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse" />
    );
  }

  const item = items[currentIndex];

  return (
    <div className="relative w-full aspect-[16/9] md:h-[500px] rounded-xl overflow-hidden">
      
      {/* 🔥 LCP IMAGE */}
      <Image
        src={item.backdrop_url}
        alt={item.title}
        fill
        priority          // 🔥 ENG MUHIM
        fetchPriority="high" 
        sizes="100vw"
        quality={75}
        className={`object-cover transition-transform duration-[600ms] ${
          isAnimating ? "-translate-x-full" : "translate-x-0"
        }`}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />

      {/* Content */}
      <div className="absolute left-4 bottom-4 md:left-8 md:bottom-8 z-20 max-w-xl">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
          {item.title}
        </h2>
        {item.subtitle && (
          <p className="text-sm md:text-lg text-white/80 line-clamp-2">
            {item.subtitle}
          </p>
        )}
      </div>

      {/* Play button */}
      {showPlayButton && (
        <div
          className="absolute inset-0 flex items-center justify-center z-30"
          onClick={() => router.push(item.page_url)}
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-xl">
            <PlayIcon />
          </div>
        </div>
      )}

      {/* Click handler */}
      <button
        className="absolute inset-0 z-40"
        onClick={() => setShowPlayButton(!showPlayButton)}
        aria-label="Open"
      />
    </div>
  );
}
