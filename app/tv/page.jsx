
import tvChannels from "./tvConfig";

export const metadata = {
  title: "Telekanallar | Fastora",
  description: "Fastora platformasidagi barcha jonli telekanallar",
};

export default function TvPage() {
  return (
    <div className="pb-24">

      {/* SAHIFA SARLAVHASI */}
      <h1 className="text-xl font-semibold px-4 pt-4 mb-4">
        📺 Telekanallar
      </h1>

      {/* TELEKANALLAR GRID */}
      <div
        className="
          grid gap-4 px-4
          [grid-template-columns:repeat(auto-fit,minmax(110px,1fr))]
        "
      >
        {tvChannels.map((tv, index) => (
          <div
            key={index}
            className="
              rounded-xl overflow-hidden
              bg-[#111] shadow-lg
              transition
              active:scale-95
              hover:scale-[1.02]
            "
          >
            {/* RASM */}
            <img
              src="/tv.jpg"
              alt={tv.name}
              className="w-full h-28 object-cover"
            />

            {/* NOMI */}
            <div className="p-2 text-center text-sm truncate">
              {tv.name}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
