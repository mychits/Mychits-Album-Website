import { createContext, useState, useEffect } from "react";
import React from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  
  // 1. Initialize state by checking if user was already logged in
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    return storedLogin === "true"; // Returns true or false
  });

  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    
    // 2. Save to LocalStorage so it persists after refresh
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    
    // 3. Remove from LocalStorage when logging out
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}