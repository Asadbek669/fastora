
import tvChannels from "./tvConfig";

export const metadata = {
  title: "Telekanallar | Fastora",
  description: "Fastora platformasidagi barcha jonli telekanallar",
};

export default function TvPage() {
  return (
    <div className="pb-24">

      <h1 className="text-xl font-semibold px-4 pt-4 mb-4">
        📺 Telekanallar
      </h1>

      <div
        className="
          grid gap-3 px-4
          [grid-template-columns:repeat(auto-fit,minmax(90px,1fr))]
        "
      >
        {tvChannels.map((tv, index) => (
          <div
            key={index}
            className="
              rounded-xl overflow-hidden
              bg-[#111] shadow-md
              transition
              active:scale-95
            "
          >
            <img
              src="/tvz.jpg"
              alt={tv.name}
              className="w-full h-24 object-cover"
            />

            <div className="py-1 text-center text-xs truncate">
              {tv.name}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
