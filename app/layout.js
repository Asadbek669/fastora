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
