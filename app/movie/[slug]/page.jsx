

import { redirect } from "next/navigation";
import MovieDetail from "@/components/MovieDetail";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

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
  const { slug } = await params;
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
      type: "website",
      images: [
        {
          url: movie.poster,
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
//  PAGE COMPONENT
// ================================
export default async function MoviePage({ params }) {
  const { slug } = await params;
  const movie = await getMovie(slug);

  if (!movie) return redirect("/");

  // GOOGLE RICH MOVIE + VIDEO SCHEMA
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.title,
    image: movie.poster,
    description: movie.description,
    genre: movie.genres,
    datePublished: movie.year,
    countryOfOrigin: movie.country,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: movie.imdb,
      bestRating: "10",
      ratingCount: movie.comments_count ?? 1,
    },
  };

  return (
    <>
      {/* GOOGLE SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* MOVIE DETAIL */}
      <MovieDetail movie={movie} />
    </>
  );
}
