import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function Navbar() {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [openMenu, setOpenMenu] = useState(null);
    const [isLocked, setIsLocked] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const isActive = (path) =>
        location.pathname === path
            ? "text-sky-600 font-semibold"
            : "text-gray-700 hover:text-sky-600";


    function MegaItem({ to, title, desc, className = "" }) {
        return (
            <Link
                to={to}
                className={`rounded-xl p-4 border border-transparent
      hover:border-sky-200 hover:bg-sky-50
      transition group ${className}`}
            >
                <h4 className="font-semibold text-gray-800 group-hover:text-sky-600">
                    {title}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                    {desc}
                </p>
            </Link>
        );
    }

    return (
        <header className="bg-white sticky top-0 z-50 ">
            <div className="max-w-7xl mx-auto px-3 py-3 ">
                {/* WHITE FLOATING NAVBAR */}
                <nav className=" px-4 py-2 flex items-center justify-between ">

                    {/* LEFT LOGO */}
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="MyChit" className="h-8 w-8" />
                        <span className="font-bold text-lg text-gray-800">MyChit</span>
                    </div>

                    {/* CENTER MENU */}
                    <ul className="hidden md:flex items-center gap-8 text-md font-semibold">

                        <li>
                            <button
                                href="#home"
                                onClick={() => {
                                    if (location.pathname === "/") {
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    } else {
                                        navigate("/", { state: { scrollTo: "home" } });
                                    }
                                }}
                                className="text-gray-700 hover:text-sky-600 cursor-pointer"
                            >
                                Home
                            </button>
                        </li>

                        <li>
                            <button
                                href="#aboutsection"
                                onClick={() => {
                                    if (location.pathname === "/") {
                                        document
                                            .getElementById("aboutsection")
                                            ?.scrollIntoView({ behavior: "smooth" });
                                    } else {
                                        navigate("/", { state: { scrollTo: "aboutsection" } });
                                    }
                                }}
                                className="text-gray-700 hover:text-sky-600 cursor-pointer"
                            >
                                About Us
                            </button>
                        </li>





                        {/* CHIT PLANS – MEGA MENU */}
                        <li
                            className="relative"
                            onMouseEnter={() => {
                                if (!isLocked) setOpenMenu("chits");
                            }}
                            onMouseLeave={() => {
                                if (!isLocked) setOpenMenu(null);
                            }}
                        >
                            <button
                                onClick={() => {
                                    // toggle lock on click
                                    setIsLocked((prev) => {
                                        const next = !prev;
                                        setOpenMenu(next ? "chits" : null);
                                        return next;
                                    });
                                }}
                                className={`flex items-center gap-1 font-semibold transition
      ${openMenu === "chits"
                                        ? "text-sky-600"
                                        : "text-gray-700 hover:text-sky-600"}`}
                            >
                                Chit Plans
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-300
        ${openMenu === "chits" ? "rotate-180" : ""}`}
                                />
                            </button>

                            {openMenu === "chits" && (
                                <div
                                    className="absolute top-12 left-1/2 -translate-x-1/2
        w-[520px]
        bg-white/90 backdrop-blur-xl
        shadow-2xl rounded-2xl
        border border-slate-200
        p-6 z-50"
                                    onMouseEnter={() => setOpenMenu("chits")}
                                    onMouseLeave={() => {
                                        if (!isLocked) setOpenMenu(null);
                                    }}
                                >
                                    {/* GRID */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <MegaItem
                                            to="/chits/chit-smart"
                                            title="Chit Smart"
                                            desc="Perfect for small monthly savings"
                                        />
                                        <MegaItem
                                            to="/chits/chit-pro"
                                            title="Chit Pro"
                                            desc="Higher returns for ambitious growth"
                                        />
                                        <MegaItem
                                            to="/chits/chit-saver"
                                            title="Chit Saver"
                                            desc="Low-risk, steady savings plan"
                                        />
                                        <MegaItem
                                            to="/chits/chit-wealth"
                                            title="Chit Wealth"
                                            desc="Long-term wealth creation"
                                        />
                                        <MegaItem
                                            to="/chits/chit-simple"
                                            title="Chit Simple"
                                            desc="Easy & beginner-friendly"
                                            className="col-span-2"
                                        />
                                    </div>

                                    {/* FOOTER CTA */}
                                    <div className="mt-5 pt-4 border-t text-center">
                                        <Link
                                            to="/chits"
                                            onClick={() => {
                                                setOpenMenu(null);
                                                setIsLocked(false);
                                            }}
                                            className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:underline"
                                        >
                                            View All Plans <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </li>





                        {/* MEDIA DROPDOWN */}
                        <li>
                            <Link
                                to="/chitgallery"
                                className="text-gray-700 hover:text-sky-600 transition-colors"
                            >
                                Gallery {/* You can change this text to "Media" if you prefer */}
                            </Link>
                        </li>

                        <li>
                            <a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document
                                        .getElementById("contact")
                                        ?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="text-gray-700 hover:text-sky-600 cursor-pointer"
                            >
                                Contact Us
                            </a>
                        </li>
                    </ul>

                    {/* RIGHT BUTTON */}
                    <div>
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="bg-sky-600 text-white px-5 py-1.5 rounded-full text-sm font-semibold hover:bg-sky-700 transition"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-sky-600 text-white px-5 py-1.5 rounded-full text-sm font-semibold hover:bg-sky-700 transition"
                            >
                                Login
                            </Link>
                        )}
                    </div>


                </nav>
            </div>
        </header>
    );
}
