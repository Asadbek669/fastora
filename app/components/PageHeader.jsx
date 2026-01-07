// components/PageHeader.jsx
"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PageHeader({ title, showBack = true }) {
  const router = useRouter();

  return (
    <div className="relative bg-[#151515] border-b border-white/10 flex items-center justify-center h-12 md:h-14 px-4">
      
      {/* Ortga tugma (faqat ikonka) */}
      {showBack && (
        <button
          onClick={() => router.back()}
          className="absolute left-4 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      )}

      {/* Sarlavha markazda */}
      <h1
        className="text-base md:text-lg font-bold uppercase text-white tracking-wider text-center truncate"
        style={{
          fontFamily: "Montserrat, system-ui, sans-serif",
          textShadow: "0 1px 2px rgba(0,0,0,0.5)",
        }}
      >
        {title}
      </h1>

    </div>
  );
}
