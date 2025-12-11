"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function HeroSlider() {
  const [items, setItems] = useState([]);
  const [idx, setIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchAction, setTouchAction] = useState(null); // 'swipe' | 'click' | null

  const AUTOPLAY = 7000;
  const TRANSITION = 1000; // Biraz qisqartirildi

  const timerRef = useRef(null);
  const transitionRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartTime = useRef(0);
  const containerRef = useRef(null);

  const router = useRouter();

  // Load slides
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/heroes");
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to load slides:", error);
      }
    }
    load();
  }, []);

  // Smooth transition function
  const changeSlide = useCallback((direction) => {
    if (isTransitioning || items.length === 0) return;
    
    setIsTransitioning(true);
    
    if (direction === 'next') {
      setIdx((i) => (i + 1) % items.length);
    } else {
      setIdx((i) => (i - 1 + items.length) % items.length);
    }
    
    // Transition tugagach holatni tiklash
    clearTimeout(transitionRef.current);
    transitionRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION);
  }, [isTransitioning, items.length]);

  // Navigate functions
  const next = useCallback(() => changeSlide('next'), [changeSlide]);
  const prev = useCallback(() => changeSlide('prev'), [changeSlide]);

  // Autoplay with pause during interaction
  useEffect(() => {
    if (!items.length || isTransitioning) return;

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      next();
    }, AUTOPLAY);

    return () => clearTimeout(timerRef.current);
  }, [idx, items.length, isTransitioning, next]);

  // Touch handlers with improved detection
  const onTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
    setTouchAction(null);
    clearTimeout(timerRef.current); // Autoplay'ni to'xtatish
  }, []);

  const onTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX;
    
    // Swipe aniqlash
    const dx = touchEndX.current - touchStartX.current;
    if (Math.abs(dx) > 20) {
      setTouchAction('swipe');
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    const dx = touchEndX.current - touchStartX.current;
    const dt = Date.now() - touchStartTime.current;
    const swipeThreshold = 50;
    const timeThreshold = 300;

    // Swipe aniqlash
    if (Math.abs(dx) > swipeThreshold && dt < timeThreshold && touchAction === 'swipe') {
      e?.preventDefault();
      if (dx < 0) next();
      else prev();
      setTouchAction(null);
      return;
    }

    // Tap aniqlash (klik)
    if (Math.abs(dx) < 10 && dt < 200 && touchAction !== 'swipe') {
      const url = items[idx]?.page_url;
      if (url) {
        router.push(url);
      }
    }

    // Touch action'ni reset
    setTouchAction(null);
    
    // Autoplay'ni qayta boshlash
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      next();
    }, AUTOPLAY / 2);
  }, [idx, items, next, prev, router, touchAction]);

  // Click handler with debounce
  const handleClick = useCallback(() => {
    if (touchAction === 'swipe') return; // Swipe bo'lsa click'ni ignore qilish
    
    const url = items[idx]?.page_url;
    if (url) {
      router.push(url);
    }
  }, [idx, items, router, touchAction]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  // Pagination dots
  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === idx) return;
    setIdx(index);
  }, [isTransitioning, idx]);

  if (!items.length) return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-200 animate-pulse" />
  );

  const current = items[idx];

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-xl overflow-hidden select-none cursor-pointer group"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClick={handleClick}
    >
      {/* Fade Slides with improved transition */}
      {items.map((it, i) => (
        <div
          key={it.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            i === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          style={{
            backgroundImage: `url(${it.backdrop_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transitionDelay: i === idx ? '0ms' : '100ms'
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* Navigation buttons - hoverda ko'rinadi */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label="Previous slide"
      >
        ←
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label="Next slide"
      >
        →
      </button>

      {/* Title and subtitle */}
      <div className="absolute bottom-8 left-6 right-6 z-30 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg animate-fadeInUp">
          {current.title}
        </h2>
        {current.subtitle && (
          <p className="text-lg opacity-90 drop-shadow-md animate-fadeInUp animation-delay-200">
            {current.subtitle}
          </p>
        )}
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {items.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === idx 
                ? 'bg-white w-6' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar for autoplay */}
      <div className="absolute top-0 left-0 right-0 h-1 z-40">
        <div 
          className="h-full bg-white/80 transition-all duration-1000 ease-linear"
          style={{
            width: isTransitioning ? '100%' : '0%',
            transition: isTransitioning 
              ? `width ${AUTOPLAY}ms linear` 
              : 'none'
          }}
          key={idx} // Har bir slide uchun yangilash
        />
      </div>
    </div>
  );
}
