import { pool } from "@/services/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { movie_id, series_id, text, parent_id, username } = body;

    if (!text || text.trim() === "") {
      return Response.json({ error: "Comment cannot be empty" }, { status: 400 });
    }

    const finalName = username?.trim() || "Anonim";

    const res = await pool.query(
      `INSERT INTO comments (user_id, movie_id, series_id, text, guest_username, parent_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, text, created_at, guest_username, parent_id`,
      [null, movie_id, series_id, text, finalName, parent_id || null]
    );

    return Response.json({
      id: res.rows[0].id,
      text,
      created_at: res.rows[0].created_at,
      username: finalName,
      parent_id: res.rows[0].parent_id
    });

  } catch (error) {
    console.error("Comment Add Error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
