
import tvChannels from "../../tv/tvConfig";
import { notFound } from "next/navigation";
import LiveExternalPlayer from "@/components/LiveExternalPlayer";
import { ArrowLeft, LiveIcon, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LiveChannelPage({ params }) {
  const { slug } = await params;

  const tv = tvChannels.find((c) => c.slug === slug);

  if (!tv) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* 🔙 Orqaga qaytish tugmasi */}
        <nav className="mb-8">
          <a
            href="/tv"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 group"
          >
            <div className="p-2 bg-gray-800/50 rounded-lg group-hover:bg-gray-700/50 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Telekanallar ro'yxatiga qaytish</span>
          </a>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chap ustun - Channel info */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              {/* Logo kartasi */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <img
                        src={tv.image}
                        alt={tv.name}
                        className="w-48 h-48 rounded-xl object-cover shadow-2xl border-4 border-gray-800"
                      />
                      <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
                        <LiveIcon className="w-3 h-3" />
                        LIVE
                      </div>
                    </div>
                  </div>

                  {/* Channel ma'lumotlari */}
                  <h1 className="text-2xl font-bold text-center mb-2">{tv.name}</h1>
                  
                  {/* Status */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-400">Jonli efir</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-amber-400">Test rejimida</span>
                  </div>

                  {/* Ogohlantirish */}
                  <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-300">
                          Bu test rejimida ishlayotgan xizmat. Sifat yoki uzilishlar bo'lishi mumkin.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Qo'shimcha ma'lumotlar (agar mavjud bo'lsa) */}
                  {tv.category && (
                    <div className="mt-4 flex items-center justify-center">
                      <span className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
                        {tv.category}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* O'ng ustun - Video pleer */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Pleer ustidagi sarlavha */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Jonli ko'rish</h2>
                  <p className="text-sm text-gray-400">Real vaqt rejimida</p>
                </div>
                <div className="hidden sm:block">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span>Yorqinlik</span>
                    </div>
                    <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-gradient-to-r from-red-500 to-orange-500"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pleer konteyneri */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                <LiveExternalPlayer src={tv.stream} />
                
                {/* Pleer pastidagi dekorativ chiziq */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
              </div>

              {/* Qo'shimcha kontrol elementlari */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-gray-900/50 rounded-xl p-4 text-center border border-gray-800">
                  <div className="text-xs text-gray-400 mb-1">Holati</div>
                  <div className="text-sm font-medium text-green-400">Faol</div>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 text-center border border-gray-800">
                  <div className="text-xs text-gray-400 mb-1">Sifat</div>
                  <div className="text-sm font-medium text-blue-400">HD</div>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 text-center border border-gray-800">
                  <div className="text-xs text-gray-400 mb-1">Kechikish</div>
                  <div className="text-sm font-medium text-gray-300">±10s</div>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 text-center border border-gray-800">
                  <div className="text-xs text-gray-400 mb-1">Format</div>
                  <div className="text-sm font-medium text-gray-300">HLS</div>
                </div>
              </div>

              {/* Yo'riqnoma */}
              <div className="mt-8 p-6 bg-gray-900/30 rounded-2xl border border-gray-800">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Televizorni butun ekranga chiqarish
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>Kompyuterdan foydalanganda <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">F</kbd> tugmasini bosing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>Telefondan foydalanganda ekran aylantirish tugmasidan foydalaning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>Ovozni boshqarish uchun pastki chap burchakdagi ovoz tugmasidan foydalaning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
