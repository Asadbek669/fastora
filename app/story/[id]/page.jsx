"use client";

import { useEffect, useState } from "react";
import convertToEmbed from "@/utils/convertEmbed";
import { useRouter } from "next/navigation";

export default function StoryPage(props) {
  const router = useRouter();

  const [id, setId] = useState(null);
  const [story, setStory] = useState(null);
  const [allStories, setAllStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Disable page scroll while Story viewer is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  // Get ID from dynamic route
  useEffect(() => {
    const unwrap = async () => {
      const p = await props.params;
      let _id = p.id;
      if (Array.isArray(_id)) _id = _id[0];
      setId(_id);
    };
    unwrap();
  }, [props.params]);

  // Load all stories (for prev/next navigation)
  useEffect(() => {
    async function loadAll() {
      const base =
        process.env.NEXT_PUBLIC_SITE_URL || "https://www.fastora.uz";

      const res = await fetch(`${base}/api/stories`, { cache: "no-store" });
      const data = await res.json();
      setAllStories(data);
    }
    loadAll();
  }, []);

  // Load ONLY the current story (allStories kelishini kutmaydi!)
  useEffect(() => {
    if (!id) return;

    async function loadStory() {
      const base =
        process.env.NEXT_PUBLIC_SITE_URL || "https://www.fastora.uz";

      const res = await fetch(`${base}/api/stories/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        setStory({ error: true });
        return;
      }

      const data = await res.json();
      setStory(data);

      // Update index when allStories finally loads
      const index = allStories.findIndex((s) => s.id == id);
      setCurrentIndex(index >= 0 ? index : 0);
    }

    loadStory();
  }, [id, allStories]);

  // Next story
  function gotoNextStory() {
    const next = allStories[currentIndex + 1];
    if (next) router.push(`/story/${next.id}`);
  }

  // Prev story
  function gotoPrevStory() {
    const prev = allStories[currentIndex - 1];
    if (prev) router.push(`/story/${prev.id}`);
  }

  // Loading & errors
  if (!id || !story)
    return <div className="text-white p-6 text-center">Yuklanmoqda...</div>;

  if (story.error)
    return (
      <h1 className="text-red-500 text-center text-xl">
        Story topilmadi
      </h1>
    );

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allStories.length - 1;

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex justify-center items-center">

      {/* TOP TIMELINE (story progress bars) */}
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
                transition: "width 0.25s",
              }}
            ></div>
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

      {/* VIDEO PLAYER (VERTICAL) */}
      <div
        className="relative w-full max-w-[430px] mx-auto"
        style={{ paddingTop: "177.77%" }}
      >
        <iframe
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
          src={`${convertToEmbed(story.youtube_url)}?autoplay=1`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={story.title || "Story video"}
        />
      </div>

      {/* TITLE */}
      <div className="absolute bottom-32 w-full text-center text-white text-lg font-semibold px-4 drop-shadow-lg">
        {story.title}
      </div>

      {/* BOTTOM NAVIGATION (Prev / More / Next) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">

        {/* Prev */}
        <button
          onClick={gotoPrevStory}
          disabled={!hasPrev}
          className={`flex items-center justify-center w-12 h-12 rounded-full text-white text-2xl shadow-lg ${
            hasPrev
              ? "bg-white/20 hover:bg-white/30"
              : "bg-white/10 opacity-40 pointer-events-none"
          }`}
        >
          ‹
        </button>

        {/* More */}
        <button
          onClick={() =>
            story.page_url && (window.location.href = story.page_url)
          }
          className="bg-red-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-xl active:scale-95"
        >
          Batafsil
        </button>

        {/* Next */}
        <button
          onClick={gotoNextStory}
          disabled={!hasNext}
          className={`flex items-center justify-center w-12 h-12 rounded-full text-white text-2xl shadow-lg ${
            hasNext
              ? "bg-white/20 hover:bg-white/30"
              : "bg-white/10 opacity-40 pointer-events-none"
          }`}
        >
          ›
        </button>
      </div>
    </div>
  );
}      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
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






