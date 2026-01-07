// components/PageHeader.jsx
"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PageHeader({ title, showBack = true }) {
  const router = useRouter();

  return (
    <div className="p-4 bg-[#151515] border-b border-white/10 flex items-center justify-between relative">
      
      {/* Ortga tugma */}
      {showBack && (
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Orqaga
        </button>
      )}

      {/* Sarlavha markazda */}
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                     text-xl md:text-2xl font-bold uppercase text-white tracking-wide">
        {title}
      </h1>

    </div>
  );
}
