import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Player from "@/components/Player";
import AgeModal from "@/components/AgeModal";

const base = "https://fastora.uz";

// ================================
//  API FUNCTION
// ================================
async function getMovie(slug) {
  const res = await fetch(`${base}/api/movies/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

// ================================
//  MAIN PAGE COMPONENT
// ================================
export default async function MoviePage({ params }) {
  const { slug } = params; // ✔️ to‘g‘ri

  const movie = await getMovie(slug);
  if (!movie) return redirect("/");

  // ================================
  // ⭐⭐⭐ MOVIE SCHEMA (GOOGLE RICH RESULT)
  // ================================
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": movie.title,
    "image": movie.poster,
    "description": movie.description,
    "genre": movie.genres,
    "datePublished": movie.year,
    "countryOfOrigin": movie.country,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": movie.imdb,
      "bestRating": "10",
      "ratingCount": movie.comments_count ?? 1
    },
    "trailer": {
      "@type": "VideoObject",
      "name": `${movie.title} — treyler`,
      "thumbnailUrl": movie.thumbs?.[0],
      "contentUrl": movie.video,
      "embedUrl": `https://fastora.uz/movie/${slug}`
    }
  };

  // ================================
  //  PAGE UI
  // ================================
  return (
    <>
      {/* GOOGLE SEO RICH RESULT */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="text-white min-h-screen bg-black pb-28">

        {/* BACKDROP */}
        <div className="relative w-full h-[250px] overflow-hidden">
          <Image
            src={movie.backdrop}
            fill
            priority
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00000070] to-black/70" />
        </div>

        <div className="px-4 mt-[-30px]">

          {/* POSTER + DETAILS */}
          <div className="flex gap-4 items-start">
            <div className="w-32 rounded-xl overflow-hidden shadow-xl border border-white/10">
              <Image
                src={movie.poster}
                width={300}
                height={450}
                alt={movie.title}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="flex-1 mt-9">
              <h1 className="text-2xl font-bold leading-tight">{movie.title}</h1>

              <p className="text-gray-400 mt-1 text-sm">📅 {movie.year}</p>
              <p className="text-gray-400 text-sm">🌍 Davlati: {movie.country}</p>
              <p className="text-gray-400 text-sm">🔊 Til: O‘zbek tilida</p>

              <span className="inline-flex items-center gap-2 bg-yellow-600/30 text-yellow-300 px-2 py-1 text-sm rounded-lg w-max mt-2">
                ⭐ IMDb: {movie.imdb}
              </span>
            </div>
          </div>

          {/* INFO PANEL */}
          <div className="mt-5 grid grid-cols-3 gap-2">

            {/* IMDb */}
            <div className="bg-white/5 border border-white/10 rounded-lg py-1 flex flex-col items-center justify-center">
              ⭐
              <p className="text-xs mt-1">{movie.imdb}</p>
            </div>

            {/* COMMENTS */}
            <Link
              href={`/movie/${slug}/comments`}
              className="bg-white/5 border border-white/10 rounded-lg py-2 flex flex-col items-center active:scale-95 transition"
            >
              💬
              <p className="text-xs mt-1">{movie.comments_count ?? 0}</p>
            </Link>

            {/* AGE LIMIT */}
            <AgeModal age={movie.age ?? "18+"} />
          </div>

          {/* VIDEO PLAYER */}
          <div className="mt-6">
            <Player src={movie.video} />
          </div>

          {/* GENRES */}
          <div className="mt-6">
            <h2 className="text-gray-300 mb-2 text-lg">Janri:</h2>
            <div className="flex gap-2 flex-wrap">
              {movie.genres?.map((g, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-sm"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-6">
            <h2 className="text-gray-300 mb-2 mt-5">Film haqida qisqacha:</h2>
            <p className="text-gray-400 leading-relaxed whitespace-pre-line">
              {movie.description}
            </p>
          </div>

          {/* THUMBS */}
          <div className="mt-6">
            <h2 className="text-gray-300 mb-2">Lavhalar:</h2>

            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-3">
              {movie.thumbs?.map((img, i) => (
                <div
                  key={i}
                  className="min-w-[60%] aspect-video rounded-xl overflow-hidden bg-[#111]"
                >
                  <Image
                    src={img}
                    width={800}
                    height={450}
                    alt="thumb"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
