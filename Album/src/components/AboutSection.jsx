import { CheckCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <section id="aboutsection" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          {/* <span className="text-emerald-600 font-bold uppercase text-sm tracking-wider">
            Who We Are
          </span> */}
          <h2 className="text-4xl font-bold text-slate-900 mt-2">
            About MyChits
          </h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <p className="text-lg text-slate-600 leading-relaxed">
              <strong>Vijaya Vinayak Chitfunds Private Limited</strong> is committed
              to revolutionizing the way people save and borrow money. We believe
              financial growth should be built on trust, transparency, and long-term value.
            </p>

            <p className="text-lg text-slate-600 leading-relaxed">
              Our platform offers a seamless and secure way to manage chit groups,
              track payments, and access records anytime. No hidden charges, no
              confusing terms — just simple, honest financial solutions.
            </p>

            {/* Points */}
            <ul className="space-y-4 mt-6">
              <li className="flex items-center gap-3">
                <CheckCircle className="text-emerald-500" size={22} />
                <span className="text-slate-800 font-medium">
                  Government Registered & Compliant
                </span>
              </li>

              <li className="flex items-center gap-3">
                <CheckCircle className="text-emerald-500" size={22} />
                <span className="text-slate-800 font-medium">
                  100% Digital Record Keeping
                </span>
              </li>

              <li className="flex items-center gap-3">
                <CheckCircle className="text-emerald-500" size={22} />
                <span className="text-slate-800 font-medium">
                  Customer-First Approach
                </span>
              </li>
            </ul>

            {/* Optional CTA */}
            <div className="pt-6">
              <Link
                to="/chits"
                className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition"
              >
                Explore Chit Plans
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE / PLACEHOLDER */}
          <div className="bg-slate-100 rounded-2xl overflow-hidden shadow-xl h-[400px] flex items-center justify-center">
            <span className="text-slate-400 font-semibold text-lg">
              Company Office Image Here
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
