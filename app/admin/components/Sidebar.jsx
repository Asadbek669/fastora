import Link from "next/link";

export default function Sidebar({ onLinkClick }) {
  return (
    <div className="w-60 bg-[#0d0d0d] h-full p-6 overflow-y-auto">

      <h1 className="text-2xl font-bold mb-8">Fastora Admin</h1>

      <nav className="space-y-4 text-gray-300">

        <Link href="/admin" onClick={onLinkClick} className="block p-2 hover:bg-[#1b1b1b] rounded">
          Dashboard
        </Link>

        <Link href="/admin/movies/add" onClick={onLinkClick} className="block p-2 hover:bg-[#1b1b1b] rounded">
          Add Movie
        </Link>

        <Link href="/admin/series/add" onClick={onLinkClick} className="block p-2 hover:bg-[#1b1b1b] rounded">
          Add Series
        </Link>

        <Link href="/admin/series/manage" onClick={onLinkClick} className="block p-2 hover:bg-[#1b1b1b] rounded">
          Serial boshqaruvi
        </Link>

        <Link href="/admin/comments" onClick={onLinkClick} className="block p-2 hover:bg-[#1b1b1b] rounded">
          Kommentlar
        </Link>

        <Link href="/admin/heroes" onClick={onLinkClick} className="block p-2 hover:bg-[#1b1b1b] rounded">
          Hero Slider
        </Link>

        {/* 🔥 Yangi Story qo'shish bo‘limi */}
        <Link href="/admin/stories/add" onClick={onLinkClick} className="block p-2 hover:bg-[#1b1b1b] rounded">
          Add Story
        </Link>

        <Link href="/admin/settings" onClick={onLinkClick} className="block p-2 hover:bg-[#1b1b1b] rounded">
          Settings
        </Link>

      </nav>
    </div>
  );
}
