import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState("");

  const fetchProducts = () => {
    setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setError("Failed to load products");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch products");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setToast("Product deleted successfully");
        setTimeout(() => setToast(""), 3000);
      } else {
        setToast("Failed to delete product");
        setTimeout(() => setToast(""), 3000);
      }
    } catch {
      setToast("Failed to delete product");
      setTimeout(() => setToast(""), 3000);
    }
    setDeleteId(null);
    setDeleting(false);
  };

  const filtered = products.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 mt-1">Manage your products</p>
          </div>
          <Link
            id="admin-add-product-btn"
            href="/admin/create"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-600/25 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              id="admin-search-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed top-6 right-6 z-50 bg-gray-800 border border-gray-700 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-slide-in">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {toast}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">Delete Product</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-2.5 border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 rounded-xl transition font-medium"
                >
                  Cancel
                </button>
                <button
                  id="confirm-delete-btn"
                  onClick={() => handleDelete(deleteId)}
                  disabled={deleting}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl transition font-medium disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center gap-3 text-gray-400">
              <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Loading products...
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400">{error}</p>
            <button
              onClick={fetchProducts}
              className="mt-4 text-blue-400 hover:text-blue-300 transition underline"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-4">
              Showing {filtered.length} of {products.length} products
            </p>

            {/* Products Table */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-800/50 text-gray-400 text-sm font-medium">
                <div className="col-span-1">Image</div>
                <div className="col-span-4">Title</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-3 text-right">Actions</div>
              </div>

              {/* Rows */}
              {filtered.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No products found matching &quot;{search}&quot;
                </div>
              ) : (
                filtered.map((product) => (
                  <div
                    key={product.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 border-t border-gray-800 hover:bg-gray-800/30 transition items-center"
                  >
                    {/* Image */}
                    <div className="col-span-1">
                      <img
                        src={product.images?.[0]}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded-lg bg-gray-800"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/100x100?text=N/A";
                        }}
                      />
                    </div>

                    {/* Title */}
                    <div className="col-span-4">
                      <p className="text-white font-medium truncate">{product.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">ID: {product.id}</p>
                    </div>

                    {/* Category */}
                    <div className="col-span-2">
                      <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full">
                        {product.category?.name || "N/A"}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="col-span-2">
                      <p className="text-white font-semibold">${product.price}</p>
                    </div>

                    {/* Actions */}
                    <div className="col-span-3 flex justify-end gap-2">
                      <Link
                        href={`/admin/edit/${product.id}`}
                        className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 rounded-lg text-sm transition flex items-center gap-1.5"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </Link>
                      <button
                        onClick={() => setDeleteId(product.id)}
                        className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 hover:text-white hover:border-red-500 hover:bg-red-500/10 rounded-lg text-sm transition flex items-center gap-1.5"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
