import { pool } from "@/services/db";

// 🔍 SEASON BY ID GET
export async function GET(_, { params }) {
  const { id } = params;

  try {
    const season = await pool.query(
      "SELECT * FROM seasons WHERE id = $1 LIMIT 1",
      [id]
    );

    if (season.rows.length === 0)
      return Response.json({ error: "Season not found" }, { status: 404 });

    return Response.json(season.rows[0]);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// 🗑 SEASON DELETE
export async function DELETE(_, { params }) {
  const { id } = params;

  try {
    // Avval epizodlarni o‘chiramiz
    await pool.query(
      "DELETE FROM episodes WHERE season_id = $1",
      [id]
    );

    // Keyin seasonni o‘chiramiz
    await pool.query(
      "DELETE FROM seasons WHERE id = $1",
      [id]
    );

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// ✏️ SEASON UPDATE
export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  try {
    const updated = await pool.query(
      `UPDATE seasons 
       SET description=$1, poster=$2
       WHERE id=$3 
       RETURNING *`,
      [body.description, body.poster, id]
    );

    return Response.json(updated.rows[0]);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

