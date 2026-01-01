"use client";

import Link from "next/link";
import AgeModal from "./AgeModal";

export default function MovieDetail({ movie, slug }) {
  return (
    <div className="text-white min-h-screen bg-black">

      {/* BACKDROP */}
      <div className="relative w-full h-[250px] overflow-hidden">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="object-cover w-full h-full scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
      </div>

      <div className="px-4 -mt-24 relative z-10">

		{/* POSTER + INFO */}
		<div className="flex gap-4 items-end">

		  {/* POSTER */}
		  <div className="w-32 rounded-xl overflow-hidden shadow-xl border border-white/10">
			<img
			  src={movie.poster}
			  alt={movie.title}
			  className="w-full h-auto object-cover"
			/>
		  </div>

		  {/* DETAILS */}
		  <div className="flex-1">
			<p className="text-gray-400 text-sm">📅 {movie.year}</p>
			<p className="text-gray-400 text-sm">🌍 {movie.country}</p>
			<p className="text-gray-400 text-sm">🔊 O‘zbek tilida</p>

			<div className="inline-flex items-center gap-2 bg-yellow-600/20 
			  text-yellow-300 px-2 py-1 mt-2 rounded-lg text-sm">
			  ⭐ IMDb: {movie.imdb}
			</div>
		  </div>

		</div>


        {/* INFO PANEL */}
        <div className="mt-5 grid grid-cols-3 gap-2">

          {/* IMDb */}
          <div className="bg-white/5 border border-white/10 rounded-lg py-1 flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 64 64" fill="none">
              <rect width="64" height="64" rx="6" fill="#F5C518" />
              <path
                d="M14 18h6v28h-6V18Zm12 0h9l3 20 3-20h9v28h-6V26l-3 20h-6l-3-20v20h-6V18Zm27 0h9c2 0 4 2 4 4v20c0 2-2 4-4 4h-9V18Zm6 20c1 0 2-1 2-2V24c0-1-1-2-2-2h-3v16h3Z"
                fill="#000"
              />
            </svg>
            <p className="text-xs mt-1">{movie.imdb}</p>
          </div>

          {/* COMMENTS */}
          <Link
            href={`/movie/${slug}/comments`}
            className="bg-white/5 border border-white/10 rounded-lg py-2 flex flex-col items-center active:scale-95 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="text-white">
              <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm-6 10H6v-2h8Zm4-4H6V6h12Z"/>
            </svg>
            <p className="text-xs mt-1">{movie.comments_count ?? 0}</p>
          </Link>

          {/* AGE LIMIT */}
          <AgeModal age={movie.age ?? "18+"} />
        </div>

		{/* TITLE (YANGI JOYI) */}
		<h1
		  className="mt-5 text-2xl font-bold leading-tight"
		  style={{ fontFamily: "Montserrat, system-ui" }}
		>
		  {movie.title}
		</h1>

        {/* WATCH BUTTON */}
		<Link
		  href={`/movie/${slug}/watch`}
		  className="block w-full mt-6 text-center bg-red-600 hover:bg-red-700 text-white text-lg font-semibold py-4 rounded-full shadow-lg transition-all duration-300"
		>
	  	  ▶ Tomosha qilish
		</Link>

        {/* GENRES */}
        <div className="mt-6">
          <h2 className="text-gray-300 mb-2 text-lg">Janr:</h2>
          <div className="flex gap-2 flex-wrap">
            {movie.genres?.map((g, i) => (
              <span key={i} className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-sm">
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-6">
          <h2 className="text-gray-300 mb-2">Film haqida:</h2>
          <p className="text-gray-400 leading-relaxed whitespace-pre-line">
            {movie.description}
          </p>
        </div>

        {/* THUMBS */}
        <div className="mt-6">
          <h2 className="text-gray-300 mb-2">Lavhalar:</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-3">
            {movie.thumbs?.map((img, i) => (
              <div key={i} className="min-w-[60%] aspect-video rounded-xl overflow-hidden bg-[#111]">
                <img
                  src={img}
                  alt={`thumb-${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}



