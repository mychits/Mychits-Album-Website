import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700"
        >
          Login
        </button>

        {/* NEWLY ADDED SECTION */}
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          {/* We use a span that looks like a link to trigger navigation */}
          <span
            onClick={() => navigate("/register")} 
            className="text-sky-600 font-bold cursor-pointer hover:underline"
          >
            Create a new account
          </span>
        </div>

      </form>
    </div>
  );
}