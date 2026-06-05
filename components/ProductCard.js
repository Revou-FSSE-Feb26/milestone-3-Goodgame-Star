import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = "https://placehold.co/400x300?text=No+Image";
          }}
        />
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 text-lg truncate">
            {product.title}
          </h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
          <p className="text-blue-600 font-bold text-xl mt-3">
            ${product.price}
          </p>
        </div>
      </div>
    </Link>
  );
}
