"use client";

import Link from "next/link";
import Image from "next/image";

export default function BottomNav() {
  return (
    <div className="
      fixed bottom-0 left-0 w-full 
      text-white py-2 flex justify-around
      backdrop-blur-xl bg-gradient-to-r
      from-[#ffffff08] via-[#ffffff15] to-[#ffffff08]
      border-t border-white/10 z-50
    ">
      {/* HOME */}
      <Link href="/" className="flex flex-col items-center active:scale-95">
        <Image src="/icons/house.svg" width={24} height={24} alt="home" />
        <span className="text-xs">Asosiy</span>
      </Link>

      {/* DONATE */}
	  <Link
	    href="/donate"
	    className="flex flex-col items-center active:scale-95"
	  >
	    <Image src="/icons/hand-heart.svg" width={24} height={24} alt="donate" />
	    <span className="text-xs">Donate</span>
	  </Link>

      {/* SEARCH */}
      <Link href="/search" className="flex flex-col items-center active:scale-95">
        <Image src="/icons/search.svg" width={24} height={24} alt="search" />
        <span className="text-xs">Qidiruv</span>
      </Link>
    </div>
  );
}
