import tvChannels from "../../tv/tvConfig";
import { notFound } from "next/navigation";
import LiveExternalPlayer from "@/components/LiveExternalPlayer";

export const dynamic = "force-dynamic";

export default async function LiveChannelPage({ params }) {
  const { slug } = await params;

  const tv = tvChannels.find((c) => c.slug === slug);

  if (!tv) {
    notFound();
  }

  return (
    <div className="pb-24 px-4 pt-6 text-white">

      {/* 🔙 Orqaga */}
      <a
        href="/tv"
        className="inline-block mb-6 text-sm text-gray-400 hover:text-white transition"
      >
        ← Telekanallarga qaytish
      </a>

      {/* 🖼️ KATTA TV LOGO */}
      <div className="flex justify-center mb-4">
        <img
          src={tv.image}
          alt={tv.name}
          className="
            w-full max-w-xs
            rounded-2xl
            bg-[#111]
            shadow-lg
            object-cover
          "
        />
      </div>

      {/* 📺 TV NOMI */}
      <h1 className="text-xl font-semibold text-center mb-1">
        {tv.name}
      </h1>

      {/* 🔴 LIVE */}
      <p className="text-center text-sm text-green-500 mb-5">
        ● Jonli efir — test rejimida
      </p>

	  {/* 🎬 LIVE PLAYER */}
	    <LiveExternalPlayer src={tv.stream} />
    </div>
  );
}
