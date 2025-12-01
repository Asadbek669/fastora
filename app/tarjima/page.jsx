import Link from "next/link";

async function getTarjimaMovies() {
  const res = await fetch("http://localhost:3000/api/movies", {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function Page() {
  const allMovies = await getTarjimaMovies();
  const movies = allMovies.filter((m) => m.category === "tarjima");

  return (
    <div className="p-4 pb-32">

      <h1 className="text-2xl font-semibold mb-4">Tarjima kinolar</h1>

      {movies.length === 0 && (
        <p className="text-gray-400">Hozircha tarjima kinolar mavjud emas.</p>
      )}

      {/* 3 COLUMN GRID */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {movies.map((m) => (
          <Link
            key={m.id}
            href={`/movie/${m.slug}`}
            className="rounded-xl overflow-hidden bg-[#111] shadow-lg"
          >
            {/* POSTER */}
            <img
              src={m.poster}
              className="w-full h-40 object-cover"
              alt={m.title}
            />

            {/* TITLE */}
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
