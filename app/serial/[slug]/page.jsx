import SeriesDetail from "@/components/SeriesDetail";
import SeasonList from "@/components/SeasonList";

const base = "https://fastora.uz";

// ================================
//  API FUNCTIONS + LOG
// ================================
async function getSeries(slug) {
  const url = `${base}/api/series/${slug}`;
  console.log("📌 API SERIES URL:", url);

  const res = await fetch(url, { cache: "no-store" });

  console.log("📌 SERIES STATUS:", res.status);

  if (!res.ok) {
    console.log("❌ SERIES ERROR RESPONSE:", await res.text());
    return null;
  }

  const data = await res.json();
  console.log("✅ SERIES DATA:", data);
  return data;
}

async function getSeasons(slug) {
  const url = `${base}/api/season?slug=${slug}`;
  console.log("📌 API SEASONS URL:", url);

  const res = await fetch(url, { cache: "no-store" });

  console.log("📌 SEASONS STATUS:", res.status);

  const data = await res.json();
  console.log("✅ SEASONS DATA:", data);
  return data;
}


// ================================
//  ⭐⭐⭐ SEO METADATA (Google + OG)
// ================================
export async function generateMetadata({ params }) {
  const { slug } = params;

  const series = await getSeries(slug);
  const seasons = await getSeasons(slug);

  if (!series) {
    return { title: "Serial topilmadi | Fastora" };
  }

  return {
    title: `${series.title} — barcha mavsumlar | Fastora`,
    description: series.description.slice(0, 160),

    openGraph: {
      title: `${series.title} — barcha mavsumlar`,
      description: series.description.slice(0, 180),
      url: `https://fastora.uz/serial/${slug}`,
      type: "video.tv_show",
      images: [
        {
          url: series.poster,   // ⭐⭐ POSTER GOOGLE & TELEGRAM PREVIEW UCHUN
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: series.title,
      description: series.description.slice(0, 150),
      images: [series.poster],
    },
  };
}

// ================================
//  MAIN PAGE COMPONENT
// ================================
export default async function SeriesPage({ params }) {
  const { slug } = await params;

  const series = await getSeries(slug);
  const seasons = await getSeasons(slug);

  if (!series) return <div className="text-white p-4">Serial topilmadi</div>;

  // ================================
  //  ⭐⭐⭐ TV SERIES STRUCTURED DATA
  // ================================
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
      "ratingCount": series.comments_count ?? 1
    }
  };

  // ================================
  //  PAGE UI
  // ================================
  return (
    <>
      {/* GOOGLE RICH RESULTS uchun */}
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
