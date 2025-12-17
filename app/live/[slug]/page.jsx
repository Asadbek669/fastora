
import tvChannels from "../../tv/tvConfig";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LiveChannelPage({ params }) {
  const { slug } = await params;

  const tv = tvChannels.find((c) => c.slug === slug);

  if (!tv) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pb-24 px-4 pt-6 text-white">
      
      {/* 🔙 Orqaga tugmasi - chiroyli versiya */}
      <div className="max-w-6xl mx-auto">
        <a
          href="/tv"
          className="
            inline-flex items-center gap-2 mb-8
            px-4 py-2.5
            rounded-xl
            bg-white/5
            hover:bg-white/10
            backdrop-blur-sm
            border border-white/10
            text-gray-300 hover:text-white
            transition-all duration-300
            hover:shadow-lg hover:shadow-blue-500/10
            group
          "
        >
          <svg 
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm font-medium">Telekanallarga qaytish</span>
        </a>

        {/* Kontent konteyneri */}
        <div className="
          max-w-4xl mx-auto
          bg-gradient-to-br from-gray-900/50 to-black/50
          backdrop-blur-sm
          rounded-3xl
          border border-white/10
          shadow-2xl shadow-blue-900/10
          overflow-hidden
        ">
          
          {/* 🖼️ KATTA TV LOGO - Markazlashtirilgan */}
          <div className="relative flex justify-center p-8 pb-6">
            <div className="relative">
              <img
                src={tv.image}
                alt={tv.name}
                className="
                  w-full max-w-[280px]
                  rounded-2xl
                  bg-gradient-to-br from-gray-800 to-black
                  shadow-2xl
                  object-cover
                  border-2 border-white/20
                  transition-transform duration-500
                  hover:scale-105
                "
              />
              {/* Gradient glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 rounded-3xl blur-xl -z-10"></div>
            </div>
          </div>

          {/* 📺 TV NOMI va Ma'lumotlar */}
          <div className="text-center px-6 pb-8">
            <div className="mb-3">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {tv.name}
              </h1>
            </div>

            {/* 🔴 LIVE status badge */}
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-red-600 to-red-700 rounded-full shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-sm font-semibold text-white">LIVE</span>
              </div>
              
              <div className="h-4 w-px bg-white/20"></div>
              
              <div className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full">
                <p className="text-xs text-green-400 font-medium">
                  ● Jonli efir — test rejimida
                </p>
              </div>
            </div>

            {/* 🎬 PLAYER PLACEHOLDER - Chiroyli loader */}
            <div className="
              relative
              mx-6 mb-8
              aspect-video
              rounded-2xl
              overflow-hidden
              bg-gradient-to-br from-gray-900 to-black
              border border-white/10
              shadow-inner shadow-black/50
              group
            ">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
              
              {/* Player content */}
              <div className="
                absolute inset-0
                flex flex-col items-center justify-center
                p-6
              ">
                <div className="relative mb-6">
                  {/* Outer ring */}
                  <div className="
                    w-20 h-20
                    rounded-full
                    border-4 border-transparent
                    border-t-blue-500 border-r-blue-500
                    animate-spin
                  "></div>
                  
                  {/* Inner circle */}
                  <div className="
                    absolute inset-0
                    flex items-center justify-center
                  ">
                    <div className="
                      w-12 h-12
                      rounded-full
                      bg-gradient-to-br from-blue-600 to-blue-800
                      flex items-center justify-center
                      shadow-lg
                    ">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-200 mb-2">
                    Player tez orada qo'shiladi
                  </h3>
                  <p className="text-sm text-gray-400 max-w-md">
                    Hozirda bu kanal uchun player sozlanmoqda. Tez orada jonli efirdan bahramand bo'lasiz
                  </p>
                </div>
                
                {/* Loading dots */}
                <div className="flex gap-1.5 mt-6">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>

              {/* Glass effect overlay */}
              <div className="
                absolute inset-0
                bg-gradient-to-t from-black/30 via-transparent to-transparent
                pointer-events-none
              "></div>
            </div>

            {/* Additional info section */}
            <div className="
              mx-6
              p-4
              rounded-xl
              bg-gradient-to-r from-gray-900/50 to-black/50
              border border-white/5
              backdrop-blur-sm
            ">
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Real vaqtda</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Premium sifat</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>HD 1080p</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
