import { pool } from "../services/db";

export default async function sitemap() {
  // Filmlar
  const movies = await pool.query("SELECT slug FROM movies");

  // Seriallar
  const series = await pool.query("SELECT slug FROM series");

  // Epizodlar
  const episodes = await pool.query(
    "SELECT series_slug, season_slug, episode_slug FROM episodes"
  );

  const baseUrl = "https://fastora.uz";

  const urls = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },

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

  return urls;
}
