const CDN_BASE = "https://cdn.fastora.uz/tv";

const tvChannels = [
  {
    name: "BIZ TV",
    slug: "biz-tv",
    stream: "https://fl.biztv.media/biz_tv_720_uni8jhub4h8fub4idejswh8dh3j94finbu4nidj39inwsj92in3d/tracks-v1a1/mono.m3u8",
  },
  {
    name: "Setanta 1",
    slug: "setanta-1",
    stream: "https://stream1.cinerama.uz/1263/tracks-v1a1/mono.m3u8",
  },
  {
    name: "Россия 1",
    slug: "rossiya-1",
    stream: "https://stream8.cinerama.uz//1020/tracks-v1a1/mono.m3u8",
  },
  {
    name: "Россия 24",
    slug: "rossiya-24",
    stream: "https://stream8.cinerama.uz//1021/tracks-v1a1/mono.m3u8",
  },
  {
    name: "Первый канал",
    slug: "perviy-kanal",
    stream: "https://stream8.cinerama.uz//1019/tracks-v1a1/mono.m3u8",
  },
  {
    name: "Muloqot TV",
    slug: "muloqot-tv",
    stream: "https://stream8.cinerama.uz//1285/video.m3u8",
  },
  {
    name: "Istiqlol TV",
    slug: "istiqlol-tv",
    stream: "https://stream8.cinerama.uz//1283/video.m3u8",
  },
  {
    name: "ZO‘R TV",
    slug: "zor-tv",
    stream: "https://stream8.cinerama.uz//1016/tracks-v1a1/mono.m3u8",
  },
  {
    name: "Renessans TV",
    slug: "renessans-tv",
    stream: "https://stream8.cinerama.uz//1221/tracks-v1a1/mono.m3u8",
  },
  {
    name: "Futbol TV",
    slug: "futbol-tv",
    stream: "https://stream1.cinerama.uz/1010/tracks-v1a1/mono.m3u8",
  },
  {
    name: "Gold TV",
    slug: "gold-tv",
    stream: "https://stream8.cinerama.uz//4007/tracks-v1a1/mono.m3u8",
  },
  {
    name: "NTV",
    slug: "ntv",
    stream: "https://stream8.cinerama.uz//1284/video.m3u8",
  },
  {
    name: "Sevimli TV",
    slug: "sevimli-tv",
    stream: "https://stream8.cinerama.uz//1017/tracks-v1a1/index.m3u8",
  },
  {
    name: "MY5",
    slug: "my5",
    stream: "https://stream8.cinerama.uz//1217/tracks-v1a1/mono.m3u8",
  },
  {
    name: "Milliy TV",
    slug: "milliy-tv",
    stream: "https://stream8.cinerama.uz//1014/tracks-v1a1/mono.m3u8",
  },
  {
    name: "Dasturxon TV",
    slug: "dasturxon-tv",
    stream: "https://stream8.cinerama.uz//1206/tracks-v1a1/index.m3u8",
  },
  {
    name: "MYDAY TV",
    slug: "myday-tv",
    stream: "https://stream8.cinerama.uz//1265/tracks-v1a1/mono.m3u8",
  },
  {
    name: "Madaniyat va Ma'rifat",
    slug: "madaniyat-marifat",
    stream: "https://stream8.cinerama.uz//1005/tracks-v1a1/mono.m3u8",
  },
  {
    name: "Toshkent TV",
    slug: "toshkent-tv",
    stream: "https://stream8.cinerama.uz//1003/tracks-v1a1/mono.m3u8",
  },
  {
    name: "Dunyo Bo‘ylab",
    slug: "dunyo-boylab",
    stream: "https://stream8.cinerama.uz//1006/tracks-v1a1/mono.m3u8",
  },
  {
    name: "FTV",
    slug: "ftv",
    stream: "https://stream8.cinerama.uz//1018/tracks-v1a1a2/mono.m3u8",
  },
  {
    name: "Bolajon TV",
    slug: "bolajon-tv",
    stream: "https://stream8.cinerama.uz/1007/video.m3u8",
  },
  {
    name: "Navo",
    slug: "navo",
    stream: "https://stream8.cinerama.uz//1008/tracks-v1a1/mono.m3u8",
  },
  {
    name: "Mahalla TV",
    slug: "mahalla-tv",
    stream: "https://stream8.cinerama.uz//1013/tracks-v1a1/mono.m3u8",
  },
  {
    name: "SPORT TV UZ",
    slug: "sport-tv-uz",
    stream: "https://stream8.cinerama.uz//1004/tracks-v1a1/mono.m3u8",
  },
  {
    name: "O'zbekiston tarixi",
    slug: "ozbekiston-tarixi",
    stream: "https://stream8.cinerama.uz//1209/tracks-v1a1/mono.m3u8",
  },
  {
    name: "Kinoteatr",
    slug: "kinoteatr",
    stream: "https://stream8.cinerama.uz//1009/tracks-v1a1/mono.m3u8",
  },
  {
    name: "UZ REPORT TV",
    slug: "uzreport-tv",
    stream: "https://stream8.cinerama.uz//1015/tracks-v1a1/mono.m3u8",
  },
  {
    name: "O‘zbekiston 24",
    slug: "uzbekiston-24",
    stream: "https://stream8.cinerama.uz//1011/tracks-v1a1/mono.m3u8",
  },
  {
    name: "O‘zbekiston 1",
    slug: "uzbekiston-1",
    stream: "https://stream8.cinerama.uz//1001/tracks-v1a1/mono.m3u8",
  },
  {
    name: "Yoshlar",
    slug: "yoshlar",
    stream: "https://stream8.cinerama.uz//1002/tracks-v1a1/mono.m3u8",
  },
].map((tv) => ({
  ...tv,
  image: `${CDN_BASE}/${tv.slug}.webp`,
  alt: tv.name,
  live: true,
}));

export default tvChannels;

