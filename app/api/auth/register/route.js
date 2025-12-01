import { pool } from "@/services/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password, role } = body;

    if (!username || !password) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const hash = bcrypt.hashSync(password, 10);

    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash, role)
       VALUES ($1,$2,$3,$4)
       RETURNING id, username, email, role`,
      [username, email, hash, role || "admin"]
    );

    return Response.json({ ok: true, user: result.rows[0] });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
