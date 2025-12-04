"use client";

import Link from "next/link";

export default function MovieRow({ title, movies = [], link = "/", badgeType = "bepul" }) {
  const limited = movies.slice(0, 7);

  const isSeries = (item) =>
    [
      "xorij-seriallar",
      "korea-seriallari",
      "turk-seriallar",
      "multfilmlar",
    ].includes(item.category);

  // Badge yozuvi
  const badgeText = badgeType === "premyera" ? "PREMYERA" : "BEPUL";

  return (
    <div className="w-full mb-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-[20px] font-semibold">{title}</h2>

        <Link
          href={link}
          className="text-sm text-white/80 flex items-center gap-1"
        >
          Barchasini ko‘rish
          <span className="text-lg">➤</span>
        </Link>
      </div>

      {/* MOVIE LIST */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">

        {limited.map((m) => {
          const href = isSeries(m)
            ? `/serial/${m.slug}`
            : `/movie/${m.slug}`;

          return (
            <Link
              key={m.id}
              href={href}
              className="w-[130px] flex-shrink-0 relative"
            >
              <div className="w-full h-[190px] rounded-xl overflow-hidden shadow-lg bg-[#111] relative">

                {/* BADGE — Yangi.TV style */}
                <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-[#FFD54F] font-semibold text-[11px] px-2 py-1 rounded-md">
                  {badgeText}
                </div>

                <img
                  src={m.poster}
                  className="w-full h-full object-cover"
                  alt={m.title}
                />
              </div>

              <p className="mt-2 text-sm px-1 truncate">{m.title}</p>
            </Link>
          );
        })}

        {/* VIEW ALL CARD */}
        <Link
          href={link}
          className="w-[130px] h-[190px] flex-shrink-0 rounded-xl 
                     bg-[#2c2c2c] flex flex-col items-center justify-center"
        >
          <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-white text-xl">
            ›
          </div>
          <p className="text-sm mt-2 text-center text-gray-300">Yana ko‘proq</p>
        </Link>

      </div>
    </div>
  );
}
