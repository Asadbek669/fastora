"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import convertToEmbed from "@/utils/convertEmbed";

export default function StoryPage() {
  const router = useRouter();
  const { id } = useParams();

  const [story, setStory] = useState(null);
  const [allStories, setAllStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Disable scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  // Load all stories
  useEffect(() => {
    async function loadAll() {
      const base = "https://fastora.uz";
      const res = await fetch(`${base}/api/stories`, { cache: "no-store" });
      const data = await res.json();
      setAllStories(data);
    }
    loadAll();
  }, []);

  // Load current story
  useEffect(() => {
    if (!id) return;

    async function loadStory() {
      const base = "https://fastora.uz";
      const res = await fetch(`${base}/api/stories/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        setStory({ error: true });
        return;
      }

      const data = await res.json();
      setStory(data);

      const index = allStories.findIndex((s) => String(s.id) === String(id));
      setCurrentIndex(index >= 0 ? index : 0);
    }

    loadStory();
  }, [id, allStories]);

  // Next/Prev
  const gotoNextStory = () => {
    const next = allStories[currentIndex + 1];
    if (next) router.push(`/story/${next.id}`);
  };

  const gotoPrevStory = () => {
    const prev = allStories[currentIndex - 1];
    if (prev) router.push(`/story/${prev.id}`);
  };

  if (!id || !story)
    return (
      <div className="text-white p-6 text-center text-xl">Yuklanmoqda...</div>
    );

  if (story.error)
    return (
      <h1 className="text-red-500 text-center text-xl mt-10">Story topilmadi</h1>
    );

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allStories.length - 1;

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex justify-center items-center">

      {/* TOP PROGRESS BARS */}
      <div className="absolute top-4 left-0 right-0 flex gap-2 px-6 z-50">
        {allStories.map((s, i) => (
          <div key={s.id} className="w-full h-[3px] bg-white/30 rounded overflow-hidden">
            <div
              className="h-full bg-white"
              style={{
                width: i === currentIndex ? "100%" : "0%",
                transition: "width .3s",
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* BACK BUTTON */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 z-50
        bg-black/60 hover:bg-black/80 
        text-white rounded-full px-4 py-3
        text-xl backdrop-blur-md shadow-xl transition-all"
      >
        ←
      </button>

      {/* VIDEO PLAYER */}
      <div
        className="relative w-full max-w-[430px]"
        style={{ paddingTop: "177.77%" }}
      >
        <iframe
          className="absolute inset-0 w-full h-full rounded-xl"
          src={`${convertToEmbed(story.youtube_url)}?autoplay=1`}
          allow="autoplay; encrypted-media"
        ></iframe>
      </div>

      {/* TITLE with GRADIENT BACKGROUND */}
      <div
        className="absolute bottom-32 w-full text-center text-white text-xl font-semibold px-6
        bg-gradient-to-t from-black/70 to-transparent py-4"
      >
        {story.title}
      </div>

      {/* CONTROL BUTTONS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-5 z-50">

        {/* PREVIOUS */}
        <button
          onClick={gotoPrevStory}
          disabled={!hasPrev}
          className={`w-14 h-14 flex justify-center items-center
          rounded-full text-white text-3xl font-bold
          backdrop-blur-md shadow-xl transition-all
          ${
            hasPrev
              ? "bg-black/60 hover:bg-black/80"
              : "bg-black/30 opacity-40 pointer-events-none"
          }`}
        >
          ‹
        </button>

        {/* DETAILS */}
        <button
          onClick={() => (window.location.href = story.page_url)}
          className="bg-gradient-to-r from-red-600 to-red-700
          text-white px-8 py-4 rounded-full text-lg font-semibold
          shadow-xl active:scale-95 backdrop-blur-md transition-all"
        >
          Batafsil
        </button>

        {/* NEXT */}
        <button
          onClick={gotoNextStory}
          disabled={!hasNext}
          className={`w-14 h-14 flex justify-center items-center
          rounded-full text-white text-3xl font-bold
          backdrop-blur-md shadow-xl transition-all
          ${
            hasNext
              ? "bg-black/60 hover:bg-black/80"
              : "bg-black/30 opacity-40 pointer-events-none"
          }`}
        >
          ›
        </button>
      </div>

    </div>
  );
}

