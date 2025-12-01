import { pool } from "@/services/db";

export async function GET(req, ctx) {
  const { slug } = await ctx.params;

  try {
    // 1) Serialni olish
    const result = await pool.query(
      `SELECT * FROM series WHERE slug = $1 LIMIT 1`,
      [slug]
    );

    if (result.rows.length === 0) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    const series = result.rows[0];

    // 2) Kommentlar sonini olish
    const commentRes = await pool.query(
      `SELECT COUNT(*) AS count FROM comments WHERE series_id = $1`,
      [series.id]
    );

    // 3) Sonni raqamga o'tkazish
    const comments_count = Number(commentRes.rows[0].count);

    // 4) Serial + komment soni birga qaytadi
    return Response.json({
      ...series,
      comments_count,
    });

  } catch (err) {
    console.error("Series slug API error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
