import { pool } from "@/services/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { seasonId, title, videoUrl, thumbnail, duration } = body;

    // 1) Hozirgi season ichidagi oxirgi epizod raqamini olamiz
    const lastEp = await pool.query(
      "SELECT episode_number FROM episodes WHERE season_id = $1 ORDER BY episode_number DESC LIMIT 1",
      [seasonId]
    );

    const nextNumber =
      lastEp.rows.length === 0 ? 1 : lastEp.rows[0].episode_number + 1;

    // 2) Episode yaratamiz
    const result = await pool.query(
      `INSERT INTO episodes 
       (season_id, episode_number, title, video_url, thumbnail, duration)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [seasonId, nextNumber, title, videoUrl, thumbnail, duration]
    );

    return Response.json(result.rows[0]);

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
