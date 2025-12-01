import { pool } from "@/services/db";

export async function POST(req) {
  const { id } = await req.json();

  await pool.query("DELETE FROM comments WHERE id=$1", [id]);

  return Response.json({ success: true });
}
