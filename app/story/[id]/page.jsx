"use client";

import { useEffect, useState } from "react";
import convertToEmbed from "@/utils/convertEmbed";
import { useRouter } from "next/navigation";

export default function StoryPage(props) {
  const router = useRouter();
  const [story, setStory] = useState(null);
  const [id, setId] = useState(null);
  const [allStories, setAllStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Disable scroll (player mode)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  // Get ID from params
  useEffect(() => {
    async function unwrap() {
      const p = await props.params;
      let _id = p.id;
      if (Array.isArray(_id)) _id = _id[0];
      setId(_id);
    }
    unwrap();
  }, [props.params]);

  // Load all stories
  useEffect(() => {
    async function loadAll() {
      const base =
        process.env.NEXT_PUBLIC_SITE_URL || "https://fastora.vercel.app";
      const res = await fetch(`${base}/api/stories`, { cache: "no-store" });
      const data = await res.json();
      setAllStories(data);
    }
    loadAll();
  }, []);

  // Load current story based on ID
  useEffect(() => {
    if (!id || allStories.length === 0) return;

    async function load() {
      const base =
        process.env.NEXT_PUBLIC_SITE_URL || "https://fastora.vercel.app";
      const res = await fetch(`${base}/api/stories/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        setStory({ error: true });
        return;
      }

      const data = await res.json();
      setStory(data);

      // Current story index
      const index = allStories.findIndex((s) => s.id == id);
      setCurrentIndex(index >= 0 ? index : 0);
    }

    load();
  }, [id, allStories]);

  // NEXT story (by button)
  function gotoNextStory() {
    const next = allStories[currentIndex + 1];
    if (next) router.push(`/story/${next.id}`);
  }

  // PREVIOUS story (by button)
  function gotoPrevStory() {
    const prev = allStories[currentIndex - 1];
    if (prev) router.push(`/story/${prev.id}`);
  }

  if (!id || !story)
    return <div className="text-white p-6">Yuklanmoqda...</div>;
  if (story.error)
    return (
      <h1 className="text-red-500 text-center text-xl">Story topilmadi</h1>
    );

  // whether prev/next exist (used for disabled state)
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allStories.length - 1;

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex justify-center items-center">

      {/* TOP SEGMENT INDICATOR */}
      <div className="absolute top-4 left-0 right-0 flex gap-2 px-6 z-50">
        {allStories.map((s, i) => (
          <div
            key={s.id ?? i}
            className="w-full h-[3px] rounded bg-white/30 overflow-hidden"
          >
            <div
              className="h-full bg-white"
              style={{
                width: i === currentIndex ? "100%" : "0%",
                transition: "width 0.2s",
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* BACK (top-left) */}
	  <button
	    onClick={() => router.push("/")}
	    className="absolute top-4 left-4 z-50 bg-white/20 text-white px-3 py-2 rounded-full"
	  >
	    ←
	  </button>

      {/* STORY PLAYER (9:16) */}
      <div
        className="relative w-full max-w-[430px] mx-auto"
        style={{ paddingTop: "177.77%" }}
      >
        {/* Iframe unmuted (note: some browsers block autoplay with sound) */}
        <iframe
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
          src={convertToEmbed(story.youtube_url) + "?autoplay=1"}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={story.title || "Story video"}
        />
      </div>

      {/* TITLE */}
      <div className="absolute bottom-32 w-full text-center text-white text-lg font-semibold drop-shadow-lg px-4">
        {story.title}
      </div>

      {/* BOTTOM CONTROL GROUP: Prev - Batafsil - Next */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
        {/* Prev button */}
        <button
          onClick={gotoPrevStory}
          disabled={!hasPrev}
          className={`flex items-center justify-center w-12 h-12 rounded-full text-white text-2xl shadow-lg ${
            hasPrev ? "bg-white/20 hover:bg-white/30" : "bg-white/10 opacity-40 pointer-events-none"
          }`}
          aria-label="Oldingi story"
          title={hasPrev ? "Oldingi" : "Oldingi yo'q"}
        >
          ‹
        </button>

        {/* Batafsil button */}
        <button
          onClick={() => story.page_url && (window.location.href = story.page_url)}
          className="bg-red-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-xl active:scale-95"
        >
          Batafsil
        </button>

        {/* Next button */}
        <button
          onClick={gotoNextStory}
          disabled={!hasNext}
          className={`flex items-center justify-center w-12 h-12 rounded-full text-white text-2xl shadow-lg ${
            hasNext ? "bg-white/20 hover:bg-white/30" : "bg-white/10 opacity-40 pointer-events-none"
          }`}
          aria-label="Keyingi story"
          title={hasNext ? "Keyingi" : "Keyingi yo'q"}
        >
          ›
        </button>
      </div>
    </div>
  );
}



