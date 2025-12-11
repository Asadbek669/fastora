import { pool } from "@/services/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("query") || "";

  const movies = await pool.query(
    `SELECT id, slug, title, year, poster AS poster_url, 'movie' AS type
     FROM movies
     WHERE LOWER(title) LIKE LOWER($1)
     LIMIT 30`,
    [`%${q}%`]
  );

  const series = await pool.query(
    `SELECT id, slug, title, year, poster AS poster_url, 'series' AS type
     FROM series
     WHERE LOWER(title) LIKE LOWER($1)
     LIMIT 30`,
    [`%${q}%`]
  );

  return Response.json([...movies.rows, ...series.rows]);
}
