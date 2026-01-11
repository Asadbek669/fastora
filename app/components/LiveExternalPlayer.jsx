"use client";

import { useEffect, useRef } from "react";

export default function LiveExternalPlayer({ src, vastUrl }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!src) return;

    const interval = setInterval(() => {
      // PlayerJS mavjud va hali initialized bo'lmagan bo'lsa
      if (window.Playerjs && !initialized.current) {
        initialized.current = true;

        new window.Playerjs({
          id: "player",
          file: src,           // Asosiy jonli stream
          vast: vastUrl || "", // Pre-roll reklamasi (VAST URL)
          autoplay: 0,         // 1 qilinsa avtomatik boshlaydi
          controls: 1,
          mute: 0,
          poster: "https://cdn.fastora.uz/images/FASTORA.jpg", // Zastavka
        });

        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [src, vastUrl]);

  // Agar stream yo‘q bo‘lsa
  if (!src) {
    return (
      <div className="w-full aspect-video rounded-xl bg-[#111] flex items-center justify-center text-gray-500 text-sm">
        Bu kanal uchun live stream mavjud emas
      </div>
    );
  }

  // Player konteyneri
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
      <div id="player" className="w-full h-full" />
    </div>
  );
}
