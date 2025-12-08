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

        {/* ================================
            GOOGLE ORGANIZATION LOGO SCHEMA
        ================================= */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Fastora",
              "url": DOMAIN,
              "logo": LOGO_URL,
              "sameAs": [
                "https://t.me/fastora",
                "https://instagram.com/fastora"
              ]
            }),
          }}
        />

        {/* ================================
            WEBSITE SCHEMA
        ================================= */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Fastora",
              "url": DOMAIN,
              "publisher": {
                "@type": "Organization",
                "name": "Fastora",
                "logo": {
                  "@type": "ImageObject",
                  "url": LOGO_URL,
                  "width": 512,
                  "height": 512,
                },
              },
            }),
          }}
        />

        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
