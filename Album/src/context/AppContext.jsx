// context/AppContext.js
import { createContext, useContext, useState } from "react";
import React from "react";

// Create the context
export const AppContext = createContext();

// Optional: Create a custom provider hook (optional, but good practice)
export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  return (
    <AppContext.Provider value={{ products, setProducts }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;