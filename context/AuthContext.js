import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate session on mount using internal proxy (token never leaves the server)
  useEffect(() => {
    const savedToken = localStorage.getItem("revoshop_token");
    if (savedToken) {
      fetch("/api/auth/profile", {
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
          localStorage.removeItem("revoshop_token");
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

    // API route sets httpOnly cookie and returns { access_token, user }
    const { access_token, user: profileData } = data;

    localStorage.setItem("revoshop_token", access_token);
    setToken(access_token);
    setUser(profileData);

    return profileData;
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("revoshop_token");
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
