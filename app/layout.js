import "./globals.css";
import ClientWrapper from "./components/ClientWrapper";

export const metadata = {
  title: "Fastora — Multfilmlar, Animelar, Kinolar",
  description: "Fastora — eng yangi multfilmlar, animelar, kinolar va dramalar.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192.png",
  },
  openGraph: {
    title: "Fastora",
    description: "Multfilmlar, animelar, kinolar va dramalar.",
    url: "https://fastora.vercel.app",
    siteName: "Fastora",
    images: [
      {
        url: "https://fastora.vercel.app/icons/icon-512.png",
        width: 512,
        height: 512,
      }
    ],
    locale: "uz_UZ",
    type: "website",
  }
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

