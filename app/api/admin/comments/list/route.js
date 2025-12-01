import { pool } from "@/services/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const offset = Number(searchParams.get("offset") || 0);
  const limit = 20;

  // 1) Faqat root kommentlarni paginate qilamiz
  const roots = await pool.query(
    `
    SELECT 
      c.*, 
      COALESCE(u.username, c.guest_username) AS username,
      (c.user_id IS NOT NULL) AS is_admin
    FROM comments c
    LEFT JOIN users u ON u.id = c.user_id
    WHERE parent_id IS NULL
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  );

  const rootIds = roots.rows.map((r) => r.id);

  // 2) Root kommentlarga tegishli barcha replylarni olish
  let replies = [];

  if (rootIds.length) {
    const result2 = await pool.query(
      `
      SELECT 
        c.*,
        COALESCE(u.username, c.guest_username) AS username,
        (c.user_id IS NOT NULL) AS is_admin
      FROM comments c
      LEFT JOIN users u ON u.id = c.user_id
      WHERE parent_id = ANY($1::int[])
      ORDER BY created_at ASC
      `,
      [rootIds]
    );

    replies = result2.rows;
  }

  return Response.json({
    roots: roots.rows,
    replies
  });
}
