
import Link from "next/link";

// ================================
// 🧠 SEO METADATA
// ================================
export const metadata = {
  title: "Premyera filmlar va seriallar — Fastora",
  description:
    "Eng yangi premyera filmlar va seriallar. Fastora.uz orqali HD sifatda bepul tomosha qiling.",
  openGraph: {
    title: "Premyera — Fastora",
    description: "Eng yangi filmlar va seriallar premyeralari.",
    url: "https://fastora.uz/premyera",
    siteName: "Fastora",
    type: "website",
  },
};

// ================================
// 🔥 ECO API (ISR + CDN CACHE)
// ================================
async function getPremiere() {
  const res = await fetch("https://fastora.vercel.app/api/premiere", {
    next: { revalidate: 300 }, // 5 daqiqa
  });

  if (!res.ok) return [];
  return res.json();
}

// ================================
// 📄 PAGE
// ================================
export default async function Page() {
  const items = await getPremiere();

  return (
    <div className="p-4 pb-32">
      {/* TITLE */}
      <h1 className="text-2xl font-semibold mb-4">
        Premyeralar
      </h1>

      {/* EMPTY STATE */}
      {items.length === 0 && (
        <p className="text-gray-400">
          Hozircha premyeralar mavjud emas.
        </p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
        {items.map((item) => (
          <Link
            key={`${item.type}-${item.id}`}
            href={
              item.type === "movie"
                ? `/movie/${item.slug}`
                : `/serial/${item.slug}`
            }
            className="rounded-xl overflow-hidden bg-[#111]
                       shadow-lg transition-transform
                       active:scale-[0.97]"
          >
            {/* POSTER */}
            <div className="relative w-full aspect-[2/3] overflow-hidden">
              <img
                src={item.poster}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />

              {/* 🔖 TYPE BADGE */}
              <span
                className={`absolute top-1 left-1 z-10 px-1.5 py-[2px]
                text-[9px] font-bold rounded
                ${
                  item.type === "movie"
                    ? "bg-red-600"
                    : "bg-blue-600"
                }`}
              >
                {item.type === "movie" ? "FILM" : "SERIAL"}
              </span>

              {/* ⭐ IMDb */}
              {item.imdb && (
                <span
                  className="absolute top-1 right-1 z-10 px-1.5 py-[2px]
                  text-[9px] font-bold rounded bg-black/70"
                >
                  ⭐ {Number(item.imdb).toFixed(1)}
                </span>
              )}

              {/* 🟢 YEAR + DURATION / SEASON */}
              <div className="absolute bottom-0 left-0 w-full
                              bg-black/60 text-[10px]
                              text-white flex justify-between
                              px-2 py-[2px] font-semibold">
                <span>{item.year}</span>

                {item.type === "movie" && item.duration ? (
                  <span>{item.duration} min</span>
                ) : item.type === "series" && item.last_season ? (
                  <span>{item.last_season}-sezon</span>
                ) : null}
              </div>
            </div>

            {/* TITLE */}
            <div className="p-1">
              <p className="text-xs font-semibold truncate">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
