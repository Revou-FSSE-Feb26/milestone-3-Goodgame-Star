import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  const fetchProduct = () => {
    if (!id) return;
    setLoading(true);
    setError("");
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Gagal memuat produk. API mungkin sedang tidak stabil.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="text-center py-20">
          <div className="inline-flex items-center gap-3 text-gray-500">
            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading product...
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200 max-w-lg mx-auto mt-10">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-red-500 text-lg font-semibold">{error || "Produk tidak ditemukan."}</p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={fetchProduct}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              Coba Lagi
            </button>
            <Link href="/" className="text-blue-600 hover:underline px-6 py-2 border border-blue-600 rounded-lg transition">
              Kembali ke Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Back Button */}
        <Link href="/" className="text-blue-600 hover:underline mb-6 block">
          ← Kembali ke Home
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden md:flex">
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="w-full h-80 object-cover"
              onError={(e) => {
                e.target.src = "https://placehold.co/400x300?text=No+Image";
              }}
            />
          </div>

          {/* Info */}
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                {product.category?.name}
              </span>
              <h1 className="text-2xl font-bold text-gray-800 mt-3">
                {product.title}
              </h1>
              <p className="text-gray-500 mt-3 leading-relaxed">
                {product.description}
              </p>
              <p className="text-3xl font-bold text-blue-600 mt-5">
                ${product.price}
              </p>
            </div>

            {/* Add to Cart */}
            <div className="mt-6">
              {added && (
                <div className="flex items-center gap-2 text-green-600 text-sm mb-3 bg-green-50 px-3 py-2 rounded-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {product.title} added to cart!
                </div>
              )}
              <button
                id="product-add-to-cart-btn"
                onClick={handleAddToCart}
                className={`w-full font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                  added
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {added ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
