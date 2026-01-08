// components/PageHeader.jsx
"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PageHeader({ title, showBack = true }) {
  const router = useRouter();

  return (
    <div className="relative bg-black flex items-center justify-center h-10 md:h-12 px-3 border-b border-white/10 font-montserrat">
      
      {/* Ortga tugma (faqat ikonka) */}
      {showBack && (
        <button
          onClick={() => router.push("/")} // 🔹 Home ga yo‘naltiradi
          className="
            absolute left-3 
            flex items-center justify-center 
            w-8 h-8 md:w-9 md:h-9 
            rounded-md       /* 🔹 yumshoq burchaklar */
            bg-white/10 
            hover:bg-white/20 
            text-white 
            transition-all duration-200
          "
          aria-label="Orqaga"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      )}

      {/* Sarlavha markazda */}
      <h1 className="text-white text-lg md:text-xl font-semibold tracking-wide uppercase truncate text-center">
        {title}
      </h1>

    </div>
  );
}
