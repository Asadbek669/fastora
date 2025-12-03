import "./globals.css";
import ClientWrapper from "./components/ClientWrapper";

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
  return (
    <html lang="uz">
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
