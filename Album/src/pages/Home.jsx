import React from "react";
import Hero from "../components/Hero";
import CTA from "../components/CTA";
import AboutSection from "../components/AboutSection";
import WhyChits from "../components/WhyChits";
import Contact from "../components/Contact";


export default function Home() {

    
  return (
    <div className="min-h-screen bg-sky-200">
      <Hero />
      <CTA />
      <AboutSection />   {/* 🔥 has id="about" */}
      <WhyChits />
      <Contact />
 
    </div>
  );
}
