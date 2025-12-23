"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function TopBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* TOP BAR */}
      <div
        className="
          w-full
          h-[40px] md:h-[52px]
          flex items-center
          shadow-md
          bg-gradient-to-b from-[#2a2a2a] to-[#000000]
          px-3
          relative
          z-50
        "
      >
        {/* LEFT — MENU */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="
            w-9 h-9
            flex items-center justify-center
            text-white
            rounded-md
            hover:bg-white/10
            transition
          "
        >
          <div className="space-y-1.5">
            <span className="block w-5 h-[2px] bg-white" />
            <span className="block w-5 h-[2px] bg-white" />
            <span className="block w-5 h-[2px] bg-white" />
          </div>
        </button>

        {/* CENTER — LOGO */}
        <div className="flex-1 flex justify-center">
          <Link href="/" aria-label="Bosh sahifa">
            <img
              src="/text.svg"
              alt="Fastora"
              className="h-[22px] md:h-[34px] w-auto"
              decoding="async"
            />
          </Link>
        </div>

        {/* RIGHT — DONATE 🔥 */}
		<Link
		  href="/donate"
		  className="
			flex flex-col items-center
			text-white
			text-[11px]
			leading-none
			active:scale-95
			hover:opacity-90
			transition
		  "
		>
		  <Image
			src="/icons/hand-heart.svg"
			width={28}          // ⬅️ kattaroq
			height={28}
			alt="Donate"
			className="
			  drop-shadow-[0_1px_3px_rgba(255,255,255,0.35)]
			  hover:scale-105
			  transition-transform
			"
		  />
		  <span className="mt-1 font-medium tracking-wide">
			
		  </span>
		</Link>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0
          h-full w-[260px]
          bg-[#0f0f0f]
          shadow-xl
          z-50
          transform transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* sidebar content o‘zgarishsiz */}
      </aside>
    </>
  );
}
