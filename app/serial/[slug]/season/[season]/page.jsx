import SeriesDetail from "@/components/SeriesDetail";
import SeasonList from "@/components/SeasonList";
import EpisodeList from "@/components/EpisodeList";

const base = process.env.NEXT_PUBLIC_SITE_URL;

// API FUNCTIONS
async function getSeries(slug) {
  return fetch(`${base}/api/series/${slug}`, { cache: "no-store" }).then(r => r.json());
}

async function getSeasons(slug) {
  return fetch(`${base}/api/season?slug=${slug}`, { cache: "no-store" }).then(r => r.json());
}

async function getEpisodesBySeason(id) {
  return fetch(`${base}/api/episode/season/${id}`, { cache: "no-store" }).then(r => r.json());
}

/* -----------------------------------------------------
   SEO: generateMetadata → title, description, canonical
------------------------------------------------------*/
export async function generateMetadata({ params }) {
  const { slug, season } = params;
  const series = await getSeries(slug);

  return {
    title: `${series.title} — ${season}-sezon O'zbek tilida HD`,
    description: `${series.title} ${season}-sezon barcha qismlari HD sifatda. ${series.description?.slice(0, 150)}...`,
    alternates: {
      canonical: `${base}/serial/${slug}/season/${season}`,
    },
    openGraph: {
      title: `${series.title} — ${season}-sezon`,
      description: series.description,
      images: [series.poster],
      url: `${base}/serial/${slug}/season/${season}`,
    },
  };
}

/* -----------------------------------------------------
   MAIN PAGE RENDER
------------------------------------------------------*/
export default async function SeasonPage({ params }) {
  const { slug, season } = params;

  const series = await getSeries(slug);
  const seasons = await getSeasons(slug);

  const selectedSeason = seasons.find(
    (s) => Number(s.season_number) === Number(season)
  );

  if (!selectedSeason)
    return <div className="text-white p-4">Sezon topilmadi</div>;

  const episodes = await getEpisodesBySeason(selectedSeason.id);

  /* -----------------------------------------------------
     SCHEMA — Google TVSeason + TVEpisode
  ------------------------------------------------------*/
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TVSeason",
    "name": `${series.title} — ${season}-sezon`,
    "seasonNumber": Number(season),
    "numberOfEpisodes": episodes.length,
    "image": series.poster,
    "description": series.description,

    "episode": episodes.map((e) => ({
      "@type": "TVEpisode",
      "episodeNumber": e.episode_number,
      "name": `${series.title} ${e.episode_number}-qism`,
      "url": `${base}/serial/${slug}/season/${season}/episode/${e.episode_number}`,
    })),

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
      {/* SEO STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* MAIN UI */}
      <div className="bg-black text-white pb-24">
        <SeriesDetail series={series} />

        <div className="px-4 mt-6">
          <SeasonList
            slug={slug}
            seasons={seasons}
            activeSeason={season}
          />

          <EpisodeList
            slug={slug}
            season={season}
            episodes={episodes}
          />
        </div>
      </div>
    </>
  );
}
