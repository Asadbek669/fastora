"use client";

import "./globals.css";
import TopBar from "./components/TopBar";
import BottomNav from "./components/BottomNav";
import { usePathname } from "next/navigation";

// ❗ manifest ulanishi uchun metadata export bo'lishi shart
export const metadata = {
  title: "Fastora",
  description: "Fastora — seriallar, filmlar va hikoyalar platformasi",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // ADMIN sahifalardami?
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="uz">
      <body>
        <TopBar />

        {children}

        {!isAdmin && <BottomNav />}
      </body>
    </html>
  );
}
