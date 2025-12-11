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
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white p-4 md:p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
          Qidiruv
        </h1>
        <p className="text-gray-400 text-sm">
          Sevimli filmlar va seriallarni toping
        </p>
      </div>

      {/* SEARCH INPUT CONTAINER */}
      <div className="relative mb-8 group">
        {/* GLOW EFFECT */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        
        <div className="relative flex items-center">
          <div className="absolute left-4 z-10">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <input
            type="text"
            placeholder="Kino yoki serial qidiring..."
            className="w-full pl-12 pr-32 py-4 rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-700 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-gray-500 outline-none transition-all duration-300"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && doSearch()}
          />
          
          {/* SEARCH BUTTON */}
          <button
            onClick={doSearch}
            disabled={!query.trim()}
            className={`
              absolute right-2 px-5 py-2.5 rounded-xl font-medium
              flex items-center gap-2 transition-all duration-300
              ${!query.trim() 
                ? "bg-gray-800 text-gray-500 cursor-not-allowed" 
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/20"
              }
            `}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Qidirish
              </>
            )}
          </button>
        </div>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="relative mb-4">
            <div className="w-12 h-12 border-4 border-gray-800 rounded-full"></div>
            <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-400">Natijalar izlanmoqda...</p>
        </div>
      )}

      {/* RESULTS */}
      {!loading && results.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Topilgan natijalar
              <span className="text-sm font-normal text-gray-400">
                ({results.length} ta)
              </span>
            </h2>
          </div>

          {/* FIXED: MOBILE'DA 2 TA, DESKTOP'DA 3 TA KO'RINISHI */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                onClick={() => router.push(`/${item.type}/${item.slug}`)}
                className="group cursor-pointer"
              >
                {/* CARD CONTAINER - ASPECT RATIO BILAN FIX */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 hover:border-blue-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                  {/* IMAGE CONTAINER - FIXED ASPECT RATIO */}
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <Image
                      src={item.poster_url}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    />
                    
                    {/* GRADIENT OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    
                    {/* TYPE BADGE - ABSOLUTE POSITION */}
                    <div className="absolute top-2 left-2">
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border
                        ${item.type === "movie" 
                          ? "bg-blue-500/20 text-blue-300 border-blue-500/30" 
                          : "bg-purple-500/20 text-purple-300 border-purple-500/30"
                        }
                      `}>
                        {item.type === "movie" ? "FILM" : "SERIAL"}
                      </span>
                    </div>
                    
                    {/* YEAR BADGE - ABSOLUTE POSITION */}
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 rounded-md text-xs bg-black/60 backdrop-blur-sm border border-white/10">
                        {item.year}
                      </span>
                    </div>
                    
                    {/* HOVER OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* CONTENT - FIXED HEIGHT */}
                  <div className="p-3 min-h-[70px]">
                    <h3 className="font-bold text-sm line-clamp-2 group-hover:text-blue-300 transition-colors leading-tight">
                      {item.title}
                    </h3>
                    
                    {/* VIEW BUTTON */}
                    <div className="mt-2 flex justify-end">
                      <span className="text-xs text-gray-500 group-hover:text-blue-400 transition-colors flex items-center gap-1">
                        Ko'rish
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NO RESULTS */}
      {!loading && query && results.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-300 mb-2">
            Hech narsa topilmadi
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            "{query}" so'rovi bo'yicha natijalar topilmadi.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Boshqa kalit so'zlar bilan qayta urinib ko'ring.
          </p>
        </div>
      )}

      {/* EMPTY STATE - NO QUERY */}
      {!loading && !query && results.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-400 mb-2">
            Qidiruvni boshlang
          </h3>
          <p className="text-gray-600">
            Filmlar yoki seriallar nomini kiriting
          </p>
        </div>
      )}
    </div>
  );
}
