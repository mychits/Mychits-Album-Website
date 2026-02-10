import React from "react";

const chitData = [
  { id: 1, type: "chit-smart", value: "1 Lakh", daily: 100 },
  { id: 2, type: "chit-smart", value: "2 Lakh", daily: 200 },
  { id: 3, type: "chit-pro", value: "5 Lakh", daily: 500 },
  { id: 4, type: "chit-saver", value: "3 Lakh", daily: 300 },
];

export default function ChitCards({ filter }) {
  const filtered = filter
    ? chitData.filter((c) => c.type === filter)
    : chitData;

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
      {filtered.map((chit) => (
        <div
          key={chit.id}
          className="bg-white rounded-xl shadow-md p-6 text-center"
        >
          <h3 className="font-bold text-lg mb-2">
            {chit.value}
          </h3>
          <p className="text-gray-600 mb-4">
            ₹ {chit.daily} / Daily
          </p>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">
            Enroll Now
          </button>
        </div>
      ))}
    </div>
  );
}
