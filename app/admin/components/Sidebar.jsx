import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-60 bg-[#0d0d0d] h-screen p-6 border-r border-gray-800">

      <h1 className="text-2xl font-bold mb-8">Fastora Admin</h1>

      <nav className="space-y-4 text-gray-300">

        <Link href="/admin" className="block p-2 hover:bg-[#1b1b1b] rounded">
          Dashboard
        </Link>

        <Link href="/admin/movies/add" className="block p-2 hover:bg-[#1b1b1b] rounded">
          Add Movie
        </Link>

        <Link href="/admin/series/add" className="block p-2 hover:bg-[#1b1b1b] rounded">
          Add Series
        </Link>

		<Link
		  href="/admin/series/manage"
		  className="block px-4 py-2 rounded hover:bg-white/10"
		>
		  Serial boshqaruvi
		</Link>

		<Link
		  href="/admin/comments"
		  className="block px-4 py-2 hover:bg-white/10 rounded"
		>
		  Kommentlar
		</Link>

        <Link href="/admin/settings" className="block p-2 hover:bg-[#1b1b1b] rounded">
          Settings
        </Link>

      </nav>
    </div>
  );
}
