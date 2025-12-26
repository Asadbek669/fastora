"use client";

import { useEffect, useState } from "react";
import PlayerClient from "./player-client";

export default function WatchPage({ params }) {
  const { slug } = params; // ❗ use() olib tashlandi

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    let active = true;

    fetch(`/api/movies/${slug}`, { cache: "no-store" })
      .then(res => res.json())
      .then(data => {
        if (active) setMovie(data);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 bg-black/80 backdrop-blur-sm border-b border-white/20 flex items-center justify-between">
        <button
          onClick={() => history.back()}
          className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full shadow-md transition hover:scale-105"
          aria-label="Go back"
        >
          ‹ Orqaga
        </button>

        <h1 className="flex-1 mx-4 text-center text-3xl md:text-5xl font-bold uppercase truncate">
          {movie.title}
        </h1>
      </div>

      {/* Player */}
      <div className="flex-1 flex items-center justify-center px-4">
        <PlayerClient src={movie.video} title={movie.title} />
      </div>
    </div>
  );
}
