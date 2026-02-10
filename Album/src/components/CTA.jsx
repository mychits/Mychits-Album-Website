import { Link } from "react-router-dom";
import React from "react";

export default function CTA() {
  return (
    <section className="py-20 bg-blue-300 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-orange-400 mb-6">
          Ready to Start Saving?
        </h2>

        <p className="text-black text-xl mb-8 font-semibold">
          Join thousands of smart customers who trust MyChits for their
          financial growth.
        </p>

        <Link
          to="/chits"
          className="inline-block bg-white text-orange-500 font-bold px-10 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-transform hover:scale-105"
        >
          Browse Available Schemes
        </Link>
      </div>
    </section>
  );
}
