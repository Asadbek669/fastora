"use client";

import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="p-4 pt-6 text-white">
      <h1 className="text-xl font-semibold mb-4">Qidiruv</h1>

      <input
        type="text"
        placeholder="Kino yoki serial nomini kiriting..."
        className="
          w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
          focus:outline-none focus:ring-2 focus:ring-white/40 text-white
        "
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Natijalar joyi */}
      <div className="mt-6 text-center text-gray-400">
        Hozircha qidiruv tizimi ulanmagan
      </div>
    </div>
  );
}
