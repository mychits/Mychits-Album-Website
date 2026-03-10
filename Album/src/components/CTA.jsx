import { Link } from "react-router-dom";
import React from "react";
import { ArrowRight, Sparkles } from "lucide-react"; // Added icons

export default function CTA() {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-slate-900">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500 to-blue-600 opacity-10 blur-[100px] rounded-full -z-0"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Glass Card Container */}
        <div className="bg-white backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-16 text-center shadow-2xl">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
            <Sparkles size={16} />
            <span>Your Financial Journey Starts Here</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to Explore the 
            <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Complete Collection?
            </span>
          </h2>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Dive into our curated gallery of Chit Schemes, Promotional Posters, and Digital Brochures. Find the perfect plan for your future.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/chitgallery"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold
              bg-gradient-to-r from-blue-600 to-cyan-500 text-white
              shadow-lg shadow-cyan-500/20 
              hover:shadow-cyan-500/40 transition-all duration-300"
            >
              Browse Gallery
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/#contact"
              className="px-8 py-4 rounded-xl font-semibold
              bg-white/10 border border-white/20
              hover:bg-white/20 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}