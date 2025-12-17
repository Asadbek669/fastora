
"use client";

import { useEffect, useRef, useState } from "react";

export default function LiveExternalPlayer({ src }) {
  const playerRef = useRef(null);
  const containerId = useRef("playerjs-container");

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  /* ===============================
     PLAYERJS SCRIPT LOAD
     =============================== */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.Playerjs) return;

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/playerjs@latest/dist/player.min.js";
    script.async = true;

    script.onload = () => {
      console.log("✅ PlayerJS loaded");
    };

    script.onerror = () => {
      console.error("❌ PlayerJS load failed");
      setHasError(true);
      setIsLoading(false);
    };

    document.head.appendChild(script);
  }, []);

  /* ===============================
     PLAYER INIT / DESTROY
     =============================== */
  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      return;
    }

    if (!window.Playerjs) return;

    setIsLoading(true);
    setHasError(false);

    // Old player destroy
    if (playerRef.current) {
      try {
        playerRef.current.api("destroy");
      } catch {}
      playerRef.current = null;
    }

    try {
      playerRef.current = new window.Playerjs({
        id: containerId.current,
        file: src,
        autoplay: 1,
        controls: 1,
        mute: 0,
        volume: 80,
        title: "LIVE",
        debug: process.env.NODE_ENV === "development",

        onReady: () => {
          setIsLoading(false);
          setHasError(false);
        },

        onError: () => {
          setHasError(true);
          setIsLoading(false);
        },
      });
    } catch (e) {
      console.error("Player init error:", e);
      setHasError(true);
      setIsLoading(false);
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.api("destroy");
        } catch {}
        playerRef.current = null;
      }
    };
  }, [src]);

  /* ===============================
     EMPTY SRC
     =============================== */
  if (!src) {
    return (
      <div className="relative w-full aspect-video rounded-2xl bg-[#111] flex items-center justify-center text-gray-500 text-sm">
        Live stream mavjud emas
      </div>
    );
  }

  /* ===============================
     ERROR STATE
     =============================== */
  if (hasError) {
    return (
      <div className="relative w-full aspect-video rounded-2xl bg-[#111] border border-red-500/30 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 font-semibold mb-2">
            Player yuklanmadi
          </p>
          <button
            onClick={() => {
              setHasError(false);
              setIsLoading(true);
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
          >
            Qayta urinish
          </button>
        </div>
      </div>
    );
  }

  /* ===============================
     LOADING STATE
     =============================== */
  if (isLoading) {
    return (
      <div className="relative w-full aspect-video rounded-2xl bg-[#111] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400 text-sm">
            Jonli efir yuklanmoqda…
          </p>
        </div>
      </div>
    );
  }

  /* ===============================
     PLAYER VIEW
     =============================== */
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-xl">
      {/* PlayerJS container */}
      <div id={containerId.current} className="w-full h-full" />

      {/* LIVE BADGE */}
      <div className="absolute top-3 left-3 z-10">
        <div className="px-3 py-1 bg-red-600 rounded-md flex items-center gap-2 text-xs font-bold">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          LIVE
        </div>
      </div>
    </div>
  );
}
