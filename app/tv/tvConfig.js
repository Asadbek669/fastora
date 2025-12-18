const CDN_BASE = "https://cdn.fastora.uz/tv";
const TEST_HLS = "https://fl.biztv.media/biz_tv_720_uni8jhub4h8fub4idejswh8dh3j94finbu4nidj39inwsj92in3d/tracks-v1a1/mono.m3u8";

const tvChannels = [
  {
    name: "BIZ TV",
    slug: "biz-tv",
    stream: TEST_HLS,
  },
  {
    name: "Setanta 1",
    slug: "setanta-1",
    stream: TEST_HLS,
  },
  {
    name: "Россия 1",
    slug: "rossiya-1",
    stream: TEST_HLS,
  },
  {
    name: "Россия 24",
    slug: "rossiya-24",
    stream: TEST_HLS,
  },
  {
    name: "Первый канал",
    slug: "perviy-kanal",
    stream: TEST_HLS,
  },
  {
    name: "Muloqot TV",
    slug: "muloqot-tv",
    stream: TEST_HLS,
  },
  {
    name: "Istiqlol TV",
    slug: "istiqlol-tv",
    stream: TEST_HLS,
  },
  {
    name: "ZO‘R TV",
    slug: "zor-tv",
    stream: TEST_HLS,
  },
  {
    name: "Renessans TV",
    slug: "renessans-tv",
    stream: TEST_HLS,
  },
  {
    name: "Futbol TV",
    slug: "futbol-tv",
    stream: TEST_HLS,
  },
  {
    name: "Gold TV",
    slug: "gold-tv",
    stream: TEST_HLS,
  },
  {
    name: "NTV",
    slug: "ntv",
    stream: TEST_HLS,
  },
  {
    name: "Sevimli TV",
    slug: "sevimli-tv",
    stream: TEST_HLS,
  },
  {
    name: "MY5",
    slug: "my5",
    stream: TEST_HLS,
  },
  {
    name: "Milliy TV",
    slug: "milliy-tv",
    stream: TEST_HLS,
  },
  {
    name: "Dasturxon TV",
    slug: "dasturxon-tv",
    stream: TEST_HLS,
  },
  {
    name: "MYDAY TV",
    slug: "myday-tv",
    stream: TEST_HLS,
  },
  {
    name: "Madaniyat va Ma'rifat",
    slug: "madaniyat-marifat",
    stream: TEST_HLS,
  },
  {
    name: "Toshkent TV",
    slug: "toshkent-tv",
    stream: TEST_HLS,
  },
  {
    name: "Dunyo Bo‘ylab",
    slug: "dunyo-boylab",
    stream: TEST_HLS,
  },
  {
    name: "FTV",
    slug: "ftv",
    stream: TEST_HLS,
  },
  {
    name: "Bolajon TV",
    slug: "bolajon-tv",
    stream: TEST_HLS,
  },
  {
    name: "Navo",
    slug: "navo",
    stream: TEST_HLS,
  },
  {
    name: "Mahalla TV",
    slug: "mahalla-tv",
    stream: TEST_HLS,
  },
  {
    name: "SPORT TV UZ",
    slug: "sport-tv-uz",
    stream: TEST_HLS,
  },
  {
    name: "O'zbekiston tarixi",
    slug: "ozbekiston-tarixi",
    stream: TEST_HLS,
  },
  {
    name: "Kinoteatr",
    slug: "kinoteatr",
    stream: TEST_HLS,
  },
  {
    name: "UZ REPORT TV",
    slug: "uzreport-tv",
    stream: TEST_HLS,
  },
  {
    name: "O‘zbekiston 24",
    slug: "uzbekiston-24",
    stream: TEST_HLS,
  },
  {
    name: "O‘zbekiston 1",
    slug: "uzbekiston-1",
    stream: TEST_HLS,
  },
  {
    name: "Yoshlar",
    slug: "yoshlar",
    stream: TEST_HLS,
  },
].map((tv) => ({
  ...tv,
  image: `${CDN_BASE}/${tv.slug}.webp`,
  live: true,
}));

export default tvChannels;
export default tvChannels;

