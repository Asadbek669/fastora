"use client";

import { ArrowLeft } from "lucide-react";
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
      const base = typeof window !== "undefined"
        ? window.location.origin
        : "https://fastora.uz";
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
	{/* BACK BUTTON */}
	<button
	  onClick={() => router.push("/")}  // <- home sahifaga yo‘naltiradi
	  className="
		absolute top-6 left-4 z-50
		flex items-center gap-2
		bg-red-600 hover:bg-red-700
		text-white px-4 py-2 rounded-full
		font-medium text-sm
		shadow-md
		transition-all active:scale-95
	  "
	>
	  <ArrowLeft className="w-5 h-5" />
	  Orqaga
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
	    className="
		  absolute bottom-15 w-full text-center
		  text-white text-[18px] sm:text-[20px]  /* px bilan aniq o‘lcham */
		  font-semibold tracking-wide font-sans  /* font-sans → chiroyli sans serif */
		  px-4 sm:px-6 py-2
		  bg-gradient-to-t from-black/70 to-transparent
	    "
	  >
	    {story.title}
	  </div>

	  {/* CONTROL BUTTONS */}
	  <div
	    className="absolute bottom-0 inset-x-0 flex justify-center gap-3 z-50
				   bg-gradient-to-t from-black/50 via-black/70 to-black/90
				   px-4 py-2 rounded-xl backdrop-blur-sm"
	  >
	
	  {/* PREVIOUS */}
	    <button
	      disabled={!hasPrev}
	      onClick={gotoPrevStory}
	      className={`
	        w-12 h-12 rounded-full text-white text-2xl
	        transition-all active:scale-95
	        ${
	          hasPrev
	            ? "bg-red-600 hover:bg-red-700"
	            : "bg-red-900/40 opacity-40 cursor-not-allowed"
	        }
	      `}
	    >
	      ‹
	    </button>
	
	    {/* DETAILS */}
	    <button
	      onClick={() => (window.location.href = story.page_url)}
	      className="
	        bg-red-600 hover:bg-red-700
	        text-white px-6 py-3 rounded-full
	        transition-all active:scale-95
	      "
	    >
	      Batafsil
	    </button>
	
	    {/* NEXT */}
	    <button
	      disabled={!hasNext}
	      onClick={gotoNextStory}
	      className={`
	        w-12 h-12 rounded-full text-white text-2xl
	        transition-all active:scale-95
	        ${
	          hasNext
	      	    ? "bg-red-600 hover:bg-red-700"
	            : "bg-red-900/40 opacity-40 cursor-not-allowed"
	        }
	      `}
	    >
	      ›
	    </button>
      </div>
	</div>	
  );
}








