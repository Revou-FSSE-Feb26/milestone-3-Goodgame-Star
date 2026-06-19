import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-24 px-4">
          <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">Looks like you haven&apos;t added anything yet.</p>
          <Link
            href="/"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-600/25"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-white mb-8">
          Shopping Cart
          <span className="text-lg font-normal text-gray-400 ml-3">
            ({cartCount} {cartCount === 1 ? "item" : "items"})
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex gap-4 items-center hover:border-gray-700 transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-xl bg-gray-800"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/400x300?text=No+Image";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{item.title}</h3>
                  <p className="text-blue-400 font-bold text-lg mt-1">${item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    id={`qty-decrease-${item.id}`}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-sm font-bold"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-white font-semibold text-sm">
                    {item.quantity}
                  </span>
                  <button
                    id={`qty-increase-${item.id}`}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white transition flex items-center justify-center text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <p className="text-white font-bold w-20 text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                {/* Remove */}
                <button
                  id={`remove-item-${item.id}`}
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-500 hover:text-red-400 transition p-2"
                  title="Remove item"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sticky top-6">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="text-white font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-400 font-semibold">Free</span>
                </div>
                <hr className="border-gray-800" />
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span className="text-blue-400">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link
                id="proceed-checkout-btn"
                href="/checkout"
                className="block w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-center transition shadow-lg shadow-blue-600/25"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/"
                className="block w-full py-3 mt-3 border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 font-semibold rounded-xl text-center transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
