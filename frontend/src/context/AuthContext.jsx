import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "undefined" || storedUser === "null") {
      if (storedUser === "undefined" || storedUser === "null") {
        localStorage.removeItem("user");
      }
      setLoading(false);
      return;
    }
    try {
      const parsed = JSON.parse(storedUser);
      if (parsed) setUser(parsed);
    } catch (e) {
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ custom hook for consuming AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
