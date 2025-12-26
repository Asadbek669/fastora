
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
	  <div className="px-4 py-3 bg-black/80 backdrop-blur-sm border-b border-white/20 flex items-center justify-between">
	  
	    {/* Orqaga tugma */}
	    <button
		  onClick={() => history.back()}
		  className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full shadow-md transition transform hover:scale-105"
	    >
		  ‹ Orqaga
	    </button>

		{/* Movie title */}
		<h1 className="flex-1 mx-4 text-center text-3xl md:text-5xl font-bold uppercase text-white bg-white/0 drop-shadow-lg truncate">
		  {movie.title}
		</h1>


	  </div>


      <div className="flex-1 flex items-center justify-center px-4">
        <PlayerClient src={movie.video} title={movie.title} />
      </div>
    </div>
  );
}

