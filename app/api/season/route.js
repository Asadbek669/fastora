import { pool } from "@/services/db";

export async function POST(req) {
  try {
    const { seriesId, seasonNumber, description } = await req.json();

    const result = await pool.query(
      `
      INSERT INTO seasons (series_id, season_number, description)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [seriesId, seasonNumber, description || ""]
    );

    return Response.json(result.rows[0], { status: 201 });

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

// GET ham o'z joyida qolsin
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) return Response.json([]);

  try {
    const s = await pool.query(
      `SELECT id FROM series WHERE slug = $1 LIMIT 1`,
      [slug]
    );

    if (s.rows.length === 0) return Response.json([]);

    const seriesId = s.rows[0].id;

    const seasons = await pool.query(
      `SELECT * FROM seasons WHERE series_id = $1 ORDER BY season_number ASC`,
      [seriesId]
    );

    return Response.json(seasons.rows);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
