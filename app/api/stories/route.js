import { pool } from "@/services/db";

export const revalidate = 3000; // 🔥 50 daqiqa cache

export async function GET() {
  const { rows } = await pool.query(
    "SELECT * FROM stories ORDER BY id DESC"
  );

  return Response.json(rows);
}
