"use client";

import { useState } from "react";

export default function LiveExternalPlayer({ src }) {
  const [isLoading, setIsLoading] = useState(true);

  if (!src) {
    return (
      <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-6 text-center">
        <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Live Stream mavjud emas</h3>
        <p className="text-gray-500 text-sm">Ushbu kanal uchun jonli efir yo'q</p>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">LIVE</span>
            </div>
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-400 text-sm">Stream yuklanmoqda...</p>
          </div>
        </div>
      )}

      {/* Live badge */}
      <div className="absolute top-4 left-4 z-20">
        <div className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-bold">LIVE</span>
        </div>
      </div>

      {/* Player */}
      <iframe
        src={src}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        frameBorder="0"
        title="Live Stream Player"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />

      {/* Quality badge */}
      <div className="absolute top-4 right-4 z-20">
        <div className="px-3 py-1.5 bg-black/80 rounded-lg backdrop-blur-sm">
          <span className="text-xs font-medium text-green-400">HD</span>
        </div>
      </div>
    </div>
  );
}
