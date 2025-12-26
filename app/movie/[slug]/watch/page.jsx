import PlayerClient from "./player-client";

async function getMovie(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/movies/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function WatchPage({ params }) {
  const { slug } = params;
  const movie = await getMovie(slug);

  if (!movie) {
    return <div className="text-white">Topilmadi</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      
      {/* HEADER */}
      <div className="h-[72px] px-4 flex items-center border-b border-white/10">
        <button
          onClick={() => history.back()}
          className="text-sm bg-red-600 px-3 py-1 rounded-full"
        >
          ‹ Orqaga
        </button>

        <h1 className="flex-1 text-center text-xl md:text-3xl font-bold truncate">
          {movie.title}
        </h1>
      </div>

      {/* PLAYER */}
      <div className="flex-1 flex items-center justify-center">
        <PlayerClient src={movie.video} title={movie.title} />
      </div>
    </div>
  );
}
