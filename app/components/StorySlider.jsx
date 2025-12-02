"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StorySlider() {
  const [stories, setStories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function loadStories() {
      const res = await fetch("/api/stories", { cache: "no-store" });
      if (res.ok) setStories(await res.json());
    }
    loadStories();
  }, []);

  return (
    <div className="w-full">
      <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 px-1">

        {stories.map((s) => (
          <div
            key={s.id}
            className="flex flex-col items-center flex-shrink-0 cursor-pointer"
            onClick={() => router.push(`/story/${s.id}`)}
          >
            <div className="w-20 h-20 rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 to-red-500">
              <div className="w-full h-full rounded-full overflow-hidden bg-black">
                <img
                  src={s.poster_url}
                  alt={s.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <span className="text-xs mt-1 w-20 text-center truncate text-gray-300">
              {s.title}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}
