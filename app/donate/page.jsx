import DonatePageClient from "./DonatePageClient";

export const metadata = {
  title: "Homiylik — Loyihani qo‘llab-quvvatlash | Fastora",
  description:
    "Fastora loyihasini rivojlantirishga hissa qo‘shing. Sizning qo‘llab-quvvatlashingiz biz uchun juda muhim!",
  openGraph: {
    title: "Fastora — Homiylik sahifasi",
    description:
      "Fastora loyihasini rivojlantirishga hissa qo‘shing. Sizning qo‘llab-quvvatlashingiz biz uchun juda muhim!",
    url: "https://fastora.uz/donate",
    images: [
      {
        url: "https://cdn.fastora.uz/donate.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://cdn.fastora.uz/donate.jpg"],
  },
};

export default function Page() {
  return <DonatePageClient />;
}
