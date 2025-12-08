import { Pool } from "pg";

export const dynamic = "force-dynamic"; 
// ❗ SITEMAPNI STATIC BO'LMASLIGI UCHUN MAJBURIY

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  const baseUrl = "https://fastora.uz";

  // 📌 1) Filmlar
  const movies = await pool.query(`SELECT slug FROM movies`);

  // 📌 2) Seriallar
  const series = await pool.query(`SELECT id, slug FROM series`);

  // 📌 3) Sezonlar
  const seasons = await pool.query(`
    SELECT id, series_id, season_number
    FROM seasons
  `);

  // 📌 4) Epizodlar
  const episodes = await pool.query(`
    SELECT season_id, episode_number
    FROM episodes
  `);

  // 📌 5) Kategoriya sahifalari
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

  // XML boshlanishi
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // 🏠 Asosiy sahifa
  xml += `
    <url>
      <loc>${baseUrl}</loc>
      <priority>1.0</priority>
    </url>
  `;

  // 📂 Kategoriya sahifalari
  categories.forEach((cat) => {
    xml += `
      <url>
        <loc>${baseUrl}/${cat}</loc>
        <priority>0.9</priority>
      </url>
    `;
  });

  // 🎬 Filmlar
  movies.rows.forEach((m) => {
    xml += `
      <url>
        <loc>${baseUrl}/movie/${m.slug}</loc>
        <priority>0.8</priority>
      </url>
    `;
  });

  // 📺 Seriallar
  series.rows.forEach((s) => {
    xml += `
      <url>
        <loc>${baseUrl}/serial/${s.slug}</loc>
        <priority>0.8</priority>
      </url>
    `;
  });

  // 📦 Sezonlar
  seasons.rows.forEach((season) => {
    const s = series.rows.find((sr) => sr.id === season.series_id);

    xml += `
      <url>
        <loc>${baseUrl}/serial/${s.slug}/season/${season.season_number}</loc>
        <priority>0.7</priority>
      </url>
    `;
  });

  // 🎞 Epizodlar
  episodes.rows.forEach((ep) => {
    const season = seasons.rows.find((se) => se.id === ep.season_id);
    const s = series.rows.find((sr) => sr.id === season.series_id);

    xml += `
      <url>
        <loc>${baseUrl}/serial/${s.slug}/season/${season.season_number}/episode/${ep.episode_number}</loc>
        <priority>0.6</priority>
      </url>
    `;
  });

  xml += `</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
