import { pool } from "@/services/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const movie = searchParams.get("movie");
    const series = searchParams.get("series");

    if (!movie && !series) return Response.json([]);

    const result = await pool.query(
      `
      SELECT 
        c.id,
        c.text,
        c.created_at,
        c.parent_id,
        c.movie_id,
        c.series_id,
        c.user_id,
        
        -- USERNAME: agar user_id NULL bo‘lsa guest_username
        COALESCE(u.username, c.guest_username) AS username,

        -- ADMIN STATUS
        (c.user_id IS NOT NULL) AS is_admin

      FROM comments c
      LEFT JOIN users u ON u.id = c.user_id
      WHERE ${movie ? "c.movie_id = $1" : "c.series_id = $1"}
      ORDER BY c.created_at ASC
      `,
      [movie || series]
    );

    return Response.json(result.rows);
  } catch (err) {
    console.error(err);
    return Response.json([], { status: 500 });
  }
}
