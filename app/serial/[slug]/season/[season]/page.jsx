import { cache } from "react";
import SeriesDetail from "@/components/SeriesDetail";
import SeasonList from "@/components/SeasonList";
import EpisodeList from "@/components/EpisodeList";

const base = process.env.NEXT_PUBLIC_SITE_URL;

/* ================= API HELPERS (1 KUN CACHE) ================= */

const getSeries = cache(async (slug) => {
  const res = await fetch(`${base}/api/series/${slug}`, {
    next: { revalidate: 86400 }, // 1 kun
  });
  return res.json();
});

const getSeasons = cache(async (slug) => {
  const res = await fetch(`${base}/api/season?slug=${slug}`, {
    next: { revalidate: 86400 }, // 1 kun
  });
  return res.json();
});

const getEpisodesBySeason = cache(async (id) => {
  const res = await fetch(`${base}/api/episode/season/${id}`, {
    next: { revalidate: 86400 }, // 1 kun
  });
  return res.json();
});

/* ================= SEO METADATA ================= */

export async function generateMetadata({ params }) {
  const { slug, season } = params;

  const series = await getSeries(slug);

  return {
    title: `${series.title} — ${season}-sezon | Fastora`,
    description: `${series.title} ${season}-sezon barcha qismlar. Fastora orqali tomosha qiling.`,
    openGraph: {
      title: `${series.title} — ${season}-sezon`,
      images: [series.poster],
    },
  };
}

/* ================= MAIN PAGE ================= */

export default async function SeasonPage({ params }) {
  const { slug, season } = params;

  const series = await getSeries(slug);
  const seasons = await getSeasons(slug);

  const selectedSeason = seasons.find(
    (s) => Number(s.season_number) === Number(season)
  );

  if (!selectedSeason) {
    return <div className="text-white p-4">Sezon topilmadi</div>;
  }

  const episodes = await getEpisodesBySeason(selectedSeason.id);

  const seasonSchema = {
    "@context": "https://schema.org",
    "@type": "TVSeason",
    name: `${series.title} — ${season}-sezon`,
    seasonNumber: Number(season),
    numberOfEpisodes: episodes.length,
    image: series.poster,
    description: series.description,
    partOfSeries: {
      "@type": "TVSeries",
      name: series.title,
      image: series.poster,
      genre: series.genres,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seasonSchema) }}
      />

      <div className="bg-black text-white">
        <SeriesDetail series={series} />

        <div className="px-4 mt-6">
          <SeasonList slug={slug} seasons={seasons} activeSeason={season} />
          <EpisodeList slug={slug} season={season} episodes={episodes} />
        </div>
      </div>
    </>
  );
}
