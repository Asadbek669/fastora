import { Pool } from "pg";

const pool = new Pool({

connectionString: process.env.DATABASE_URL,

});

export default async function sitemap() {

const baseUrl = "https://fastora.uz";

// 📌 1) Filmlar

const movies = await pool.query(SELECT slug FROM movies);

// 📌 2) Seriallar

const series = await pool.query(SELECT id, slug FROM series);

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

// 📌 5) Kategoriya sahifalari (asosiy sahifadagi bo‘limlar)

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



// 📦 Sezonlar

...seasons.rows.map((season) => {

  const s = series.rows.find((sr) => sr.id === season.series_id);

  return {

    url: `${baseUrl}/serial/${s.slug}/season/${season.season_number}`,

    lastModified: new Date(),

    changefreq: "weekly",

    priority: 0.7,

  };

}),



// 🎞 Epizodlar

...episodes.rows.map((ep) => {

  const season = seasons.rows.find((se) => se.id === ep.season_id);

  const s = series.rows.find((sr) => sr.id === season.series_id);



  return {

    url: `${baseUrl}/serial/${s.slug}/season/${season.season_number}/episode/${ep.episode_number}`,

    lastModified: new Date(),

    changefreq: "weekly",

    priority: 0.6,

  };

}),

];

return urls;

}
