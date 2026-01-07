// components/PageHeader.jsx
"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PageHeader({ title, showBack = true }) {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 bg-black bg-opacity-95 backdrop-blur-md border-b border-white/10 flex items-center justify-center h-12 md:h-16 px-4">
      
      {/* Ortga tugma (faqat ikonka) */}
      {showBack && (
        <button
          onClick={() => router.back()}
          className="absolute left-3 flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
          aria-label="Orqaga"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      )}

      {/* Sarlavha markazda */}
      {/* Sarlavha markazda */}
      <h1 className="text-white text-lg md:text-xl font-semibold tracking-wide uppercase truncate text-center">
        {title}
      </h1>

    </div>
  );
}
