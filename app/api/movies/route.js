import { pool } from "@/services/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT *
      FROM movies
      ORDER BY id DESC
    `);

    return Response.json(result.rows);
  } catch (err) {
    console.error("DB error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
