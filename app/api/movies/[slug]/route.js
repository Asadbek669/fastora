import { pool } from "@/services/db";

export const revalidate = 20; // ⏱ 20 sec

export async function GET(req, { params }) {
  const { slug } = params;

  try {
    // 1️⃣ Kino
    const movieRes = await pool.query(
      `SELECT * FROM movies WHERE slug = $1 LIMIT 1`,
      [slug]
    );

    if (movieRes.rows.length === 0) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    const movie = movieRes.rows[0];

    // 2️⃣ Komment soni
    const commentRes = await pool.query(
      `SELECT COUNT(*) AS count FROM comments WHERE movie_id = $1`,
      [movie.id]
    );

    const comments_count = Number(commentRes.rows[0].count);

    // 3️⃣ Javob
    return Response.json({
      ...movie,
      comments_count,
    });

  } catch (err) {
    console.error("Movie API error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

