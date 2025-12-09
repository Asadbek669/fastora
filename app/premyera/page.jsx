import Link from "next/link";

export const metadata = {
  title: "Premyera kinolar — Eng yangi filmlar | Fastora",
  description:
    "Eng yangi premyera kinolarni HD sifatda fastora.uz saytida bepul tomosha qiling. O‘zbek tilida tarjima qilingan eng so‘nggi filmlar.",
  openGraph: {
    title: "Premyera kinolar — Fastora",
    description:
      "Eng yangi premyera kinolarni yuqori sifatda tomosha qiling.",
    url: "https://fastora.uz/premyera",
    siteName: "Fastora",
    type: "website",
  },
};


async function getAllMovies() {
  const res = await fetch("https://fastora.vercel.app/api/movies", {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function Page() {
  const allMovies = await getAllMovies();

  // 1) Eng yangi filmlar — oxirgi qo‘shilganlar
  // API dan kelgan massiv odatda eski → yangi tarzda bo‘ladi,
  // shuning uchun revers() qilib, oldiga eng yangilarni chiqaramiz:
  const latest30 = allMovies.reverse().slice(0, 30);

  return (
    <div className="p-4 pb-32">
      <h1 className="text-2xl font-semibold mb-4">Premyeralar</h1>

      {latest30.length === 0 && (
        <p className="text-gray-400">Hozircha premyeralar mavjud emas.</p>
      )}

      <div className="grid grid-cols-3 gap-3 mt-4">
        {latest30.map((m) => (
          <Link
            key={m.id}
            href={`/movie/${m.slug}`}
            className="rounded-xl overflow-hidden bg-[#111] shadow-lg"
          >
            <div className="relative">
              <img src={m.poster} className="w-full h-40 object-cover" />
            </div>

            <div className="p-1">
              <p className="text-xs font-semibold truncate">{m.title}</p>
              <p className="text-gray-400 text-[10px]">{m.year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
