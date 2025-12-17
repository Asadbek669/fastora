"use client";
import { useState } from "react";

export default function Player({ movieId }) {
  const [src, setSrc] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handlePlay() {
    if (loading || src) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/movies/${movieId}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Film topilmadi");

      const movie = await res.json();

      if (!movie?.video) {
        throw new Error("Video yo‘q");
      }

      // 🔥 faqat hozir paydo bo‘ladi
      setSrc(movie.video + "?t=" + Date.now());
    } catch (e) {
      alert("Video vaqtincha mavjud emas");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 px-4">
      <div className="w-full aspect-video bg-black rounded-xl border border-white/10 overflow-hidden flex items-center justify-center">
        {!src ? (
          <button
            onClick={handlePlay}
            className="flex items-center justify-center text-white text-4xl w-20 h-20 rounded-full bg-blue-600 shadow-lg hover:scale-105 transition"
          >
            {loading ? "⏳" : "▶"}
          </button>
        ) : (
          <video
            src={src}
            controls
            autoPlay
            playsInline
            className="w-full h-full"
          />
        )}
      </div>
    </div>
  );
}
