"use client";

import Image from "next/image";

export default function TopBar() {
  return (
    <div className="
      w-full 
      h-[60px]
      flex justify-center items-center
      shadow-md
      bg-gradient-to-b from-[#2a2a2a] to-[#000000]
    ">
      <Image
        src="/fastora-logo.png"
        alt="FASTORA Logo"
        width={140}
        height={120}
        className="object-contain"
        priority
      />
    </div>
  );
}
