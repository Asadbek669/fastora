import SeriesDetail from "@/components/SeriesDetail";
import SeasonList from "@/components/SeasonList";
import EpisodeList from "@/components/EpisodeList";

const base = process.env.NEXT_PUBLIC_SITE_URL;

/* ----------------- API HELPERS ------------------ */

async function getSeries(slug) {
  return fetch(`${base}/api/series/${slug}`, { cache: "no-store" })
    .then(r => r.json());
}

async function getSeasons(slug) {
  return fetch(`${base}/api/season?slug=${slug}`, { cache: "no-store" })
    .then(r => r.json());
}

async function getEpisodesBySeason(id) {
  return fetch(`${base}/api/episode/season/${id}`, { cache: "no-store" })
    .then(r => r.json());
}

/* ----------------- SEO METADATA ------------------ */

export async function generateMetadata({ params }) {
  const { slug, season } = await params;

  const series = await getSeries(slug);

  return {
    title: `${series.title} — ${season}-sezon | Fastora`,
    description: `${series.title} ${season}-sezon barcha qismlar. Fastora orqali online tomosha qiling.`,
    openGraph: {
      title: `${series.title} — ${season}-sezon | Fastora`,
      description: `${series.title} ${season}-sezon barcha qismlar.`,
      images: [series.poster],
    },
  };
}

/* ----------------- MAIN PAGE ------------------ */

export default async function SeasonPage({ params }) {
  const { slug, season } = await params;

  const series = await getSeries(slug);
  const seasons = await getSeasons(slug);

  const selectedSeason = seasons.find(
    (s) => Number(s.season_number) === Number(season)
  );

  if (!selectedSeason)
    return <div className="text-white p-4">Sezon topilmadi</div>;

  const episodes = await getEpisodesBySeason(selectedSeason.id);

  /* ⭐ TVSeason schema ⭐ */
  const seasonSchema = {
    "@context": "https://schema.org",
    "@type": "TVSeason",
    "name": `${series.title} — ${season}-sezon`,
    "seasonNumber": Number(season),
    "numberOfEpisodes": episodes.length,
    "image": series.poster,
    "description": series.description,
    "partOfSeries": {
      "@type": "TVSeries",
      "name": series.title,
      "image": series.poster,
      "genre": series.genres
    }
  };

  /* ⭐ Yangi qo‘shilgan — TVSeries schema ⭐ */
  const seriesSchema = {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    "name": series.title,
    "image": series.poster,
    "description": series.description,
    "genre": series.genres,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": series.imdb,
      "bestRating": "10",
      "ratingCount": Number(series.comments_count) > 0 
        ? Number(series.comments_count) 
        : 1
    }
  };

  return (
    <>
      {/* TVSeries STRUCTURE */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesSchema) }}
      />

      {/* TVSeason STRUCTURE */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seasonSchema) }}
      />

      <div className="bg-black text-white pb-24">
        <SeriesDetail series={series} />

        <div className="px-4 mt-6">
          <SeasonList slug={slug} seasons={seasons} activeSeason={season} />
          <EpisodeList slug={slug} season={season} episodes={episodes} />
        </div>
      </div>
    </>
  );
}
