"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSliderClient({ items }) {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  if (items.length < 2) return null;

  return (
    <>
      {/* Click */}
      <button
        className="absolute inset-0 z-20"
        onClick={() => router.push(items[index]?.page_url)}
        aria-label="Open"
      />

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {items.slice(0, 5).map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setIndex(i);
            }}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </>
  );
}
