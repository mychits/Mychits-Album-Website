import React from "react";

export default function Footer() {
  return (
    <footer className=" bg-sky-600 shadow-md py-4 sm:py-6 px-4 text-center">
      <p className="text-xs sm:text-sm leading-relaxed text-white">
        © 2025 <span className="font-bold">CHIT FUND PVT LTD</span>. All rights reserved.
        <br className="sm:hidden" />
        <span className="hidden sm:inline"> | </span>
        Created By <span className="font-semibold">Sanjay</span>
      </p>
    </footer>
  );
}

