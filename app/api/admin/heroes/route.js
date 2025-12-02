import { pool } from "@/services/db";

export async function GET() {
  const res = await pool.query("SELECT * FROM hero_slides ORDER BY id DESC");
  return Response.json(res.rows);
}

export async function POST(req) {
  const { title, backdrop_url, page_url } = await req.json();

  const result = await pool.query(
    `INSERT INTO hero_slides (title, backdrop_url, page_url)
     VALUES ($1, $2, $3) RETURNING *`,
    [title, backdrop_url, page_url]
  );

  return Response.json(result.rows[0]);
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  await pool.query("DELETE FROM hero_slides WHERE id = $1", [id]);
  return new Response(null, { status: 204 });
}
