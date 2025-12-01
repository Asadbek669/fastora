// app/api/series/route.js
import { pool } from "@/services/db"; // agar default bo‘lsa db qilib oling

// 🔹 GET — barcha seriallarni olish
export async function GET() {
  try {
    const result = await pool.query(`
      SELECT *
      FROM series
      ORDER BY id DESC
    `);

    return Response.json(result.rows);
  } catch (error) {
    console.error("GET series error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// 🔹 POST — yangi serial qo‘shish
// POST — yangi serial qo‘shish
export async function POST(req) {
  try {
    const body = await req.json();

    const {
      title,
      slug,
      year,
      country,
      imdb,
      poster,
      backdrop,
      description,
      category,
      genres,
      age,   // ⭐ YANGI QO‘SHILDI
    } = body;

    const result = await pool.query(
      `INSERT INTO series 
      (title, slug, year, country, imdb, poster, backdrop, description, category, genres, age)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *`,
      [
        title,
        slug,
        year,
        country,
        imdb,
        poster,
        backdrop,
        description,
        category,
        genres,
        age, // ⭐
      ]
    );

    return Response.json({ success: true, data: result.rows[0] }, { status: 201 });

  } catch (error) {
    console.error("POST series error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

