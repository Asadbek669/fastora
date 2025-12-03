import Link from "next/link";

async function getMovies() {
  const res = await fetch("https://fastora.vercel.app/api/movies", {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function Page() {
  const allMovies = await getMovies();
  const movies = allMovies.filter((m) => m.category === "hind");

  return (
    <div className="p-4 pb-32">
      <h1 className="text-2xl font-semibold mb-4">Hind kinolar</h1>

      {movies.length === 0 && <p className="text-gray-400">Hozircha hind kinolar mavjud emas.</p>}

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
