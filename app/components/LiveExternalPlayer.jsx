"use client";

import { useEffect } from "react";

export default function LiveExternalPlayer({ src }) {
  useEffect(() => {
    if (!src || !window.Playerjs) return;

    new window.Playerjs({
      id: "player",
      file: src,
      autoplay: 0,
      controls: 1,
      mute: 0,
      poster: "https://cdn.fastora.uz/images/FASTORA.jpg", // <--- zastavka
    });
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
