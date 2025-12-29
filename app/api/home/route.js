import { NextResponse } from "next/server";
import { pool } from "@/services/db";

export const revalidate = 3000; // 

export async function GET() {
  try {
    /* =========================
       🎬 MOVIES (oxirgi qo‘shilgan 15 ta)
       ========================= */
    const moviesResult = await pool.query(`
      SELECT id, title, slug, poster, category, year, created_at
      FROM movies
      ORDER BY created_at DESC
      LIMIT 15
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

    const moviesByCategory = groupBy(moviesResult.rows);
    const seriesByCategory = groupBy(seriesResult.rows);

    /* =========================
       🚀 RESPONSE
       ========================= */
    return NextResponse.json({
      premyera: moviesResult.rows ?? [], // oxirgi qo‘shilgan 15 ta kino
      tarjima: moviesByCategory["tarjima"] ?? [],
      anime: moviesByCategory["anime"] ?? [],
      hind: moviesByCategory["hind"] ?? [],
      multfilmlar: moviesByCategory["multfilmlar"] ?? [],
      uzbek: moviesByCategory["uzbek-film"] ?? [],

      xorijSeriallar: seriesByCategory["xorij-seriallar"] ?? [],
      koreaSeriallar: seriesByCategory["korea-seriallari"] ?? [],
      turkSeriallar: seriesByCategory["turk-seriallar"] ?? [],
      multiserriallar: seriesByCategory["multiserriallar"] ?? [],
    });

  } catch (err) {
    console.error("HOME API ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

