export default function convertToEmbed(url) {
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
