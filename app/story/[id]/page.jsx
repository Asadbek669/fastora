"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import convertToEmbed from "@/utils/convertEmbed";

// Icons (SVG)
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const PrevIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

const NextIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

const PlayIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default function StoryPage() {
  const router = useRouter();
  const { id } = useParams();

  const [story, setStory] = useState(null);
  const [allStories, setAllStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef(null);
  const progressInterval = useRef(null);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const videoStartTime = useRef(0);

  // Disable scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  // Load all stories
  useEffect(() => {
    async function loadAll() {
      const base = "https://fastora.uz";
      const res = await fetch(`${base}/api/stories`, { cache: "no-store" });
      const data = await res.json();
      setAllStories(data);
    }
    loadAll();
  }, []);

  // Load current story
  useEffect(() => {
    if (!id) return;

    async function loadStory() {
      const base = "https://fastora.uz";
      const res = await fetch(`${base}/api/stories/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        setStory({ error: true });
        return;
      }

      const data = await res.json();
      setStory(data);

      const index = allStories.findIndex((s) => String(s.id) === String(id));
      setCurrentIndex(index >= 0 ? index : 0);
      setVideoLoaded(false);
      setProgress(0);
      videoStartTime.current = Date.now();
      setIsPlaying(true);
    }

    loadStory();
  }, [id, allStories]);

  // Progress bar animation
  useEffect(() => {
    if (!story || !isPlaying) {
      clearInterval(progressInterval.current);
      return;
    }

    const STORY_DURATION = 15000; // 15 seconds per story

    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - videoStartTime.current;
      const newProgress = (elapsed / STORY_DURATION) * 100;
      
      if (newProgress >= 100) {
        gotoNextStory();
      } else {
        setProgress(newProgress);
      }
    }, 100);

    return () => clearInterval(progressInterval.current);
  }, [story, isPlaying, currentIndex]);

  // Video controls
  const togglePlay = useCallback(() => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      } else {
        videoRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
    }
  }, [isPlaying]);

  // Navigation
  const gotoNextStory = useCallback(() => {
    const next = allStories[currentIndex + 1];
    if (next) {
      router.push(`/story/${next.id}`);
    } else {
      router.push("/");
    }
  }, [currentIndex, allStories, router]);

  const gotoPrevStory = useCallback(() => {
    const prev = allStories[currentIndex - 1];
    if (prev) {
      router.push(`/story/${prev.id}`);
    }
  }, [currentIndex, allStories, router]);

  // Touch controls for swipe
  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaY = touchEndY - touchStartY.current;
    const deltaX = touchEndX - touchStartX.current;

    // Vertical swipe up to close
    if (deltaY < -100 && Math.abs(deltaX) < 50) {
      router.push("/");
      return;
    }

    // Horizontal swipe for navigation
    if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 80) {
      if (deltaX > 0) {
        gotoPrevStory();
      } else {
        gotoNextStory();
      }
    }
  }, [gotoNextStory, gotoPrevStory, router]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          gotoPrevStory();
          break;
        case "ArrowRight":
        case " ":
          gotoNextStory();
          break;
        case "Escape":
          router.push("/");
          break;
        case "p":
        case "P":
          togglePlay();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gotoNextStory, gotoPrevStory, router, togglePlay]);

  // Click controls
  const handleVideoClick = useCallback((e) => {
    const containerWidth = window.innerWidth;
    const clickX = e.clientX;
    
    if (clickX < containerWidth * 0.33) {
      gotoPrevStory();
    } else if (clickX > containerWidth * 0.66) {
      gotoNextStory();
    } else {
      togglePlay();
    }
  }, [gotoNextStory, gotoPrevStory, togglePlay]);

  if (!id || !story) {
    return (
      <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
        <div className="relative w-full max-w-[430px] h-screen bg-gray-900 animate-pulse">
          {/* Loading skeleton */}
          <div className="absolute top-4 left-0 right-0 flex gap-2 px-4">
            <div className="w-full h-1 bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (story.error) {
    return (
      <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
        <div className="text-center p-6">
          <h1 className="text-red-500 text-xl mb-4">Story topilmadi</h1>
          <button
            onClick={() => router.push("/")}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full"
          >
            Ortga qaytish
          </button>
        </div>
      </div>
    );
  }

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allStories.length - 1;

  return (
    <div 
      className="fixed inset-0 bg-black z-[9999]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top progress bars */}
      <div className="absolute top-0 left-0 right-0 flex gap-1 px-2 pt-2 z-50">
        {allStories.map((s, i) => (
          <div key={s.id} className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-100 ease-linear"
              style={{
                width: i === currentIndex ? `${progress}%` : 
                       i < currentIndex ? "100%" : "0%",
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Top controls */}
      <div className="absolute top-3 left-3 right-3 z-50 flex justify-between items-center">
        <button
          onClick={() => router.push("/")}
          className="w-10 h-10 flex items-center justify-center
          bg-black/40 backdrop-blur-md text-white rounded-full
          hover:bg-black/60 transition-all"
        >
          <CloseIcon />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-white/90 text-sm font-medium px-3 py-1 
          bg-black/40 backdrop-blur-md rounded-full">
            {currentIndex + 1} / {allStories.length}
          </span>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-10 h-10 flex items-center justify-center
            bg-black/40 backdrop-blur-md text-white rounded-full
            hover:bg-black/60 transition-all"
          >
            <InfoIcon />
          </button>
        </div>
      </div>

      {/* Video container */}
      <div 
        className="relative w-full h-full flex items-center justify-center"
        onClick={handleVideoClick}
      >
        {/* Video player - YouTube Shorts style */}
        <div className="relative w-full max-w-[430px] h-full bg-black">
          <iframe
            ref={videoRef}
            className="absolute inset-0 w-full h-full"
            src={`${convertToEmbed(story.youtube_url)}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`}
            allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setVideoLoaded(true)}
            style={{
              pointerEvents: "none"
            }}
          ></iframe>

          {/* Loading overlay */}
          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Play/Pause overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="w-20 h-20 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center">
                <PlayIcon />
              </div>
            </div>
          )}

          {/* Video controls hint */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 
          bg-black/60 backdrop-blur-md text-white text-xs px-3 py-2 rounded-full 
          opacity-0 animate-fadeInOut pointer-events-none">
            Chap: Oldingi • Oʻrta: Play/Pause • Oʻng: Keyingisi
          </div>
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-50 
      bg-gradient-to-t from-black via-black/80 to-transparent">
        {/* Title and metadata */}
        <div className="mb-6">
          <h1 className="text-white text-xl font-bold mb-2 line-clamp-2">
            {story.title}
          </h1>
          {story.subtitle && (
            <p className="text-white/80 text-sm mb-3 line-clamp-2">
              {story.subtitle}
            </p>
          )}
          
          <div className="flex items-center gap-3 text-white/60 text-sm">
            {story.duration && (
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                ⏱️ {story.duration}
              </span>
            )}
            {story.views && (
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                👁️ {story.views}
              </span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="w-12 h-12 flex items-center justify-center
              bg-white/10 backdrop-blur-md text-white rounded-full
              hover:bg-white/20 transition-all"
            >
              {isPlaying ? (
                <div className="flex items-center gap-1">
                  <div className="w-1 h-3 bg-white"></div>
                  <div className="w-1 h-3 bg-white"></div>
                </div>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => window.location.href = story.page_url}
              className="bg-gradient-to-r from-red-600 to-red-700
              text-white px-6 py-3 rounded-full text-sm font-semibold
              hover:from-red-700 hover:to-red-800 transition-all
              backdrop-blur-md shadow-lg"
            >
              Batafsil ma'lumot →
            </button>
          </div>

          {/* Navigation buttons (visible on hover) */}
          <div className="flex items-center gap-2 opacity-0 hover:opacity-100 transition-opacity">
            <button
              onClick={gotoPrevStory}
              disabled={!hasPrev}
              className={`w-10 h-10 flex items-center justify-center rounded-full
              backdrop-blur-md transition-all ${
                hasPrev
                  ? "bg-white/10 hover:bg-white/20 text-white"
                  : "bg-white/5 text-white/30 pointer-events-none"
              }`}
            >
              <PrevIcon />
            </button>
            
            <button
              onClick={gotoNextStory}
              disabled={!hasNext}
              className={`w-10 h-10 flex items-center justify-center rounded-full
              backdrop-blur-md transition-all ${
                hasNext
                  ? "bg-white/10 hover:bg-white/20 text-white"
                  : "bg-white/5 text-white/30 pointer-events-none"
              }`}
            >
              <NextIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Details modal */}
      {showDetails && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-[100] 
        flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gray-900/90 backdrop-blur-md rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl font-bold">Ma'lumot</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-white/70 hover:text-white"
              >
                <CloseIcon />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-white/80 text-sm mb-1">Sarlavha</h3>
                <p className="text-white text-lg">{story.title}</p>
              </div>
              
              {story.description && (
                <div>
                  <h3 className="text-white/80 text-sm mb-1">Tavsif</h3>
                  <p className="text-white/90">{story.description}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                {story.duration && (
                  <div>
                    <h3 className="text-white/80 text-sm mb-1">Davomiyligi</h3>
                    <p className="text-white">{story.duration}</p>
                  </div>
                )}
                {story.views && (
                  <div>
                    <h3 className="text-white/80 text-sm mb-1">Koʻrishlar</h3>
                    <p className="text-white">{story.views}</p>
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={() => window.location.href = story.page_url}
              className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700
              text-white py-3 rounded-full font-semibold hover:from-red-700 hover:to-red-800"
            >
              Toʻliq ma'lumot
            </button>
          </div>
        </div>
      )}

      {/* Navigation hints */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 
      opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
        <div className="text-white/50 text-xs text-center rotate-90">
          SWIPE ←
        </div>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 
      opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
        <div className="text-white/50 text-xs text-center -rotate-90">
          SWIPE →
        </div>
      </div>
    </div>
  );
}
