"use client";

import Image from "next/image";

export default function TopBar() {
  return (
    <div className="
      w-full h-[60px]
      flex justify-center items-center
      shadow-md
      bg-gradient-to-b from-[#2a2a2a] to-[#000000]
    ">
      <img
        src="https://cdn.fastora.uz/fastora-logo.webp"
        alt="Fastora logotipi"
        width="140"
        height="120"
        decoding="async"
        fetchpriority="low"
        className="object-contain"
      />
    </div>
  );
}
