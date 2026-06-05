import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <Link href="/" className="text-xl font-bold text-blue-400">
        RevoShop
      </Link>
      <div className="flex gap-6">
        <Link href="/" className="hover:text-blue-400 transition">
          Home
        </Link>
        <Link href="/promotion" className="hover:text-blue-400 transition">
          Promotion
        </Link>
        <Link href="/faq" className="hover:text-blue-400 transition">
          FAQ
        </Link>
      </div>
    </nav>
  );
}
