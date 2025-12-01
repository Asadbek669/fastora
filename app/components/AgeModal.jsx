"use client";

import { useState } from "react";

export default function AgeModal({ age }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* AGE BOX (bosiladigan joy) */}
      <div
        onClick={() => setOpen(true)}
        className="bg-red-600/20 border border-red-600/40 rounded-lg py-2 flex flex-col items-center cursor-pointer active:scale-95 transition"
      >
        <p className="text-lg font-bold mt-1">{age}</p>
      </div>

      {/* MODAL */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111] px-6 py-5 rounded-xl border border-white/10 max-w-[80%] text-center"
          >
            <h2 className="text-xl font-bold text-red-400 mb-2">
              Yosh cheklovi
            </h2>

            <p className="text-gray-300 text-sm leading-relaxed">
              Agar siz <b>{age}</b> yoshdan kichik bo‘lsangiz, ushbu kontentni
              tomosha qilish tavsiya etilmaydi. Tomosha qilish oqibatlari uchun
              Fastora loyihasi mas’uliyatni o‘z zimmasiga olmaydi.
            </p>

            <button
              onClick={() => setOpen(false)}
              className="mt-4 bg-red-600/40 border border-red-500/50 px-4 py-2 rounded-lg text-sm active:scale-95"
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </>
  );
}
