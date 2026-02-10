

// import { Link } from "react-router-dom";
// import { ArrowRight } from "lucide-react";
// import React from "react";

// export default function Hero() {
//   return (
//     <section
//       id="home"
//       className="relative overflow-hidden py-32 px-6 text-white 
//       bg-gradient-to-br from-[#0b1020] via-[#0f172a] to-[#020617]"
//     >
//          {/* bg-gradient-to-br from-[#0b1020] via-[#0f172a] to-[#020617]" */}
//       {/* Background blobs */}
//       <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600 blur-[120px] rounded-full" />
//       <div className="absolute top-40 -right-40 w-[500px] h-[500px] bg-yellow-400/20 blur-[120px] rounded-full" />

//       <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">

//         {/* ---------------- LEFT SIDE ---------------- */}
//         <div>
//           <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
//             Smart Savings,
//             <br />
//             <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent drop-shadow">
//               Secure Growth.
//             </span>
//           </h1>

//           <p className="mt-6 text-lg text-slate-300 max-w-lg leading-relaxed">
//             Welcome to <span className="text-white font-semibold">MyChits</span>.
//             Traditional trust powered by modern technology —
//             built to secure your financial future.
//           </p>

//           {/* CTA */}
//   <div className="mt-10 flex flex-wrap gap-4">
//     <Link
//       to="/chitgallery"
//       className="group relative inline-flex items-center gap-2 
//       px-8 py-4 rounded-xl font-semibold
//       bg-emerald-500/90 hover:bg-emerald-500
//       shadow-lg shadow-emerald-500/30
//       transition-all"
//     >
//       View Schemes
//       <ArrowRight
//         size={20}
//         className="group-hover:translate-x-1 transition-transform"
//       />
//     </Link>

//     {/* Ghost Button */}
//     <Link
//       to="/#contact"
//       className="px-8 py-4 rounded-xl font-semibold
//       border border-white/30 text-white
//       hover:bg-white/10 transition-all"
//     >
//       Contact Us
//     </Link>
//   </div>

//           {/* ---------------- BENTO GRID ---------------- */}
//           <div className="mt-14 grid grid-cols-2 gap-4 max-w-md">
//             <div className="col-span-2 rounded-2xl p-5 
//               bg-white/5 backdrop-blur-md border border-white/10
//               hover:-translate-y-1 transition">
//               💰 <span className="ml-2 font-semibold">Secure Chit Savings</span>
//             </div>

//             <div className="rounded-2xl p-5 
//               bg-white/5 backdrop-blur-md border border-white/10
//               hover:-translate-y-1 transition">
//               🏠 <span className="block mt-2 font-semibold">Home Goals</span>
//             </div>

//             <div className="rounded-2xl p-5 
//               bg-white/5 backdrop-blur-md border border-white/10
//               hover:-translate-y-1 transition">
//               🚗 <span className="block mt-2 font-semibold">Vehicle Plans</span>
//             </div>
//           </div>
//         </div>

//         {/* ---------------- RIGHT SIDE ---------------- */}
//         <div className="hidden md:flex justify-center relative">

//           {/* Glow ring */}
//           <div className="absolute w-[380px] h-[380px] rounded-full 
//             bg-gradient-to-tr from-emerald-400/30 to-yellow-400/30 
//             blur-3xl animate-pulse" />

//           {/* Image */}
//           <div className="relative rounded-3xl p-4
//             bg-white/5 backdrop-blur-xl border border-white/10">
//             <img
//               src="/am.png"
//               alt="MyChits Preview"
//               className="w-[420px] object-contain"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden
      bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#0f172a] text-white"
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

        {/* ================= LEFT CONTENT ================= */}
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="text-orange-400">Smart Savings,</span>
            <br />
            <span className="text-green-400">Secure Future.</span>
          </h1>

          <p className="mt-6 text-gray-200 max-w-lg leading-relaxed">
            Welcome to MyChits, synergy of traditional financial wisdom and
            cutting-edge digital platforms, tailored for ambitious growth.
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/chitgallery"
              className="group inline-flex items-center gap-2
              px-8 py-4 rounded-xl font-semibold
              bg-emerald-500 hover:bg-emerald-600
              shadow-lg shadow-emerald-500/30 transition"
            >
              View Schemes
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <Link
              to="/#contact"
              className="px-8 py-4 rounded-xl font-semibold
              border border-white/30 hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>

          {/* INFO CARDS */}
          <div className="mt-14 grid grid-cols-2 gap-4 max-w-xl">
            {/* 1 */}
            <Link
              to="/chits/chit-pro"
              className="col-span-2 flex items-center justify-between
              rounded-2xl p-5
              bg-white/5 backdrop-blur-md border border-white/10
              hover:bg-white/10 hover:-translate-y-1 transition"
            >
              <span className="flex items-center gap-2 font-semibold">
                💰 Secure Chit Savings
              </span>
              <ArrowRight size={20} />
            </Link>

            {/* 2 */}
            <div
              className="rounded-2xl p-5
              bg-white/5 backdrop-blur-md border border-white/10
              hover:-translate-y-1 transition"
            >
              🏠 <span className="block mt-2 font-semibold">Home Goals</span>
            </div>

            {/* 3 */}
            <div
              className="rounded-2xl p-5
              bg-white/5 backdrop-blur-md border border-white/10
              hover:-translate-y-1 transition"
            >
              🚗 <span className="block mt-2 font-semibold">Vehicle Plans</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT IMAGE SLIDER ================= */}
        <div className="hidden md:flex justify-center">
          <div
            className="relative w-[420px] h-[420px] rounded-3xl p-6
            bg-white/5 backdrop-blur-xl border border-white/10
            flex items-center justify-center overflow-hidden"
          >
            {sliderImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="MyChits Slide"
                className={`absolute w-full object-contain
                transition-opacity duration-700 ease-in-out
                ${index === current ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
