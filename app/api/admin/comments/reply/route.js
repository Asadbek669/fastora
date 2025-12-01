import { pool } from "@/services/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const body = await req.json();
    const { parent_id, text, movie_id, series_id } = body;

    // ⚠️ Next.js 14 — cookies() async:
    const cookieStore = await cookies();
    const token = cookieStore.get("fastora_token")?.value;

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminId = decoded.id; // admin user_id

    const result = await pool.query(
      `INSERT INTO comments (text, parent_id, movie_id, series_id, user_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [text, parent_id, movie_id, series_id, adminId]
    );

    return Response.json(result.rows[0]);
  } catch (err) {
    console.error("Admin Reply Error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
