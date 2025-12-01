"use client";

import { useState } from "react";

export default function StorySlider({ testData = [] }) {
  const [stories] = useState(testData);

  return (
    <div className="w-full">
      <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
        {stories.map((s) => (
          <div key={s.id} className="flex flex-col items-center flex-shrink-0 cursor-pointer">
            <div className="
              w-20 h-20 rounded-full p-[2px]
              bg-gradient-to-tr from-yellow-400 to-red-500
            ">
              <div className="w-full h-full rounded-full overflow-hidden bg-black">
                <img
                  src={s.poster_url}
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
