"use client";

import DonateMessages from "@/components/DonateMessages";
import PageHeader from "@/components/PageHeader";

export default function DonatePageClient() {
  const messages = [
    "Аноним 5000: Omad -- Rahmat Anonim",
    "Аноним 5000: Avatar 2 sezon qachon chiqadi? -- Netflix 2026 boshida deb aytgan",
    "Feruza 7350: Dramalani ko‘proq chiqaringlar 😍❤️ -- Albatta 😊",
    "⭐ Loyihani qo‘llab-quvvatlaganlarga rahmat! ❤️",
  ];

  return (
    <div className="pt-6 text-white">

      {/* Avtomatik aylanadigan xabarlar paneli */}
      <DonateMessages messages={messages} />

      {/* Sarlavha */}
      <PageHeader title="HOMIYLIK" />

      {/* Statistik vidjet */}
      <iframe
        src="https://tirikchilik.uz/widgets/statistics/?token=0ca731d1154c41cb9c85680e28965c30"
        className="w-full"
        style={{ height: "220px", border: "none" }}
      ></iframe>

      {/* DONATE tugmasi */}
      <a
        href="https://tirikchilik.uz/kino_olami"
        target="_blank"
        className="
          mt-6 block w-full text-center py-3 rounded-xl 
          bg-gradient-to-r from-rose-500 to-orange-500
          font-semibold text-white text-lg active:scale-95
        "
      >
        DONATE
      </a>

      {/* Kontakt */}
      <div className="mt-5 text-center text-gray-300">
        <p className="text-sm">Bog‘lanish uchun telefon</p>
        <p className="text-lg font-semibold text-yellow-400">
          +998 20 020 55 05
        </p>
      </div>

      {/* Izoh */}
      <p className="mt-6 text-center text-gray-400 leading-relaxed px-2">
        Sizning qo‘llab–quvvatlashingiz loyihamizni rivojlantirishga katta
        yordam beradi. Har bir hissa — biz uchun juda muhim!
      </p>
    </div>
  );
}
