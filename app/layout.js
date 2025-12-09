import "./globals.css";
import ClientWrapper from "./components/ClientWrapper";

// Domen avtomatik aniqlanadi
const DOMAIN =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fastora.uz";

// Google Rich Logo uchun asosiy rasm
const LOGO_URL = `${DOMAIN}/icon.png`;

// OpenGraph uchun preview rasm
const OG_IMAGE = `${DOMAIN}/icons/icon-192.png`;

export const metadata = {
  title: "Fastora — Multfilmlar, Animelar, Kinolar, Dramalar",
  description:
    "Fastora — eng yangi multfilmlar, animelar, kinolar va dramalarni bepul tomosha qiling.",
  manifest: "/manifest.json",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icons/icon-192.png",
  },

  openGraph: {
    title: "Fastora — Multfilmlar, Animelar, Kinolar, Dramalar",
    description:
      "Fastora — eng yangi multfilmlar, animelar, kinolar va dramalar platformasi.",
    url: DOMAIN,
    siteName: "Fastora",
    type: "website",
    locale: "uz_UZ",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Fastora — Multfilmlar, Animelar, Kinolar",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Fastora — Multfilmlar, Animelar, Kinolar",
    description:
      "Fastora — eng zo‘r multfilmlar, animelar, kinolar va dramalar platformasi!",
    images: [OG_IMAGE],
    creator: "@fastora",
  },
};

export function generateViewport() {
  return {
    themeColor: "#000000",
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
