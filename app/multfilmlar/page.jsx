import Link from "next/link";

export const metadata = {
  title: "Multfilmlar — Eng yaxshi multfilmlar | Fastora",
  description:
    "Bolalar va kattalar uchun eng qiziqarli multfilmlar o‘zbek tilida. Kartonlar, 3D multfilmlar, komedik multfilmlar.",
  openGraph: {
    title: "Multfilmlar — Fastora",
    description: "Eng yaxshi multfilmlarni bepul tomosha qiling.",
    url: "https://fastora.uz/multfilmlar",
    siteName: "Fastora",
    type: "website",
  },
};


async function getMovies() {
  const res = await fetch("https://fastora.vercel.app/api/movies", {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function Page() {
  const allSeries = await getMovies();
  const series = allSeries.filter((s) => s.category === "multfilmlar");

  return (
    <div className="p-4 pb-32">
      <h1 className="text-2xl font-semibold mb-4">Multfilmlar</h1>

      {series.length === 0 && (
        <p className="text-gray-400">Hozircha multfilmlar mavjud emas.</p>
      )}

      <div className="grid grid-cols-3 gap-3 mt-4">
        {series.map((s) => (
          <Link
            key={s.id}
            href={`/movie/${m.slug}`}
            className="rounded-xl overflow-hidden bg-[#111] shadow-lg"
          >
            <img src={s.poster} className="w-full h-40 object-cover" />
            <div className="p-1">
              <p className="text-xs font-semibold truncate">{m.title}</p>
              <p className="text-gray-400 text-[10px]">{m.year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


