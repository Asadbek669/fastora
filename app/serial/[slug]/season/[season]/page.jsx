import SeriesDetail from "@/components/SeriesDetail";
import SeasonList from "@/components/SeasonList";
import EpisodeList from "@/components/EpisodeList";

const base =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fastora.uz";

// API FUNCTIONS
async function getSeries(slug) {
  return fetch(`${base}/api/series/${slug}`, { cache: "no-store" }).then(r =>
    r.json()
  );
}

async function getSeasons(slug) {
  return fetch(`${base}/api/season?slug=${slug}`, {
    cache: "no-store",
  }).then(r => r.json());
}

async function getEpisodesBySeason(id) {
  return fetch(`${base}/api/episode/season/${id}`, {
    cache: "no-store",
  }).then(r => r.json());
}

/* -----------------------------------------------------
   SEO METADATA (FETCH YO‘Q — XATOSIZ ISHLAYDI)
------------------------------------------------------*/
export function generateMetadata({ params }) {
  const { slug, season } = params;

  const readableName = slug.replace(/-/g, " ");
  const title = `${readableName} — ${season}-sezon O'zbek tilida HD`;

  return {
    title,
    description: `${title} barcha qismlari HD sifatda tomosha qiling.`,
    alternates: {
      canonical: `${base}/serial/${slug}/season/${season}`,
    },
    openGraph: {
      title,
      description: `${title} bepul va HD sifatda.`,
      url: `${base}/serial/${slug}/season/${season}`,
      type: "video.tv_show",
      locale: "uz_UZ",
      images: [`${base}/icon.png`],
    },
  };
}

/* -----------------------------------------------------
   ASOSIY PAGE
------------------------------------------------------*/
export default async function SeasonPage({ params }) {
  const { slug, season } = params;

  // SERIYA, SEZON VA EPIZODLARNI OLAMIZ
  const series = await getSeries(slug);
  const seasons = await getSeasons(slug);

  if (!series || !seasons) {
    return <div className="text-white p-4">Serial topilmadi</div>;
  }

  const selectedSeason = seasons.find(
    s => Number(s.season_number) === Number(season)
  );

  if (!selectedSeason) {
    return <div className="text-white p-4">Sezon topilmadi</div>;
  }

  const episodes = await getEpisodesBySeason(selectedSeason.id);

  /* -----------------------------------------------------
     GOOGLE TVSeason + TVEpisode SCHEMA (STRONG SEO) 
  ------------------------------------------------------*/
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TVSeason",
    "name": `${series.title} — ${season}-sezon`,
    "seasonNumber": Number(season),
    "numberOfEpisodes": episodes.length,
    "image": series.poster,
    "description": series.description,

    // HAR EPIZOD UCHUN MINI SCHEMA
    "episode": episodes.map(e => ({
      "@type": "TVEpisode",
      "episodeNumber": e.episode_number,
      "name": `${series.title} ${e.episode_number}-qism`,
      "url": `${base}/serial/${slug}/season/${season}/episode/${e.episode_number}`,
    })),

    // ULANISH TVSeries GA
    "partOfSeries": {
      "@type": "TVSeries",
      "name": series.title,
      "genre": series.genres,
      "image": series.poster,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": series.imdb,
        "bestRating": "10",
        "ratingCount": series.comments_count ?? 1,
      },
    },
  };

  return (
    <>
      {/* GOOGLE STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* UI */}
      <div className="bg-black text-white pb-24">
        {/* Serial haqida umumiy malumot */}
        <SeriesDetail series={series} />

        <div className="px-4 mt-6">
          {/* Sezonlar ro'yxati */}
          <SeasonList slug={slug} seasons={seasons} activeSeason={season} />

          {/* Epizodlar ro'yxati */}
          <EpisodeList slug={slug} season={season} episodes={episodes} />
        </div>
      </div>
    </>
  );
}
