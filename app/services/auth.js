// app/services/auth.js

// ======================
// JWT AUTH (user accounts)
// ======================

import jwt from "jsonwebtoken";
import { serialize, parse } from "cookie";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
const TOKEN_NAME = "fastora_token";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 kun

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: `${MAX_AGE}s` });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function setTokenCookie(res, token) {
  const cookie = serialize(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });

  res.headers.set("Set-Cookie", cookie);
}

export function parseCookies(req) {
  const cookie = req.headers.get("cookie") || "";
  return parse(cookie);
}

// ======================
// GUEST UID (like system)
// ======================

const UID_COOKIE = "fastora_uid";

// Mehmonlarga avtomatik unik ID berish
export async function getUID() {
  const store = await cookies();
  let uid = store.get(UID_COOKIE)?.value;

  // Agar cookie yo'q bo'lsa → yaratamiz
  if (!uid) {
    uid = randomUUID();

    store.set({
      name: UID_COOKIE,
      value: uid,
      httpOnly: false,     // mehmon uchun bo‘lishi kerak
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 yil
    });
  }

  return uid;
}
