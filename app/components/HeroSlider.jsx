"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

// SVG icons for Play, ChevronLeft, ChevronRight
const PlayIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className="w-8 h-8"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

const ChevronLeft = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

const ChevronRight = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

export default function HeroSlider() {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [touchType, setTouchType] = useState(null);
  const [direction, setDirection] = useState('right');
  const [isMobile, setIsMobile] = useState(false);

  const AUTOPLAY_DURATION = 5000;
  const TRANSITION_DURATION = 600;

  const timerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const containerRef = useRef(null);
  const playButtonTimerRef = useRef(null);

  const router = useRouter();

  // Check mobile/desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Smooth slide change with direction
  const changeSlide = useCallback((newIndex, dir = 'right') => {
    if (isAnimating || items.length === 0) return;
    
    setDirection(dir);
    setIsAnimating(true);
    setCurrentIndex(newIndex);
    setShowPlayButton(false);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, TRANSITION_DURATION);
  }, [isAnimating, items.length]);

  const nextSlide = useCallback(() => {
    const nextIndex = (currentIndex + 1) % items.length;
    changeSlide(nextIndex, 'right');
  }, [currentIndex, items.length, changeSlide]);

  const prevSlide = useCallback(() => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    changeSlide(prevIndex, 'left');
  }, [currentIndex, items.length, changeSlide]);

  // Autoplay
  useEffect(() => {
    if (!items.length || isAnimating || showPlayButton) return;

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      nextSlide();
    }, AUTOPLAY_DURATION);

    return () => clearTimeout(timerRef.current);
  }, [currentIndex, items.length, isAnimating, nextSlide, showPlayButton]);

  // Touch handlers
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
    setTouchType(null);
    clearTimeout(timerRef.current);
    clearTimeout(playButtonTimerRef.current);
    setShowPlayButton(false);
  }, []);

  const handleTouchMove = useCallback((e) => {
    const currentX = e.touches[0].clientX;
    const dx = currentX - touchStartX.current;
    
    if (Math.abs(dx) > 10) {
      setTouchType('swipe');
    }
  }, []);

  const handleTouchEnd = useCallback((e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const dx = endX - touchStartX.current;
    const dy = endY - touchStartY.current;
    const time = Date.now() - touchStartTime.current;
    
    const swipeThreshold = isMobile ? 30 : 50;
    const maxVerticalSwipe = 30;
    const tapTimeThreshold = 250;
    
    // Vertical swipe check
    if (Math.abs(dy) > maxVerticalSwipe) {
      setTouchType(null);
      return;
    }
    
    // Horizontal swipe detection
    if (Math.abs(dx) > swipeThreshold && time < 300 && touchType === 'swipe') {
      e.preventDefault();
      if (dx < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setTouchType(null);
      return;
    }
    
    // Tap detection
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20 && time < tapTimeThreshold) {
      setTouchType('tap');
      
      if (!showPlayButton) {
        setShowPlayButton(true);
        
        playButtonTimerRef.current = setTimeout(() => {
          setShowPlayButton(false);
        }, 3000);
      } else {
        const url = items[currentIndex]?.page_url;
        if (url) {
          router.push(url);
        }
      }
    }
    
    setTouchType(null);
    
    if (!showPlayButton) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        nextSlide();
      }, AUTOPLAY_DURATION);
    }
  }, [currentIndex, items, nextSlide, prevSlide, router, showPlayButton, touchType, isMobile]);

  // Handle click
  const handleClick = useCallback((e) => {
    if (touchType === 'swipe') return;
    
    if (!showPlayButton) {
      setShowPlayButton(true);
      
      playButtonTimerRef.current = setTimeout(() => {
        setShowPlayButton(false);
      }, 3000);
    } else {
      const url = items[currentIndex]?.page_url;
      if (url) {
        router.push(url);
      }
    }
  }, [currentIndex, items, router, showPlayButton, touchType]);

  // Go to specific slide
  const goToSlide = useCallback((index) => {
    if (isAnimating || index === currentIndex) return;
    const dir = index > currentIndex ? 'right' : 'left';
    changeSlide(index, dir);
  }, [currentIndex, isAnimating, changeSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'Escape') setShowPlayButton(false);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Cleanup
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(playButtonTimerRef.current);
    };
  }, []);

  if (!items.length) {
    return (
      <div className="relative w-full aspect-[16/9] md:h-[500px] rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse" />
    );
  }

  const currentItem = items[currentIndex];
  const nextItem = items[(currentIndex + 1) % items.length];

  // Responsive values
  const sliderHeight = isMobile ? "auto" : "500px";
  const aspectRatio = isMobile ? "aspect-[16/9]" : "";
  const titleSize = isMobile ? "text-2xl" : "text-4xl";
  const subtitleSize = isMobile ? "text-sm" : "text-lg";
  const nextSlideWidth = isMobile ? "w-1/4" : "w-1/3";
  const contentRight = isMobile ? "right-[30%]" : "right-[35%]";
  const contentPadding = isMobile ? "left-4 bottom-4" : "left-8 bottom-8";
  const arrowSize = isMobile ? "w-8 h-8" : "w-12 h-12";
  const playButtonSize = isMobile ? "w-14 h-14" : "w-20 h-20";
  const metadataGap = isMobile ? "gap-2" : "gap-4";

  return (
    <div className={`relative w-full ${aspectRatio} md:h-[500px] rounded-xl md:rounded-2xl overflow-hidden select-none`}>
      {/* Main container for touch */}
      <div
        ref={containerRef}
        className="relative w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        {/* Current slide - 16:9 aspect ratio for all devices */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${currentItem.backdrop_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateX(${isAnimating && direction === 'right' ? '-100%' : 
                         isAnimating && direction === 'left' ? '100%' : '0%'})`,
            transition: isAnimating ? `transform ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none',
            zIndex: 20,
          }}
        >
          {/* Gradient overlay - responsive */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        </div>

        {/* Next slide preview (on the side) - Hidden on small mobile */}
        {!isMobile && nextItem && (
          <div
            className={`absolute right-0 top-0 ${nextSlideWidth} h-full overflow-hidden`}
            style={{ zIndex: 10 }}
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${nextItem.backdrop_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-transparent" />
            <div className="absolute bottom-8 right-4 left-4">
              <p className="text-white/70 text-xs font-medium mb-1 truncate">Keyingisi</p>
              <h4 className="text-white text-sm font-semibold truncate">{nextItem.title}</h4>
            </div>
          </div>
        )}

        {/* Title and info - Responsive */}
        <div className={`absolute ${contentPadding} ${contentRight} z-30`}>
          <div className="mb-2 md:mb-4">
            <span className="inline-block px-2 py-1 md:px-3 md:py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs font-medium mb-2 md:mb-3">
              Featured
            </span>
            <h2 className={`${titleSize} font-bold text-white mb-2 md:mb-3 leading-tight drop-shadow-2xl line-clamp-2`}>
              {currentItem.title}
            </h2>
            {currentItem.subtitle && (
              <p className={`${subtitleSize} text-white/80 max-w-2xl drop-shadow-lg line-clamp-2 md:line-clamp-3`}>
                {currentItem.subtitle}
              </p>
            )}
          </div>
          
          {/* Metadata - Responsive */}
          <div className={`flex items-center ${metadataGap} text-white/70 text-xs md:text-sm flex-wrap`}>
            {currentItem.year && (
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 bg-white/50 rounded-full" />
                {currentItem.year}
              </span>
            )}
            {currentItem.rating && (
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 bg-white/50 rounded-full" />
                ⭐ {currentItem.rating}/10
              </span>
            )}
            {currentItem.duration && (
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 bg-white/50 rounded-full" />
                ⏱️ {currentItem.duration}
              </span>
            )}
          </div>
        </div>

        {/* Play button - Shows on first tap */}
        {showPlayButton && (
          <div
            className="absolute inset-0 flex items-center justify-center z-40 animate-fadeIn"
            onClick={(e) => {
              e.stopPropagation();
              const url = currentItem.page_url;
              if (url) router.push(url);
            }}
          >
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-50" />
              <div className={`relative ${playButtonSize} bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300`}>
                <PlayIcon />
              </div>
              <div className="absolute -bottom-6 md:-bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1 rounded-md text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Bosish uchun
              </div>
            </div>
          </div>
        )}

        {/* Navigation arrows - Responsive */}
        {!isMobile && (
          <>
            <button
              className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 ${arrowSize} bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-all duration-300 z-30 group`}
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              aria-label="Previous slide"
            >
              <ChevronLeft />
            </button>
            
            <button
              className={`absolute ${isMobile ? 'right-2' : 'right-[calc(33%+1rem)]'} top-1/2 -translate-y-1/2 ${arrowSize} bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-all duration-300 z-30 group`}
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              aria-label="Next slide"
            >
              <ChevronRight />
            </button>
          </>
        )}

        {/* Pagination dots - Responsive */}
        <div className="absolute bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-1 md:gap-2 z-30">
          {items.slice(0, 5).map((_, index) => (
            <button
              key={index}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? 'w-6 md:w-8 h-1.5 md:h-2 bg-white rounded-full'
                  : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-white/40 hover:bg-white/60 rounded-full'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
          {items.length > 5 && (
            <span className="text-white/50 text-xs ml-1">
              +{items.length - 5}
            </span>
          )}
        </div>

        {/* Swipe hint - Only on mobile */}
        {isMobile && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 text-white/50 text-[10px] z-30">
            <div className="flex items-center gap-1">
              <ChevronLeft className="w-3 h-3" />
              <span>Swipe</span>
              <ChevronRight className="w-3 h-3" />
            </div>
            <div className="text-center">yoki bosing</div>
          </div>
        )}
      </div>

      {/* Progress indicator */}
      <div className="absolute top-0 left-0 right-0 h-0.5 md:h-1 z-40">
        <div
          className="h-full bg-gradient-to-r from-red-500 to-orange-500"
          style={{
            width: isAnimating ? '0%' : '100%',
            transition: !isAnimating ? `width ${AUTOPLAY_DURATION}ms linear` : 'none',
          }}
          key={currentIndex}
        />
      </div>
    </div>
  );
}
