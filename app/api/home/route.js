import { NextResponse } from "next/server";
import { pool } from "@/services/db"; // ✅ TO‘G‘RI JOY

export const revalidate = 300; // 5 daqiqa cache

export async function GET() {
  try {
    /* =========================
       🎬 MOVIES (category balance)
       ========================= */
    const moviesResult = await pool.query(`
      SELECT id, title, slug, poster, category, year, created_at
      FROM (
        SELECT
          id,
          title,
          slug,
          poster,
          category,
          year,
          created_at,
          ROW_NUMBER() OVER (
            PARTITION BY category
            ORDER BY created_at DESC
          ) AS rn
        FROM movies
        WHERE category IN (
          'premyera',
          'tarjima',
          'anime',
          'hind',
          'multfilmlar',
          'uzbek-film'
        )
      ) t
      WHERE
        (category = 'premyera' AND rn <= 10)
        OR (category != 'premyera' AND rn <= 15)
      ORDER BY created_at DESC
    `);

    /* =========================
       📺 SERIES (category balance)
       ========================= */
    const seriesResult = await pool.query(`
      SELECT id, title, slug, poster, category, year, created_at
      FROM (
        SELECT
          id,
          title,
          slug,
          poster,
          category,
          year,
          created_at,
          ROW_NUMBER() OVER (
            PARTITION BY category
            ORDER BY created_at DESC
          ) AS rn
        FROM series
        WHERE category IN (
          'xorij-seriallar',
          'korea-seriallari',
          'turk-seriallar',
          'multiserriallar'
        )
      ) t
      WHERE rn <= 15
      ORDER BY created_at DESC
    `);

    /* =========================
       🧠 GROUP BY CATEGORY
       ========================= */
    const groupBy = (rows) => {
      const map = {};
      for (const row of rows) {
        (map[row.category] ??= []).push(row);
      }
      return map;
    };

    const movies = groupBy(moviesResult.rows);
    const series = groupBy(seriesResult.rows);

    /* =========================
       🚀 RESPONSE
       ========================= */
    return NextResponse.json({
      premyera: movies["premyera"] ?? [],
      tarjima: movies["tarjima"] ?? [],
      anime: movies["anime"] ?? [],
      hind: movies["hind"] ?? [],
      multfilmlar: movies["multfilmlar"] ?? [],
      uzbek: movies["uzbek-film"] ?? [],

      xorijSeriallar: series["xorij-seriallar"] ?? [],
      koreaSeriallar: series["korea-seriallari"] ?? [],
      turkSeriallar: series["turk-seriallar"] ?? [],
      multiserriallar: series["multiserriallar"] ?? [],
    });

  } catch (err) {
    console.error("HOME API ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

