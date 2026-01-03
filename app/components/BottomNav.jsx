"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Tv, HeartHandshake, Search } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Asosiy",
      icon: Home,
      activeColor: "text-yellow-400",
      underline: "bg-yellow-400 shadow-[0_0_10px_#facc15]",
    },
    {
      href: "/tv",
      label: "TV",
      icon: Tv,
      activeColor: "text-green-400",
      underline: "bg-green-400 shadow-[0_0_10px_#4ade80]",
    },
    {
      href: "/donate",
      label: "Donate",
      icon: HeartHandshake,
      activeColor: "text-red-400",
      underline: "bg-red-400 shadow-[0_0_10px_#f87171]",
    },
    {
      href: "/search",
      label: "Qidiruv",
      icon: Search,
      activeColor: "text-blue-400",
      underline: "bg-blue-400 shadow-[0_0_10px_#60a5fa]",
    },
  ];

  return (
    <div
      className="
        fixed bottom-0 left-0 w-full
        py-2 flex justify-around
        backdrop-blur-xl
        bg-gradient-to-r
        from-[#0f0f0fcc] via-[#1a1a1acc] to-[#0f0f0fcc]
        border-t border-white/15
        z-50
      "
    >
      {navItems.map(
        ({ href, label, icon: Icon, activeColor, underline }) => {
          const isActive =
            pathname === href ||
            (href !== "/" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center px-3"
            >
              {/* ICON */}
              <Icon
                className={`
                  transition-all duration-300 ease-out
                  ${
                    isActive
                      ? `w-7 h-7 scale-110 ${activeColor}`
                      : "w-6 h-6 text-white/90"
                  }
                `}
              />

              {/* LABEL (active bo‘lsa yashiriladi) */}
              <span
                className={`
                  mt-0.5 text-[11px] transition-all duration-200
                  ${
                    isActive
                      ? "opacity-0 h-0 overflow-hidden"
                      : "opacity-100 text-white/90"
                  }
                `}
              >
                {label}
              </span>

              {/* UNDERLINE */}
              <span
                className={`
                  absolute -bottom-1 h-[3px] rounded-full
                  transition-all duration-300
                  ${underline}
                  ${
                    isActive
                      ? "w-full opacity-100"
                      : "w-0 opacity-0"
                  }
                `}
              />
            </Link>
          );
        }
      )}
    </div>
  );
}
