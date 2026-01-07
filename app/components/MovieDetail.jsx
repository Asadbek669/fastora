"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AgeModal from "./AgeModal";
import { Calendar, Globe, Volume2, MessageSquare } from "lucide-react";

export default function MovieDetail({ movie }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left → next image
      setCurrentIndex((prev) => (prev === movie.thumbs.length - 1 ? 0 : prev + 1));
    }
    if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right → prev image
      setCurrentIndex((prev) => (prev === 0 ? movie.thumbs.length - 1 : prev - 1));
    }
  };

  // ESC tugmasi bilan yopish
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev === 0 ? movie.thumbs.length - 1 : prev - 1));
      if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev === movie.thumbs.length - 1 ? 0 : prev + 1));
    };
    if (lightboxOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, movie.thumbs.length]);

  return (
    <div className="text-white min-h-screen bg-black">

      {/* BACKDROP */}
<div className="relative w-full h-[240px] md:h-[420px] overflow-hidden">
  {/* BACKDROP IMAGE */}
  <img
    src={movie.backdrop}
    alt={movie.title}
    fetchpriority="high"
    loading="eager"
    decoding="async"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* QORA GRADIENT (info panel ostiga) */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
</div>

      <div className="-mt-24 relative z-10">

        {/* POSTER + INFO (padding keraksiz) */}
        <div className="flex gap-4 items-end px-4">
          <div className="w-32 rounded-xl overflow-hidden shadow-xl border border-white/10">
            <img src={movie.poster} alt={movie.title} className="w-full h-auto object-cover" />
          </div>
          <div className="flex-1">
			<div className="flex-1">
			  <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
				<Calendar className="w-4 h-4" />
				<span>{movie.year}</span>
			  </div>

			  <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
				<Globe className="w-4 h-4" />
				<span>{movie.country}</span>
			  </div>

			  <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
				<Volume2 className="w-4 h-4" />
				<span>O‘zbek tilida</span>
			  </div>
			</div>
          </div>
        </div>

		{/* INFO PANEL (IMDb with stars, original size, vertical compact) */}
		<div className="mt-5 grid grid-cols-4 gap-2">

		  {/* DURATION */}
		  <div className="bg-white/5 border border-white/10 rounded-lg py-0.5 flex flex-col items-center justify-center">
			<p className="text-[10px] text-gray-200 mb-0.5">Davomiyligi</p> {/* tepasida */}
			<p className="text-xs mt-0.5">{movie.duration} daqiqa</p> {/* pastda */}
		  </div>

		  {/* IMDb WITH STARS */}
		  <div className="bg-white/5 border border-white/10 rounded-lg py-0.5 flex flex-col items-center justify-center">
			<div className="flex items-center justify-center">
			  {Array.from({ length: 5 }, (_, i) => {
				const rating = Math.round(movie.imdb / 2); // 10 ball → 5 yulduz
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

			{/* IMDb SCORE PASTGA */}
			<p className="text-xs mt-0.5 text-yellow-300">{movie.imdb}/10 IMDb</p>
		  </div>

		  {/* COMMENTS */}
		  <Link
		    href={`/movie/${movie.slug}/comments`} // yoki serial uchun
		    className="bg-white/5 border border-white/10 rounded-lg py-1 px-2 flex flex-col items-center justify-center gap-1 hover:bg-white/10 active:scale-95 transition-all"
		  >
		    {/* Yuqorida label */}
		    <p className="text-[10px] text-gray-200 font-medium">
			  Izoh qoldirish
		    </p>

		    {/* Icon + izohlar soni bir qatorda */}
		    <div className="flex items-center gap-1">
			  <MessageSquare className="w-5 h-5 text-white" />
			  <span className="text-[10px] text-gray-400">
			    {movie.comments_count ?? 0} izoh
			  </span>
		    </div>
		  </Link>

		  {/* AGE LIMIT */}
		  <AgeModal age={movie.age ?? "18+"} />
		</div>

        {/* TITLE + WATCH BUTTON + DESCRIPTION (padding kerak) */}
        <div className="px-4">
          <h1 className="mt-5 text-2xl font-bold leading-tight" style={{ fontFamily: "Montserrat, system-ui" }}>
            {movie.title}
          </h1>

          <Link
            href={`/movie/${movie.slug}/watch`}
            className="block w-full mt-6 text-center bg-red-600 hover:bg-red-700 text-white text-lg font-semibold py-4 rounded-full shadow-lg transition-all duration-300"
          >
            ▶ Tomosha qilish
          </Link>

          <div className="mt-6">
            <h2 className="text-gray-300 mb-2 text-lg">Janr:</h2>
            <div className="flex gap-2 flex-wrap">
              {movie.genres?.map((g, i) => (
                <span key={i} className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-sm">{g}</span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-gray-300 mb-2">Film haqida:</h2>
            <p className="text-gray-400 leading-relaxed whitespace-pre-line">{movie.description}</p>
          </div>
        </div>

        {/* THUMBS (paddingsiz, swipe ishlaydi) */}
        <div className="mt-6">
          <h2 className="text-gray-300 mb-2 px-4">Lavhalar:</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-3">
            {movie.thumbs?.map((img, i) => (
              <div
                key={i}
                className="min-w-[60%] aspect-video rounded-xl overflow-hidden bg-[#111] cursor-pointer"
                onClick={() => openLightbox(i)}
              >
                <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Chap yuqori rasm indeksi */}
          <div className="absolute top-4 left-4 text-white text-sm font-semibold bg-black/40 px-2 py-1 rounded">
            {currentIndex + 1} / {movie.thumbs.length}
          </div>

          {/* Rasm */}
          <img
            src={movie.thumbs[currentIndex]}
            alt={`thumb-${currentIndex}`}
            className="max-h-full max-w-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
}


