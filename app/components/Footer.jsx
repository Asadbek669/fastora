import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 py-6 text-center">
      <p className="text-xs text-gray-500">
        © 2025 Fastora TV Platformasi —{" "}
        <Link
          href="/copyright"
          className="text-blue-400 hover:text-blue-300 transition"
        >
          Mualliflik huquqi
        </Link>
      </p>
    </footer>
  );
}
