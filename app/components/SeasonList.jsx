"use client";

import Link from "next/link";

export default function SeasonList({ slug, seasons, activeSeason }) {
  const reversed = [...seasons].sort(
    (a, b) => b.season_number - a.season_number
  );

  return (
    <div>
      <h2 className="text-gray-300 text-lg mb-3">Sezonlar</h2>

      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">

        {reversed.map((s) => (
          <Link
            key={s.id}
            href={`/serial/${slug}/season/${s.season_number}`}
            className={`
              min-w-[100px] px-3 py-2 rounded-lg border 
              transition active:scale-95
              ${Number(activeSeason) === s.season_number
                ? "bg-blue-600/40 border-blue-600 text-white"
                : "bg-white/5 border-white/10 text-gray-300"}
            `}
          >
            {s.season_number}-sezon
          </Link>
        ))}
      </div>
    </div>
  );
}
