"use client";

import { useEffect, useState } from "react";
import PlayerClient from "./player-client";
import { use } from "react";

export default function WatchPage({ params }) {
  const { slug } = use(params);
  const [movie, setMovie] = useState(null);

  // 🎯 REKLAMA SCRIPT
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://gizokraijaw.net/vignette.min.js";
    script.dataset.zone = "10445706";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      script.remove(); // sahifadan chiqganda tozalaydi
    };
  }, []);

  useEffect(() => {
    fetch(`/api/movies/${slug}`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [slug]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* HEADER */}
      <div className="px-4 py-3 bg-black/80 backdrop-blur-sm border-b border-white/20 flex items-center justify-between">
        <button
          onClick={() => history.back()}
          className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full shadow-md transition hover:scale-105"
        >
          ‹ Orqaga
        </button>

        <h1 className="flex-1 mx-4 text-center text-3xl md:text-5xl font-bold uppercase truncate">
          {movie.title}
        </h1>
      </div>

      {/* PLAYER */}
      <div className="flex-1 flex items-center justify-center px-4">
        <PlayerClient src={movie.video} title={movie.title} />
      </div>

    </div>
  );
}

