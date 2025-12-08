import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function sitemap() {
  const baseUrl = "https://fastora.uz";

  const movies = await pool.query("SELECT slug FROM movies");
  const series = await pool.query("SELECT slug FROM series");
  const episodes = await pool.query(
    "SELECT series_slug, season_slug, episode_slug FROM episodes"
  );

  return [
    { url: baseUrl, lastModified: new Date() },

    ...movies.rows.map((m) => ({
      url: `${baseUrl}/movie/${m.slug}`,
      lastModified: new Date(),
    })),

    ...series.rows.map((s) => ({
      url: `${baseUrl}/series/${s.slug}`,
      lastModified: new Date(),
    })),

    ...episodes.rows.map((e) => ({
      url: `${baseUrl}/series/${e.series_slug}/${e.season_slug}/${e.episode_slug}`,
      lastModified: new Date(),
    })),
  ];
}

