"use client";

export default function StoryVideoModal({ url, onClose }) {
  if (!url) return null;

  function convertToEmbed(url) {
    if (url.includes("/shorts/")) {
      const id = url.split("/shorts/")[1].split("?")[0];
      return `https://www.youtube-nocookie.com/embed/${id}`;
    }

    if (url.includes("watch?v=")) {
      const id = url.split("watch?v=")[1].split("&")[0];
      return `https://www.youtube-nocookie.com/embed/${id}`;
    }

    return url;
  }

  const embedUrl = convertToEmbed(url);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center">
      
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white text-3xl"
      >
        ✕
      </button>

      <div className="w-[90%] max-w-[420px] aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-xl">
        <iframe
          className="w-full h-full"
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
