"use client";

export default function TopBar() {
  return (
    <div
      className="
        w-full h-[60px]
        flex justify-center items-center
        shadow-md
        bg-gradient-to-b from-[#2a2a2a] to-[#000000]
      "
    >
      <img
        src="https://cdn.fastora.uz/tv/fastora-logo1.webp" 
        alt="Fastora logotipi"
        className="h-[40px] w-auto object-contain"
        decoding="async"
        fetchpriority="low"
      />
    </div>
  );
}
