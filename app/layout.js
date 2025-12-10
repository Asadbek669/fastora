import "./globals.css";
import ClientWrapper from "./components/ClientWrapper";

const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || "https://fastora.uz";
const LOGO_URL = `${DOMAIN}/icon.png`;
const OG_IMAGE = `${DOMAIN}/icons/icon-192.png`;

export const metadata = {
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
    siteName: "Fastora",
    type: "website",
    locale: "uz_UZ",
    // ❗❗❗ BU YERDAN images NI OCHIRAMIZ
  },

  twitter: {
    card: "summary_large_image",
    // ❗❗❗ GLOBAL twitter image ham kerak emas, ochiramiz
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

        {/* ORGANIZATION SCHEMA */}
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

        {/* WEBSITE SCHEMA */}
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
