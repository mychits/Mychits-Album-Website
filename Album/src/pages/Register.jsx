import api from "../api/axios";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom"; 
import registred from "../assets/images/registred.jpg";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); // 2. Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/register", {
        email,
        password,
      });

      alert("User registered successfully!");
      
      // 3. Redirect to Login page
      navigate("/login"); 

      // Clear inputs (optional, but good practice if user goes back)
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
return (
  <div
    className="relative h-screen w-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
    style={{ backgroundImage: `url(${registred})` }}
  >
    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/40"></div>

    {/* Register Card */}
    <form
      onSubmit={handleSubmit}
      className="relative z-10 backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-xl shadow-lg w-96 text-white"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

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
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-500 to-orange-400 text-white py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register"}
      </button>

      {/* Login Redirect */}
      <div className="mt-4 text-center text-sm">
        <span className="text-gray-200">Already have an account? </span>
        <span
          onClick={() => navigate("/login")}
          className="text-blue-300 font-bold cursor-pointer hover:underline"
        >
          Login
        </span>
      </div>
    </form>
  </div>
);
}