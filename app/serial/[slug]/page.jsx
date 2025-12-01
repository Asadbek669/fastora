import SeriesDetail from "@/components/SeriesDetail";
import SeasonList from "@/components/SeasonList";

const base = process.env.NEXT_PUBLIC_SITE_URL;

async function getSeries(slug) {
  const res = await fetch(`${base}/api/series/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

async function getSeasons(slug) {
  const res = await fetch(`${base}/api/season?slug=${slug}`, { cache: "no-store" });
  return res.json();
}

export default async function SeriesPage({ params }) {
  const { slug } = await params;

  const series = await getSeries(slug);
  const seasons = await getSeasons(slug);

  if (!series) return <div className="text-white p-4">Serial topilmadi</div>;

  return (
    <div className="bg-black text-white pb-24">
      <SeriesDetail series={series} />
      <div className="px-4 mt-6">
        <SeasonList slug={slug} seasons={seasons} />
      </div>
    </div>
  );
}
