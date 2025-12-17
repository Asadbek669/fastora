
import tvChannels from "../../tv/tvConfig";
import { notFound } from "next/navigation";
import LiveExternalPlayer from "@/components/LiveExternalPlayer";
import Link from "next/link";

export default function LiveChannelPage({ params }) {
  const { slug } = await params;

  const tv = tvChannels.find((c) => c.slug === slug);
  if (!tv) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* 🔙 Orqaga qaytish */}
        <nav className="mb-8">
          <Link
            href="/tv"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 group"
          >
            <div className="p-2 bg-gray-800/50 rounded-lg group-hover:bg-gray-700/50 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            <span className="text-sm font-medium">
              Telekanallar ro‘yxatiga qaytish
            </span>
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <img
                    src={tv.image}
                    alt={tv.name}
                    className="w-48 h-48 rounded-xl object-cover shadow-2xl border-4 border-gray-800"
                  />
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    LIVE
                  </div>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-center mb-2">
                {tv.name}
              </h1>

              <div className="flex items-center justify-center gap-2 text-sm mb-6">
                <span className="text-green-400">Jonli efir</span>
                <span className="text-gray-500">•</span>
                <span className="text-amber-400">Test rejimi</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs text-center">
                <span className="bg-gray-800 rounded px-2 py-1">1080p</span>
                <span className="bg-gray-800 rounded px-2 py-1">Stereo</span>
                <span className="bg-gray-800 rounded px-2 py-1">HLS</span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-2">Jonli ko‘rish</h2>
            <p className="text-sm text-gray-400 mb-4">
              Real vaqt • {tv.name}
            </p>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black mb-6">
              <LiveExternalPlayer
                src={`/api/live/${tv.slug}.m3u8`}
              />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
