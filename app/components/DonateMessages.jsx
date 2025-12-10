"use client";
import { useEffect, useState } from "react";

export default function DonateMessages({ messages }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!messages || messages.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [messages]);

  if (!messages || messages.length === 0) return null;

  return (
    <div
      className="
        fixed bottom-20 left-1/2 -translate-x-1/2 z-[999]
        max-w-[90%] px-4 py-3
        rounded-2xl text-white text-sm font-medium
        bg-black/60 backdrop-blur-xl
        shadow-[0_4px_20px_rgba(0,0,0,0.4)]
        transition-all duration-500 ease-in-out
        animate-fade
      "
    >
      {messages[index]}
    </div>
  );
}
