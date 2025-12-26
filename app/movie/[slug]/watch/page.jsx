
// app/movie/[slug]/watch/page.jsx
import PlayerClient from "./player-client";

export default async function WatchPage({ params }) {
  const { slug } = params;

  // Server component ichida fetch qilish
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/${slug}`, {
    next: { revalidate: 10 } // ISR / caching
  });
  const movie = await res.json();

  if (!movie) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="px-4 py-3 bg-black/80 backdrop-blur-sm border-b border-white/20 flex items-center justify-between">
        <button
          onClick={() => history.back()}
          className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full shadow-md transition transform hover:scale-105"
          aria-label="Go back"
        >
          ‹ Orqaga
        </button>

        <h1 className="flex-1 mx-4 text-center text-3xl md:text-5xl font-bold uppercase truncate drop-shadow-lg">
          {movie.title}
        </h1>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <PlayerClient src={movie.video} title={movie.title} />
      </div>
    </div>
  );
}
