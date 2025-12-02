export default function Topbar({ onMenuToggle }) {
  return (
    <div className="w-full bg-[#0f0f0f] p-4 border-b border-gray-800 flex items-center justify-between">

      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden px-3 py-2 bg-white/10 rounded text-white"
        onClick={onMenuToggle}
      >
        ☰
      </button>

      <h2 className="text-xl font-semibold">Admin Panel</h2>

      <button className="px-4 py-2 bg-red-600 rounded text-white">
        Logout
      </button>

    </div>
  );
}
