import { pool } from "@/services/db";

// 🗑 EPISODE DELETE
export async function DELETE(_, { params }) {
  const { id } = params;

  try {
    await pool.query("DELETE FROM episodes WHERE id=$1", [id]);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// 🟢 EPISODE GET (bitta epizod olish)
export async function GET(req, { params }) {
  const { id } = params;

  try {
    const result = await pool.query(
      "SELECT * FROM episodes WHERE id = $1 LIMIT 1",
      [id]
    );

    if (result.rows.length === 0) {
      return Response.json({ error: "Episode not found" }, { status: 404 });
    }

    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}




// ✏️ EPISODE UPDATE
export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  try {
    const updated = await pool.query(
      `UPDATE episodes 
       SET title=$1, video_url=$2, thumbnail=$3, duration=$4
       WHERE id=$5 
       RETURNING *`,
      [
        body.title,
        body.videoUrl,
        body.thumbnail,
        body.duration,
        id,
      ]
    );

    return Response.json(updated.rows[0]);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
