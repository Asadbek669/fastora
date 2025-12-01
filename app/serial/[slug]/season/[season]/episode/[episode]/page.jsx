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

  // 1 – shu seasonning epizodlari
  const episodes = await getEpisodesBySeason(selectedSeason.id);

  // 2 – episode_number bo‘yicha epizod topamiz
  const currentEpisode = episodes.find(
    (e) => Number(e.episode_number) === Number(episode)
  );

  if (!currentEpisode) {
    return <div className="text-white p-4">Epizod topilmadi</div>;
  }

  return (
    <div className="bg-black text-white pb-24">
      <SeriesDetail series={series} />

      {/* 🚀 BU YERDA VIDEO URL BOR */}
      <Player src={currentEpisode.video_url} title={currentEpisode.title} />

      <div className="px-4 mt-6">
        <SeasonList slug={slug} seasons={seasons} activeSeason={season} />
        <EpisodeList slug={slug} season={season} episodes={episodes} activeEpisode={episode} />
      </div>
    </div>
  );
}
