"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";

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
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const VolumeOnIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);

const VolumeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
  </svg>
);

const FullscreenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
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
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef(null);
  const controlsTimerRef = useRef(null);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const containerRef = useRef(null);

  // Disable scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      exitFullscreen();
    };
  }, []);

  // Auto-hide controls
  useEffect(() => {
    if (showControls) {
      clearTimeout(controlsTimerRef.current);
      controlsTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => clearTimeout(controlsTimerRef.current);
  }, [showControls]);

  // Load all stories
  useEffect(() => {
    async function loadAll() {
      try {
        const base = "https://fastora.uz";
        const res = await fetch(`${base}/api/stories`, { 
          cache: "no-store" 
        });
        const data = await res.json();
        setAllStories(data);
      } catch (error) {
        console.error("Failed to load stories:", error);
      }
    }
    loadAll();
  }, []);

  // Load current story
  useEffect(() => {
    if (!id) return;

    async function loadStory() {
      try {
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
        setVideoError(false);

        const index = allStories.findIndex((s) => String(s.id) === String(id));
        setCurrentIndex(index >= 0 ? index : 0);
        setVideoLoaded(false);
        setProgress(0);
        setIsPlaying(true);
        setShowControls(true);

      } catch (error) {
        console.error("Failed to load story:", error);
        setStory({ error: true });
      }
    }

    loadStory();
  }, [id, allStories]);

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration > 0) {
        const currentProgress = (video.currentTime / video.duration) * 100;
        setProgress(currentProgress);
      }
    };

    const handleLoadedData = () => {
      setVideoLoaded(true);
      if (isPlaying) {
        video.play().catch(e => {
          console.log("Autoplay prevented:", e);
          setIsPlaying(false);
        });
      }
    };

    const handleEnded = () => {
      gotoNextStory();
    };

    const handleError = () => {
      setVideoError(true);
      console.error("Video loading error");
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [isPlaying]);

  // Video controls
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setShowControls(true);
  }, []);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    
    if (videoRef.current.muted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
    setShowControls(true);
  }, []);

  const handleVolumeChange = useCallback((e) => {
    if (!videoRef.current) return;
    
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    setShowControls(true);
  }, []);

  const handleSeek = useCallback((e) => {
    if (!videoRef.current || !videoRef.current.duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const seekTime = (x / width) * videoRef.current.duration;
    
    videoRef.current.currentTime = seekTime;
    setShowControls(true);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
    setShowControls(true);
  }, []);

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

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

  // Touch controls
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
    
    setShowControls(true);
  }, [gotoNextStory, gotoPrevStory, router]);

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
    
    setShowControls(true);
  }, [gotoNextStory, gotoPrevStory, togglePlay]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          gotoPrevStory();
          break;
        case "ArrowRight":
        case " ":
          if (e.key === " ") {
            e.preventDefault();
            togglePlay();
          } else {
            gotoNextStory();
          }
          break;
        case "Escape":
          if (isFullscreen) {
            exitFullscreen();
          } else {
            router.push("/");
          }
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "m":
        case "M":
          toggleMute();
          break;
      }
      setShowControls(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gotoNextStory, gotoPrevStory, router, togglePlay, toggleFullscreen, toggleMute, isFullscreen]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!id || !story) {
    return (
      <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
        <div className="relative w-full max-w-[430px] h-screen bg-gray-900">
          {/* Loading skeleton */}
          <div className="absolute top-4 left-0 right-0 flex gap-2 px-4">
            <div className="w-full h-1 bg-gray-700 rounded-full"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
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
      ref={containerRef}
      className="fixed inset-0 bg-black z-[9999]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => setShowControls(true)}
    >
      {/* Top progress bars */}
      <div className="absolute top-0 left-0 right-0 flex gap-1 px-2 pt-2 z-50">
        {allStories.map((s, i) => (
          <div key={s.id} className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-100 ease-linear"
              style={{
                width: i === currentIndex ? `${Math.min(progress, 100)}%` : 
                       i < currentIndex ? "100%" : "0%",
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Top controls */}
      <div className={`absolute top-3 left-3 right-3 z-50 flex justify-between items-center transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={() => router.push("/")}
          className="w-10 h-10 flex items-center justify-center
          bg-black/40 backdrop-blur-md text-white rounded-full
          hover:bg-black/60 transition-all active:scale-95"
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
            hover:bg-black/60 transition-all active:scale-95"
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
        {/* Video player */}
        <div className="relative w-full max-w-[430px] h-full bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            src={story.video_url || story.youtube_url}
            playsInline
            webkit-playsinline="true"
            preload="auto"
            muted={isMuted}
            autoPlay
          />

          {/* Loading overlay */}
          {!videoLoaded && !videoError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Error overlay */}
          {videoError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 p-4">
              <div className="text-red-500 text-xl mb-4">⚠️ Video yuklanmadi</div>
              <p className="text-white/70 text-center mb-6">
                Video yuklashda xatolik yuz berdi. Iltimos, internet aloqasini tekshiring.
              </p>
              <button
                onClick={() => {
                  setVideoError(false);
                  if (videoRef.current) {
                    videoRef.current.load();
                  }
                }}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full"
              >
                Qayta urinish
              </button>
            </div>
          )}

          {/* Play/Pause overlay */}
          {!isPlaying && videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <button
                onClick={togglePlay}
                className="w-20 h-20 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center
                hover:bg-black/70 transition-all active:scale-95"
              >
                <PlayIcon />
              </button>
            </div>
          )}

          {/* Video controls overlay */}
          <div 
            className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Progress bar */}
            <div 
              className="relative w-full h-1 bg-white/30 rounded-full mb-4 cursor-pointer"
              onClick={handleSeek}
            >
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
              <div 
                className="absolute w-4 h-4 bg-white rounded-full -top-1.5 shadow-lg"
                style={{ left: `calc(${progress}% - 8px)` }}
              />
            </div>

            {/* Control buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 flex items-center justify-center
                  bg-white/10 backdrop-blur-md text-white rounded-full
                  hover:bg-white/20 transition-all active:scale-95"
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>

                {/* Volume control */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white"
                  >
                    {isMuted || volume === 0 ? <VolumeOffIcon /> : <VolumeOnIcon />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 accent-red-500"
                  />
                </div>

                {/* Time display */}
                <div className="text-white text-sm font-medium">
                  {videoRef.current && (
                    <>
                      {formatTime(videoRef.current.currentTime)} / {formatTime(videoRef.current.duration)}
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFullscreen}
                  className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white"
                >
                  <FullscreenIcon />
                </button>
                
                <button
                  onClick={() => window.open(story.page_url, '_blank')}
                  className="bg-gradient-to-r from-red-600 to-red-700
                  text-white px-6 py-2 rounded-full text-sm font-semibold
                  hover:from-red-700 hover:to-red-800 transition-all
                  backdrop-blur-md shadow-lg active:scale-95"
                >
                  Batafsil →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className={`absolute top-1/2 left-4 right-4 -translate-y-1/2 flex justify-between transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={gotoPrevStory}
          disabled={!hasPrev}
          className={`w-12 h-12 flex items-center justify-center rounded-full
          backdrop-blur-md transition-all active:scale-95 ${
            hasPrev
              ? "bg-black/40 hover:bg-black/60 text-white"
              : "bg-black/20 text-white/30 pointer-events-none"
          }`}
        >
          <PrevIcon />
        </button>
        
        <button
          onClick={gotoNextStory}
          disabled={!hasNext}
          className={`w-12 h-12 flex items-center justify-center rounded-full
          backdrop-blur-md transition-all active:scale-95 ${
            hasNext
              ? "bg-black/40 hover:bg-black/60 text-white"
              : "bg-black/20 text-white/30 pointer-events-none"
          }`}
        >
          <NextIcon />
        </button>
      </div>

      {/* Bottom title */}
      <div className={`absolute bottom-20 left-0 right-0 p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-white text-xl font-bold mb-2 line-clamp-2 text-center">
          {story.title}
        </h1>
        {story.subtitle && (
          <p className="text-white/80 text-sm text-center">
            {story.subtitle}
          </p>
        )}
      </div>

      {/* Details modal */}
      {showDetails && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-[100] 
        flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gray-900/90 backdrop-blur-md rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
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
                  <p className="text-white/90 whitespace-pre-line">{story.description}</p>
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
              onClick={() => window.open(story.page_url, '_blank')}
              className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700
              text-white py-3 rounded-full font-semibold hover:from-red-700 hover:to-red-800
              active:scale-95 transition-all"
            >
              Toʻliq ma'lumot
            </button>
          </div>
        </div>
      )}

      {/* Tap hints */}
      {!showControls && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 
        bg-black/60 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full 
        animate-fadeInOut pointer-events-none">
          ◀︎ Chap • ▷ Play/Pause • ▶︎ Oʻng
        </div>
      )}
    </div>
  );
}

// Helper function to format time
function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
      }
