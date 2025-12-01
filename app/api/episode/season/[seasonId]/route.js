import { pool } from "@/services/db";

export async function GET(req, ctx) {
  try {
    // ❗ Next 16 (Turbopack) da params — Promise bo'ladi
    const { seasonId } = await ctx.params;

    // son emas bo‘lsa xato chiqaramiz
    const seasonInt = Number(seasonId);
    if (isNaN(seasonInt)) {
      return Response.json(
        { error: "seasonId NaN bo‘ldi" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "SELECT * FROM episodes WHERE season_id = $1 ORDER BY episode_number ASC",
      [seasonInt]
    );

    return Response.json(result.rows);
  } catch (err) {
    console.error("GET episodes error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
