
// HeroSlider.jsx
import HeroSliderClient from "./HeroSliderClient";

export const revalidate = 3000; // 1 kun

async function getHeroes() {
  const res = await fetch("https://fastora.uz/api/heroes", { next: { revalidate: 300 } });
  return res.json();
}

export default async function HeroSlider() {
  const items = await getHeroes();
  if (!items?.length) return null;

  return (
    <div className="relative w-full aspect-[16/9] md:h-[500px] rounded-xl overflow-hidden">
      <HeroSliderClient items={items} />
    </div>
  );
}
