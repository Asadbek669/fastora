"use client"; 
import "./globals.css";
import TopBar from "./components/TopBar";
import BottomNav from "./components/BottomNav";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // ADMIN sahifalardami? 
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="uz">
      <body>
        {/* TopBar ham public ham admin sahifalarda bo'ladimi? 
            Agar admin sahifalarda ham kerak bo'lmasa — xohlasa olib tashlaymiz */}
        <TopBar />

        {children}

        {/* faqat public sahifalarda ko'rinadi */}
        {!isAdmin && <BottomNav />}
      </body>
    </html>
  );
}
