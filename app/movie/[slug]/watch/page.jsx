
"use client";

import { useEffect, useState } from "react";
import PlayerClient from "./player-client";

export default function WatchPage({ params }) {
  const { slug } = params; // Client component uchun oddiy ob’ekt

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function getMovie() {
      try {
        const res = await fetch(`/api/movies/${slug}`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      }
    }
    getMovie();
  }, [slug]);

  if (!movie)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="px-4 py-3 bg-black/80 backdrop-blur-sm border-b border-white/20 flex items-center justify-between">
        <button
          onClick={() => history.back()}
          className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full shadow-md transition transform hover:scale-105"
        >
          ‹ Orqaga
        </button>

        <h1 className="flex-1 mx-4 text-center text-3xl md:text-5xl font-bold uppercase truncate drop-shadow-lg">
          {movie.title}
        </h1>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <PlayerClient src={movie.video} title={movie.title} />
      </div>
    </div>
  );
}
