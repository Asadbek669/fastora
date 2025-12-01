"use client";

import Link from "next/link";

export default function EpisodeList({ slug, season, episodes, activeEpisode }) {
  return (
    <div className="mt-6">
      <h2 className="text-gray-300 text-lg mb-3">
        {season}-sezon epizodlari
      </h2>

      {/* GRID – 3 USTUN */}
      <div className="grid grid-cols-3 gap-3">
        {episodes.map((e) => {
          const isActive = Number(activeEpisode) === e.episode_number;

          return (
            <Link
              key={e.id}
              href={`/serial/${slug}/season/${season}/episode/${e.episode_number}`}
              className={`
                rounded-xl border p-3
                flex flex-col items-center text-center
                transition-all active:scale-95
                ${isActive
                  ? "bg-blue-600/40 border-blue-500 text-white"
                  : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"}
              `}
            >

              {/* EPISODE BADGE */}
              <div
                className={`
                  w-10 h-10 flex items-center justify-center rounded-full mb-2 text-sm font-bold
                  ${isActive ? "bg-blue-500 text-white" : "bg-white/10 text-gray-200"}
                `}
              >
                {e.episode_number}
              </div>

              {/* TITLE */}
              <p className="text-xs text-gray-400 line-clamp-2 leading-tight">
                {e.title}
              </p>

            </Link>
          );
        })}
      </div>
    </div>
  );
}
