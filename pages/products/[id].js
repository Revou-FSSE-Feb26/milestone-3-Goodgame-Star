import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    setCartMessage(`✅ ${product.title} berhasil ditambahkan ke keranjang!`);
    setTimeout(() => setCartMessage(""), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="text-center py-20">
          <p className="text-red-500 text-lg">Produk tidak ditemukan.</p>
          <Link href="/" className="text-blue-600 underline mt-4 block">
            Kembali ke Home
          </Link>
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
              src={product.images[0]}
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
              {cartMessage && (
                <p className="text-green-600 text-sm mb-3">{cartMessage}</p>
              )}
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
