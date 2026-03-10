import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Layers, Image, FileText } from "lucide-react"; // Added new icons

/* SLIDER IMAGES */
const sliderImages = [
  "/hero1.png",
  "/COIN.png",
  "/hero2.png",
  "/am.png",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  /* AUTO SLIDE */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 3500); // Slightly slower for better view

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden
      bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
    >
      {/* --- DECORATIVE BACKGROUND ELEMENTS --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-20 z-10">
        
        {/* ================= LEFT CONTENT ================= */}
        <div>
          {/* Small Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 text-sm font-medium text-cyan-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Digital Album Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Showcase Your
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Collections.
            </span>
          </h1>

          <p className="mt-6 text-gray-300 max-w-lg leading-relaxed text-lg">
            Welcome to <span className="text-white font-bold">MyChits Album</span>. 
            A centralized gallery to display your Schemes, Posters, and Brochures in a beautiful, organized layout.
          </p>

          {/* MAIN CTA */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/chitgallery"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold
              bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600
              shadow-lg shadow-cyan-500/30 transition-all duration-300"
            >
              Explore Gallery
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* --- CATEGORY CARDS (Linked to your routes) --- */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Schemes Card */}
            <Link 
              to="/chitgallery"
              className="group flex flex-col gap-2 p-5 rounded-2xl 
              bg-white/5 backdrop-blur-md border border-white/10 
              hover:bg-white/10 hover:border-cyan-500/50 transition-all cursor-pointer"
            >
              <Layers className="text-cyan-400" size={24} />
              <h3 className="font-bold text-white">Schemes</h3>
              <p className="text-xs text-gray-400">View Chit Plans</p>
            </Link>

            {/* Posters Card */}
            <Link 
              to="/chitposter"
              className="group flex flex-col gap-2 p-5 rounded-2xl 
              bg-white/5 backdrop-blur-md border border-white/10 
              hover:bg-white/10 hover:border-purple-500/50 transition-all cursor-pointer"
            >
              <Image className="text-purple-400" size={24} />
              <h3 className="font-bold text-white">Posters</h3>
              <p className="text-xs text-gray-400">Promotional Art</p>
            </Link>

            {/* Brochures Card */}
            <Link 
              to="/brochures" // Ensure you have this route or change it
              className="group flex flex-col gap-2 p-5 rounded-2xl 
              bg-white/5 backdrop-blur-md border border-white/10 
              hover:bg-white/10 hover:border-orange-500/50 transition-all cursor-pointer"
            >
              <FileText className="text-orange-400" size={24} />
              <h3 className="font-bold text-white">Brochures</h3>
              <p className="text-xs text-gray-400">Digital Docs</p>
            </Link>

          </div>
        </div>

        {/* ================= RIGHT IMAGE SLIDER (Album Frame) ================= */}
        <div className="hidden md:flex justify-center items-center relative">
          
          {/* Background Glow behind frame */}
          <div className="absolute w-80 h-80 bg-blue-500 rounded-full blur-[100px] opacity-30"></div>
          
          {/* Main Frame Container */}
          <div className="relative w-[420px] h-[500px] rounded-3xl 
            bg-white/10 backdrop-blur-xl border border-white/20 p-4 
            shadow-2xl transform hover:rotate-1 transition-all duration-500"
          >
            {/* Top Bar (Window Style) */}
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="flex-1 text-center text-xs text-gray-400 font-mono">mychits_album.img</div>
            </div>

            {/* Image Container */}
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-black/20 border border-white/10">
              {sliderImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Album Slide"
                  className={`absolute w-full h-full object-cover 
                  transition-all duration-700 ease-in-out
                  ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
                />
              ))}
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {sliderImages.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer
                  ${index === current ? "w-6 bg-white" : "w-2 bg-white/30 hover:bg-white/50"}`}
                  onClick={() => setCurrent(index)}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}