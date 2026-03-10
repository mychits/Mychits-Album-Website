import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-slate-900 text-white overflow-hidden">
      
      {/* 1. DECORATIVE ELEMENTS */}
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600"></div>
      
      {/* Background Glows */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-[150px] opacity-10 pointer-events-none"></div>
      <div className="absolute top-10 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-[150px] opacity-10 pointer-events-none"></div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* --- COLUMN 1: BRAND & CONTACT --- */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              {/* Logo Placeholder */}
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                M
              </div>
              <h2 className="text-2xl font-bold text-white">MyChits</h2>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Revolutionizing chit funds with transparency and technology. Your trusted partner for secure financial growth.
            </p>

            {/* Contact Details */}
            <div className="space-y-3 text-sm">
              <a href="mailto:info.mychits@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors group">
                <div className="p-2 bg-white/5 rounded-md group-hover:bg-cyan-500/10 transition">
                  <Mail size={16} className="text-cyan-400" />
                </div>
                info.mychits@gmail.com
              </a>
              <a href="tel:9483900777" className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors group">
                <div className="p-2 bg-white/5 rounded-md group-hover:bg-cyan-500/10 transition">
                  <Phone size={16} className="text-cyan-400" />
                </div>
                9483900777 / 7669865563
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <div className="p-2 bg-white/5 rounded-md mt-0.5">
                  <MapPin size={16} className="text-cyan-400" />
                </div>
                <span className="text-xs leading-relaxed">
                  No 11/36-25, 2nd Main, Kathriguppe Main Road, Bangalore - 560070
                </span>
              </div>
            </div>
          </div>

          {/* --- COLUMN 2: COMPANY LINKS --- */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 inline-block relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-8 after:h-1 after:bg-cyan-500">
              Company
            </h3>
            <ul className="space-y-3 text-gray-400">
              {[
                { to: "/features", label: "Features" },
                { to: "/signup", label: "Free Trial" },
                { to: "/report", label: "Reports & Analytics" },
                { to: "/security", label: "Security & Compliance" },
              ].map((link) => (
                <li key={link.to}>
                  <NavLink 
                    to={link.to} 
                    className="flex items-center gap-2 hover:text-white hover:gap-3 transition-all duration-200"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* --- COLUMN 3: SUPPORT LINKS --- */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 inline-block relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-8 after:h-1 after:bg-cyan-500">
              Support
            </h3>
            <ul className="space-y-3 text-gray-400">
              {[
                { to: "/faq", label: "FAQs" },
                { to: "/contact", label: "Contact Us" },
                { to: "/Help&support", label: "Help & Support" },
                { to: "/privacy", label: "Privacy & Policy" },
                { to: "/termcondition", label: "Terms & Conditions" },
              ].map((link) => (
                <li key={link.to}>
                  <NavLink 
                    to={link.to} 
                    className="flex items-center gap-2 hover:text-white hover:gap-3 transition-all duration-200"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* --- COLUMN 4: NEWSLETTER & SOCIAL --- */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">
              Stay Updated
            </h3>
            
            {/* Newsletter Input */}
            <div className="relative mb-6">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition text-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-cyan-500 rounded-md hover:bg-cyan-600 transition shadow-lg shadow-cyan-500/20">
                <Send size={16} className="text-white" />
              </button>
            </div>

            {/* Social Icons */}
            <h4 className="text-gray-500 text-sm mb-3">Follow Us</h4>
            <div className="flex gap-3">
              <a 
                href="https://www.facebook.com/Mychitfund" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-blue-600 hover:border-blue-600 transition-all group"
              >
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://www.instagram.com/my_chits/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:border-transparent transition-all group"
              >
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://www.youtube.com/@MyChit-z6d" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-red-600 hover:border-red-600 transition-all group"
              >
                <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

        </div>

        {/* 3. BOTTOM COPYRIGHT BAR */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            
            {/* Left - Copyright */}
            <p className="text-gray-500 text-xs sm:text-sm">
              © {new Date().getFullYear()} <span className="text-gray-300 font-semibold">MYCHITS</span>. All rights reserved.
            </p>

            {/* Center - Legal Info (Hidden on mobile) */}
            <div className="hidden md:flex flex-wrap justify-center gap-4 text-gray-600 text-xs text-center">
              <span>VIJAYA VINAYAK CHITFUNDS PRIVATE LIMITED</span>
              <span className="hidden lg:inline">|</span>
              <span className="hidden lg:inline">CIN: U65999KA2022PTC161858</span>
            </div>

            {/* Right - Creator */}
            <p className="text-gray-500 text-xs sm:text-sm">
              Crafted with <span className="text-red-500">♥</span> by <span className="text-cyan-400 font-semibold">Sanjay</span>
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
}