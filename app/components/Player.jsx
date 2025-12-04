"use client";

export default function Player({ src, title }) {
  function openDirect() {
    if (!src) return;

    const sep = src.includes("?") ? "&" : "?";
    const url = `${src}${sep}t=${Date.now()}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="mt-4 px-4">
      <div className="w-full aspect-video bg-black flex items-center justify-center rounded-xl border border-white/10">
        <button
          onClick={openDirect}
          className="flex items-center justify-center text-white text-4xl w-20 h-20 rounded-full bg-blue-600 shadow-lg hover:scale-105 transition"
        >
          ▶
        </button>
      </div>

      {title && <h3 className="mt-2 text-white text-lg">{title}</h3>}
    </div>
  );
}

