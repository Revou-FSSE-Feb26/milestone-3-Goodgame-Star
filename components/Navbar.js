import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Navbar() {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const { cartCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-lg border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          RevoShop
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-blue-400 transition text-sm">
            Home
          </Link>
          <Link href="/promotion" className="hover:text-blue-400 transition text-sm">
            Promotion
          </Link>
          <Link href="/faq" className="hover:text-blue-400 transition text-sm">
            FAQ
          </Link>

          {isAuthenticated && (
            <Link href="/admin" className="hover:text-blue-400 transition text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Admin
            </Link>
          )}

          {/* Cart */}
          <Link href="/cart" id="nav-cart-btn" className="relative hover:text-blue-400 transition p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg shadow-blue-500/50">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {!loading && (
            <>
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">
                    Hi, <span className="text-blue-400 font-medium">{user?.name?.split(" ")[0]}</span>
                  </span>
                  <button
                    id="nav-logout-btn"
                    onClick={logout}
                    className="px-4 py-1.5 text-sm border border-gray-700 hover:border-red-500 hover:text-red-400 rounded-lg transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  id="nav-login-btn"
                  href="/login"
                  className="px-5 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg transition shadow-lg shadow-blue-600/25 font-medium"
                >
                  Login
                </Link>
              )}
            </>
          )}
        </div>

        {/* Mobile: Cart + Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <Link href="/cart" className="relative hover:text-blue-400 transition p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-300 hover:text-white transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gray-800 space-y-3">
          <Link href="/" onClick={() => setMobileOpen(false)} className="block hover:text-blue-400 transition py-1">
            Home
          </Link>
          <Link href="/promotion" onClick={() => setMobileOpen(false)} className="block hover:text-blue-400 transition py-1">
            Promotion
          </Link>
          <Link href="/faq" onClick={() => setMobileOpen(false)} className="block hover:text-blue-400 transition py-1">
            FAQ
          </Link>
          {isAuthenticated && (
            <Link href="/admin" onClick={() => setMobileOpen(false)} className="block hover:text-blue-400 transition py-1">
              Admin Dashboard
            </Link>
          )}
          <hr className="border-gray-800" />
          {!loading && (
            <>
              {isAuthenticated ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Hi, <span className="text-blue-400 font-medium">{user?.name?.split(" ")[0]}</span>
                  </span>
                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="px-4 py-1.5 text-sm border border-gray-700 hover:border-red-500 hover:text-red-400 rounded-lg transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg font-medium"
                >
                  Login
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
}
