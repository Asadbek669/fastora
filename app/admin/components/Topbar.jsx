export default function Topbar() {
  return (
    <div className="w-full bg-[#0f0f0f] p-4 border-b border-gray-800 flex items-center justify-between">

      <h2 className="text-xl font-semibold">Admin Panel</h2>

      <button className="px-4 py-2 bg-red-600 rounded text-white">
        Logout
      </button>

    </div>
  );
}
