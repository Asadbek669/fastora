import Link from "next/link";

export const metadata = {
  title: "Turk seriallari — Eng mashhur turk dramalari | Fastora",
  description:
    "Eng yaxshi turk seriallari, dramalar va yangi epizodlar o‘zbek tilida.",
  openGraph: {
    title: "Turk seriallari — Fastora",
    description:
      "Eng mashhur turk dramalarini bepul tomosha qiling.",
    url: "https://fastora.uz/turk-seriallar",
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
  const series = allSeries.filter((s) => s.category === "turk-serialari");

  return (
    <div className="p-4 pb-32">
      <h1 className="text-2xl font-semibold mb-4">Turk seriallari</h1>

      {series.length === 0 && (
        <p className="text-gray-400">Hozircha Turk seriallari mavjud emas.</p>
      )}

      <div className="grid grid-cols-3 gap-3 mt-4">
        {series.map((s) => (
          <Link
            key={s.id}
            href={`/serial/${s.slug}`}
            className="rounded-xl overflow-hidden bg-[#111] shadow-lg"
          >
            <img src={s.poster} className="w-full h-40 object-cover" />
            <div className="p-1">
              <p className="text-xs font-semibold truncate">{s.title}</p>
              <p className="text-gray-400 text-[10px]">Season {s.season_count}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
