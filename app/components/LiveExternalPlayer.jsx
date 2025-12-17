"use client";

import { useEffect, useState } from "react";

export default function LiveExternalPlayer({ src }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [playerInstance, setPlayerInstance] = useState(null);

  // PlayerJS scriptini yuklash
  useEffect(() => {
    // Agar PlayerJS allaqachon yuklangan bo'lsa
    if (window.Playerjs) return;

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/playerjs@latest/dist/player.min.js";
    script.async = true;
    script.onload = () => {
      console.log("PlayerJS loaded successfully");
    };
    script.onerror = () => {
      console.error("Failed to load PlayerJS");
      setHasError(true);
    };
    
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Player yaratish
  useEffect(() => {
    if (!src || !window.Playerjs || hasError) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    // Oldingi player instance'ni tozalash
    if (playerInstance) {
      try {
        playerInstance.api("destroy");
      } catch (e) {
        console.log("Cleanup error:", e);
      }
    }

    // Yangi player yaratish
    try {
      const player = new window.Playerjs({
        id: `player-${Date.now()}`,
        file: src,
        autoplay: 1,
        controls: 1,
        mute: 0,
        title: "Live Stream",
        poster: null,
        volume: 80,
        debug: process.env.NODE_ENV === "development",
        onReady: () => {
          console.log("Player is ready");
          setIsLoading(false);
          setHasError(false);
        },
        onError: (error) => {
          console.error("Player error:", error);
          setHasError(true);
          setIsLoading(false);
        }
      });
      
      setPlayerInstance(player);
    } catch (error) {
      console.error("Failed to create player:", error);
      setHasError(true);
      setIsLoading(false);
    }

    // Cleanup function
    return () => {
      if (playerInstance) {
        try {
          playerInstance.api("destroy");
        } catch (e) {
          console.log("Cleanup error:", e);
        }
      }
    };
  }, [src]);

  // Error holati
  if (hasError) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-red-500/30">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="mb-4">
            <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.686 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Player yuklanmadi</h3>
          <p className="text-gray-400 text-sm mb-4">
            Streaming xizmati vaqtincha ishlamayapti
          </p>
          <button
            onClick={() => {
              setHasError(false);
              setIsLoading(true);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition"
          >
            Qayta urinish
          </button>
        </div>
      </div>
    );
  }

  // Loading holati
  if (isLoading) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        {/* Loading animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block relative">
              {/* Spinner */}
              <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
              {/* Live indicator inside spinner */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-white">LIVE</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Player yuklanmoqda...
            </p>
            <p className="mt-2 text-xs text-gray-500">
              {src && `URL: ${src.substring(0, 40)}...`}
            </p>
          </div>
        </div>
        
        {/* Fake player controls skeleton */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center h-full px-4">
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-blue-500"></div>
            </div>
            <div className="flex items-center gap-3 ml-4">
              <div className="w-8 h-8 rounded-full bg-gray-800"></div>
              <div className="w-8 h-8 rounded-full bg-gray-800"></div>
              <div className="w-8 h-8 rounded-full bg-gray-800"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty src holati
  if (!src) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="mb-4">
            <svg className="w-12 h-12 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Live Stream mavjud emas</h3>
          <p className="text-gray-500 text-sm">
            Ushbu kanal uchun hozirda jonli efir yo'q
          </p>
        </div>
      </div>
    );
  }

  // Normal holat - Player ko'rsatish
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
      {/* Player container */}
      <div 
        id={`player-${Date.now()}`} 
        className="w-full h-full"
        key={`player-${Date.now()}`}
      />
      
      {/* Live badge overlay */}
      <div className="absolute top-4 left-4 z-10">
        <div className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center gap-2 backdrop-blur-sm">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-bold">LIVE</span>
        </div>
      </div>
      
      {/* Stats overlay */}
      <div className="absolute top-4 right-4 z-10">
        <div className="px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-300">HD</span>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
    </div>
  );
}
