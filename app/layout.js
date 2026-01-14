import "./globals.css";
import ClientWrapper from "./components/ClientWrapper";
import Footer from "@/components/Footer";
import Script from "next/script";

const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || "https://fastora.uz";
const LOGO_URL = `${DOMAIN}/icon.png`;

export const metadata = {
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180" },
    ],
    shortcut: [
      { url: "/favicon.ico" }, // agar bo‘lsa
    ],
  },
  openGraph: {
    siteName: "Fastora",
    type: "website",
    locale: "uz_UZ",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export function generateViewport() {
  return { themeColor: "#000000" };
}

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <head>
        {/* 🔹 GOOGLE ANALYTICS */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9K7SCJDFJD"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9K7SCJDFJD', {
              anonymize_ip: true,
              send_page_view: true
            });
          `}
        </Script>
      </head>

      <body className="bg-black text-white">


        {/* ORGANIZATION SCHEMA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Fastora",
              url: DOMAIN,
              logo: LOGO_URL,
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
              name: "Fastora",
              url: DOMAIN,
              publisher: {
                "@type": "Organization",
                name: "Fastora",
                logo: {
                  "@type": "ImageObject",
                  url: LOGO_URL,
                  width: 512,
                  height: 512,
                },
              },
            }),
          }}
        />


		<div className="min-h-screen flex flex-col pb-24">
		  {/* CONTENT */}
		  <main className="flex-1">
		    <ClientWrapper>{children}</ClientWrapper>
		  </main>

		  {/* GLOBAL FOOTER */}
		  <Footer />
	    </div>
	  </body>
    </html>
  );
}
