import StorySlider from "./components/StorySlider";
import HeroSlider from "./components/HeroSlider";
import MovieRow from "./components/MovieRow";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  "http://localhost:3000";

async function getMovies() {
  const res = await fetch(`${BASE_URL}/api/movies`, { cache: "no-store" });
  if (!res.ok) return [];

  const data = await res.json();

  return Array.isArray(data) ? data : data.movies ?? [];
}

async function getSeries() {
  const res = await fetch(`${BASE_URL}/api/series`, { cache: "no-store" });
  if (!res.ok) return [];

  const data = await res.json();

  return Array.isArray(data) ? data : data.series ?? [];
}

export default async function Page() {
  const movies = await getMovies();
  const series = await getSeries();

  return (
    <div className="pb-24">
      <div className="px-4 pt-4">
        <StorySlider testData={movies} />
      </div>

      <div className="mt-3 px-4">
        <HeroSlider testData={movies} />
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-3 px-4">Janrlar</h2>

      <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2">
        {[
          "Drama",
          "Fantastika",
          "Tarixiy",
          "Jangari",
          "Komediya",
          "Melodrama",
          "Ujas",
          "Sarguzasht",
        ].map((g, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[110px] rounded-xl overflow-hidden bg-[#111] shadow-lg"
          >
            <img
              src="/tez-orada.jpg"
              className="w-full h-24 object-cover"
            />
            <p className="text-center py-2 text-sm truncate">{g}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 px-4 space-y-10">

        <MovieRow title="Premyera" movies={movies} link="/premyera" />

        <MovieRow
          title="Tarjima kinolar"
          movies={movies.filter((m) => m.category === "tarjima")}
          link="/tarjima"
        />

        <MovieRow
          title="Xorij seriallari"
          movies={series.filter((s) => s.category === "xorij-seriallar")}
          link="/xorij-seriallar"
        />

        <MovieRow
          title="Koreya seriallari"
          movies={series.filter((s) => s.category === "korea-seriallari")}
          link="/korea-seriallari"
        />

        <MovieRow
          title="Hind kinolar"
          movies={movies.filter((m) => m.category === "hind")}
          link="/hind"
        />

        <MovieRow
          title="Turk seriallari"
          movies={series.filter((s) => s.category === "turk-seriallar")}
          link="/turk-seriallar"
        />

        <MovieRow
          title="Anime"
          movies={movies.filter((m) => m.category === "anime")}
          link="/anime"
        />

        <MovieRow
          title="Multfilmlar"
          movies={series.filter((s) => s.category === "multfilmlar")}
          link="/multfilmlar"
        />

        <MovieRow
          title="O‘zbek filmlar"
          movies={movies.filter((m) => m.category === "uzbek-film")}
          link="/uzbek-film"
        />
      </div>
    </div>
  );
}
