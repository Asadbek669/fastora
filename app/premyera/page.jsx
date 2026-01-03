import Link from "next/link";

export const metadata = {
  title: "Premyera kinolar va seriallar — Fastora",
  description:
    "Eng yangi premyera filmlar va seriallarni HD sifatda fastora.uz saytida bepul tomosha qiling.",
  openGraph: {
    title: "Premyera — Fastora",
    description:
      "Eng yangi filmlar va seriallar premyeralari.",
    url: "https://fastora.uz/premyera",
    siteName: "Fastora",
    type: "website",
  },
};

// 🔥 Bitta ECO API
async function getPremiere() {
  const res = await fetch("https://fastora.vercel.app/api/premiere", {
    next: { revalidate: 300 }, // ISR + cache
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function Page() {
  const items = await getPremiere();

  return (
    <div className="p-4 pb-32">
      <h1 className="text-2xl font-semibold mb-4">
        Premyeralar
      </h1>

      {items.length === 0 && (
        <p className="text-gray-400">
          Hozircha premyeralar mavjud emas.
        </p>
      )}

      <div className="grid grid-cols-3 gap-3 mt-4">
        {items.map((item) => (
          <Link
            key={`${item.type}-${item.id}`}
            href={
              item.type === "movie"
                ? `/movie/${item.slug}`
                : `/series/${item.slug}`
            }
            className="rounded-xl overflow-hidden bg-[#111] shadow-lg"
          >
            <div className="relative">
              {/* 🔖 MOVIE / SERIES BADGE */}
              <span
                className={`absolute top-1 left-1 z-10 px-1.5 py-[2px]
                text-[9px] font-bold rounded
                ${
                  item.type === "movie"
                    ? "bg-red-600"
                    : "bg-blue-600"
                }`}
              >
                {item.type.toUpperCase()}
              </span>

              <img
                src={item.poster}
                alt={item.title}
                className="w-full h-40 object-cover"
                loading="lazy"
              />
            </div>

            <div className="p-1">
              <p className="text-xs font-semibold truncate">
                {item.title}
              </p>
              <p className="text-gray-400 text-[10px]">
                {item.year}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
