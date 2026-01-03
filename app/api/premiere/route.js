import { pool } from "@/services/db";

export const revalidate = 300;

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        m.id,
        m.title,
        m.slug,
        m.poster,
        m.year,
        m.imdb,
        m.duration,          -- 🔹 Qo'shildi
        m.created_at,
        'movie' AS type,
        NULL AS last_season
      FROM movies m

      UNION ALL

      SELECT 
        s.id,
        s.title,
        s.slug,
        s.poster,
        s.year,
        s.imdb,
        NULL AS duration,    -- serialda yo'q
        s.created_at,
        'series' AS type,
        (
          SELECT MAX(season_number)
          FROM seasons
          WHERE series_id = s.id
        ) AS last_season
      FROM series s

      ORDER BY created_at DESC
      LIMIT 30
    `);

    return new Response(JSON.stringify(result.rows), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("GET premiere error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
