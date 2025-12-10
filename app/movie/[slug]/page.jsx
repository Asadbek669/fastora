import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Player from "@/components/Player";
import AgeModal from "@/components/AgeModal";

const BASE_URL = "https://fastora.uz";

// ================================
//  API FUNCTION
// ================================
async function getMovie(slug) {
  const res = await fetch(`${BASE_URL}/api/movies/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

// ================================
// ⭐⭐⭐ SEO METADATA (Google + Telegram + OG)
// ================================
export async function generateMetadata({ params }) {
  const { slug } = params;
  const movie = await getMovie(slug);

  if (!movie) {
    return { title: "Film topilmadi | Fastora" };
  }

  return {
    title: `${movie.title} — HD sifatida tomosha qiling | Fastora`,
    description: movie.description.slice(0, 160),

    alternates: {
      canonical: `${BASE_URL}/movie/${slug}`,
    },

    openGraph: {
      title: movie.title,
      description: movie.description.slice(0, 180),
      url: `${BASE_URL}/movie/${slug}`,
      type: "video.movie",
      images: [
        {
          url: movie.poster,          // ⭐ PREVIEW UCHUN ASOSIY RASM
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: movie.title,
      description: movie.description.slice(0, 150),
      images: [movie.poster],
    },
  };
}

// ================================
//  PAGE UI
// ================================
export default async function MoviePage({ params }) {
  const { slug } = params;
  const movie = await getMovie(slug);

  if (!movie) return redirect("/");

  // ⭐⭐⭐ GOOGLE RICH MOVIE + VIDEO SCHEMA ⭐⭐⭐
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
    "video": {
      "@type": "VideoObject",
      "name": `${movie.title} — to‘liq film`,
      "thumbnailUrl": movie.thumbs?.[0] || movie.poster,
      "description": movie.description.slice(0, 150),
      "uploadDate": movie.year + "-01-01",
      "contentUrl": movie.video,
      "embedUrl": `${BASE_URL}/movie/${slug}`,
    }
  };

  return (
    <>
      {/* GOOGLE RICH RESULTS SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* ===== UI START ===== */}
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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00000070] to-black/80" />
        </div>

        <div className="px-4 mt-[-30px]">

          {/* POSTER + INFO */}
          <div className="flex gap-4 items-start">
            <div className="w-32 rounded-xl overflow-hidden shadow-xl border border-white/10">
              <Image
                src={movie.poster}
                width={300}
                height={450}
                alt={movie.title}
                className="w-full object-cover"
              />
            </div>

            <div className="flex-1 mt-9">
              <h1 className="text-2xl font-bold">{movie.title}</h1>

              <p className="text-gray-400 text-sm mt-1">📅 {movie.year}</p>
              <p className="text-gray-400 text-sm">🌍 {movie.country}</p>
              <p className="text-gray-400 text-sm">🔊 O‘zbek tilida</p>

              <span className="inline-flex items-center gap-2 bg-yellow-600/30 text-yellow-300 px-3 py-1 text-sm rounded-lg mt-2">
                ⭐ IMDb: {movie.imdb}
              </span>
            </div>
          </div>

          {/* PLAYER */}
          <div className="mt-6">
            <Player src={movie.video} />
          </div>

          {/* GENRES */}
          <div className="mt-6">
            <h2 className="text-gray-300 mb-2 text-lg">Janr:</h2>

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
            <h2 className="text-gray-300 mb-2">Film haqida:</h2>
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
      {/* ===== UI END ===== */}
    </>
  );
}

