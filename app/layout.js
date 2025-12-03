import "./globals.css";
import ClientWrapper from "./components/ClientWrapper";

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

  twitter: {
    card: "summary_large_image",
    title: "Fastora — Multfilmlar, Animelar, Kinolar",
    description:
      "Fastora — eng zo‘r multfilmlar, animelar, kinolar va dramalar platformasi!",
    images: ["https://fastora.vercel.app/icons/icon-192.png"],
    creator: "@fastora",
  },

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
