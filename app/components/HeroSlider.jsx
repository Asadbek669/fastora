
// HeroSlider.jsx
import HeroSliderClient from "./HeroSliderClient";

export const revalidate = 86400; // 1 kun

async function getHeroes() {
  const res = await fetch("https://fastora.uz/api/heroes", { next: { revalidate: 300 } });
  return res.json();
}

export default async function HeroSlider() {
  const items = await getHeroes();
  if (!items?.length) return null;

  const first = items[0];

  return (
    <div className="relative w-full aspect-[16/9] md:h-[500px] rounded-xl overflow-hidden">
      {/* 🔥 LCP rasm */}
      <img
        src={first.backdrop_url}
        alt={first.title}
        className="w-full h-full object-cover rounded-xl"
        loading="lazy"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Title */}
      <div className="absolute left-4 bottom-4 md:left-8 md:bottom-8 z-10 max-w-xl">
        <h2 className="text-xl md:text-3xl font-semibold text-white leading-tight line-clamp-2">
          {first.title}
        </h2>
        {first.subtitle && (
          <p className="text-sm md:text-base text-white/75 mt-1 line-clamp-2">
            {first.subtitle}
          </p>
        )}
      </div>

      {/* Client slider */}
      <HeroSliderClient items={items} />
    </div>
  );
}
