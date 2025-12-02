import { pool } from "@/services/db";

export async function POST(req) {
  const { title, poster_url, youtube_url, page_url } = await req.json();

  const query = `
    INSERT INTO stories (title, poster_url, youtube_url, page_url)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const values = [title, poster_url, youtube_url, page_url];

  const { rows } = await pool.query(query, values);

  return Response.json(rows[0]);
}
