"use client";

import { useEffect, useState } from "react";
import LiveExternalPlayer from "@/components/LiveExternalPlayer";

export default function ClientPlayer({ src, vastUrl }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full aspect-video bg-black flex items-center justify-center text-gray-300 text-sm">
        Player yuklanmoqda...
      </div>
    );
  }

  return <LiveExternalPlayer src={src} vastUrl={vastUrl} />;
}
