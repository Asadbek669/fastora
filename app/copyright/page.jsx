
"use client";

import { useState } from "react";

export const metadata = {
  title: "Mualliflik huquqi | Copyright | Авторское право — Fastora TV",
  description:
    "Fastora TV platformasining mualliflik huquqi siyosati (UZ / RU / EN)",
};

export default function CopyrightPage() {
  const [lang, setLang] = useState("uz");

  const btn = (code, label) => (
    <button
      onClick={() => setLang(code)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition
        ${
          lang === code
            ? "bg-blue-600 text-white shadow"
            : "bg-white/5 text-gray-300 hover:bg-white/10"
        }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white px-4 py-16">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
          Mualliflik huquqi / Copyright / Авторское право
        </h1>

        {/* LANGUAGE SWITCH */}
        <div className="flex justify-center gap-3 mb-12">
          {btn("uz", "O‘zbekcha")}
          {btn("ru", "Русский")}
          {btn("en", "English")}
        </div>

        {/* ================= UZ ================= */}
        {lang === "uz" && (
          <section className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <h2 className="text-xl font-semibold text-white">
              Mualliflik huquqi (Copyright) siyosati
            </h2>

            <p>
              Fastora TV platformasi O‘zbekiston Respublikasi va xalqaro
              mualliflik huquqi qonunlariga hurmat bilan qaraydi.
            </p>

            <p>
              Platformada namoyish etilayotgan barcha kontentlar (telekanallar,
              jonli translyatsiyalar, logotiplar, dizayn elementlari va matnlar)
              ularning tegishli huquq egalari tomonidan himoyalangan bo‘lishi
              mumkin.
            </p>

            <ul className="list-disc list-inside space-y-1">
              <li>kontentni o‘z serverlarida saqlamaydi;</li>
              <li>tashqi jonli efirlarni texnik vositachi sifatida namoyish etadi;</li>
              <li>jonli efirlarni yozib olmaydi va tarqatmaydi.</li>
            </ul>

            <p>
              Huquq buzilishi haqida murojaat qilish uchun:
            </p>

            <ol className="list-decimal list-inside space-y-1">
              <li>Huquq egasi nomi</li>
              <li>Kontent URL</li>
              <li>Huquqni tasdiqlovchi asos</li>
              <li>Aloqa email</li>
            </ol>

            <p className="text-blue-400 font-medium">
              📧 copyright@fastora.uz
            </p>
          </section>
        )}

        {/* ================= RU ================= */}
        {lang === "ru" && (
          <section className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <h2 className="text-xl font-semibold text-white">
              Политика авторского права
            </h2>

            <p>
              Платформа Fastora TV уважает законодательство Республики Узбекистан
              и международные нормы об авторском праве.
            </p>

            <p>
              Контент на платформе может быть защищён авторским правом
              соответствующих правообладателей.
            </p>

            <ul className="list-disc list-inside space-y-1">
              <li>не хранит контент;</li>
              <li>выступает как технический посредник;</li>
              <li>не записывает прямые эфиры.</li>
            </ul>

            <p>Для подачи жалобы:</p>

            <ol className="list-decimal list-inside space-y-1">
              <li>Имя правообладателя</li>
              <li>Ссылка на контент</li>
              <li>Подтверждение прав</li>
              <li>Email</li>
            </ol>

            <p className="text-blue-400 font-medium">
              📧 copyright@fastora.uz
            </p>
          </section>
        )}

        {/* ================= EN ================= */}
        {lang === "en" && (
          <section className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <h2 className="text-xl font-semibold text-white">
              Copyright Policy
            </h2>

            <p>
              Fastora TV respects international copyright laws and regulations.
            </p>

            <p>
              All content displayed on the platform may be protected by copyright
              and belongs to its respective owners.
            </p>

            <ul className="list-disc list-inside space-y-1">
              <li>does not store content;</li>
              <li>acts as a technical intermediary;</li>
              <li>does not record live streams.</li>
            </ul>

            <p>To submit a copyright notice:</p>

            <ol className="list-decimal list-inside space-y-1">
              <li>Owner name</li>
              <li>Content URL</li>
              <li>Proof of ownership</li>
              <li>Contact email</li>
            </ol>

            <p className="text-blue-400 font-medium">
              📧 copyright@fastora.uz
            </p>
          </section>
        )}

        {/* FOOTER */}
        <p className="mt-16 text-center text-xs text-gray-500">
          © 2025 Fastora TV Platformasi — All rights reserved
        </p>
      </div>
    </div>
  );
}
