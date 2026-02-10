import { useState, useContext } from "react";
import React from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

export default function AddChit() {
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    amount: "",
    months: ""  
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(form);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md p-6 mx-auto space-y-4">
      <h2 className="text-xl font-bold">Add MyChit Product</h2>

      <input
        name="name"
        placeholder="Chit Name"
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <input
        name="amount"
        placeholder="Chit Amount"
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <input
        name="months"
        placeholder="Duration (Months)"
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
        Save Chit
      </button>
    </form>
  );
}
