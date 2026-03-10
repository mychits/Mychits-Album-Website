import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";

export default function Navbar() {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [openMenu, setOpenMenu] = useState(null);
    const [isLocked, setIsLocked] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const isActive = (path) =>
        location.pathname === path
            ? "text-cyan-400 font-semibold"
            : "text-gray-300 hover:text-cyan-400 transition-colors";

    function MegaItem({ to, title, desc, className = "" }) {
        return (
            <Link
                to={to}
                className={`rounded-xl p-4 border border-white/10
                hover:border-cyan-500/30 hover:bg-white/5
                transition group ${className}`}
                onClick={() => {
                    setOpenMenu(null);
                    setIsLocked(false);
                    setMobileMenuOpen(false);
                }}
            >
                <h4 className="font-semibold text-white group-hover:text-cyan-400">
                    {title}
                </h4>
                <p className="text-sm text-gray-400 mt-1">
                    {desc}
                </p>
            </Link>
        );
    }

    const scrollToSection = (sectionId) => {
        if (location.pathname === "/") {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            navigate("/", { state: { scrollTo: sectionId } });
        }
        setMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full">
            {/* GRADIENT BORDER AT TOP */}
            <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600"></div>
            
            <div className="bg-slate-900/95 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-between h-20">
                        
                        {/* LEFT LOGO - IMPROVED */}
                        <div className="flex items-center gap-3">
                            {/* Logo image - make sure to add your logo file to public folder */}
                            <img 
                                src="/logo.png" 
                                alt="MyChits" 
                                className="h-10 w-10 rounded-lg object-contain"
                                onError={(e) => {
                                    // Fallback if logo image doesn't exist
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div 
                                className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/20 hidden"
                            >
                                M
                            </div>
                            <Link to="/" className="font-bold text-2xl text-white tracking-tight" onClick={() => setMobileMenuOpen(false)}>
                                My<span className="text-cyan-400">Chits</span>
                            </Link>
                        </div>

                        {/* CENTER MENU (Desktop) */}
                        <ul className="hidden md:flex items-center gap-2 text-sm font-medium">
                            
                            <li>
                                <button
                                    onClick={() => {
                                        if (location.pathname === "/") {
                                            window.scrollTo({ top: 0, behavior: "smooth" });
                                        } else {
                                            navigate("/");
                                        }
                                    }}
                                    className={`px-4 py-2.5 rounded-lg transition-colors ${
                                        location.pathname === "/" && !location.state?.scrollTo 
                                            ? "text-cyan-400 bg-white/5" 
                                            : "text-gray-300 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    Home
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => scrollToSection("aboutsection")}
                                    className="px-4 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    About Us
                                </button>
                            </li>

                            {/* CHIT PLANS – MEGA MENU */}
                            <li
                                className="relative"
                                onMouseEnter={() => { if (!isLocked) setOpenMenu("chits"); }}
                                onMouseLeave={() => { if (!isLocked) setOpenMenu(null); }}
                            >
                                <button
                                    onClick={() => {
                                        setIsLocked((prev) => {
                                            const next = !prev;
                                            setOpenMenu(next ? "chits" : null);
                                            return next;
                                        });
                                    }}
                                    className={`flex items-center gap-1 px-4 py-2.5 rounded-lg transition-colors
                                    ${openMenu === "chits" ? "text-cyan-400 bg-white/5" : "text-gray-300 hover:text-white hover:bg-white/5"}`}
                                >
                                    Chit Plans
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-300 ${openMenu === "chits" ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {openMenu === "chits" && (
                                    <div
                                        className="absolute top-14 left-1/2 -translate-x-1/2 w-[520px] bg-slate-800/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/10 p-6 z-50"
                                        onMouseEnter={() => setOpenMenu("chits")}
                                        onMouseLeave={() => {
                                            if (!isLocked) setOpenMenu(null);
                                        }}
                                    >
                                        <div className="grid grid-cols-2 gap-3">
                                            <MegaItem to="/chits/chit-smart" title="Chit Smart" desc="Small monthly savings" />
                                            <MegaItem to="/chits/chit-pro" title="Chit Pro" desc="Ambitious growth" />
                                            <MegaItem to="/chits/chit-saver" title="Chit Saver" desc="Low-risk steady plan" />
                                            <MegaItem to="/chits/chit-wealth" title="Chit Wealth" desc="Long-term wealth" />
                                            <MegaItem to="/chits/chit-simple" title="Chit Simple" desc="Beginner-friendly" className="col-span-2" />
                                        </div>

                                        <div className="mt-5 pt-4 border-t border-white/10 text-center">
                                            <Link
                                                to="/chits"
                                                onClick={() => { setOpenMenu(null); setIsLocked(false); }}
                                                className="inline-flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300 transition"
                                            >
                                                View All Plans <ChevronRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </li>

                            {/* GALLERY LINK */}
                            <li>
                                <Link 
                                    to="/chitgallery" 
                                    className={`px-4 py-2.5 rounded-lg transition-colors ${isActive("/chitgallery")}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Gallery
                                </Link>
                            </li>

                            {/* POSTER LINK */}
                            <li>
                                <Link 
                                    to="/chitposter" 
                                    className={`px-4 py-2.5 rounded-lg transition-colors ${isActive("/chitposter")}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Poster
                                </Link>
                            </li>

                            
                            <li>
                                <Link 
                                    to="/chitbrochure" 
                                    className={`px-4 py-2.5 rounded-lg transition-colors ${isActive("/chitbrochure")}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Brochure
                                </Link>
                            </li>

 {/* <li>
                                <Link 
                                    to="/chitbrochure" 
                                    className={`px-4 py-2.5 rounded-lg transition-colors ${isActive("/chitbrochure")}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Brochure
                                </Link>
                            </li> */}

                            <li>
                                <button
                                    onClick={() => scrollToSection("contact")}
                                    className="px-4 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    Contact Us
                                </button>
                            </li>
                        </ul>

                        {/* RIGHT BUTTON (Desktop) - MOVED TO RIGHT CORNER */}
                        <div className="hidden md:flex items-center gap-3">
                            {isLoggedIn ? (
                                <>
                                    <span className="text-sm text-gray-400">Welcome back</span>
                                    <button
                                        onClick={handleLogout}
                                        className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm hover:opacity-90 transition shadow-lg shadow-cyan-500/20"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm hover:opacity-90 transition shadow-lg shadow-cyan-500/20"
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* MOBILE MENU BUTTON */}
                        <div className="md:hidden">
                            <button 
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                                className="text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </nav>
                </div>

                {/* MOBILE MENU CONTENT */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-slate-800 border-t border-white/10 px-4 py-4 space-y-2">
                        <button
                            onClick={() => {
                                if (location.pathname === "/") {
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                } else {
                                    navigate("/");
                                }
                                setMobileMenuOpen(false);
                            }}
                            className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-white/5 rounded-lg"
                        >
                            Home
                        </button>

                        <button
                            onClick={() => scrollToSection("aboutsection")}
                            className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-white/5 rounded-lg"
                        >
                            About Us
                        </button>

                        {/* Mobile Chit Plans Dropdown */}
                        <div className="px-4 py-2">
                            <button
                                onClick={() => setOpenMenu(openMenu === "mobile-chits" ? null : "mobile-chits")}
                                className="flex items-center justify-between w-full text-gray-300 py-1"
                            >
                                Chit Plans
                                <ChevronDown 
                                    size={16} 
                                    className={`transition-transform ${openMenu === "mobile-chits" ? "rotate-180" : ""}`} 
                                />
                            </button>
                            
                            {openMenu === "mobile-chits" && (
                                <div className="mt-2 ml-4 space-y-2">
                                    <Link to="/chits/chit-smart" className="block py-2 text-sm text-gray-400 hover:text-cyan-400" onClick={() => setMobileMenuOpen(false)}>Chit Smart</Link>
                                    <Link to="/chits/chit-pro" className="block py-2 text-sm text-gray-400 hover:text-cyan-400" onClick={() => setMobileMenuOpen(false)}>Chit Pro</Link>
                                    <Link to="/chits/chit-saver" className="block py-2 text-sm text-gray-400 hover:text-cyan-400" onClick={() => setMobileMenuOpen(false)}>Chit Saver</Link>
                                    <Link to="/chits/chit-wealth" className="block py-2 text-sm text-gray-400 hover:text-cyan-400" onClick={() => setMobileMenuOpen(false)}>Chit Wealth</Link>
                                    <Link to="/chits/chit-simple" className="block py-2 text-sm text-gray-400 hover:text-cyan-400" onClick={() => setMobileMenuOpen(false)}>Chit Simple</Link>
                                    <Link to="/chits" className="block py-2 text-sm text-cyan-400 font-semibold" onClick={() => setMobileMenuOpen(false)}>View All Plans →</Link>
                                </div>
                            )}
                        </div>

                        <Link 
                            to="/chitgallery" 
                            className="block px-4 py-3 text-gray-300 hover:bg-white/5 rounded-lg"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Gallery
                        </Link>

                        <Link 
                            to="/chitposter" 
                            className="block px-4 py-3 text-gray-300 hover:bg-white/5 rounded-lg"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Poster
                        </Link>

                        <Link 
                            to="/chitbrochure" 
                            className="block px-4 py-3 text-gray-300 hover:bg-white/5 rounded-lg"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Brochure
                        </Link>

                        <button
                            onClick={() => scrollToSection("contact")}
                            className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-white/5 rounded-lg"
                        >
                            Contact Us
                        </button>
                        
                        <div className="pt-4 border-t border-white/10 mt-4">
                            {isLoggedIn ? (
                                <>
                                    <div className="px-4 py-2 text-sm text-gray-400 mb-2">Welcome back!</div>
                                    <button 
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }} 
                                        className="w-full text-center py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link 
                                    to="/login" 
                                    className="block w-full text-center py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}