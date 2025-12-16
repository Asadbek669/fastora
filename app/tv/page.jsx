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

      <div className="grid grid-cols-2 gap-4 px-4">
        {tvChannels.map((tv, index) => (
          <div
            key={index}
            className="
              rounded-xl overflow-hidden
              bg-[#111] shadow-lg
              active:scale-95 transition
            "
          >
            <img
              src="/tez-orada.jpg"
              alt={tv.name}
              className="w-full h-28 object-cover"
            />

            <div className="p-2 text-center text-sm truncate">
              {tv.name}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
