// import ChitSmartCards from "../../components/ChitCards";
// import ChitSmartCards from "../data/chitSmartPlans";
import ChitSmartCards from "../../components/ChitSmartCards";
import Footer from "../../components/Footer";

import React from "react";

export default function ChitSmart() {
  return (
    <section className="bg-gradient-to-b from-sky-50 to-white min-h-screen ">
      {/* HEADER */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-sky-700">Chit Smart</h1>
        <p className="text-gray-600 mt-2">
          Smart savings plans designed for your financial goals
        </p>
      </div>

      {/* PLANS */}
      <ChitSmartCards />
      <Footer />
    </section>
  );
}
