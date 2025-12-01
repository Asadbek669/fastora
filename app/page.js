import StorySlider from "./components/StorySlider";
import HeroSlider from "./components/HeroSlider";
import MovieRow from "./components/MovieRow";

// 🟢 URL bazaviy qiymati (Vercel yoki local)
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_URL ||
  "http://localhost:3000";

// 🟢 Kinolarni olish
async function getMovies() {
  const res = await fetch(`${BASE_URL}/api/movies`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

// 🟢 Seriallarni olish
async function getSeries() {
  const res = await fetch(`${BASE_URL}/api/series`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}


export default async function Page() {
  const movies = await getMovies();   // REAL MOVIES
  const series = await getSeries();   // REAL SERIES

  return (
    <div className="pb-24">

      {/* STORY SLIDER */}
      <div className="px-4 pt-4">
        <StorySlider testData={movies} />
      </div>

      {/* HERO SLIDER */}
      <div className="mt-3 px-4">
        <HeroSlider testData={movies} />
      </div>

      {/* GENRE SLIDER */}
      <h2 className="text-xl font-semibold mt-6 mb-3 px-4">Janrlar</h2>

      <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2">
        {[
          "Drama", "Fantastika", "Tarixiy",
          "Jangari", "Komediya", "Melodrama",
          "Ujas", "Sarguzasht",
        ].map((g, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[110px] rounded-xl overflow-hidden bg-[#111] shadow-lg"
          >
            <img
              src={`https://via.placeholder.com/150?text=${g}`}
              className="w-full h-24 object-cover"
            />
            <p className="text-center py-2 text-sm truncate">{g}</p>
          </div>
        ))}
      </div>

      {/* MOVIE & SERIES ROWS */}
      <div className="mt-8 px-4 space-y-10">

        {/* PREMIERA */}
        <MovieRow
          title="Premyera"
          movies={movies}
          link="/premyera"
        />

        {/* TARJIMA */}
        <MovieRow
          title="Tarjima kinolar"
          movies={movies.filter(m => m.category === "tarjima")}
          link="/tarjima"
        />

        {/* XORIJ SERIAL */}
        <MovieRow
          title="Xorij seriallari"
          movies={series.filter(s => s.category === "xorij-seriallar")}
          link="/xorij-seriallar"
        />

        {/* KOREYA SERIAL */}
        <MovieRow
          title="Koreya seriallari"
          movies={series.filter(s => s.category === "korea-seriallari")}
          link="/korea-seriallari"
        />

        {/* HIND */}
        <MovieRow
          title="Hind kinolar"
          movies={movies.filter(m => m.category === "hind")}
          link="/hind"
        />

        {/* TURK SERIAL */}
        <MovieRow
          title="Turk seriallari"
          movies={series.filter(s => s.category === "turk-seriallar")}
          link="/turk-seriallar"
        />

        {/* ANIME */}
        <MovieRow
          title="Anime"
          movies={movies.filter(m => m.category === "anime")}
          link="/anime"
        />

		{/* MULTFILMLAR (Multseriallar) */}
		<MovieRow
		  title="Multfilmlar"
		  movies={series.filter(s => s.category === "multfilmlar")}
		  link="/multfilmlar"
		/>

        {/* O'zbek film */}
        <MovieRow
          title="O‘zbek filmlar"
          movies={movies.filter(m => m.category === "uzbek-film")}
          link="/uzbek-film"
        />

      </div>

    </div>
  );
}
