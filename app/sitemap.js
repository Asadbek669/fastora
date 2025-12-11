import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function sitemap() {
  const baseUrl = "https://fastora.uz";

  // Filmlar
  const movies = await pool.query(`SELECT slug FROM movies`);

  // Seriallar
  const series = await pool.query(`SELECT id, slug FROM series`);

  // Sezonlar (epizodsiz)
  const seasons = await pool.query(`
    SELECT id, series_id, season_number
    FROM seasons
  `);

  // Kategoriyalar
  const categories = [
    "premyera",
    "tarjima",
    "xorij-seriallar",
    "korea-seriallari",
    "hind",
    "turk-seriallar",
    "anime",
    "multfilmlar",
    "uzbek-film",
  ];

  const urls = [
    // 🏠 Asosiy sahifa
    {
      url: baseUrl,
      lastModified: new Date(),
      changefreq: "daily",
      priority: 1.0,
    },

    // 📂 Kategoriya sahifalari
    ...categories.map((cat) => ({
      url: `${baseUrl}/${cat}`,
      lastModified: new Date(),
      changefreq: "daily",
      priority: 0.9,
    })),

    // 🎬 Filmlar
    ...movies.rows.map((m) => ({
      url: `${baseUrl}/movie/${m.slug}`,
      lastModified: new Date(),
      changefreq: "weekly",
      priority: 0.8,
    })),

    // 📺 Seriallar
    ...series.rows.map((s) => ({
      url: `${baseUrl}/serial/${s.slug}`,
      lastModified: new Date(),
      changefreq: "weekly",
      priority: 0.8,
    })),

    // 📦 Sezonlar (epizodlarsiz)
    ...seasons.rows.map((season) => {
      const s = series.rows.find((sr) => sr.id === season.series_id);

      if (!s) return null;
      return {
        url: `${baseUrl}/serial/${s.slug}/season/${season.season_number}`,
        lastModified: new Date(),
        changefreq: "weekly",
        priority: 0.7,
      };
    }).filter(Boolean),
  ];

  return urls;
}
