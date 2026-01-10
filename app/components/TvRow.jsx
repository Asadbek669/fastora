import Link from "next/link";
import tvChannels from "../tv/tvConfig";

export default function TvRow() {
  const previewChannels = tvChannels.slice(0, 15);

  return (
    <section className="mt-6">

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-xl font-semibold">
          Telekanallar
        </h2>

        <Link
          href="/tv"
          className="text-sm text-white/70 hover:text-white transition"
		  aria-label="Barchasini ko‘rish — Telekanallar"	
        >          
		  Barchasini ko‘rish ➤
        </Link>
      </div>

      {/* SLIDER */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">

        {/* 🔹 1–10 kanallar */}
        {previewChannels.map((tv) => (
          <Link
            key={tv.slug}
            href={`/live/${tv.slug}`}
            className="
              flex-shrink-0 w-[120px]
              rounded-xl overflow-hidden
              bg-[#111]
              shadow-lg
              transition
              active:scale-95
            "
          >
            {/* LOGO */}
            <div className="w-full h-[96px] bg-black">
              <img
                src={tv.image}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* NAME */}
            <div className="py-2 text-center text-xs truncate">
              {tv.name}
            </div>
          </Link>
        ))}

        {/* 🔥 11-chi: KO‘PROQ KO‘RISH */}
		<Link
		  href="/tv"
		  className="
			group
			flex-shrink-0 w-[120px]
			rounded-xl
			bg-[#0e0e0e]
			border border-white/10
			shadow-md
			flex flex-col items-center justify-center
			transition
			active:scale-95
		  "
		>
		  {/* ⭕ ICON CONTAINER */}
		  <div
			className="
			  w-12 h-12
			  rounded-full
			  bg-[#1a1a1a]
			  flex items-center justify-center
			  text-xl
			  text-white/80
			  mb-2
			  transition
			  group-hover:scale-110
			  group-hover:bg-[#222]
			"
		  >
			<svg
			  width="22"
			  height="22"
			  viewBox="0 0 24 24"
			  fill="none"
			  stroke="currentColor"
			  strokeWidth="2"
			  strokeLinecap="round"
			  strokeLinejoin="round"
			>
			  <path d="M12 5v14M5 12h14" />
			</svg>
		  </div>

		  {/* TEXT */}
		  <div className="text-[11px] font-medium text-white/70">
			Ko‘proq ko‘rish
		  </div>
		</Link>
      </div>

    </section>
  );
}





