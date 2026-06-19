import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminCreateProduct() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch categories for dropdown
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories?limit=10")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch(() => {});
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.price || Number(form.price) <= 0) newErrors.price = "Price must be a positive number";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.categoryId) newErrors.categoryId = "Category is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setApiError("");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          price: Number(form.price),
          description: form.description,
          categoryId: Number(form.categoryId),
          images: form.imageUrl ? [form.imageUrl] : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create product");
      }

      router.push("/admin");
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Back Link */}
        <Link href="/admin" className="text-blue-400 hover:text-blue-300 transition text-sm flex items-center gap-1 mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Product
          </h1>

          {apiError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label htmlFor="product-title" className="block text-sm font-medium text-gray-300 mb-2">
                Product Title *
              </label>
              <input
                id="product-title"
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter product title"
                className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition ${
                  errors.title
                    ? "border-red-500 focus:ring-red-500/50"
                    : "border-gray-700 focus:ring-blue-500/50 focus:border-blue-500"
                }`}
              />
              {errors.title && <p className="text-red-400 text-xs mt-1.5">{errors.title}</p>}
            </div>

            {/* Price & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="product-price" className="block text-sm font-medium text-gray-300 mb-2">
                  Price ($) *
                </label>
                <input
                  id="product-price"
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition ${
                    errors.price
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-gray-700 focus:ring-blue-500/50 focus:border-blue-500"
                  }`}
                />
                {errors.price && <p className="text-red-400 text-xs mt-1.5">{errors.price}</p>}
              </div>
              <div>
                <label htmlFor="product-category" className="block text-sm font-medium text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  id="product-category"
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white focus:outline-none focus:ring-2 transition ${
                    errors.categoryId
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-gray-700 focus:ring-blue-500/50 focus:border-blue-500"
                  }`}
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && <p className="text-red-400 text-xs mt-1.5">{errors.categoryId}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="product-description" className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                id="product-description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows={4}
                className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition resize-none ${
                  errors.description
                    ? "border-red-500 focus:ring-red-500/50"
                    : "border-gray-700 focus:ring-blue-500/50 focus:border-blue-500"
                }`}
              />
              {errors.description && <p className="text-red-400 text-xs mt-1.5">{errors.description}</p>}
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="product-image" className="block text-sm font-medium text-gray-300 mb-2">
                Image URL <span className="text-gray-500">(optional)</span>
              </label>
              <input
                id="product-image"
                type="url"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
              />
            </div>

            {/* Preview */}
            {form.imageUrl && (
              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-2">Image Preview</p>
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/400x300?text=Invalid+URL";
                  }}
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Link
                href="/admin"
                className="flex-1 py-3 border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 font-semibold rounded-xl text-center transition"
              >
                Cancel
              </Link>
              <button
                id="create-product-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
