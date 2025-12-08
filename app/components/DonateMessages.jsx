"use client";
import { useEffect, useState } from "react";

export default function DonateMessages({ messages }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!messages || messages.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000); // 4 sekundda almashadi

    return () => clearInterval(timer);
  }, [messages]);

  if (!messages || messages.length === 0) return null;

  return (
    <div
      className="
        fixed bottom-3 left-1/2 -translate-x-1/2 z-50
        px-4 py-2 rounded-xl text-white
        bg-[#000000bb] backdrop-blur-md
        text-sm shadow-lg select-none
        transition-all duration-500
      "
    >
      {messages[index]}
    </div>
  );
}
