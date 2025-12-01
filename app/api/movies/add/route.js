// app/api/movies/add/route.js
import { pool } from "@/services/db";

export async function POST(req) {
  try {
    const body = await req.json();
    
    const {
      title, slug, year, country, imdb,
      poster, backdrop, video,
      description, category, genres,
      age, thumbs
    } = body;

    const query = `
      INSERT INTO movies (
        title, slug, year, country, imdb,
        poster, backdrop, video, description,
        category, genres, age, thumbs
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING *;
    `;

    const result = await pool.query(query, [
      title, slug, year, country, imdb,
      poster, backdrop, video, description,
      category, genres, age, thumbs
    ]);

    return Response.json(
      { ok: true, movie: result.rows[0] },
      { status: 201 }
    );

  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
