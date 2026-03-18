import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Layers, Image, FileText, ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Your 3 videos
  const videos = [
    {
      id: "3plHtlf1hO0",
      title: "MyChits Introduction",
      description: "Welcome to Our Platform"
    },
    {
      id: "vyuLlk_aoL8",
      title: "Platform Features",
      description: "Explore What We Offer"
    },
    {
      id: "uD01zOb1ZAc",
      title: "How It Works",
      description: "Step by Step Guide"
    }
  ];

  // Auto-slide every 5 seconds (optional - remove if not needed)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % videos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [videos.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % videos.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + videos.length) % videos.length);
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-20 z-10">
        
        {/* LEFT CONTENT */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 text-sm font-medium text-cyan-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Digital Album Platform
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
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

          {/* Category Cards */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/chitgallery" className="group flex flex-col gap-2 p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all cursor-pointer">
              <Layers className="text-cyan-400" size={24} />
              <h3 className="font-bold text-white">Schemes</h3>
              <p className="text-xs text-gray-400">View Chit Plans</p>
            </Link>
            <Link to="/chitposter" className="group flex flex-col gap-2 p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all cursor-pointer">
              <Image className="text-purple-400" size={24} />
              <h3 className="font-bold text-white">Posters</h3>
              <p className="text-xs text-gray-400">Promotional Art</p>
            </Link>
            <Link to="/brochures" className="group flex flex-col gap-2 p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-orange-500/50 transition-all cursor-pointer">
              <FileText className="text-orange-400" size={24} />
              <h3 className="font-bold text-white">Brochures</h3>
              <p className="text-xs text-gray-400">Digital Docs</p>
            </Link>
          </div>
        </div>

        {/* RIGHT VIDEO SLIDER - Clean & Minimal */}
        <div className="hidden md:flex flex-col justify-center items-center relative">
          
          {/* Soft Background Glow */}
          <div className="absolute w-[700px] h-[450px] bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-full blur-[120px] opacity-30"></div>
          
          {/* Slider Container */}
          <div className="relative w-[680px] h-[400px]">
            
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 z-20 
                w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm
                flex items-center justify-center text-white
                hover:bg-black/60 hover:scale-110 transition-all duration-300"
              aria-label="Previous video"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 z-20 
                w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm
                flex items-center justify-center text-white
                hover:bg-black/60 hover:scale-110 transition-all duration-300"
              aria-label="Next video"
            >
              <ChevronRight size={20} />
            </button>

            {/* Video Slides */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/40 backdrop-blur-sm">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === currentSlide
                      ? "opacity-100 translate-x-0"
                      : index < currentSlide
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                  }`}
                >
                  {/* Video iframe - No border, clean look */}
                  <iframe
                    className="w-full h-full object-cover"
                    src={`https://www.youtube.com/embed/${video.id}?controls=1&rel=0&modestbranding=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                  
                  {/* Subtle bottom info bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-sm font-semibold text-white">{video.title}</h3>
                    <p className="text-xs text-gray-300">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots - Minimal */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide
                      ? "w-7 h-2.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                      : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}