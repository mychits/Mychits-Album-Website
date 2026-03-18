import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import bgimage from "../assets/images/bgimage.png";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // save user in context
      login(res.data.user);

      // redirect to add product
      navigate("/add-product");

    } catch (err) {
      // ADD THESE LOGS TO INSPECT THE ERROR
      console.error("Login Error Details:", err);
      console.error("Response Data:", err.response?.data);

      // Update the alert to show more info
      const errorMessage = err.response?.data?.message 
                          || err.response?.data?.error 
                          || err.message 
                          || "Login failed";
      alert(errorMessage);
    }
  };

 return (
 <div
  className="relative h-screen w-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
  style={{ backgroundImage: `url(${bgimage})` }}
  >
    {/* Overlay (optional dark effect) */}
    <div className="absolute inset-0 bg-black/40"></div>

    {/* Login Card */}
    <form
      onSubmit={handleSubmit}
      className="relative z-10 backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-xl shadow-lg w-96 text-white"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 px-3 py-2 rounded bg-white/20 border border-white/30 placeholder-white text-white outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 px-3 py-2 rounded bg-white/20 border border-white/30 placeholder-white text-white outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-orange-400 text-white py-2 rounded-lg hover:opacity-90 transition"
      >
        Login
      </button>

      <div className="mt-4 text-center text-sm">
        <span className="text-gray-200">Don't have an account? </span>
        <span
          onClick={() => navigate("/register")}
          className="text-blue-300 font-bold cursor-pointer hover:underline"
        >
          Create a new account
        </span>
      </div>
    </form>
  </div>
);
}