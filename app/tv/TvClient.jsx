"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import tvChannels from "./tvConfig";
import PageHeader from "@/components/PageHeader";

export default function TvClient() {
  const [query, setQuery] = useState("");

  // 🔹 Filterlangan kanallar (static, tez ishlaydi)
  const filteredChannels = useMemo(() => {
    if (!query) return tvChannels;
    const q = query.toLowerCase();
    return tvChannels.filter((tv) => tv.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      {/* Page Header */}
      <PageHeader title="Telekanallar" />

      {/* 🔍 QIDIRUV */}
      <div className="mb-4 px-4">
        <div className="flex items-center w-full bg-[#111] rounded-xl overflow-hidden">
          <input
            type="text"
            placeholder="Kanal nomini yozing..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              flex-1 px-4 py-2
              bg-transparent text-white
              placeholder:text-white/40
              outline-none
            "
          />
          <button className="px-3">
            <img
              src="/icons/search.svg"
              alt="search icon"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>

      {/* 📺 KANALLAR GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 px-4">
        {filteredChannels.map((tv, i) => (
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
              loading={i < 4 ? "eager" : "lazy"} // LCP uchun birinchi 4 rasm eager
              width={160}
              height={96}
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
