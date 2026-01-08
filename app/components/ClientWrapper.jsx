"use client";

import { usePathname } from "next/navigation";
import TopBar from "./TopBar";
import BottomNav from "./BottomNav";
import InstallAppButton from "./InstallAppButton";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  // 🔹 Sahifalar ro'yxati, qaysi sahifalarda TopBar yashirin bo'lishi kerak
  const hideTopBarPages = ["/premyera", "/tv", "/donate"];

  // 🔹 pathname ushbu ro'yxatdan biron biri bilan boshlanadimi?
  const hideTopBar = hideTopBarPages.some((path) => pathname.startsWith(path));

  return (
    <>
      {!hideTopBar && <TopBar />}

      {children}

      {!isAdmin && <BottomNav />}
      {!isAdmin && <InstallAppButton />}
    </>
  );
}
