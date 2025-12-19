"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import tvChannels from "./tvConfig";

export default function TvClient() {
  const [query, setQuery] = useState("");

  const filteredChannels = useMemo(() => {
    if (!query) return tvChannels;
    const q = query.toLowerCase();
    return tvChannels.filter((tv) =>
      tv.name.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      <h1 className="text-xl font-semibold px-4 pt-4 mb-3">
        Telekanallar
      </h1>

      {/* 🔍 QIDIRUV */}
      <div className="px-4 mb-4">
        <input
          type="text"
          placeholder="Kanal nomini yozing..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            w-full px-4 py-2 rounded-xl
            bg-[#111] text-white
            placeholder:text-white/40
            outline-none
          "
        />
      </div>

      {/* 📺 KANALLAR */}
      <div
        className="
          grid gap-3 px-4
          [grid-template-columns:repeat(auto-fit,minmax(90px,1fr))]
        "
      >
        {filteredChannels.map((tv) => (
          <Link
            key={tv.slug}
            href={`/live/${tv.slug}`}
            className="
              block
              rounded-xl overflow-hidden
              bg-[#111] shadow-md
              transition
              active:scale-95
            "
          >
            <img
              src={tv.image}
              alt={tv.name}
              className="w-full h-24 object-cover"
              loading="lazy"
            />
            <div className="py-1 text-center text-xs truncate">
              {tv.name}
            </div>
          </Link>
        ))}

        {filteredChannels.length === 0 && (
          <div className="col-span-full text-center text-white/50 text-sm py-10">
            Kanal topilmadi
          </div>
        )}
      </div>
    </>
  );
}
