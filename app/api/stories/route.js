import { pool } from "@/services/db";

export async function GET() {
  const { rows } = await pool.query("SELECT * FROM stories ORDER BY id DESC");
  return Response.json(rows);
}
