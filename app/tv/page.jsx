import TvClient from "./TvClient";

export const metadata = {
  title: "Bepul Telekanallar — Fastora TV | Fastora",
  description:
    "Fastora orqali O‘zbekiston va xorijiy jonli telekanallarni onlayn tomosha qiling: Sevimli TV, MY5, Milliy TV, ZO‘R TV, O‘zbekiston 24 va boshqalar.",

  alternates: {
    canonical: "https://fastora.uz/tv",
  },

  openGraph: {
    title: "Bepul telekanallar — Fastora",
    description:
      "Barcha mashhur jonli telekanallarni Fastora platformasida bepul tomosha qiling.",
    url: "https://fastora.uz/tv",
    siteName: "Fastora",
    locale: "uz_UZ",
    type: "website",

    images: [
      {
        url: "https://cdn.fastora.uz/og-tv.jpg",
        width: 1200,
        height: 630,
        alt: "Fastora — Jonli telekanallar",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Jonli telekanallar — Fastora",
    description: "Bepul jonli efirdagi TV kanallar Fastora’da",
    images: ["https://cdn.fastora.uz/og-tv.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default function TvPage() {
  return <TvClient />;
}


