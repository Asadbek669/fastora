const CDN_BASE = "https://cdn.fastora.uz/tv";
const TEST_HLS = "https://fl.biztv.media/biz_tv_720_uni8jhub4h8fub4idejswh8dh3j94finbu4nidj39inwsj92in3d/tracks-v1a1/mono.m3u8";

const tvChannels = [
  {
    name: "BIZ TV",
    slug: "biz-tv",
    stream: TEST_HLS, // ✅ TEST LIVE
  },
  { name: "Setanta 1", slug: "setanta-1" },
  { name: "Россия 1", slug: "rossiya-1" },
  { name: "Россия 24", slug: "rossiya-24" },
  { name: "Первый канал", slug: "perviy-kanal" },
  { name: "Muloqot TV", slug: "muloqot-tv" },
  { name: "Istiqlol TV", slug: "istiqlol-tv" },
  { name: "ZO‘R TV", slug: "zor-tv" },
  { name: "Renessans TV", slug: "renessans-tv" },
  { name: "Futbol TV", slug: "futbol-tv" },
  { name: "Gold TV", slug: "gold-tv" },
  { name: "NTV", slug: "ntv" },
  { name: "Sevimli TV", slug: "sevimli-tv" },
  { name: "MY5", slug: "my5" },
  { name: "Milliy TV", slug: "milliy-tv" },
  { name: "Dasturxon TV", slug: "dasturxon-tv" },
  { name: "MYDAY TV", slug: "myday-tv" },
  { name: "Madaniyat va Ma'rifat", slug: "madaniyat-marifat" },
  { name: "Toshkent TV", slug: "toshkent-tv" },
  { name: "Dunyo Bo‘ylab", slug: "dunyo-boylab" },
  { name: "FTV", slug: "ftv" },
  { name: "Bolajon TV", slug: "bolajon-tv" },
  { name: "Navo", slug: "navo" },
  { name: "Mahalla TV", slug: "mahalla-tv" },
  { name: "SPORT TV UZ", slug: "sport-tv-uz" },
  { name: "O'zbekiston tarixi", slug: "ozbekiston-tarixi" },
  { name: "Kinoteatr", slug: "kinoteatr" },
  { name: "UZ REPORT TV", slug: "uzreport-tv" },
  { name: "O‘zbekiston 24", slug: "uzbekiston-24" },
  { name: "O‘zbekiston 1", slug: "uzbekiston-1" },
  { name: "Yoshlar", slug: "yoshlar" },
].map((tv) => ({
  ...tv,
  image: `${CDN_BASE}/${tv.slug}.webp`,
  live: true,
}));

export default tvChannels;

