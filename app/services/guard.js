// app/services/guard.js
import jwt from "jsonwebtoken";

export function requireAdmin(req) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/fastora_token=([^;]+)/);
  if (!match) throw new Error("Unauthorized");

  const token = match[1];
  const payload = jwt.verify(token, process.env.JWT_SECRET || "change_this_secret");
  if (!payload || payload.role !== "admin") throw new Error("Forbidden");
  return payload;
}
