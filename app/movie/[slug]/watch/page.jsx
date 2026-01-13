import PlayerClient from "./player-client";

// 1 KUNLIK CACHE (ISR)
export const revalidate = 86400; // 24 soat

export default async function WatchPage({ params }) {
  const { slug } = params;

  // SERVER TOMONDA FETCH (CACHE BILAN)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/${slug}`,
    {
      next: { revalidate: 86400 },
    }
  );

  if (!res.ok) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Topilmadi
      </div>
    );
  }

  const movie = await res.json();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* HEADER */}
      <div className="px-4 py-3 bg-black/80 backdrop-blur-sm border-b border-white/20 flex items-center justify-between">

        {/* Orqaga */}
        <button
          onClick={() => history.back()}
          className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full shadow-md transition hover:scale-105"
        >
          ‹ Orqaga
        </button>

        {/* Sarlavha */}
        <h1 className="flex-1 mx-4 text-center text-3xl md:text-5xl font-bold uppercase truncate drop-shadow-lg">
          {movie.title}
        </h1>

      </div>

      {/* PLAYER */}
      <div className="flex-1 flex items-center justify-center px-4">
        <PlayerClient src={movie.video} title={movie.title} />
      </div>

    </div>
  );
}
