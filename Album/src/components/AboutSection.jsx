import { CheckCircle, Shield, Users, TrendingUp, Smartphone, Landmark, Award } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <section id="aboutsection" className="relative py-24 px-6 bg-slate-900 text-white overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full filter blur-[150px] opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-[150px] opacity-10"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        
        {/* --- TOP SECTION: CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* LEFT CONTENT */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-semibold mb-6">
              <Landmark size={16} />
              Who We Are
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Tradition Meets
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Digital Innovation.
              </span>
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              <strong className="text-white">Vijaya Vinayak Chitfunds Private Limited</strong> is revolutionizing how people save and borrow. We combine the traditional trust of chit funds with modern digital security.
            </p>

            <p className="text-gray-400 leading-relaxed mb-8">
              Our platform provides a seamless, secure album-style experience to manage your chit groups, track payments, and access records anytime. No hidden charges—just honest financial growth.
            </p>

            {/* Trust Points */}
            <ul className="space-y-4 mb-8">
              {[
                "Government Registered & Compliant",
                "100% Digital Record Keeping",
                "Instant Access to Scheme Gallery",
                "Transparent Auction Process"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle className="text-emerald-400" size={14} />
                  </div>
                  <span className="text-slate-200 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/chitgallery"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20"
            >
              Explore Our Schemes
            </Link>
          </div>

          {/* RIGHT IMAGE / GLASS CARD */}
          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden p-4 shadow-2xl">
              {/* Window Header */}
              <div className="flex items-center gap-2 mb-4 px-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="flex-1 text-center text-xs text-gray-500 font-mono">mychits_dashboard.png</span>
              </div>
              
              <div className="w-full h-[350px] bg-slate-800 rounded-xl flex items-center justify-center overflow-hidden">
                {/* Placeholder for actual office or app screenshot */}
                <img 
                   src="/about-office.jpg" // Replace with your actual image path
                   alt="Office" 
                   className="w-full h-full object-cover opacity-80"
                   onError={(e) => {
                     e.target.style.display = 'none';
                     e.target.nextSibling.style.display = 'flex';
                   }}
                />
                <div className="hidden w-full h-full items-center justify-center text-gray-600 flex-col gap-2">
                   <Landmark size={48} />
                   <span>Company Image</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- NEW FEATURE: STATISTICS BAR --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { value: "10+", label: "Years Experience", icon: <Award size={24} /> },
            { value: "5K+", label: "Happy Members", icon: <Users size={24} /> },
            { value: "100%", label: "Digital Records", icon: <Smartphone size={24} /> },
            { value: "₹50Cr+", label: "Transactions", icon: <TrendingUp size={24} /> },
          ].map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors"
            >
              <div className="inline-block p-3 rounded-full bg-cyan-500/10 text-cyan-400 mb-3">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-extrabold text-white">{stat.value}</h3>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* --- NEW FEATURE: WHY CHOOSE US CARDS --- */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-10 text-white">
            Why People Trust <span className="text-cyan-400">MyChits</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-white/5 to-transparent p-6 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                <Shield size={24} />
              </div>
              <h4 className="text-xl font-bold mb-2">Secure & Safe</h4>
              <p className="text-gray-400 text-sm">
                Your data and money are protected with enterprise-grade security and compliance.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-white/5 to-transparent p-6 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
              <h4 className="text-xl font-bold mb-2">Community Driven</h4>
              <p className="text-gray-400 text-sm">
                Join a growing community of savers. Transparent auctions and fair dividends.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-white/5 to-transparent p-6 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                <Smartphone size={24} />
              </div>
              <h4 className="text-xl font-bold mb-2">Digital Access</h4>
              <p className="text-gray-400 text-sm">
                View your scheme posters, documents, and history anytime from your device.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}