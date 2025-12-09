import SeriesDetail from "@/components/SeriesDetail";
import SeasonList from "@/components/SeasonList";

const base =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fastora.vercel.app";

// ⭐⭐⭐ 1) METADATA — GOOGLE POSTER UCHUN MAJBURIY ⭐⭐⭐
export async function generateMetadata({ params }) {
  const { slug } = params;

  const res = await fetch(`${base}/api/series/${slug}`, { cache: "no-store" });

  if (!res.ok) {
    return {
      title: "Serial topilmadi | Fastora",
      description: "Serial mavjud emas.",
    };
  }

  const series = await res.json();

  return {
    title: `${series.title} — Serial | Fastora`,
    description: series.description?.slice(0, 160),

    openGraph: {
      title: `${series.title} — Serial | Fastora`,
      description: series.description?.slice(0, 200),
      url: `https://fastora.uz/serial/${slug}`,
      type: "video.tv_show",
      siteName: "Fastora",
      images: [
        {
          url: series.poster, // ⭐ GOOGLE POSTER UCHUN MUHIM
          width: 800,
          height: 1200,
          alt: series.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: series.title,
      description: series.description?.slice(0, 200),
      images: [series.poster], // ⭐ TELEGRAM/INSTAGRAM UCHUN
    },
  };
}

// Fetch functions
async function getSeries(slug) {
  const res = await fetch(`${base}/api/series/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

async function getSeasons(slug) {
  const res = await fetch(`${base}/api/season?slug=${slug}`, { cache: "no-store" });
  return res.json();
}

// ⭐⭐⭐ 2) ASOSIY PAGE ⭐⭐⭐
export default async function SeriesPage({ params }) {
  const { slug } = params;

  const series = await getSeries(slug);
  const seasons = await getSeasons(slug);

  if (!series) return <div className="text-white p-4">Serial topilmadi</div>;

  // ⭐⭐⭐ 3) SCHEMA (Google Rich Results uchun) ⭐⭐⭐
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    "name": series.title,
    "image": series.poster,
    "description": series.description,
    "genre": series.genres,
    "countryOfOrigin": series.country,
    "startDate": series.year,
    "numberOfSeasons": seasons.length,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": series.imdb,
      "bestRating": "10",
      "ratingCount": series.comments_count ?? 1,
    },
  };

  return (
    <>
      {/* SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* ASOSIY SERIAL PAGE */}
      <div className="bg-black text-white pb-24">
        <SeriesDetail series={series} />
        <div className="px-4 mt-6">
          <SeasonList slug={slug} seasons={seasons} />
        </div>
      </div>
    </>
  );
}

