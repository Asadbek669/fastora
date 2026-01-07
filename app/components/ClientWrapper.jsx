"use client";

import { usePathname } from "next/navigation";
import TopBar from "./TopBar";
import BottomNav from "./BottomNav";
import InstallAppButton from "./InstallAppButton";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  // Premyera sahifasida TopBarni yashirish
  const hideTopBar = pathname.startsWith("/premyera");

  return (
    <>
      {!hideTopBar && <TopBar />}   {/* 🔹 shart qo‘shildi */}

      {children}

      {!isAdmin && <BottomNav />}
      {!isAdmin && <InstallAppButton />}
    </>
  );
}
