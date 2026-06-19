// Import dari React untuk membuat Context dan hooks
import { createContext, useContext, useState, useEffect, useCallback } from "react";

// Membuat context kosong untuk authentication
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // state 'user' untuk menyimpan data profil pengguna yang login
  const [user, setUser] = useState(null);
  // state 'token' untuk menyimpan JWT access token
  const [token, setToken] = useState(null);
  // state 'loading' untuk mengecek status saat pertama kali aplikasi dimuat
  const [loading, setLoading] = useState(true);

  // Fungsi pembantu untuk mengatur cookie (digunakan oleh middleware Next.js)
  const setCookie = (name, value, days = 7) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  };

  // Fungsi pembantu untuk menghapus cookie saat logout
  const removeCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  };

  // Mengecek apakah ada token tersimpan saat aplikasi pertama kali dibuka
  useEffect(() => {
    const savedToken = localStorage.getItem("revoshop_token");
    if (savedToken) {
      fetch("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Invalid token");
          return res.json();
        })
        .then((profileData) => {
          setUser(profileData);
          setToken(savedToken);
        })
        .catch(() => {
          // Token expired or invalid
          localStorage.removeItem("revoshop_token");
          removeCookie("revoshop_token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    const { access_token } = data;

    // Fetch user profile
    const profileRes = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!profileRes.ok) {
      throw new Error("Failed to fetch profile");
    }

    const profileData = await profileRes.json();

    // Persist
    localStorage.setItem("revoshop_token", access_token);
    setCookie("revoshop_token", access_token);
    setToken(access_token);
    setUser(profileData);

    return profileData;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("revoshop_token");
    removeCookie("revoshop_token");
    setToken(null);
    setUser(null);
  }, []);

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
