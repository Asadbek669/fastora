"use client";

import { useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-ads";
import "videojs-ima";

export default function LiveExternalPlayer({ src }) {
  useEffect(() => {
    if (!src) return;

    // Playerni yaratish
    const player = videojs("player", {
      controls: true,
      autoplay: false,
      preload: "auto",
      muted: false,
      fluid: true, // responsive
    });

    // ExoClick VAST pre-roll integratsiyasi
    player.ima({
      adTagUrl: "https://s.magsrv.com/v1/vast.php?idzone=5810604",
      debug: false,
      adsRenderingSettings: {
        enablePreloading: true,
        // Skip tugmasi ExoClick sozlamasiga mos
        restoreCustomPlaybackStateOnAdBreakComplete: true,
      },
    });

    return () => {
      // Component unmount bo‘lganda playerni tozalash
      if (player) player.dispose();
    };
  }, [src]);

  // Agar src bo‘lmasa fallback
  if (!src) {
    return (
      <div className="w-full aspect-video rounded-xl bg-[#111] flex items-center justify-center text-gray-500 text-sm">
        Bu kanal uchun live stream mavjud emas
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
      <video
        id="player"
        className="video-js vjs-default-skin w-full h-full"
        playsInline
      >
        <source src={src} type="application/x-mpegURL" />
        {/* Agar HLS video bo‘lmasa, MP4 yoki boshqa format qo‘shing */}
      </video>
    </div>
  );
}
