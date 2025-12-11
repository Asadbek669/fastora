import { Suspense } from "react";
import SearchClient from "./SearchClient";

export async function generateMetadata({ searchParams }) {
  const q = searchParams.query || "";

  if (!q) {
    return {
      title: "Qidiruv | Fastora",
      description: "Fastora bo‘yicha kino va seriallarni qidiring.",
      alternates: { canonical: "https://fastora.uz/search" },
      robots: { index: false, follow: true },
    };
  }

  return {
    title: `${q} — qidiruv natijalari | Fastora`,
    description: `"${q}" bo‘yicha topilgan kino va seriallar.`,
    alternates: { canonical: `https://fastora.uz/search?query=${q}` },
    openGraph: {
      title: `${q} — qidiruv | Fastora`,
      description: `"${q}" bo‘yicha topilgan natijalar`,
      url: `https://fastora.uz/search?query=${q}`,
      images: ["/fastora-logo.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${q} — qidiruv | Fastora`,
      description: `"${q}" bo‘yicha natijalar`,
      images: ["/fastora-logo.png"],
    },
    robots: { index: false, follow: true },
  };
}

export default function SearchPage({ searchParams }) {
  const q = searchParams.query || "";

  return (
    <Suspense fallback={<div className="text-white p-4">Yuklanmoqda...</div>}>
      <SearchClient initialQuery={q} />
    </Suspense>
  );
}


