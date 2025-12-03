import "./globals.css";
import TopBar from "./components/TopBar";
import BottomNav from "./components/BottomNav";
import { usePathname } from "next/navigation";

export const metadata = {
  title: "Fastora",
  description: "Fastora — multfilm, anime, kino va drama platformasi",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192.png"
  }
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
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
