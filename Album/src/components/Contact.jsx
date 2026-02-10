import React from "react";
import { Mail, Phone, Facebook, Instagram, Youtube } from "lucide-react";
// import logo from "../assets/images/LOGOrbg.png";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";


export default function Contact() {
    return (
        <section id="contact" className="bg-sky-200 pt-15 pb-10">
            <div className="max-w-7xl mx-auto px-8">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

                    {/* LOGO + CONTACT */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            {/* <img
                                src={logo}
                                alt="Chits Logo"
                                className="h-12 w-auto"
                            /> */}
                            <p className="text-slate-700 text-xs sm:text-sm hover:text-blue-700 font-bold" >
                                CHIT FUND PVT LTD
                            </p>
                        </div>

                        <p className="flex items-center gap-2 text-gray-700 mb-2 font-semibold">
                            <Mail size={18} /> info.mychits@gmail.com
                        </p>

                        <p className="flex items-center gap-2 text-gray-700 mb-4 font-semibold">
                            <Phone size={18} /> 9483900777 / 7669865563
                        </p>


                    </div>

                    {/* COMPANY */}
                    <div>
                        <h3 className="font-bold text-lg text-indigo-900 mb-4">
                            Company
                        </h3>
                        <ul className="space-y-1 text-gray-700 font-semibold">
                            <NavLink
                                to="/features"
                                className={({ isActive }) =>
                                    `hover:text-blue-600 ${isActive ? "text-blue-600" : ""}`
                                }
                            >
                                Features
                            </NavLink>

                            <li>
                                <Link to="/signup" className="hover:text-blue-600">
                                    Free Trial
                                </Link>
                            </li>


                            <li>

                            <NavLink
                                to="/#action"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("action")?.scrollIntoView({
                                        behavior: "smooth",
                                    });
                                }}
                            >
                                Auction & Bid Handling
                            </NavLink>
                            </li>
                         
                         <li>
                            <NavLink
                                to="/report"
                                className={({ isActive }) =>
                                    `hover:text-blue-600 ${isActive ? "text-blue-600" : ""}`
                                }
                            >
                                Reports & Analytics
                            </NavLink>
                            </li>

                            <li>
                                <Link to="/security" className="hover:text-blue-600">
                                    Security & Compliance
                                </Link>
                            </li>
                        </ul>

                    </div>

                    {/* LEARN */}
                    <div>
                        <h3 className="font-bold text-lg text-indigo-900 mb-4">
                            Support
                        </h3>
                        <ul className="space-y-1 text-gray-700 font-semibold">
                            {/* <li> FAQs</li> */}
                           <li><a href="/faq" className="hover:text-purple-600 transition">FAQs</a></li> 
                            <li><a href="/contact" className="hover:text-purple-600 transition">Contact</a></li> 
                            <li><a href="/Help&support" className="hover:text-purple-600 transition">Help & Support</a></li>
                            <li><a href="/privacy" className="hover:text-purple-600 transition">Privacy & Policy</a></li>
                            <li><a href="/termcondition" className="hover:text-purple-600 transition">Term & Conditions</a></li>

                        </ul>
                    </div>

                    {/* SOCIAL */}
                    <div className="text-center sm:text-left">
                        <h3 className="font-bold text-base sm:text-lg text-indigo-900 mb-3 sm:mb-4">
                            Follow Us
                        </h3>

                        <div className="flex justify-center sm:justify-start gap-3 sm:gap-4">
                            <a
                                href="https://www.facebook.com/Mychitfund"
                                className="bg-blue-500 p-2 sm:p-3 rounded-full transition hover:scale-110"
                            >
                                <Facebook className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                            </a>

                            <a
                                href="https://www.instagram.com/my_chits/"
                                className="bg-yellow-400 p-2 sm:p-3 rounded-full transition hover:scale-110"
                                style={{
                                    background:
                                        "linear-gradient(45deg, #FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5)",
                                }}
                            >
                                <Instagram className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                            </a>

                            <a
                                href="https://www.youtube.com/@MyChit-z6d"
                                className="bg-red-600 p-2 sm:p-3 rounded-full transition hover:scale-110"
                            >
                                <Youtube className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                            </a>
                        </div>
                    </div>


                </div>
            </div>

            {/* BOTTOM BAR 
            <div className="bg-gray-100 text-gray-700 text-center mt-16 py-6 px-4 text-sm">
                ©2021 - 2025 MyChits. All Rights Reserved | Made in India <br />
                VIJAYA VINAYAK CHITFUNDS PRIVATE LIMITED | CIN: U65999KA2022PTC161858 <br />
                No 11/36-25, 2nd Main, Kathriguppe Main Road, Bangalore - 560070
            </div>*/}
        </section>
    );
}
