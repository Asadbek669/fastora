"use client";

import { useEffect, useRef } from "react";

export default function Player({ src, title }) {
  const playerRef = useRef(null);

  useEffect(() => {
    // PlayerJS skriptini yuklash
    const script = document.createElement("script");
    script.src = "/player/playerjs.min.js";
    script.async = true;

    script.onload = () => {
      if (window.Playerjs) {
        new window.Playerjs({
          id: "playerjs",
          file: src,
          poster: "", // xohlasang thumbnail qo‘shaman
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [src]);

  return (
    <div className="mt-4 px-4">
      <div className="w-full aspect-video bg-black rounded-xl overflow-hidden border border-white/10">
        <div id="playerjs" ref={playerRef}></div>
      </div>

      <h3 className="mt-2 text-white text-lg font-semibold">{title}</h3>
    </div>
  );
}
