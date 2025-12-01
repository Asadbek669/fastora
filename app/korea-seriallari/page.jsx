const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  `https://${process.env.VERCEL_URL}` ||
  "http://localhost:3000";

async function getTarjimaMovies() {
  const res = await fetch(`${BASE_URL}/api/movies`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}
