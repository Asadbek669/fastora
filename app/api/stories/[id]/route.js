export async function GET(req, { params }) {
  let id = params.id;
  if (Array.isArray(id)) id = id[0];

  console.log("REAL STORY ID:", id);

  const { rows } = await pool.query(
    "SELECT * FROM stories WHERE id = $1 LIMIT 1",
    [id]
  );

  if (rows.length === 0) {
    return Response.json({ error: "Story not found" }, { status: 404 });
  }

  return Response.json(rows[0]);
}
