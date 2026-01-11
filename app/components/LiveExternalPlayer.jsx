"use client";

import { useEffect, useRef } from "react";

export default function LiveExternalPlayer({ src }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!src) return;

    const interval = setInterval(() => {
      if (window.Playerjs && !initialized.current) {
        initialized.current = true;

        new window.Playerjs({
          id: "player",
          file: src,
          autoplay: 0,
          controls: 1,
          mute: 0,
          poster: "https://cdn.fastora.uz/images/FASTORA.jpg", // 🔥 relative
        });

        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [src]);

  if (!src) {
    return (
      <div className="w-full aspect-video rounded-xl bg-[#111] flex items-center justify-center text-gray-500 text-sm">
        Bu kanal uchun live stream mavjud emas
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
      <div id="player" className="w-full h-full" />
    </div>
  );
}



