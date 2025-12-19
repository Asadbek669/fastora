
import tvChannels from "../../tv/tvConfig";
import { notFound } from "next/navigation";
import ClientPlayer from "./ClientPlayer";
import Link from "next/link";



const BASE_URL = "https://www.fastora.uz";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const tv = tvChannels.find((c) => c.slug === slug);

  if (!tv) {
    return {
      title: "Telekanal topilmadi | Fastora",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${tv.name} — Jonli efir | Fastora`,
    description: `${tv.name} telekanalini Fastora platformasida jonli efirda bepul tomosha qiling.`,

    alternates: {
      canonical: `${BASE_URL}/live/${tv.slug}`,
    },

    openGraph: {
      title: `${tv.name} — Jonli efir`,
      description: `${tv.name} telekanalini Fastora orqali jonli tomosha qiling.`,
      url: `${BASE_URL}/live/${tv.slug}`,
      siteName: "Fastora",
      locale: "uz_UZ",
      type: "video.other",
      images: [
        {
          url: tv.image,
          width: 1200,
          height: 630,
          alt: `${tv.name} jonli efir`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${tv.name} — Jonli efir`,
      description: `${tv.name} telekanalini jonli tomosha qiling`,
      images: [tv.image],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}


export default async function LiveChannelPage({ params }) {
  const { slug } = await params;

  const tv = tvChannels.find((c) => c.slug === slug);

  if (!tv) {
    notFound();
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-900 to-black px-4 pt-6 text-white relative overflow-hidden">
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/5 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* 🔙 Orqaga tugmasi - yangi dizayn */}
        <div className="mb-8">
          <a
            href="/tv"
            className="inline-flex items-center gap-3 group"
          >
            <div className="
              w-10 h-10
              rounded-xl
              bg-white/5
              border border-white/10
              flex items-center justify-center
              group-hover:bg-white/10
              group-hover:border-white/20
              transition-all duration-300
              group-hover:scale-105
            ">
              <svg 
                className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                Telekanallarga qaytish
              </div>
              <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                Barcha kanallar ro'yxati
              </div>
            </div>
          </a>
        </div>

        {/* Asosiy kontent */}
        <div className="
          max-w-4xl mx-auto
          bg-gradient-to-br from-gray-900/60 to-black/60
          backdrop-blur-sm
          rounded-3xl
          border border-white/10
          shadow-2xl shadow-blue-900/20
          overflow-hidden
          p-8
        ">
          
          {/* TV LOGO va ismi */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
            {/* Logo container */}
            <div className="relative">
              <div className="
                relative
                w-48 h-48
                rounded-2xl
                bg-gradient-to-br from-gray-800 to-black
                shadow-2xl
                border-2 border-white/20
                overflow-hidden
                group
              ">
                <img
                  src={tv.image}
                  alt={tv.name}
                  className="
                    w-full h-full
                    object-cover
                    group-hover:scale-105
                    transition-transform duration-500
                  "
                />
                
                {/* Overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
            </div>

            {/* TV ma'lumotlari */}
            <div className="flex-1 text-center md:text-left">
              <div className="mb-4">
                <h1 className="
                  text-3xl md:text-4xl font-bold
                  bg-gradient-to-r from-white via-gray-200 to-gray-400
                  bg-clip-text text-transparent
                  mb-2
                ">
                  {tv.name}
                </h1>
                <p className="text-gray-400 text-sm">
                  O'zbekistonning yetakchi telekanallaridan biri
                </p>
              </div>

              {/* Live status */}
              <div className="inline-flex flex-wrap items-center gap-4">
                <div className="
                  inline-flex items-center gap-2
                  px-5 py-2.5
                  bg-gradient-to-r from-red-600/90 to-red-700/90
                  backdrop-blur-sm
                  rounded-full
                  shadow-lg
                  border border-red-500/30
                ">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                  <span className="text-sm font-semibold text-white">JONLI EFIR</span>
                </div>
                
                <div className="
                  inline-flex items-center gap-2
                  px-4 py-2
                  bg-gradient-to-r from-emerald-500/20 to-green-500/20
                  backdrop-blur-sm
                  rounded-full
                  border border-emerald-500/30
                ">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-sm font-medium text-emerald-400">
                    Test rejimida
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="
                    w-12 h-12
                    rounded-xl
                    bg-gradient-to-br from-blue-900/30 to-blue-500/20
                    border border-blue-500/20
                    flex items-center justify-center
                  ">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">HD</div>
                    <div className="text-xs text-gray-400">1080p Sifat</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="
                    w-12 h-12
                    rounded-xl
                    bg-gradient-to-br from-purple-900/30 to-purple-500/20
                    border border-purple-500/20
                    flex items-center justify-center
                  ">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-xs text-gray-400">Dastur</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Player section */}
          <div className="
            bg-gradient-to-br from-gray-900 to-black
            rounded-2xl
            border border-white/10
            shadow-2xl
            overflow-hidden
            p-1
            mb-8
          ">
            {/* Player header */}
            <div className="
              px-6 py-3
              bg-gradient-to-r from-gray-800/50 to-gray-900/50
              border-b border-white/10
              flex items-center justify-between
            ">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-300">Jonli translyatsiya</span>
              </div>
              <div className="text-xs text-gray-500">
                Real vaqt rejimi
              </div>
            </div>
            
            {/* 🎬 LIVE PLAYER - O'zgarmagan */}
            <div className="relative">
              <ClientPlayer slug={tv.slug} />         
            </div>
          </div>

          {/* Footer info */}
          <div className="
            text-center
            px-4 py-3
            bg-gradient-to-r from-gray-900/30 to-black/30
            rounded-xl
            border border-white/5
          ">
            <p className="text-sm text-gray-400">
              Jonli efir sifatini yaxshilash uchun yuqori tezlikdagi internet ulanishini tavsiya etamiz
            </p>
          </div>
        </div>
      </div>

      {/* Dekorativ elementlar */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
}


