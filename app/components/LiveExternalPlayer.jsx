"use client";

import { useEffect, useRef } from "react";

export default function LiveExternalPlayer({ src, vastUrl }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!src) return;

    const interval = setInterval(() => {
      if (window.Playerjs && !initialized.current) {
        initialized.current = true;

        new window.Playerjs({
          id: "player",
          file: src,               // jonli stream
          vast: vastUrl,           // pre-roll VAST URL
          autoplay: 1,             // autoplay pre-roll uchun
          mute: 1,                 // brauzer autoplay ishlashi uchun
          controls: 1,
          poster: "https://cdn.fastora.uz/images/FASTORA.jpg",
        });

        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [src, vastUrl]);

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
