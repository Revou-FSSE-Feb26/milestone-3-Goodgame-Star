// Import komponen Navbar (dari folder components) untuk menu navigasi di atas
import Navbar from "@/components/Navbar";
// Import komponen ProductCard (dari folder components) untuk menampilkan kotak produk
import ProductCard from "@/components/ProductCard";
// Import hooks dari React untuk mengelola state dan efek samping
import { useEffect, useState } from "react";

export default function Home() {
  // state 'products' untuk menyimpan daftar produk yang didapat dari API
  const [products, setProducts] = useState([]);
  // state 'error' untuk menyimpan pesan error jika API gagal diakses
  const [error, setError] = useState("");
  // state 'loading' untuk menampilkan animasi loading saat menunggu data API
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    setLoading(true);
    setError("");
    fetch("https://api.escuelajs.co/api/v1/products?limit=12")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Gagal memuat produk. API mungkin sedang tidak stabil.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-blue-600 text-white text-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-3">Welcome to RevoShop</h1>
        <p className="text-lg text-blue-100">
          Temukan produk teknologi terbaik untuk kebutuhanmu
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Produk Tersedia
        </h2>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center gap-3 text-gray-500">
              <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Memuat produk...
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-gray-800 font-semibold text-lg">{error}</p>
            <p className="text-gray-500 mt-2 mb-6">Ini biasa terjadi pada API gratis untuk testing.</p>
            <button
              onClick={fetchProducts}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition"
            >
              Coba Lagi
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Tidak ada produk ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
