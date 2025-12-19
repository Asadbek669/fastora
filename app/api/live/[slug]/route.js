import { TV_STREAMS } from "../../../../lib/tvStreams.server";

const ALLOWED_ORIGINS = [
  "https://fastora.uz",
  "https://www.fastora.uz",
  "http://localhost:3000",
];

export async function GET(req, context) {
  const { slug } = await context.params;

  const referer = req.headers.get("referer") || "";
  const origin = req.headers.get("origin") || "";

  const allowed = ALLOWED_ORIGINS.some(
    (d) => referer.startsWith(d) || origin === d
  );

  if (!allowed) {
    return new Response("Forbidden", { status: 403 });
  }

  const realUrl = TV_STREAMS[slug];
  if (!realUrl) {
    return new Response("Not found", { status: 404 });
  }

  const res = await fetch(realUrl);
  let playlist = await res.text();

  const base = realUrl.substring(0, realUrl.lastIndexOf("/") + 1);
  playlist = playlist.replace(
    /^(?!#)(.+\.ts.*)$/gm,
    (line) => (line.startsWith("http") ? line : base + line)
  );

  return new Response(playlist, {
    headers: {
      "Content-Type": "application/vnd.apple.mpegurl",
      "Cache-Control": "no-store",
    },
  });
}
