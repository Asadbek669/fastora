// app/api/premiere/route.js
import { pool } from "@/services/db";

// ⏱ 5 daqiqa cache
export const revalidate = 300;

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        title,
        slug,
        poster,
        year,
        imdb, 
        created_at,
        'movie' AS type
      FROM movies

      UNION ALL

      SELECT 
        id,
        title,
        slug,
        poster,
        year,
        imdb, 
        created_at,
        'series' AS type
      FROM series

      ORDER BY created_at DESC
      LIMIT 30
    `);

    return new Response(JSON.stringify(result.rows), {
      headers: {
        "Content-Type": "application/json",
        // 🔥 CDN + Browser cache
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
