import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function sitemap() {
  const baseUrl = "https://fastora.uz";

  // 1) Filmlar
  const movies = await pool.query(`SELECT slug FROM movies`);

  // 2) Seriallar
  const series = await pool.query(`SELECT id, slug FROM series`);

  // 3) Sezonlar
  const seasons = await pool.query(`
    SELECT id, series_id, season_number
    FROM seasons
  `);

  // 4) Epizodlar
  const episodes = await pool.query(`
    SELECT season_id, episode_number
    FROM episodes
  `);

  const urls = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },

    // 🎬 Filmlar
    ...movies.rows.map((m) => ({
      url: `${baseUrl}/movie/${m.slug}`,
      lastModified: new Date(),
    })),

    // 📺 Seriallar — TO‘G‘RI YO‘L
    ...series.rows.map((s) => ({
      url: `${baseUrl}/serial/${s.slug}`,
      lastModified: new Date(),
    })),

    // 📦 Sezonlar — TO‘G‘RI YO‘L
    ...seasons.rows.map((season) => {
      const s = series.rows.find((sr) => sr.id === season.series_id);

      return {
        url: `${baseUrl}/serial/${s.slug}/season/${season.season_number}`,
        lastModified: new Date(),
      };
    }),

    // 🎞 Epizodlar — TO‘G‘RI YO‘L
    ...episodes.rows.map((ep) => {
      const season = seasons.rows.find((se) => se.id === ep.season_id);
      const s = series.rows.find((sr) => sr.id === season.series_id);

      return {
        url: `${baseUrl}/serial/${s.slug}/season/${season.season_number}/episode/${ep.episode_number}`,
        lastModified: new Date(),
      };
    }),
  ];

  return urls;
}
