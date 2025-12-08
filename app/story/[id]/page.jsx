"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import convertToEmbed from "@/utils/convertEmbed";

export default function StoryPage() {
  const router = useRouter();
  const { id } = useParams(); // 🔥 props.params o‘rniga TO‘G‘RI USUL

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
      const base = "https://www.fastora.uz"; // 🔥 HTTPS + WWW

      const res = await fetch(`${base}/api/stories`, { cache: "no-store" });
      const data = await res.json();
      setAllStories(data);
    }
    loadAll();
  }, []);

  // Load current story
  useEffect(() => {
    if (!id) return;

    async function load() {
      const base = "https://www.fastora.uz"; // 🔥 redirect muammosiga yechim

      const res = await fetch(`${base}/api/stories/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        setStory({ error: true });
        return;
      }

      const data = await res.json();
      setStory(data);

      const index = allStories.findIndex((s) => s.id == id);
      setCurrentIndex(index >= 0 ? index : 0);
    }

    load();
  }, [id, allStories]);

  // Next/Prev
  function gotoNextStory() {
    const next = allStories[currentIndex + 1];
    if (next) router.push(`/story/${next.id}`);
  }

  function gotoPrevStory() {
    const prev = allStories[currentIndex - 1];
    if (prev) router.push(`/story/${prev.id}`);
  }

  if (!id || !story)
    return <div className="text-white p-6">Yuklanmoqda...</div>;

  if (story.error)
    return <h1 className="text-red-500 text-center text-xl">Story topilmadi</h1>;

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allStories.length - 1;

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex justify-center items-center">
      {/* TOP INDICATORS */}
      <div className="absolute top-4 left-0 right-0 flex gap-2 px-6 z-50">
        {allStories.map((s, i) => (
          <div key={s.id} className="w-full h-[3px] bg-white/30 rounded">
            <div
              className="h-full bg-white"
              style={{
                width: i === currentIndex ? "100%" : "0%",
                transition: "width .3s",
              }}
            />
          </div>
        ))}
      </div>

      {/* BACK BUTTON */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 z-50 bg-white/20 text-white px-3 py-2 rounded-full"
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
        />
      </div>

      {/* TITLE */}
      <div className="absolute bottom-32 text-white text-center text-lg px-4">
        {story.title}
      </div>

      {/* CONTROLS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        <button
          disabled={!hasPrev}
          onClick={gotoPrevStory}
          className={`w-12 h-12 rounded-full text-white text-2xl ${
            hasPrev ? "bg-white/20" : "bg-white/10 opacity-40"
          }`}
        >
          ‹
        </button>

        <button
          onClick={() => (window.location.href = story.page_url)}
          className="bg-red-600 text-white px-6 py-3 rounded-full"
        >
          Batafsil
        </button>

        <button
          disabled={!hasNext}
          onClick={gotoNextStory}
          className={`w-12 h-12 rounded-full text-white text-2xl ${
            hasNext ? "bg-white/20" : "bg-white/10 opacity-40"
          }`}
        >
          ›
        </button>
      </div>
    </div>
  );
}
