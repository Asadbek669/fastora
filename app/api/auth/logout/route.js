// app/api/auth/logout/route.js
import { serialize } from "cookie";

export async function POST() {
  const cookie = serialize("fastora_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Set-Cookie": cookie, "Content-Type": "application/json" },
  });
}
