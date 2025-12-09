import SeriesDetail from "@/components/SeriesDetail";
import SeasonList from "@/components/SeasonList";
import EpisodeList from "@/components/EpisodeList";

const base = process.env.NEXT_PUBLIC_SITE_URL;

async function getSeries(slug) {
  return fetch(`${base}/api/series/${slug}`, { cache: "no-store" }).then(r => r.json());
}

async function getSeasons(slug) {
  return fetch(`${base}/api/season?slug=${slug}`, { cache: "no-store" }).then(r => r.json());
}

async function getEpisodesBySeason(id) {
  return fetch(`${base}/api/episode/season/${id}`, { cache: "no-store" }).then(r => r.json());
}

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

  // ⭐⭐⭐ TVSEASON SCHEMA ⭐⭐⭐
  const schemaData = {
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
      "genre": series.genres,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": series.imdb,
        "bestRating": "10",
        "ratingCount": series.comments_count ?? 1
      }
    }
  };

  return (
    <>
      {/* GOOGLE SEO RICH RESULTS UCHUN */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* ASOSIY UI */}
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
