import Link from "next/link";

export const metadata = {
  title: "O‘zbek filmlar — Eng yangi milliy filmlar | Fastora",
  description:
    "Eng yangi o‘zbek filmlari, dramalar, komediyalar va jangari filmlar Fastorada.",
  openGraph: {
    title: "O‘zbek filmlar — Fastora",
    description:
      "O‘zbek filmlarini o‘zbek tilida bepul tomosha qiling.",
    url: "https://fastora.uz/uzbek-film",
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
  const allMovies = await getMovies();
  const movies = allMovies.filter((m) => m.category === "uzbek-film");

  return (
    <div className="p-4 pb-32">
      <h1 className="text-2xl font-semibold mb-4">O‘zbek filmlar</h1>

      {movies.length === 0 && (
        <p className="text-gray-400">Hozircha O‘zbek filmlar mavjud emas.</p>
      )}

      <div className="grid grid-cols-3 gap-3 mt-4">
        {movies.map((m) => (
          <Link
            key={m.id}
            href={`/movie/${m.slug}`}
            className="rounded-xl overflow-hidden bg-[#111] shadow-lg"
          >
            <img src={m.poster} className="w-full h-40 object-cover" />
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
