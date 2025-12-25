import Link from "next/link";

export const metadata = {
  title: "Multiserriallar — Eng yaxshi multseriallar | Fastora",
  description:
    "Bolalar uchun eng qiziqarli multiserriallar o‘zbek tilida. Mashhur multseriallar barcha fasllari bilan.",
  openGraph: {
    title: "Multiserriallar — Fastora",
    description: "Eng yaxshi multiserriallarni bepul tomosha qiling.",
    url: "https://fastora.uz/multiserriallar",
    siteName: "Fastora",
    type: "website",
  },
};

async function getSeries() {
  const res = await fetch("https://fastora.vercel.app/api/series", {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function Page() {
  const allSeries = await getSeries();

  // FAQAT multiserriallar
  const series = allSeries.filter(
    (s) => s.category === "multiserriallar" && s.type === "series"
  );

  return (
    <div className="p-4 pb-32">
      <h1 className="text-2xl font-semibold mb-4">Multiserriallar</h1>

      {series.length === 0 && (
        <p className="text-gray-400">
          Hozircha multiserriallar mavjud emas.
        </p>
      )}

      <div className="grid grid-cols-3 gap-3 mt-4">
        {series.map((s) => (
          <Link
            key={s.id}
            href={`/serial/${s.slug}`}
            className="rounded-xl overflow-hidden bg-[#111] shadow-lg"
          >
            <img
              src={s.poster}
              alt={s.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-1">
              <p className="text-xs font-semibold truncate">{s.title}</p>
              <p className="text-gray-400 text-[10px]">
                {s.season_count} fasl
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
