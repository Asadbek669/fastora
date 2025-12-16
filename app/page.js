export const metadata = {
  title: "Fastora — Eng yangi multfilmlar, animelar, kinolar va seriallar",
  description:
    "Fastora — o‘zbekcha tarjima kinolar, xorij seriallari, koreys dramalari, hind filmlari, anime va multfilmlarni bepul tomosha qilish platformasi.",
  keywords: [
    "kino",
    "serial",
    "uzbekcha tarjima",
    "anime",
    "multfilm",
    "hind kino",
    "koreya seriallari",
    "turk seriallari",
    "Fastora",
  ],
  openGraph: {
    title: "Fastora — Eng yangi filmlar va seriallar",
    description:
      "Fastora — o‘zbek tilidagi multfilm, anime, kino va seriallarni bepul tomosha qiling.",
    url: "https://fastora.uz",
    siteName: "Fastora",
    images: [
      {
        url: "https://fastora.uz/icons/icon-192.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fastora — Bepul kino va seriallar",
    description:
      "Fastora — yangi multfilm, anime, kino va seriallarni bepul tomosha qiling.",
    images: ["https://fastora.uz/icons/icon-192.png"],
  },
};

import StorySlider from "./components/StorySlider";
import HeroSlider from "./components/HeroSlider";
import MovieRow from "./components/MovieRow";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  "http://localhost:3000";

// 🔥 Kinolarni olish
async function getMovies() {
  const res = await fetch(`${BASE_URL}/api/movies`, { cache: "no-store" });
  if (!res.ok) return [];

  const data = await res.json();
  return Array.isArray(data) ? data : data.movies ?? [];
}

// 🔥 Seriallarni olish
async function getSeries() {
  const res = await fetch(`${BASE_URL}/api/series`, { cache: "no-store" });
  if (!res.ok) return [];

  const data = await res.json();
  return Array.isArray(data) ? data : data.series ?? [];
}

export default async function Page() {
  const movies = await getMovies();
  const series = await getSeries();

  const premyeraMovies = [...movies].reverse().slice(0, 10);

  return (
    <div className="pb-24">

      {/* STORY SLIDER */}
      <div className="px-4 pt-4">
        <StorySlider testData={movies} />
      </div>

      {/* HERO SLIDER */}
      <div className="mt-3 px-4">
        <HeroSlider testData={movies} />
      </div>

{/* TELEKANALLAR */}
<h2 className="text-xl font-semibold mt-6 mb-3 px-4">
  Telekanallar
</h2>

<div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2">
  {[
    "O‘zbekiston 24",
    "Milliy TV",
    "Zo‘r TV",
    "MY5",
    "Sport",
    "Sevimli",
  ].map((tv, i) => (
    <div
      key={i}
      className="flex-shrink-0 w-[110px] rounded-xl overflow-hidden bg-[#111]"
    >
      <img src="/tez-orada.jpg" className="w-full h-24 object-cover" />
      <p className="text-center py-2 text-sm truncate">{tv}</p>
    </div>
  ))}
</div>
  
      {/* JANRLAR */}
      <h2 className="text-xl font-semibold mt-6 mb-3 px-4">Janrlar</h2>

      <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2">
        {[
          "Drama",
          "Fantastika",
          "Tarixiy",
          "Jangari",
          "Komediya",
          "Melodrama",
          "Ujas",
          "Sarguzasht",
        ].map((g, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[110px] rounded-xl overflow-hidden bg-[#111] shadow-lg"
          >
            <img src="/tez-orada.jpg" className="w-full h-24 object-cover" />
            <p className="text-center py-2 text-sm truncate">{g}</p>
          </div>
        ))}
      </div>

      {/* MOVIE ROWS */}
      <div className="mt-8 px-4 space-y-10">

        <MovieRow
          title="Premyera"
          movies={premyeraMovies}
          link="/premyera"
          badgeType="premyera"
        />

        <MovieRow
          title="Tarjima kinolar"
          movies={movies.filter((m) => m.category === "tarjima")}
          link="/tarjima"
        />

        <MovieRow
          title="Xorij seriallari"
          movies={series.filter((s) => s.category === "xorij-seriallar")}
          link="/xorij-seriallar"
        />

        <MovieRow
          title="Koreya seriallari"
          movies={series.filter((s) => s.category === "korea-seriallari")}
          link="/korea-seriallari"
        />

        <MovieRow
          title="Hind kinolar"
          movies={movies.filter((m) => m.category === "hind")}
          link="/hind"
        />

        <MovieRow
          title="Turk seriallari"
          movies={series.filter((s) => s.category === "turk-seriallar")}
          link="/turk-seriallar"
        />

        <MovieRow
          title="Anime"
          movies={movies.filter((m) => m.category === "anime")}
          link="/anime"
        />

        <MovieRow
          title="Multfilmlar"
          movies={series.filter((s) => s.category === "multfilmlar")}
          link="/multfilmlar"
        />

        <MovieRow
          title="O‘zbek filmlar"
          movies={movies.filter((m) => m.category === "uzbek-film")}
          link="/uzbek-film"
        />
      </div>

      {/* ============================
          ⭐ RESPONSIVE SOCIAL FOOTER 
          ============================ */}
      <div className="mt-12 px-4 pb-10">
        <h2 className="text-lg font-semibold mb-3">Bizni kuzating</h2>

        <div className="flex items-center justify-between gap-4">

          {/* Instagram */}
          <a
            href="https://instagram.com/fastora_uz"
            target="_blank"
            className="p-3 rounded-xl bg-[#111] hover:bg-[#222] transition"
          >
            <img
              src="/icons/instagram.svg"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
            />
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/fastora_uz"
            target="_blank"
            className="p-3 rounded-xl bg-[#111] hover:bg-[#222] transition"
          >
            <img
              src="/icons/telegram.svg"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
            />
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com/@fastora_uz"
            target="_blank"
            className="p-3 rounded-xl bg-[#111] hover:bg-[#222] transition"
          >
            <img
              src="/icons/youtube.svg"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
            />
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com/@fastora"
            target="_blank"
            className="p-3 rounded-xl bg-[#111] hover:bg-[#222] transition"
          >
            <img
              src="/icons/tiktok.svg"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
            />
          </a>

        </div>
      </div>

    </div>
  );
}
