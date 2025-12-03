import "./globals.css";
import ClientWrapper from "./components/ClientWrapper";

export const metadata = {
  // --- Basic SEO ---
  title: "Fastora — Multfilmlar, Animelar, Kinolar, Dramalar",
  description:
    "Fastora — eng yangi multfilmlar, animelar, kinolar va dramalarni bepul tomosha qiling. Eng so‘nggi premyeralar, dramalar va anime loyihalar birinchi bo‘lib Fastorada!",

  // --- PWA manifest ---
  manifest: "/manifest.json",

  // --- Favicon + Apple Touch ---
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192.png",
  },

  // --- OpenGraph (Telegram, Facebook, Instagram, Google) ---
  openGraph: {
    title: "Fastora — Multfilmlar, Animelar, Kinolar, Dramalar",
    description:
      "Fastora — eng yangi multfilmlar, animelar, kinolar va dramalar platformasi. Yangiliklarni birinchi bo‘lib tomosha qiling!",
    url: "https://fastora.vercel.app",
    siteName: "Fastora",
    type: "website",
    locale: "uz_UZ",
    images: [
      {
        url: "https://fastora.vercel.app/icons/icon-192.png",
        width: 1200,
        height: 630,
        alt: "Fastora — Multfilmlar, Animelar, Kinolar",
      },
    ],
  },

  // --- Twitter Cards (X tarmog‘i) ---
  twitter: {
    card: "summary_large_image",
    title: "Fastora — Multfilmlar, Animelar, Kinolar",
    description:
      "Fastora — eng zo‘r multfilmlar, animelar, kinolar va dramalar platformasi!",
    images: ["https://fastora.vercel.app/icons/icon-192.png"],
    creator: "@fastora",
  },

  // --- Theme Colors (Android Chrome yuqori panel rangi) ---
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}

