"use client";

import { useEffect, useState } from "react";
import convertToEmbed from "@/utils/convertEmbed";

export default function StoryPage(props) {
  const [story, setStory] = useState(null);
  const [id, setId] = useState(null);

  // ❗ Next.js 16 params is Promise → unwrap
  useEffect(() => {
    async function unwrap() {
      const p = await props.params;

      let realId = p.id;
      if (Array.isArray(realId)) realId = realId[0];

      setId(realId);
    }
    unwrap();
  }, [props.params]);

  // Load story AFTER id resolved
  useEffect(() => {
    if (!id) return;

    async function load() {
      const base = process.env.NEXT_PUBLIC_BASE_URL || "https://fastora.vercel.app";

      const res = await fetch(`${base}/api/stories/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        setStory({ error: true });
        return;
      }

      const data = await res.json();
      setStory(data);
    }

    load();
  }, [id]);

  if (!id || !story) {
    return <div className="text-white p-6">Yuklanmoqda...</div>;
  }

  if (story.error) {
    return <h1 className="p-4 text-red-500 text-center text-xl">Story topilmadi</h1>;
  }

  return (
    <div className="w-full h-screen flex flex-col items-center bg-black overflow-hidden">
      <div className="w-full max-w-[450px] h-[75vh] bg-black overflow-hidden">
        <iframe
          className="w-full h-full"
          src={convertToEmbed(story.youtube_url)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="text-white text-lg font-semibold mt-4 px-4 text-center">
        {story.title}
      </div>

      <button
        onClick={() => {
          if (story.page_url) {
            window.location.href = story.page_url;
          }
        }}
        className="mt-6 bg-red-600 text-white px-6 py-3 rounded-full text-lg font-medium"
      >
        Batafsil ko‘rish
      </button>
    </div>
  );
}

