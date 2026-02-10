import { useState } from "react"; // 1. ADD THIS IMPORT
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct";
import { AppContext } from "./context/AppContext"; // 2. ADD THIS IMPORT
import { AuthProvider } from "./context/AuthContext"; // Import it
import ChitsPage from "./pages/ChitsPage";
import Chitsgallery from "./pages/Chits";
import ChitCategoryPage from "./pages/ChitCategoryPage";
import ChitSmart from "./pages/chits/ChitSmart";
import ChitPro from "./pages/chits/ChitPro";
import ChitSaver from "./pages/chits/ChitSaver"

export default function App() {
  // State exists here
  const [products, setProducts] = useState([]);
  
  return (
    // 3. WRAP EVERYTHING IN THE PROVIDER
    // This allows 'AddProduct' (and any other child) to access 'products' and 'setProducts'
      <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-product" element={<AddProduct />} />
            <Route path="/chits" element={<ChitsPage />} />
           <Route path="/chits/:type" element={<ChitCategoryPage />} />
           <Route path="/chitgallery" element={<Chitsgallery />} />
           <Route path="/chits/chit-smart" element={<ChitSmart />} />
           <Route path="/chits/chit-pro" element={<ChitPro />} />
            <Route path="/chits/chit-saver" element={<ChitSaver />} />
         
        </Routes>
        
      </BrowserRouter>
    </AuthProvider>
  );
}