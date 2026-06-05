import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products?limit=12")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
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
            <p className="text-gray-500 text-lg">Loading products...</p>
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
