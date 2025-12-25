"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";


function CardSection({ title, children }) {
  return (
    <div className="bg-[#1a1a1a] p-3 rounded-xl shadow-md border border-white/10">
      <h3 className="text-xs font-semibold uppercase text-white/60 mb-2">{title}</h3>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

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
          w-full h-[40px] md:h-[52px]
          flex items-center
          px-3
          shadow-md
          bg-gradient-to-b from-[#2a2a2a] to-[#000000]
          relative z-50
        "
      >
        {/* LEFT — MENU BUTTON */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Menu"
          className="
            w-9 h-9 flex items-center justify-center
            text-white rounded-md
            hover:bg-white/10 transition
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
            text-white text-[11px] leading-none
            active:scale-95 hover:opacity-90 transition
          "
        >
          <Image
            src="/icons/hand-heart.svg"
            width={28}
            height={28}
            alt="Donate"
            className="drop-shadow-[0_1px_3px_rgba(255,255,255,0.35)] hover:scale-105 transition-transform"
          />
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
		  fixed top-0 left-0 h-full w-[260px]
		  bg-gradient-to-b from-[#111111] to-[#1a1a1a]
		  backdrop-blur-md
		  shadow-2xl z-50
		  transform transition-transform duration-500 ease-in-out
		  ${open ? "translate-x-0" : "-translate-x-full"}
		  flex flex-col
	    `}
	  >
        {/* SIDEBAR HEADER */}
		{/* SIDEBAR HEADER */}
		<div className="
		  h-[60px] flex items-center justify-center px-5
		  bg-black/90 backdrop-blur-md
		  border-b border-white/10
		  shadow-lg
		  relative
		">
		  <h2 className="
			text-xl font-bold 
			bg-clip-text text-transparent
			bg-gradient-to-r from-purple-400 via-pink-400 to-red-400
		  ">
			M E N Y U
		  </h2>

		  {/* Optional: Close button */}
		  <button
			onClick={() => setOpen(false)}
			className="absolute right-4 p-1 rounded-md hover:bg-white/10 transition"
		  >
			<svg
			  xmlns="http://www.w3.org/2000/svg"
			  className="h-5 w-5 text-white"
			  fill="none"
			  viewBox="0 0 24 24"
			  stroke="currentColor"
			  strokeWidth={2}
			>
			  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		  </button>
		</div>


        {/* SIDEBAR NAV */}
		<nav className="flex-1 flex flex-col px-4 py-4 gap-3 overflow-y-auto pb-20">
		  {/* Asosiy bo‘lim */}
		  <CardSection title="Asosiy">
			<MenuLink href="/" label="Bosh sahifa" onClick={() => setOpen(false)} />
			<MenuLink href="/search" label="Qidiruv" onClick={() => setOpen(false)} />
			<MenuLink href="/premyera" label="Premyeralar" onClick={() => setOpen(false)} />
		  </CardSection>

		  {/* Filmlar va seriallar */}
		  <CardSection title="Filmlar va seriallar">
			<MenuLink href="/tarjima" label="Tarjima kinolar" onClick={() => setOpen(false)} />
			<MenuLink href="/xorij-seriallar" label="Xorij seriallari" onClick={() => setOpen(false)} />
			<MenuLink href="/korea-seriallari" label="Koreya seriallari" onClick={() => setOpen(false)} />
			<MenuLink href="/turk-seriallar" label="Turk seriallari" onClick={() => setOpen(false)} />
			<MenuLink href="/hind" label="Hind filmlari" onClick={() => setOpen(false)} />
			<MenuLink href="/anime" label="Anime" onClick={() => setOpen(false)} />
			<MenuLink href="/multfilmlar" label="Multfilmlar" onClick={() => setOpen(false)} />
		  </CardSection>

		  {/* Boshqa */}
		  <CardSection title="Boshqa">
			<MenuLink href="/tv" label="Jonli TV" onClick={() => setOpen(false)} />
			<MenuLink href="/donate" label="Loyihani qo‘llab-quvvatlash" onClick={() => setOpen(false)} />
			<MenuLink href="/copyright" label="Mualliflik huquqi" onClick={() => setOpen(false)} />
		  </CardSection>
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
      className="px-3 py-2 rounded-md flex items-center justify-between hover:bg-white/10 hover:scale-105 transition-all group"
    >
      <span className="text-white">{label}</span>
      <span className="text-white/40 group-hover:text-white transition-all">→</span>
    </Link>
  );
}

function Section({ title, children }) {
  return (
    <div className="mt-4">
      <h3 className="px-3 text-xs font-semibold uppercase text-white/60 mb-2">{title}</h3>
      <div className="flex flex-col gap-1">{children}</div>
      <Divider />
    </div>
  );
}

function Divider() {
  return <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />;
}
