import { pool } from "@/services/db";

export async function GET() {
  const res = await pool.query("SELECT * FROM hero_slides ORDER BY id DESC");
  return Response.json(res.rows);
}
