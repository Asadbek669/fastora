"use client";

import Link from "next/link";
import AgeModal from "@/components/AgeModal";
import { Clapperboard } from "lucide-react";
import { Calendar, Globe, Volume2 } from "lucide-react";

export default function SeriesDetail({ series }) {
  return (
    <div className="text-white">

      {/* BACKDROP */}
      <div className="relative w-full h-[250px] overflow-hidden">
        <img
          src={series.backdrop}
          alt={series.title}
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
      </div>


      {/* CONTENT */}
      <div className="px-4 -mt-24 relative z-10">

      		{/* POSTER + DETAILS */}
      		<div className="flex gap-4 items-end"> {/* items-start → items-end */}
      
      		  {/* POSTER */}
      		  <div className="w-32 rounded-lg overflow-hidden shadow-lg border border-white/10">
      		    <img
      			  src={series.poster}   // <Image> o‘rniga oddiy img ishlatiladi
      			  alt={series.title}
      			  className="w-full h-auto object-cover"
      		    /> 
      		  </div>
      
      
      		  {/* DETAILS */}
      		  <div className="flex-1"> {/* mt-10 olib tashlandi */}

				<div className="flex-1">
				  <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
					<Calendar className="w-4 h-4" />
					<span>{series.year}</span>
				  </div>

				  <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
					<Globe className="w-4 h-4" />
					<span>{series.country}</span>
				  </div>

				  <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
					<Volume2 className="w-4 h-4" />
					<span>O‘zbek tilida</span>
				  </div>
				</div>
      
      			<div className="inline-flex items-center gap-2 bg-yellow-600/20 
      			  text-yellow-300 px-2 py-1 mt-2 rounded-lg text-sm">
      			  ⭐ IMDb: {series.imdb}
      			</div>
      		  </div>
      
      		</div>  

        {/* ACTION BUTTONS (MOVIES STYLE) */}
        <div className="mt-5 grid grid-cols-4 gap-2">



		  {/* ICON (SERIAL) */}
		  <div className="border border-blue-500/30 rounded-lg py-1 flex flex-col items-center justify-center">
		    <p className="text-[10px] text-blue-300 mb-1">Serial</p> {/* Yuqoriga yozildi */}
		    <Clapperboard className="w-4 h-4 text-blue-300" />   {/* Icon */}
		  </div>

          {/* IMDb WITH STARS */}
          <div className="bg-white/5 border border-white/10 rounded-lg py-0.5 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              {Array.from({ length: 5 }, (_, i) => {
                const rating = Math.round(series.imdb / 2); // 10 ball → 5 yulduz
                return (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-500"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 0 0 .95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 0 0-.364 1.118l1.286 3.955c.3.921-.755 1.688-1.54 1.118l-3.376-2.455a1 1 0 0 0-1.176 0l-3.376 2.455c-.784.57-1.838-.197-1.539-1.118l1.285-3.955a1 1 0 0 0-.364-1.118L2.049 9.382c-.784-.57-.38-1.81.588-1.81h4.17a1 1 0 0 0 .95-.69l1.286-3.955z" />
                  </svg>
                );
              })}
            </div>
            <p className="text-xs mt-0.5 text-yellow-300">{series.imdb}/10 IMDb</p>
          </div>

          {/* COMMENTS */}
          <Link
            href={`/serial/${series.slug}/comments`}
            className="bg-white/5 border border-white/10 rounded-lg py-0.5 flex flex-col items-center justify-center active:scale-95 transition"
          >
            <p className="text-[10px] text-gray-200 mb-0.5">Izoh qoldirish</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="text-white">
              <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm-6 10H6v-2h8Zm4-4H6V6h12Z"/>
            </svg>
          </Link>

          {/* AGE LIMIT */}
          <AgeModal age={series.age ?? "18+"} />

        </div>

    		{/* TITLE */}
    		<div className="mt-4 border-t border-white/10 pt-3">
    		  <h1 className="text-[21px] font-medium leading-snug text-white/95">
    			{series.title}
    		  </h1>
    		</div>
        
        {/* GENRES */}
        <div className="mt-5">
          <h2 className="text-gray-300 text-lg mb-1">Janrlar:</h2>
          <div className="flex gap-2 flex-wrap">
            {series.genres?.map((g, i) => (
              <span key={i} className="bg-white/10 border border-white/10 text-sm px-3 py-1 rounded-full">
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
