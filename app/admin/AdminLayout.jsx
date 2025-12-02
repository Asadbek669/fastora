"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-black text-white h-screen">

      {/* SIDEBAR — Desktop: always visible, Mobile: drawer */}
      <div
        className={`
          fixed md:static z-40
          h-full w-64 bg-[#0d0d0d] border-r border-white/10
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <Sidebar onLinkClick={() => setOpen(false)} />
      </div>

      {/* OVERLAY — faqat mobil uchun */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* TOPBAR */}
        <div className="sticky top-0 z-20 bg-[#0d0d0d] border-b border-white/10">
          <Topbar onMenuToggle={() => setOpen(!open)} />
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

      </div>
    </div>
  );
}
