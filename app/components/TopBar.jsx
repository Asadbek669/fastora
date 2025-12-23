
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function TopBar() {
  const [open, setOpen] = useState(false);

  // 🔒 BODY SCROLL LOCK
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <div
        className="
          w-full
          h-[40px] md:h-[52px]
          flex items-center
          px-3
          shadow-md
          bg-gradient-to-b from-[#2a2a2a] to-[#000000]
          relative
          z-50
        "
      >
        {/* LEFT — MENU BUTTON */}
        <button
          onClick={() => setOpen(true)}
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
        <div className="flex-1 flex justify-center items-center">
          <Link href="/" aria-label="Bosh sahifa">
            <img
              src="/text.svg"
              alt="Fastora"
              className="h-[24px] md:h-[36px] w-auto"
              decoding="async"
            />
          </Link>
        </div>

        {/* RIGHT — DONATE */}
        <Link
          href="/donate"
          aria-label="Donate"
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
            width={28}
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

      {/* ================= OVERLAY ================= */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* ================= SIDEBAR ================= */}
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
        {/* SIDEBAR HEADER */}
        <div className="h-[40px] md:h-[52px] flex items-center px-4 border-b border-white/10">
          <span className="text-white font-semibold">Fastora</span>
        </div>

        {/* SIDEBAR NAV */}
        <nav className="flex flex-col px-4 py-4 gap-1 text-sm text-white/90">
          <MenuLink href="/" label="Bosh sahifa" onClick={() => setOpen(false)} />
          <MenuLink href="/search" label="Qidiruv" onClick={() => setOpen(false)} />
          <MenuLink href="/premyera" label="Premyeralar" onClick={() => setOpen(false)} />

          <Divider />

          <MenuLink href="/tarjima" label="Tarjima kinolar" onClick={() => setOpen(false)} />
          <MenuLink href="/xorij-seriallar" label="Xorij seriallari" onClick={() => setOpen(false)} />
          <MenuLink href="/korea-seriallari" label="Koreya seriallari" onClick={() => setOpen(false)} />
          <MenuLink href="/turk-seriallar" label="Turk seriallari" onClick={() => setOpen(false)} />
          <MenuLink href="/hind" label="Hind filmlari" onClick={() => setOpen(false)} />
          <MenuLink href="/anime" label="Anime" onClick={() => setOpen(false)} />
          <MenuLink href="/multfilmlar" label="Multfilmlar" onClick={() => setOpen(false)} />

          <Divider />

          <MenuLink href="/tv" label="Jonli TV" onClick={() => setOpen(false)} />
          <MenuLink href="/donate" label="Loyihani qo‘llab-quvvatlash" onClick={() => setOpen(false)} />
          <MenuLink href="/copyright" label="Mualliflik huquqi" onClick={() => setOpen(false)} />
        </nav>
      </aside>
    </>
  );
}

/* ================= HELPERS ================= */

function MenuLink({ href, label, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="px-3 py-2 rounded-md hover:bg-white/10 transition"
    >
      {label}
    </Link>
  );
}

function Divider() {
  return <div className="my-2 border-t border-white/10" />;
}
