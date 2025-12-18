"use client";

import { useState } from "react";
import { Globe, Mail, Shield, Clock, Copyright as CopyrightIcon } from "lucide-react";

export default function CopyrightClient() {
  const [lang, setLang] = useState("uz");

  const languages = [
    { code: "uz", label: "O'zbekcha", flag: "🇺🇿" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "en", label: "English", flag: "🇺🇸" },
  ];

  const content = {
    uz: {
      title: "Mualliflik huquqi (Copyright) siyosati",
      intro: "Fastora TV platformasi (keyingi o'rinlarda 'Platforma') O'zbekiston Respublikasi hamda xalqaro mualliflik huquqi qonunlariga hurmat bilan qaraydi.",
      contentProtection: "Platformada namoyish etilayotgan barcha kontentlar (telekanallar, jonli translyatsiyalar, logotiplar, dizayn elementlari va matnlar) ularning tegishli huquq egalari tomonidan himoyalangan bo'lishi mumkin.",
      platformDoes: [
        "kontentni o'z serverlarida saqlamaydi;",
        "faqat ochiq yoki ruxsat etilgan tashqi manbalardan olingan jonli efirlarni texnik platforma (vositachi) sifatida namoyish etadi;",
        "jonli translyatsiyalarni yozib olmaydi va qayta tarqatmaydi."
      ],
      claimTitle: "Da'vo qilish tartibi",
      claimDescription: "Agar siz mualliflik huquqi egasi bo'lsangiz va Platformada sizga tegishli kontent huquqlaringiz buzilmoqda deb hisoblasangiz, quyidagi ma'lumotlar bilan murojaat qilishingiz mumkin:",
      requirements: [
        "Huquq egasining to'liq ismi yoki tashkilot nomi",
        "Huquq buzilgan deb hisoblanayotgan kontent havolasi (URL)",
        "Huquqni tasdiqlovchi hujjat yoki asos",
        "Aloqa uchun elektron pochta manzili"
      ],
      contact: "copyright@fastora.uz",
      responseTime: "Asosli murojaatlar 24–72 soat ichida ko'rib chiqiladi."
    },
    ru: {
      title: "Политика авторского права",
      intro: "Платформа Fastora TV (далее — «Платформа») уважает законодательство Республики Узбекистан и международные нормы об авторском праве.",
      contentProtection: "Весь контент, отображаемый на Платформе (телеканалы, прямые трансляции, логотипы, элементы дизайна и текстовые материалы), может быть защищён авторским правом соответствующих правообладателей.",
      platformDoes: [
        "не хранит контент на своих серверах;",
        "предоставляет доступ к трансляциям исключительно как технический посредник;",
        "не записывает и не распространяет прямые эфиры."
      ],
      claimTitle: "Процедура подачи претензии",
      claimDescription: "Если вы являетесь правообладателем и считаете, что ваши права были нарушены, направьте уведомление, содержащее:",
      requirements: [
        "Полное имя правообладателя или название организации",
        "Ссылку (URL) на спорный контент",
        "Документы, подтверждающие ваши права",
        "Контактный адрес электронной почты"
      ],
      contact: "copyright@fastora.uz",
      responseTime: "Обоснованные обращения рассматриваются в течение 24–72 часов."
    },
    en: {
      title: "Copyright Policy",
      intro: "Fastora TV platform respects the copyright laws of the Republic of Uzbekistan and applicable international copyright regulations.",
      contentProtection: "All content displayed on the Platform, including TV channels, live streams, logos, design elements, and textual materials, may be protected by copyright and belong to their respective rights holders.",
      platformDoes: [
        "does not store any media content on its servers;",
        "acts solely as a technical intermediary by providing access to external or publicly available live streams;",
        "does not record or redistribute live broadcasts."
      ],
      claimTitle: "Claim Procedure",
      claimDescription: "If you are a copyright owner and believe your rights have been infringed on the Platform, please submit a notice including:",
      requirements: [
        "Full name of the copyright owner or organization",
        "URL of the allegedly infringing content",
        "Proof or justification of ownership",
        "Contact email address"
      ],
      contact: "copyright@fastora.uz",
      responseTime: "Valid claims will be reviewed within 24–72 hours."
    }
  };

  const current = content[lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/30">
              <CopyrightIcon className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Mualliflik huquqi / Copyright / Авторское право
          </h1>
          
          <p className="text-gray-400 max-w-2xl mx-auto">
            {lang === "uz" 
              ? "Intellektual mulk huquqlarini himoya qilish va qonuniy talablarga rioya qilish" 
              : lang === "ru" 
                ? "Защита интеллектуальной собственности и соблюдение законодательных требований"
                : "Protection of intellectual property rights and compliance with legal requirements"}
          </p>
        </div>

        {/* Language Switcher */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => setLang(language.code)}
              className={`
                flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300
                ${lang === language.code
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700"
                }
              `}
            >
              <span className="text-lg">{language.flag}</span>
              <span>{language.label}</span>
              {lang === language.code && (
                <Globe className="w-4 h-4" />
              )}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Card - Policy */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-900/30">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">{current.title}</h2>
              </div>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">{current.intro}</p>
                
                <p className="leading-relaxed">{current.contentProtection}</p>
                
                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    {lang === "uz" 
                      ? "Platforma quyidagilarni qilmaydi:" 
                      : lang === "ru" 
                        ? "Платформа не осуществляет:" 
                        : "The Platform does not:"}
                  </h3>
                  <ul className="space-y-3">
                    {current.platformDoes.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Claim Procedure Card */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6">{current.claimTitle}</h2>
              
              <p className="text-gray-300 mb-8 leading-relaxed">{current.claimDescription}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {current.requirements.map((req, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-900/30 rounded-xl p-6 border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold">
                        {index + 1}
                      </div>
                      <h3 className="font-medium text-white">
                        {lang === "uz" 
                          ? "Talab qilinadigan ma'lumot" 
                          : lang === "ru" 
                            ? "Требуемая информация" 
                            : "Required Information"}
                      </h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{req}</p>
                  </div>
                ))}
              </div>
              
              {/* Contact Info */}
              <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-800/30">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-900/30">
                      <Mail className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {lang === "uz" 
                          ? "Elektron pochta orqali bog'lanish" 
                          : lang === "ru" 
                            ? "Связаться по электронной почте" 
                            : "Contact via Email"}
                      </h3>
                      <a
					    href={`mailto:${current.contact}`}
					    className="text-blue-400 text-lg font-medium mt-1 hover:underline"
					  >
					    {current.contact}
					  </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{current.responseTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Important Notes */}
          <div className="space-y-8">
            <div className="bg-gradient-to-b from-blue-900/20 to-blue-900/5 rounded-2xl p-8 border border-blue-800/30">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-900/30">
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
                {lang === "uz" 
                  ? "Muhim eslatmalar" 
                  : lang === "ru" 
                    ? "Важные примечания" 
                    : "Important Notes"}
              </h3>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-gray-300 text-sm">
                    {lang === "uz" 
                      ? "Barcha da'volar qonuniy asoslar asosida ko'rib chiqiladi" 
                      : lang === "ru" 
                        ? "Все претензии рассматриваются на законных основаниях" 
                        : "All claims are reviewed based on legal grounds"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">⚠</span>
                  <span className="text-gray-300 text-sm">
                    {lang === "uz" 
                      ? "Noto'g'ri da'volar rad etiladi" 
                      : lang === "ru" 
                        ? "Ложные претензии отклоняются" 
                        : "False claims will be rejected"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">ℹ</span>
                  <span className="text-gray-300 text-sm">
                    {lang === "uz" 
                      ? "Qo'shimcha ma'lumot uchun huquqiy bo'lim bilan bog'laning" 
                      : lang === "ru" 
                        ? "Свяжитесь с юридическим отделом для дополнительной информации" 
                        : "Contact legal department for additional information"}
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-b from-purple-900/20 to-purple-900/5 rounded-2xl p-8 border border-purple-800/30">
              <h3 className="text-xl font-bold text-white mb-6">
                {lang === "uz" 
                  ? "Qonuniy asoslar" 
                  : lang === "ru" 
                    ? "Правовые основы" 
                    : "Legal Framework"}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-700/50">
                  <span className="text-gray-400 text-sm">
                    {lang === "uz" 
                      ? "O'zbekiston Respublikasi qonunlari" 
                      : lang === "ru" 
                        ? "Законы Республики Узбекистан" 
                        : "Laws of Uzbekistan"}
                  </span>
                  <span className="text-green-400 text-sm">✅</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-700/50">
                  <span className="text-gray-400 text-sm">
                    {lang === "uz" 
                      ? "Xalqaro mualliflik huquqi" 
                      : lang === "ru" 
                        ? "Международное авторское право" 
                        : "International Copyright"}
                  </span>
                  <span className="text-green-400 text-sm">✅</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-400 text-sm">
                    {lang === "uz" 
                      ? "DMCA qoidalari" 
                      : lang === "ru" 
                        ? "Правила DMCA" 
                        : "DMCA Regulations"}
                  </span>
                  <span className="text-green-400 text-sm">✅</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-4">
              © 2025 Fastora TV Platformasi — {lang === "uz" 
                ? "Barcha huquqlar himoyalangan" 
                : lang === "ru" 
                  ? "Все права защищены" 
                  : "All rights reserved"}
            </p>
            <p className="text-gray-600 text-xs">
              {lang === "uz" 
                ? "Platforma O'zbekiston Respublikasi qonunlari va xalqaro shartnomalarga muvofiq ishlaydi" 
                : lang === "ru" 
                  ? "Платформа работает в соответствии с законами Республики Узбекистан и международными соглашениями" 
                  : "The platform operates in accordance with the laws of Uzbekistan and international agreements"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
