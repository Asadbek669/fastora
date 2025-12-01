import { pool } from "@/services/db";

export async function GET() {
  const data = await pool.query("SELECT * FROM movies ORDER BY id DESC");
  return Response.json({ movies: data.rows });
}
