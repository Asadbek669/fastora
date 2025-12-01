"use client";

export default function DonatePage() {
  return (
    <div className="p-4 pt-6 text-white">
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
