// app/api/auth/login/route.js
import { pool } from "@/services/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
const TOKEN_NAME = "fastora_token";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) return new Response(JSON.stringify({ error: "Missing" }), { status: 400 });

    const result = await pool.query("SELECT * FROM users WHERE username = $1 OR email = $1 LIMIT 1", [username]);
    const user = result.rows[0];
    if (!user) return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });

    const valid = bcrypt.compareSync(password, user.password_hash);
    if (!valid) return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: `${MAX_AGE}s` });

    // Set cookie in header
    const cookie = serialize(TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: MAX_AGE,
      path: "/",
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Set-Cookie": cookie, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
