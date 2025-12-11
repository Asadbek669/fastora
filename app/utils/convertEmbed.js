// utils/convertEmbed.js
export default function convertToEmbed(url) {
  if (!url) return '';
  
  // YouTube linklarini embed formatiga o'tkazish
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(youtubeRegex);
  
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  
  return url;
}
