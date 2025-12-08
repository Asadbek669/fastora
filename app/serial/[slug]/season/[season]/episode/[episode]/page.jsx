import SeriesDetail from "@/components/SeriesDetail";
import Player from "@/components/Player";
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

export default async function EpisodePage({ params }) {
  const { slug, season, episode } = await params;

  const series = await getSeries(slug);
  const seasons = await getSeasons(slug);

  const selectedSeason = seasons.find((s) => Number(s.season_number) === Number(season));
  if (!selectedSeason) return <div className="text-white p-4">Sezon topilmadi</div>;

  const episodes = await getEpisodesBySeason(selectedSeason.id);

  const currentEpisode = episodes.find(
    (e) => Number(e.episode_number) === Number(episode)
  );

  if (!currentEpisode) {
    return <div className="text-white p-4">Epizod topilmadi</div>;
  }

  // ⭐⭐⭐ TV EPISODE + VIDEOOBJECT SCHEMA ⭐⭐⭐
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TVEpisode",
    "name": currentEpisode.title,
    "episodeNumber": currentEpisode.episode_number,
    "description": series.description,
    "image": series.poster,
    "partOfSeason": {
      "@type": "TVSeason",
      "seasonNumber": selectedSeason.season_number,
      "name": `${series.title} — ${selectedSeason.season_number}-sezon`
    },
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
    },
    "video": {
      "@type": "VideoObject",
      "name": currentEpisode.title,
      "description": `Epizod ${currentEpisode.episode_number}`,
      "thumbnailUrl": series.backdrop,
      "uploadDate": series.year + "-01-01",
      "contentUrl": currentEpisode.video_url,
      "embedUrl": `${base}/serial/${slug}/season/${season}/episode/${episode}`
    }
  };

  return (
    <>
      {/* SEO — Google Rich Video & Episode Result uchun */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* ASOSIY UI */}
      <div className="bg-black text-white pb-24">
        <SeriesDetail series={series} />

        <Player src={currentEpisode.video_url} title={currentEpisode.title} />

        <div className="px-4 mt-6">
          <SeasonList slug={slug} seasons={seasons} activeSeason={season} />
          <EpisodeList slug={slug} season={season} episodes={episodes} activeEpisode={episode} />
        </div>
      </div>
    </>
  );
}
