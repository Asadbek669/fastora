export default function convertToEmbed(url) {
  // YouTube Shorts
  if (url.includes("/shorts/")) {
    const id = url.split("/shorts/")[1].split("?")[0];
    return `https://www.youtube-nocookie.com/embed/${id}`;
  }

  // YouTube watch?v=
  if (url.includes("watch?v=")) {
    const id = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube-nocookie.com/embed/${id}`;
  }

  // Agar bu YouTube emas, oddiy video bo'lsa
  // (mp4, webm, m3u8 va boshqa)
  const videoExtensions = [".mp4", ".webm", ".mkv", ".m3u8", ".mov"];
  const isVideoFile = videoExtensions.some(ext => url.toLowerCase().endsWith(ext));

  if (isVideoFile) {
    return url; // oddiy video to'g'ridan-to'g'ri qaytariladi
  }

  return url;
}
