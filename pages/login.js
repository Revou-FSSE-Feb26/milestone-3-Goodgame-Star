// Import komponen Navbar
import Navbar from "@/components/Navbar";
// Import hook useAuth dari folder context untuk mengambil fungsi login
import { useAuth } from "@/context/AuthContext";
// Import hook useRouter dari Next.js untuk navigasi halaman (redirect)
import { useRouter } from "next/router";
// Import hook useState dari React
import { useState } from "react";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const redirect = router.query.redirect || "/";

  // state 'email' dan 'password' untuk menyimpan input form pengguna
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // state 'error' untuk menampilkan pesan jika login gagal
  const [error, setError] = useState("");
  // state 'isLoading' untuk mencegah klik berkali-kali saat proses API berjalan
  const [isLoading, setIsLoading] = useState(false);
  // state 'showPassword' untuk toggle hide/show password
  const [showPassword, setShowPassword] = useState(false);

  // Form validation state (mengecek apakah input sudah pernah disentuh/diklik)
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailError =
    touched.email && !email
      ? "Email is required"
      : touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? "Please enter a valid email"
      : "";

  const passwordError =
    touched.password && !password ? "Password is required" : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!email || !password || emailError || passwordError) return;

    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      router.push(redirect);
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 shadow-lg shadow-blue-500/25">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-gray-400 mt-2">Sign in to your RevoShop account</p>
          </div>

          {/* Login Form Card */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Email Field */}
              <div className="mb-5">
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  placeholder="john@mail.com"
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition ${
                    emailError
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-gray-700 focus:ring-blue-500/50 focus:border-blue-500"
                  }`}
                />
                {emailError && (
                  <p className="text-red-400 text-xs mt-1.5">{emailError}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3 pr-12 bg-gray-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition ${
                      passwordError
                        ? "border-red-500 focus:ring-red-500/50"
                        : "border-gray-700 focus:ring-blue-500/50 focus:border-blue-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-400 text-xs mt-1.5">{passwordError}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                id="login-submit-btn"
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <p className="text-blue-400 text-xs font-medium mb-1">Demo Credentials</p>
              <p className="text-gray-400 text-xs">
                Email: <code className="text-blue-300">john@mail.com</code>
              </p>
              <p className="text-gray-400 text-xs">
                Password: <code className="text-blue-300">changeme</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
