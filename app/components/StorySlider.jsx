"use client";

import { useRef } from "react";

export default function StorySlider({ testData = [] }) {
  // 🛑 Agar ma'lumot bo'lmasa — fallback UI
  if (!Array.isArray(testData) || testData.length === 0) {
    return (
      <div className="w-full h-[140px] bg-[#111] rounded-xl flex items-center justify-center text-gray-500">
        Ma’lumot topilmadi
      </div>
    );
  }

  const containerRef = useRef(null);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* LEFT BUTTON */}
      <button
        onClick={scrollLeft}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-2 py-3 rounded-r-lg z-10"
      >
        ‹
      </button>

      {/* SCROLLABLE AREA */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto no-scrollbar py-2 px-1"
      >
        {testData.map((item, i) => (
          <div
            key={item.id ?? i}
            className="flex-shrink-0 w-28 cursor-pointer"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
              <img
                src={item.poster} // 🟢 poster_url EMAS!
                alt={item.title ?? "Movie"}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-center text-[13px] truncate">
              {item.title ?? "Noma'lum"}
            </p>
          </div>
        ))}
      </div>

      {/* RIGHT BUTTON */}
      <button
        onClick={scrollRight}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-2 py-3 rounded-l-lg z-10"
      >
        ›
      </button>
    </div>
  );
}

}
