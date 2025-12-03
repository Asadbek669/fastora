"use client";

import { usePathname } from "next/navigation";
import TopBar from "./TopBar";
import BottomNav from "./BottomNav";
import InstallAppButton from "./InstallAppButton";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <TopBar />

      {children}

      {!isAdmin && <BottomNav />}
      {!isAdmin && <InstallAppButton />}
    </>
  );
}
