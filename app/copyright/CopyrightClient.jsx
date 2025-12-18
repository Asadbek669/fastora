
"use client";

import { useState } from "react";

export default function CopyrightClient() {
  const [lang, setLang] = useState("uz");

  const btn = (code, label) => (
    <button
      onClick={() => setLang(code)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
        ${
          lang === code
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-white/5 text-gray-300 hover:bg-white/10"
        }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white px-4 py-16">
      <div className="max-w-4xl mx-auto">

        {/* TITLE */}
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
              Fastora TV platformasi (keyingi o‘rinlarda “Platforma”)
              O‘zbekiston Respublikasi hamda xalqaro mualliflik huquqi
              qonunlariga hurmat bilan qaraydi.
            </p>

            <p>
              Platformada namoyish etilayotgan barcha kontentlar (telekanallar,
              jonli translyatsiyalar, logotiplar, dizayn elementlari va matnlar)
              ularning tegishli huquq egalari tomonidan himoyalangan bo‘lishi
              mumkin.
            </p>

            <ul className="list-disc list-inside space-y-1">
              <li>kontentni o‘z serverlarida saqlamaydi;</li>
              <li>
                faqat ochiq yoki ruxsat etilgan tashqi manbalardan olingan
                jonli efirlarni texnik platforma (vositachi) sifatida
                namoyish etadi;
              </li>
              <li>jonli translyatsiyalarni yozib olmaydi va qayta tarqatmaydi.</li>
            </ul>

            <p>
              Agar siz mualliflik huquqi egasi bo‘lsangiz va Platformada sizga
              tegishli kontent huquqlaringiz buzilmoqda deb hisoblasangiz,
              quyidagi ma’lumotlar bilan murojaat qilishingiz mumkin:
            </p>

            <ol className="list-decimal list-inside space-y-1">
              <li>Huquq egasining to‘liq ismi yoki tashkilot nomi</li>
              <li>Huquq buzilgan deb hisoblanayotgan kontent havolasi (URL)</li>
              <li>Huquqni tasdiqlovchi hujjat yoki asos</li>
              <li>Aloqa uchun elektron pochta manzili</li>
            </ol>

            <p className="text-blue-400 font-medium">
              📧 Aloqa: copyright@fastora.uz
            </p>

            <p className="text-gray-400 text-xs">
              Asosli murojaatlar 24–72 soat ichida ko‘rib chiqiladi.
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
              Платформа Fastora TV (далее — «Платформа») уважает
              законодательство Республики Узбекистан и международные нормы
              об авторском праве.
            </p>

            <p>
              Весь контент, отображаемый на Платформе (телеканалы, прямые
              трансляции, логотипы, элементы дизайна и текстовые материалы),
              может быть защищён авторским правом соответствующих
              правообладателей.
            </p>

            <ul className="list-disc list-inside space-y-1">
              <li>не хранит контент на своих серверах;</li>
              <li>
                предоставляет доступ к трансляциям исключительно как
                технический посредник;
              </li>
              <li>не записывает и не распространяет прямые эфиры.</li>
            </ul>

            <p>
              Если вы являетесь правообладателем и считаете, что ваши права
              были нарушены, направьте уведомление, содержащее:
            </p>

            <ol className="list-decimal list-inside space-y-1">
              <li>Полное имя правообладателя или название организации</li>
              <li>Ссылку (URL) на спорный контент</li>
              <li>Документы, подтверждающие ваши права</li>
              <li>Контактный адрес электронной почты</li>
            </ol>

            <p className="text-blue-400 font-medium">
              📧 Контакт: copyright@fastora.uz
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
              Fastora TV platform respects the copyright laws of the Republic
              of Uzbekistan and applicable international copyright
              regulations.
            </p>

            <p>
              All content displayed on the Platform, including TV channels,
              live streams, logos, design elements, and textual materials,
              may be protected by copyright and belong to their respective
              rights holders.
            </p>

            <ul className="list-disc list-inside space-y-1">
              <li>does not store any media content on its servers;</li>
              <li>
                acts solely as a technical intermediary by providing access
                to external or publicly available live streams;
              </li>
              <li>does not record or redistribute live broadcasts.</li>
            </ul>

            <p>
              If you are a copyright owner and believe your rights have been
              infringed on the Platform, please submit a notice including:
            </p>

            <ol className="list-decimal list-inside space-y-1">
              <li>Full name of the copyright owner or organization</li>
              <li>URL of the allegedly infringing content</li>
              <li>Proof or justification of ownership</li>
              <li>Contact email address</li>
            </ol>

            <p className="text-blue-400 font-medium">
              📧 Contact: copyright@fastora.uz
            </p>
          </section>
        )}

        {/* FOOTER */}
        <p className="mt-16 text-center text-xs text-gray-500">
          © 2025 Fastora TV Platformasi — Barcha huquqlar himoyalangan
        </p>
      </div>
    </div>
  );
}
