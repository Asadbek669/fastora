export default function Card({ title, value, desc }) {
  return (
    <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-4xl font-bold mt-2">{value}</p>
      <p className="text-gray-500 mt-1 text-sm">{desc}</p>
    </div>
  );
}
