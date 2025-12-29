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
import TvRow from "./components/TvRow";


const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  "http://localhost:3000";

// 🔥 HOME API dan barcha kinolar va seriallarni olish
async function getHomeData() {
  const res = await fetch(`${BASE_URL}/api/home`, { cache: "no-store" });
  if (!res.ok) return {};
  return res.json();
}


export default async function Page() {
  const data = await getHomeData();

  const premyeraMovies = (data.premyera ?? []).slice(0, 15);

  return (
    <div>

      {/* STORY SLIDER */}
      <div className="px-4 pt-4">
        <StorySlider testData={premyeraMovies} />
      </div>

      {/* HERO SLIDER */}
      <div className="mt-3 px-4">
        <HeroSlider testData={premyeraMovies} />
      </div>

	  {/* 📺 TELEKANALLAR */}
	  <TvRow />


  
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
      <img
        src="https://cdn.fastora.uz/IMG_20251230_022813_613.jpg"
        className="w-full h-24 object-cover"
        alt={g}
      />
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
          movies={data.tarjima ?? []}
          link="/tarjima"
        />

        <MovieRow
          title="Hind kinolar"
          movies={data.hind ?? []}
          link="/hind"
        />

        <MovieRow
          title="Anime"
          movies={data.anime ?? []}
          link="/anime"
        />

        <MovieRow
          title="Multfilmlar"
          movies={data.multfilmlar ?? []}
          link="/multfilmlar"
        />

        <MovieRow
          title="O‘zbek filmlar"
          movies={data.uzbek ?? []}
          link="/uzbek-film"
        />

        <MovieRow
          title="Xorij seriallari"
          movies={data.xorijSeriallar ?? []}
          link="/xorij-seriallar"
        />

        <MovieRow
          title="Koreya seriallari"
          movies={data.koreaSeriallar ?? []}
          link="/korea-seriallari"
        />

        <MovieRow
          title="Turk seriallari"
          movies={data.turkSeriallar ?? []}
          link="/turk-seriallar"
        />

        <MovieRow
          title="Multiserriallar"
          movies={data.multiserriallar ?? []}
          link="/multiserriallar"
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
