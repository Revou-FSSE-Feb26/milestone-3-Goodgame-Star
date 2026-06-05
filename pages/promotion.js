import Navbar from "@/components/Navbar";
import Link from "next/link";

const promotions = [
  {
    id: 1,
    title: "Flash Sale 50%",
    description:
      "Dapatkan diskon 50% untuk semua produk elektronik pilihan. Berlaku hingga akhir bulan!",
    badge: "HOT",
    color: "bg-red-500",
  },
  {
    id: 2,
    title: "Free Ongkir Se-Indonesia",
    description:
      "Gratis ongkos kirim untuk pembelian minimum Rp 200.000 ke seluruh wilayah Indonesia.",
    badge: "NEW",
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Cashback 10% Pakai GoPay",
    description:
      "Bayar dengan GoPay dan dapatkan cashback 10% untuk setiap transaksi. Maksimal cashback Rp 50.000.",
    badge: "LIMITED",
    color: "bg-yellow-500",
  },
];

export default function Promotion() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Header */}
      <div className="bg-red-600 text-white text-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-3">🔥 Promo Spesial</h1>
        <p className="text-lg text-red-100">
          Jangan lewatkan penawaran terbaik dari RevoShop!
        </p>
      </div>

      {/* Promo Cards */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <div className={`${promo.color} text-white text-center py-6`}>
                <span className="text-3xl font-bold">{promo.badge}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {promo.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {promo.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition"
          >
            Belanja Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
