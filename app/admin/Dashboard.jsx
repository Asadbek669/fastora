async function getStats() {
  const [movies, series, episodes] = await Promise.all([
    fetch("http://localhost:3000/api/movies", { cache: "no-store" }).then(r => r.json()),
    fetch("http://localhost:3000/api/series", { cache: "no-store" }).then(r => r.json()),
    fetch("http://localhost:3000/api/episode", { cache: "no-store" }).then(r => r.json()),
  ]);

  return {
    movieCount: movies.length,
    seriesCount: series.length,
    episodeCount: episodes.length,
  };
}

export default async function Dashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-400">Umumiy statistika</p>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-semibold">Filmlar</h2>
          <p className="text-4xl font-bold mt-2">{stats.movieCount}</p>
          <p className="text-gray-500 mt-1 text-sm">Jami yuklangan kinolar</p>
        </div>

        <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-semibold">Seriallar</h2>
          <p className="text-4xl font-bold mt-2">{stats.seriesCount}</p>
          <p className="text-gray-500 mt-1 text-sm">Jami serial loyihalari</p>
        </div>

        <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-semibold">Epizodlar</h2>
          <p className="text-4xl font-bold mt-2">{stats.episodeCount}</p>
          <p className="text-gray-500 mt-1 text-sm">Yuklangan epizodlar</p>
        </div>

      </div>

    </div>
  );
}
