"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then(res => res.json());

export default function StorySlider() {
  const router = useRouter();
  const { data: stories } = useSWR("/api/stories", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000, // 5 daqiqa ichida faqat 1 marta fetch
  });

  // 🔹 Skeleton (CLS yo‘q)
  if (!stories) {
    return (
      <div className="flex gap-4 overflow-x-auto py-2 px-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-gray-800 animate-pulse" />
            <div className="h-3 w-16 bg-gray-800 rounded mt-2 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 px-1">
        {stories.map((s) => (
          <div
            key={s.id}
            className="flex flex-col items-center flex-shrink-0 cursor-pointer"
            onClick={() => router.push(`/story/${s.id}`)}
          >
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 to-red-500">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-black"
                <img
                  src={s.poster_url}
                  alt={s.title}
                  className="w-20 h-20 object-cover rounded-full"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Title */}
            <span className="text-xs mt-1 w-20 text-center truncate text-gray-300">
              {s.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
