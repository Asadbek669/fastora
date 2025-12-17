import tvChannels from "@/app/tv/tvConfig";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default function LiveChannelPage({ params }) {
  const { slug } = params || {};

  // TV ni slug bo‘yicha topamiz
  const tv = tvChannels.find((c) => c.slug === slug);

  // Agar slug noto‘g‘ri bo‘lsa → 404
  if (!tv) {
    notFound();
  }

  return (
    <div className="pb-24 px-4 pt-4">

      {/* ORTGA QAYTISH */}
      <a
        href="/tv"
        className="inline-block mb-4 text-sm text-gray-400"
      >
        ← Telekanallarga qaytish
      </a>

      {/* KANAL NOMI */}
      <h1 className="text-xl font-semibold mb-2">
        📺 {tv.name}
      </h1>

      {/* STATUS */}
      <p className="text-sm text-gray-400 mb-4">
        Jonli efir — test rejimida
      </p>

      {/* PLAYER PLACEHOLDER */}
      <div
        className="
          w-full aspect-video
          rounded-xl
          bg-[#111]
          flex items-center justify-center
          text-gray-500 text-sm
        "
      >
        Player tez orada qo‘shiladi
      </div>

    </div>
  );
}
