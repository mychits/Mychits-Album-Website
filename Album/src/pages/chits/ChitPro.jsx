// import ChitSmartCards from "../../components/ChitCards";
// import ChitSmartCards from "../data/chitSmartPlans";
import ChitProCards from "../../components/ChitProCards";

import React from "react";

export default function ChitPro() {
  return (
    <section className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
      {/* HEADER */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-sky-700">Chit Pro</h1>
        <p className="text-gray-600 mt-2">
          Smart savings plans designed for your financial goals
        </p>
      </div>

      {/* PLANS */}
      <ChitProCards />
    </section>
  );
}
