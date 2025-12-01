"use client";

import Image from "next/image";
import Link from "next/link";
import AgeModal from "@/components/AgeModal";

export default function SeriesDetail({ series }) {
  return (
    <div className="text-white pb-24">

      {/* BACKDROP */}
      <div className="relative w-full h-[250px] overflow-hidden">
        <Image
          src={series.backdrop}
          fill
          alt={series.title}
          className="object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
      </div>

      {/* CONTENT */}
      <div className="px-4 -mt-24 relative z-10">

        {/* POSTER + DETAILS */}
        <div className="flex gap-4 items-start">

          {/* POSTER */}
          <div className="w-32 rounded-lg overflow-hidden shadow-lg border border-white/10">
            <Image
              src={series.poster}
              width={300}
              height={450}
              alt={series.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* DETAILS */}
          <div className="flex-1 mt-10">
            <h1 className="text-2xl font-bold">{series.title}</h1>

            <p className="text-gray-400 text-sm mt-1">📅 {series.year}</p>
            <p className="text-gray-400 text-sm">🌍 {series.country}</p>
            <p className="text-gray-400 text-sm">🔊 O‘zbek tilida</p>

            <div className="inline-flex items-center gap-2 bg-yellow-600/20 
              text-yellow-300 px-2 py-1 mt-2 rounded-lg text-sm">
              ⭐ IMDb: {series.imdb}
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS (Like, Comments, Label) */}
        <div className="grid grid-cols-3 gap-2 mt-5">


          {/* 💬 COMMENTS BUTTON */}
		  <Link
		    href={`/serial/${series.slug}/comments`}
		    className="bg-white/5 border border-white/10 rounded-lg py-2 flex flex-col items-center active:scale-95 transition"
		  >
		    <svg 
			  xmlns="http://www.w3.org/2000/svg" 
			  width="26" 
			  height="26" 
			  viewBox="0 0 24 24" 
			  fill="currentColor"
			  className="text-white"
		    >
			  <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm-6 10H6v-2h8Zm4-4H6V6h12Z"/>
		    </svg>

		    <p className="text-xs mt-1">{series.comments_count ?? 0}</p>
		  </Link>


          {/* 🎬 LABEL */}
          <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg py-2 flex flex-col items-center">
            <span className="text-blue-300">🎬</span>
            <p className="text-xs mt-1">Serial</p>
          </div>
		  
		  <AgeModal age={series.age ?? "18+"} />
		  
		  
        </div>

        {/* GENRES */}
        <div className="mt-5">
          <h2 className="text-gray-300 text-lg mb-1">Janrlar:</h2>

          <div className="flex gap-2 flex-wrap">
            {series.genres?.map((g, i) => (
              <span
                key={i}
                className="bg-white/10 border border-white/10 text-sm px-3 py-1 rounded-full"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-5 text-gray-400 whitespace-pre-line leading-relaxed">
          {series.description}
        </div>
      </div>
    </div>
  );
}
