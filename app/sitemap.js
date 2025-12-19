
import { Pool } from "pg";
import tvChannels from "./tv/tvConfig";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function sitemap() {
  const baseUrl = "https://fastora.uz";

  // 🎬 Filmlar
  const movies = await pool.query(`
    SELECT slug, created_at
    FROM movies
  `);

  // 📺 Seriallar
  const series = await pool.query(`
    SELECT id, slug, created_at
    FROM series
  `);

  // 📦 Sezonlar
  const seasons = await pool.query(`
    SELECT id, series_id, season_number, created_at
    FROM seasons
  `);

  // 📂 Kategoriyalar (STATIC)
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
    "tv",
  ];

  // 🔒 Static sahifalar uchun bitta sana
  const STATIC_DATE = "2025-01-01";

  const urls = [
    // 🏠 Asosiy sahifa
    {
      url: baseUrl,
      lastModified: new Date(), // home uchun ruxsat
      changefreq: "daily",
      priority: 1.0,
    },

    // 📂 Kategoriya sahifalari (STATIC)
    ...categories.map((cat) => ({
      url: `${baseUrl}/${cat}`,
      lastModified: STATIC_DATE,
      changefreq: "monthly",
      priority: 0.9,
    })),

    // 📡 Jonli telekanallar (STATIC)
    ...tvChannels.map((tv) => ({
      url: `${baseUrl}/live/${tv.slug}`,
      lastModified: STATIC_DATE,
      changefreq: "monthly",
      priority: 0.9,
    })),

    // 🎬 Filmlar
    ...movies.rows.map((m) => ({
      url: `${baseUrl}/movie/${m.slug}`,
      lastModified: m.created_at, // ✅ REAL DATA
      changefreq: "monthly",
      priority: 0.8,
    })),

    // 📺 Seriallar
    ...series.rows.map((s) => ({
      url: `${baseUrl}/serial/${s.slug}`,
      lastModified: s.created_at, // ✅ REAL DATA
      changefreq: "monthly",
      priority: 0.8,
    })),

    // 📦 Sezonlar
    ...seasons.rows.map((season) => {
      const parentSeries = series.rows.find(
        (sr) => sr.id === season.series_id
      );

      if (!parentSeries) return null;

      return {
        url: `${baseUrl}/serial/${parentSeries.slug}/season/${season.season_number}`,
        // sezon o‘zgarsa → o‘zi
        // aks holda → serial yaratilgan sana
        lastModified: season.created_at || parentSeries.created_at,
        changefreq: "monthly",
        priority: 0.7,
      };
    }).filter(Boolean),
  ];

  return urls;
}
