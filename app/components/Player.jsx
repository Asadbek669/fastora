"use client";

export default function PlayerClient({ src, title }) {
  function openDirect() {
    if (!src) return;
    const sep = src.includes("?") ? "&" : "?";
    const url = `${src}${sep}t=${Date.now()}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="w-full max-w-3xl">
      <div
        className="w-full aspect-video flex items-center justify-center rounded-xl border border-white/10 relative overflow-hidden bg-black"
        style={{
          backgroundImage: "url('https://cdn.fastora.uz/images/FASTORA.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
		<button
		  onClick={openDirect}
		  className="flex items-center justify-center text-white text-3xl w-16 h-16 rounded-full bg-red-600/80 shadow-lg hover:scale-105 transition z-10"
		>
		  ▶
		</button>

        {/* Agar fon ustiga qorong‘i overlay qo‘ymoqchi bo‘lsangiz */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {title && (
        <h2 className="mt-3 text-center text-sm text-gray-300">{title}</h2>
      )}
    </div>
  );
}
