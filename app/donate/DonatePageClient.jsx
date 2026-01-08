"use client";

import { Phone, Send } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import DonateList from "@/components/DonateList";

export default function DonatePageClient() {
  const donations = [
    {
      name: "Anonim",
      amount: 5000,
      message: "Omad! Loyihangiz zo‘r 👏",
	  adminReply: "Biz sizning qo‘llab-quvvatlashingizni juda qadrlaymiz! ❤️✨"
    },
    {
      name: "Anonim",
      amount: 5000,
      message: "Avatar 2 sezon qachon chiqadi?",
	  adminReply: "Avatar 2 sezon tez orada, 2026 yilda premyera qilinadi! 🎬✨"
    },
    {
      name: "Feruza",
      amount: 7350,
      message: "Dramalarni ko‘proq chiqaringlar 😍❤️",
	  adminReply: "Albatta, yangi dramalar tez orada chiqadi! 😊"
    },
  ];

  const GOAL = 100000;
  const BANK_FEE = 0.05;

  // Har bir donate'dan 5% bank oladi → 95% foydalanuvchiga ko‘rinadi
  const netTotal = donations.reduce(
    (sum, d) => sum + d.amount * (1 - BANK_FEE),
    0
  );

  const cappedAmount = Math.min(netTotal, GOAL);
  const progress = Math.min((cappedAmount / GOAL) * 100, 100);

  return (
    <div className="pt-0 text-white px-2">

      {/* Sarlavha */}
      <PageHeader title="HOMIYLIK" />

      {/* Statistik iframe */}
      <iframe
        src="https://tirikchilik.uz/widgets/statistics/?token=0ca731d1154c41cb9c85680e28965c30"
        className="w-full mt-4 rounded-xl"
        style={{
          height: "400px",
          minHeight: "400px",
          maxHeight: "600px",
          border: "none",
          overflow: "auto",
        }}
      />

      {/* Progress bar */}
      <div className="mt-6 px-2">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Maqsad: 100 000 so‘m</span>
          <span>{Math.floor(progress)}%</span>
        </div>

        <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-2 text-center text-green-400 font-semibold">
          {Math.floor(netTotal).toLocaleString()} so‘m yig‘ildi
        </div>
      </div>

      {/* DONATE tugmasi */}
      <a
        href="https://tirikchilik.uz/kino_olami"
        target="_blank"
        rel="noopener noreferrer"
        className="
          mt-6 block w-full text-center py-3 rounded-xl 
          bg-gradient-to-r from-rose-500 to-orange-500
          font-semibold text-white text-lg
          active:scale-95
        "
      >
        DONATE
      </a>

      {/* Donate list */}
      <DonateList donations={donations} />

	  
      {/* Izoh */}
      <p className="mt-6 text-center text-gray-400 leading-relaxed px-2">
        Sizning qo‘llab–quvvatlashingiz loyihamizni rivojlantirishga katta
        yordam beradi. Har bir hissa — biz uchun juda muhim!
      </p>
	  
      {/* Aloqa tugmalari: telefon + telegram, Lucide icons bilan */}
      <div className="mt-3 flex gap-2">
		{/* Telefon */}
		<a
		  href="tel:+998200205505"
		  className="
			flex-1 flex items-center justify-center gap-2
			py-3 rounded-xl
			bg-gradient-to-r from-green-400 to-green-600
			hover:from-green-500 hover:to-green-700
			text-white font-medium
			active:scale-95 transition-all
		  "
		>
		  <Phone size={20} />
		  Telefon
		</a>

		{/* Telegram */}
		<a
		  href="https://t.me/fastora_admin"
		  target="_blank"
		  rel="noopener noreferrer"
		  className="
			flex-1 flex items-center justify-center gap-2
			py-3 rounded-xl
			bg-gradient-to-r from-blue-400 to-blue-600
			hover:from-blue-500 hover:to-blue-700
			text-white font-medium
			active:scale-95 transition-all
		  "
		>
		  <Send size={20} />
		  Telegram
		</a>
      </div>

    </div>
  );
}
