
import tvChannels from "../../tv/tvConfig";
import { notFound } from "next/navigation";
import LiveExternalPlayer from "@/components/LiveExternalPlayer";
import Script from "next/script";

export const dynamic = "force-dynamic";

export default async function LiveChannelPage({ params }) {
  const { slug } = await params;

  const tv = tvChannels.find((c) => c.slug === slug);

  if (!tv) {
    notFound();
  }

  return (
    <>
      {/* PlayerJS scriptini yuklash */}
      <Script
        src="https://cdn.jsdelivr.net/npm/playerjs@latest/dist/player.min.js"
        strategy="beforeInteractive"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {/* 🔙 Orqaga qaytish tugmasi */}
          <nav className="mb-8">
            <a
              href="/tv"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 group"
            >
              <div className="p-2 bg-gray-800/50 rounded-lg group-hover:bg-gray-700/50 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
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
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          </svg>
                          LIVE
                        </div>
                      </div>
                    </div>

                    {/* Channel ma'lumotlari */}
                    <h1 className="text-2xl font-bold text-center mb-2">{tv.name}</h1>
                    
                    {/* Status paneli */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-green-400">Jonli efir</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-amber-400">Test rejimida</span>
                      </div>
                      
                      <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                        <span className="px-2 py-1 bg-gray-800 rounded">1080p</span>
                        <span className="px-2 py-1 bg-gray-800 rounded">Stereo</span>
                        <span className="px-2 py-1 bg-gray-800 rounded">60 FPS</span>
                      </div>
                    </div>

                    {/* Streaming ma'lumotlari */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400 mb-2">Streaming ma'lumotlari</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Format:</span>
                            <span className="text-blue-400">HLS</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Kechikish:</span>
                            <span className="text-green-400">~3s</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Bitrate:</span>
                            <span className="text-purple-400">4.5 Mbps</span>
                          </div>
                        </div>
                      </div>

                      {/* Ogohlantirish */}
                      <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.686 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          <div>
                            <p className="text-sm text-gray-300">
                              Bu test rejimida ishlayotgan xizmat. Uzoq vaqt tomosha qilish tavsiya etilmaydi.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* O'ng ustun - Video pleer */}
            <div className="lg:col-span-2">
              <div className="relative">
                {/* Pleer ustidagi sarlavha va kontrollerlar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                  <div>
                    <h2 className="text-xl font-bold">Jonli ko'rish</h2>
                    <p className="text-sm text-gray-400">Real vaqt rejimida • {tv.name}</p>
                  </div>
                  
                  {/* Pleer kontrollerlari */}
                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-gray-300">Signal</span>
                      </div>
                      <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-gradient-to-r from-red-500 to-green-500"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition">
                        Butun ekran
                      </button>
                    </div>
                  </div>
                </div>

                {/* 🎬 LIVE PLAYER KOMPONENTI */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black mb-6">
                  <LiveExternalPlayer src={tv.stream} />
                  
                  {/* Pleer pastidagi progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75"></div>
                </div>

                {/* Tez konfiguratsiya tugmalari */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">Tez sozlash</h3>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition">
                      Sifat: Avto
                    </button>
                    <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition">
                      Tezlik: 1x
                    </button>
                    <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition">
                      Audio: Stereo
                    </button>
                    <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition">
                      Subtil: Yo'q
                    </button>
                  </div>
                </div>

                {/* Statistikalar paneli */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 hover:border-blue-500/50 transition">
                    <div className="text-xs text-gray-400 mb-1">Buffer</div>
                    <div className="text-lg font-semibold text-green-400">98%</div>
                    <div className="w-full h-1 bg-gray-700 mt-2 rounded-full overflow-hidden">
                      <div className="w-11/12 h-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 hover:border-blue-500/50 transition">
                    <div className="text-xs text-gray-400 mb-1">CPU</div>
                    <div className="text-lg font-semibold text-blue-400">24%</div>
                    <div className="w-full h-1 bg-gray-700 mt-2 rounded-full overflow-hidden">
                      <div className="w-1/4 h-full bg-blue-500"></div>
                    </div>
                  </div>
                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 hover:border-blue-500/50 transition">
                    <div className="text-xs text-gray-400 mb-1">Kechikish</div>
                    <div className="text-lg font-semibold text-amber-400">2.8s</div>
                    <div className="text-xs text-gray-500 mt-1">Real vaqt</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 hover:border-blue-500/50 transition">
                    <div className="text-xs text-gray-400 mb-1">Bitrate</div>
                    <div className="text-lg font-semibold text-purple-400">4.5M</div>
                    <div className="text-xs text-gray-500 mt-1">Mbps</div>
                  </div>
                </div>

                {/* Yo'riqnoma va foydali maslahatlar */}
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-gray-900/50 to-gray-900/30 rounded-2xl border border-gray-800">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Tomosha qilish bo'yicha maslahatlar
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold">1</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-200">Internet tezligi</p>
                            <p className="text-xs text-gray-400">Kamida 5 Mbps tavsiya etiladi</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold">2</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-200">Brauzer</p>
                            <p className="text-xs text-gray-400">Chrome, Firefox yoki Edge foydalaning</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold">3</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-200">Cache tozalash</p>
                            <p className="text-xs text-gray-400">Muammo bo'lsa, cache tozalang</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold">4</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-200">Qayta yuklash</p>
                            <p className="text-xs text-gray-400">Uzilish bo'lsa, sahifani yangilang</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Klaviatura qisqartmalari */}
                  <div className="p-5 bg-gray-900/30 rounded-xl border border-gray-800">
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">Klaviatura boshqaruvi</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="text-center">
                        <kbd className="inline-block px-2 py-1 bg-gray-800 rounded text-xs mb-1">F</kbd>
                        <p className="text-xs text-gray-400">Butun ekran</p>
                      </div>
                      <div className="text-center">
                        <kbd className="inline-block px-2 py-1 bg-gray-800 rounded text-xs mb-1">Space</kbd>
                        <p className="text-xs text-gray-400">Play/Pause</p>
                      </div>
                      <div className="text-center">
                        <kbd className="inline-block px-2 py-1 bg-gray-800 rounded text-xs mb-1">M</kbd>
                        <p className="text-xs text-gray-400">Ovozni o'chirish</p>
                      </div>
                      <div className="text-center">
                        <kbd className="inline-block px-2 py-1 bg-gray-800 rounded text-xs mb-1">← →</kbd>
                        <p className="text-xs text-gray-400">Ovoz boshqaruvi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
                    }
