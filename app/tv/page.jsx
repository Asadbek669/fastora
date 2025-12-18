import Link from "next/link";
import tvChannels from "./tvConfig";

export const metadata = {
  title: "Bepul Telekanallar — Fastora TV | Fastora",
  description:
    "Fastora orqali O‘zbekiston va xorijiy jonli telekanallarni onlayn tomosha qiling: Sevimli TV, MY5, Milliy TV, ZO‘R TV, O‘zbekiston 24 va boshqalar.",

  alternates: {
    canonical: "https://fastora.uz/tv",
  },

  openGraph: {
    title: "Bepul telekanallar — Fastora",
    description:
      "Barcha mashhur jonli telekanallarni Fastora platformasida bepul tomosha qiling.",
    url: "https://fastora.uz/tv",
    siteName: "Fastora",
    locale: "uz_UZ",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Jonli telekanallar — Fastora",
    description:
      "Bepul jonli efirdagi TV kanallar Fastora’da",
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default function TvPage() {
  return (
    <div>

      <h1 className="text-xl font-semibold px-4 pt-4 mb-4">
        Telekanallar
      </h1>

      <div
        className="
          grid gap-3 px-4
          [grid-template-columns:repeat(auto-fit,minmax(90px,1fr))]
        "
      >
        {tvChannels.map((tv, index) => (
          <Link
            key={index}
            href={`/live/${tv.slug}`}
            className="
              block
              rounded-xl overflow-hidden
              bg-[#111] shadow-md
              transition
              active:scale-95
            "
          >
            <img
              src={tv.image}
              alt={tv.name}
              className="w-full h-24 object-cover"
              loading="lazy"
            />

            <div className="py-1 text-center text-xs truncate">
              {tv.name}
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
