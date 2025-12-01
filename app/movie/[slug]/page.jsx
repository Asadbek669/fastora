import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Player from "@/components/Player"; // ✅ Player qo‘shildi
import AgeModal from "@/components/AgeModal";



async function getMovie(slug) {
  const res = await fetch(`http://localhost:3000/api/movies/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function MoviePage(props) {
  const { slug } = await props.params;
  const movie = await getMovie(slug);

  if (!movie) return redirect("/");

  return (
    <div className="text-white min-h-screen bg-black pb-28">
      {/* BACKDROP */}
      <div className="relative w-full h-[250px] overflow-hidden">
        <Image
          src={movie.backdrop}
          fill
          priority
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00000070] to-black/70" />
      </div>

      <div className="px-4 mt-[-30px]">
        {/* POSTER + DETAILS */}
        <div className="flex gap-4 items-start">
          <div className="w-32 rounded-xl overflow-hidden shadow-xl border border-white/10">
            <Image
              src={movie.poster}
              width={300}
              height={450}
              alt={movie.title}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="flex-1 mt-9">
            <h1 className="text-2xl font-bold leading-tight">{movie.title}</h1>

            <p className="text-gray-400 mt-1 text-sm">📅 {movie.year}</p>
            <p className="text-gray-400 text-sm">🌍 Davlati: {movie.country}</p>
            <p className="text-gray-400 text-sm">🔊 Til: O‘zbek tilida</p>

            <span className="inline-flex items-center gap-2 bg-yellow-600/30 text-yellow-300 px-2 py-1 text-sm rounded-lg w-max mt-2">
              ⭐ IMDb: {movie.imdb}
            </span>
          </div>
        </div>

        {/* 🔥 INFO PANEL */}
        <div className="mt-5 grid grid-cols-3 gap-2">

          {/* IMDb */}
		  <div className="bg-white/5 border border-white/10 rounded-lg py-1 flex flex-col items-center justify-center">
			<svg
			  xmlns="http://www.w3.org/2000/svg"
			  width="20"
			  height="20"
			  viewBox="0 0 64 64"
			  fill="none"
			>
			  <rect width="64" height="64" rx="6" fill="#F5C518" />
			  <path
				d="M14 18h6v28h-6V18Zm12 0h9l3 20 3-20h9v28h-6V26l-3 20h-6l-3-20v20h-6V18Zm27 0h9c2 0 4 2 4 4v20c0 2-2 4-4 4h-9V18Zm6 20c1 0 2-1 2-2V24c0-1-1-2-2-2h-3v16h3Z"
				fill="#000"
			  />
			</svg>
		    <p className="text-xs mt-1">{movie.imdb}</p>
		  </div>

          {/* COMMENTS */}

		  <Link
		    href={`/movie/${slug}/comments`}
		    className="bg-white/5 border border-white/10 rounded-lg py-2 flex flex-col items-center active:scale-95 transition"
		  >
		    <svg
			  xmlns="http://www.w3.org/2000/svg"
			  width="26"
			  height="26"
			  viewBox="0 0 24 24"
			  fill="currentColor"
			  className="text-white"
		    >
			  <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm-6 10H6v-2h8Zm4-4H6V6h12Z"/>
		    </svg>

		    <p className="text-xs mt-1">{movie.comments_count ?? 0}</p>
		  </Link>

          {/* AGE LIMIT (stikersiz, katta matn bilan) */}
          <AgeModal age={movie.age ?? "18+"} />
            
          
        </div>

        {/* ▶ PLAYER – tugma o‘rnida */}
        <div className="mt-6">
          <Player src={movie.video} />
        </div>

        {/* JANR */}
        <div className="mt-6">
          <h2 className="text-gray-300 mb-2 text-lg">Janri:</h2>

          <div className="flex gap-2 flex-wrap">
            {movie.genres?.map((g, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-sm"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-6">
          <h2 className="text-gray-300 mb-2 mt-5">Film haqida qisqacha:</h2>
          <p className="text-gray-400 leading-relaxed whitespace-pre-line">
            {movie.description}
          </p>
        </div>

        {/* LAVHALAR */}
        <div className="mt-6">
          <h2 className="text-gray-300 mb-2">Lavhalar:</h2>

          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-3">
            {movie.thumbs?.map((img, i) => (
              <div
                key={i}
                className="min-w-[60%] aspect-video rounded-xl overflow-hidden bg-[#111]"
              >
                <Image
                  src={img}
                  width={800}
                  height={450}
                  alt="thumb"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
