"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchClient({ initialQuery }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // URL o‘zgarsa — avtomatik qidirish
  useEffect(() => {
    const q = searchParams.get("query") || "";
    if (q) search(q);
  }, [searchParams]);

  // Fetch function
  const search = async (text) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/search?query=${text}`);
      const data = await res.json();
      setResults(data);
    } finally {
      setLoading(false);
    }
  };

  // Enter bosilganda qidiruv URLga yoziladi
  const doSearch = () => {
    if (!query.trim()) return;
    router.push(`/search?query=${query}`);
  };

  return (
    <div className="p-4 pt-6 text-white">
      <h1 className="text-xl font-semibold mb-4">Qidiruv</h1>

      {/* INPUT FIELD */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Kino yoki serial qidiring..."
          className="w-full p-3 pr-12 rounded-xl bg-white/10 border border-white/20"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && doSearch()}
        />

        {/* SEARCH BUTTON */}
		<button
		  onClick={doSearch}
		  className="
			absolute right-3 top-1/2 -translate-y-1/2
			bg-white/10 backdrop-blur-lg
			p-2 rounded-xl
			border border-white/20
			hover:bg-white/20
			active:scale-95
			transition
			shadow-md
		  "
		>
		  <Image
			src="/icons/search.svg"
			width={22}
			height={22}
			alt="search"
			className="opacity-90"
		  />
		</button>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="text-center opacity-60 mt-6">Yuklanmoqda...</div>
      )}

      {/* RESULTS */}
      {!loading && results.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {results.map((item) => (
            <div
              key={`${item.type}-${item.id}`}
              onClick={() => router.push(`/${item.type}/${item.slug}`)}
              className="cursor-pointer bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:scale-[1.03] transition-all active:scale-95"
            >
              <div className="w-full h-40 relative">
                <Image
                  src={item.poster_url}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-3">
                <div className="text-sm font-bold leading-tight mb-1">
                  {item.title}
                </div>

                <div className="flex gap-2 text-xs opacity-80">
                  <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20">
                    {item.type === "movie" ? "Kino" : "Serial"}
                  </span>
                  <span>{item.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* NO RESULTS */}
      {!loading && query && results.length === 0 && (
        <div className="text-center opacity-50 mt-5">Hech narsa topilmadi</div>
      )}
    </div>
  );
}
