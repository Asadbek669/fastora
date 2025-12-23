"use client";

import { useEffect, useState } from "react";
import PlayerClient from "./player-client";
import { use } from "react"; // React 18 use() hook Next.js 16 da

export default function WatchPage({ params }) {
  // params Promise bo‘ladi, use() bilan unwrap qilamiz
  const { slug } = use(params);

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`/api/movies/${slug}`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [slug]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
        <button onClick={() => history.back()} className="text-sm text-gray-300 hover:text-white">
          ← Orqaga
        </button>
        <h1 className="text-sm font-medium truncate">{movie.title}</h1>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <PlayerClient src={movie.video} title={movie.title} />
      </div>
    </div>
  );
}
