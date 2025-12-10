"use client";

import { useEffect, useState } from "react";

export const metadata = {
  title: "Homiylik — Loyihani qo‘llab-quvvatlash | Fastora",
  description:
    "Fastora loyihasini rivojlantirishga hissa qo‘shing. Sizning qo‘llab-quvvatlashingiz biz uchun juda muhim!",
  openGraph: {
    title: "Fastora — Homiylik sahifasi",
    description:
      "Fastora loyihasini rivojlantirishga hissa qo‘shing. Sizning qo‘llab-quvvatlashingiz biz uchun juda muhim!",
    url: "https://fastora.uz/donate",
    images: [
      {
        url: "https://cdn.fastora.uz/donate.jpg", // bir rasm qo‘yish shart
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://cdn.fastora.uz/donate.jpg"],
  },
};


export default function DonatePage() {
  // 👉 Xabarlarni qo‘lda shu yerga kiritasiz
  const messages = [
    "Аноним 5000: Omad -- Rahmat Anonim",
    "Аноним 5000: Avatar 2 sezonni qachon quyasila -- Netflix 2026 yil boshida premyera bolishini aytyapti",
    "Feruza 7350: Dramalani kopro chiqazila 😍❤️ -- Hop boladi😀🌹",
    "⭐ Loyihani rivojlanishiga hissa qoshganilar uchun rahmat sizlarni qadrlaymiz ❤️❤️❤️",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 pt-6 text-white">

      {/* 🔥 Pastki avtomatik xabar paneli */}
	  {messages.length > 0 && (
	    <div
		  className="
		    fixed bottom-14 left-1/2 -translate-x-1/2 z-40
		    px-4 py-2 rounded-xl text-white
		    bg-[#000000bb] backdrop-blur-md shadow-lg
		    text-sm select-none transition-all duration-500
		  "
	    >
		  {messages[index]}
	    </div>
	  )}

      <h1 className="text-xl font-semibold mb-4">Homiylik</h1>

      {/* Tirikchilik statistikasi */}
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

      {/* Telefon raqam */}
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

