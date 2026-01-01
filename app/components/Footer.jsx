import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-2 py-1 text-center">
      <p className="text-xs text-gray-500 leading-tight">
        © 2025 Fastora TV Platformasi —{" "}
        <Link
          href="/copyright"
          className="text-blue-400 hover:text-blue-300"
        >
          Mualliflik huquqi
        </Link>
      </p>

      <p className="text-xs text-gray-500 leading-tight mt-[2px]">
        Biz bilan aloqa:{" "}
        <a
          href="https://t.me/fastora_admin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300"
        >
          TELEGRAM
        </a>
      </p>
    </footer>
  );
}
