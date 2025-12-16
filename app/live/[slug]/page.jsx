
export default function LiveChannelPage(props) {
  const slug = props?.params?.slug;

  // Agar slug bo‘lmasa — xatoni oldini olamiz
  const channelName = slug
    ? slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
    : "Telekanal";

  return (
    <div className="pb-24 px-4 pt-4">

      {/* ORTGA */}
      <a
        href="/tv"
        className="inline-block mb-4 text-sm text-gray-400"
      >
        ← Telekanallarga qaytish
      </a>

      {/* NOMI */}
      <h1 className="text-xl font-semibold mb-2">
        📺 {channelName}
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
