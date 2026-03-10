import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import React from "react";
import { Pencil, Download, X, Share2, Image, FileText, LayoutGrid } from "lucide-react"; // Added new icons

const baseUrl = "http://localhost:5000";

export default function AddProduct() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- NEW: State for Tabs ---
    const [activeTab, setActiveTab] = useState("schemes");

    // 1. State for Modal Toggle
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 2. State for Form Data (Expanded to handle simple posters)
    const [formData, setFormData] = useState({
        chitValue: "",
        months: "",
        members: "",
        installment: "",
        description: "",
        category: "",
        title: "", // Used for Posters/Brochures
        image: null
    });

    // 3. State to hold list of items
    const [schemes, setSchemes] = useState([]);
    const [posters, setPosters] = useState([]); // New
    const [brochures, setBrochures] = useState([]); // New

    // 4. State to track if we are Editing a specific ID
    const [editingId, setEditingId] = useState(null);

    // Fetch existing data on load
    useEffect(() => {
        fetchSchemes();
        fetchPosters();     // Fetch posters
        fetchBrochures();   // Fetch brochures
    }, []);

    const fetchSchemes = async () => {
        try {
            const res = await api.get("/chitgroup");
            setSchemes(res.data);
        } catch (err) {
            console.error("Error fetching schemes:", err);
        }
    };

    // NEW: Fetch Posters
    const fetchPosters = async () => {
        try {
            // Replace with your actual endpoint, e.g., /posters
            const res = await api.get("/posters"); 
            setPosters(res.data);
        } catch (err) {
            console.error("Error fetching posters:", err);
        }
    };

    // NEW: Fetch Brochures
    const fetchBrochures = async () => {
        try {
            // Replace with your actual endpoint, e.g., /brochures
            const res = await api.get("/brochures");
            setBrochures(res.data);
        } catch (err) {
            console.error("Error fetching brochures:", err);
        }
    };

    // Handle text inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle file input separately
    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const ActionButton = ({ onClick, icon, color }) => {
        const colors = {
            blue: "text-blue-600 hover:bg-blue-50",
            green: "text-green-600 hover:bg-blue-50",
            purple: "text-purple-600 hover:bg-purple-50",
        };

        return (
            <button
                type="button"
                onClick={onClick}
                className={`p-2 bg-white rounded-full shadow-md hover:scale-110 transition ${colors[color]}`}
            >
                {icon}
            </button>
        );
    };

    // OPEN Modal for "ADD NEW" (Dynamic based on tab)
    const openAddModal = () => {
        setEditingId(null);
        setFormData({
            chitValue: "",
            months: "",
            members: "",
            installment: "",
            description: "",
            category: "",
            title: "",
            image: null
        });
        setIsModalOpen(true);
    };

    // OPEN Modal for "EDIT" (Dynamic)
    const openEditModal = (item) => {
        setEditingId(item._id);
        
        if (activeTab === 'schemes') {
            setFormData({
                chitValue: item.chitValue || "",
                months: item.months || "",
                members: item.members || "",
                installment: item.installment || "",
                description: item.description || "",
                category: item.category || "",
                title: "",
                image: null
            });
        } else {
            // For Posters/Brochures
            setFormData({
                title: item.title || "",
                description: item.description || "",
                image: null,
                // Reset scheme fields
                chitValue: "", months: "", members: "", installment: "", category: ""
            });
        }
        setIsModalOpen(true);
    };

    // CLOSE Modal
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({
            chitValue: "",
            months: "",
            members: "",
            installment: "",
            description: "",
            category: "",
            title: "",
            image: null,
        });
    };

    // DOWNLOAD Image Function
    const handleDownload = async (imagePath) => {
        try {
            const response = await fetch(`${baseUrl}/${imagePath}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${activeTab}-image.jpg`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            console.error("Download failed", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        const data = new FormData();
        
        // Logic branching based on Tab
        if (activeTab === 'schemes') {
            data.append("chitValue", formData.chitValue);
            data.append("months", formData.months);
            data.append("members", formData.members);
            data.append("installment", formData.installment);
            data.append("description", formData.description);
            data.append("category", formData.category);
        } else {
            // Posters & Brochures
            data.append("title", formData.title);
            data.append("description", formData.description);
        }

        if (formData.image) {
            data.append("image", formData.image);
        }

        try {
            let url = "";
            if (activeTab === 'schemes') {
                url = editingId ? `/chitgroup/update/${editingId}` : `/chitgroup/create`;
            } else if (activeTab === 'posters') {
                url = editingId ? `/posters/update/${editingId}` : `/posters/create`;
            } else if (activeTab === 'brochures') {
                url = editingId ? `/brochures/update/${editingId}` : `/brochures/create`;
            }

            if (editingId) {
                await api.put(url, data, { headers: { "Content-Type": "multipart/form-data" } });
            } else {
                await api.post(url, data, { headers: { "Content-Type": "multipart/form-data" } });
            }

            closeModal();
            // Refresh specific list
            if (activeTab === 'schemes') fetchSchemes();
            if (activeTab === 'posters') fetchPosters();
            if (activeTab === 'brochures') fetchBrochures();

        } catch (err) {
            console.error(err);
            alert("Error saving data");
        } finally {
            setIsSubmitting(false);
        }
    };

    const getCategoryColor = (category) => {
        const cat = category?.toLowerCase();
        if (cat === 'gold') return 'bg-emerald-500 text-white';
        if (cat === 'premium') return 'bg-blue-500 text-white';
        if (cat === 'silver') return 'bg-gray-500 text-white';
        return 'bg-gray-500 text-white';
    };

    const handleShare = (p) => {
        let text = "";
        if (activeTab === 'schemes') {
            text = `MyChits Scheme\nChit Value: ₹${p.chitValue}\nMonthly: ₹${p.installment}\nDuration: ${p.months} Months`;
        } else {
            text = `${activeTab.toUpperCase()}: ${p.title}\n${p.description}`;
        }

        if (navigator.share) {
            navigator.share({ title: "MyChits", text, url: window.location.href });
        } else {
            navigator.clipboard.writeText(text);
            alert("Details copied to clipboard");
        }
    };

    // Helper to get current list based on tab
    const getCurrentList = () => {
        if (activeTab === 'schemes') return schemes;
        if (activeTab === 'posters') return posters;
        return brochures;
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">

            {/* PAGE HEADER */}
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Manage Content</h2>
                    <p className="text-gray-500 mt-1">Schemes, Posters, and Brochures</p>
                </div>

                {/* Add Button */}
                <button
                    onClick={openAddModal}
                    className="bg-gradient-to-r from-blue-400 to-purple-700 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </button>
            </div>

            {/* --- TAB NAVIGATION --- */}
            <div className="max-w-7xl mx-auto px-6 mb-8">
                <div className="flex space-x-2 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab("schemes")}
                        className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-all rounded-t-lg ${activeTab === "schemes" ? "bg-white text-blue-600 border-b-2 border-blue-600 shadow-sm" : "text-gray-500 hover:bg-gray-100"}`}
                    >
                        <LayoutGrid size={18} /> Schemes
                    </button>
                    <button
                        onClick={() => setActiveTab("posters")}
                        className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-all rounded-t-lg ${activeTab === "posters" ? "bg-white text-blue-600 border-b-2 border-blue-600 shadow-sm" : "text-gray-500 hover:bg-gray-100"}`}
                    >
                        <Image size={18} /> Posters
                    </button>
                    <button
                        onClick={() => setActiveTab("brochures")}
                        className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-all rounded-t-lg ${activeTab === "brochures" ? "bg-white text-blue-600 border-b-2 border-blue-600 shadow-sm" : "text-gray-500 hover:bg-gray-100"}`}
                    >
                        <FileText size={18} /> Brochures
                    </button>
                </div>
            </div>

            {/* SEARCH (Only show for schemes or keep for all if needed) */}
            <div className="max-w-7xl mx-auto px-6 mb-6">
                <div className="flex justify-start">
                    <div className="flex flex-col gap-1 w-full sm:w-96">
                        <label className="text-sm font-bold text-blue-700">
                            Search {activeTab}
                        </label>
                        <input
                            type="text"
                            placeholder={`Search ${activeTab}...`}
                            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* DATA DISPLAY GRID */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {getCurrentList().length > 0 ? (
                        getCurrentList()
                            .filter((p) => {
                                // Dynamic search filter
                                const term = search.toLowerCase();
                                if (activeTab === 'schemes') {
                                    return p.category?.toLowerCase().includes(term) || p.chitValue?.toString().includes(term);
                                }
                                return p.title?.toLowerCase().includes(term);
                            })
                            .map((p) => {
                                const colorClass = activeTab === 'schemes' ? getCategoryColor(p.category) : 'bg-gray-700 text-white';

                                return (
                                    <div
                                        key={p._id}
                                        className="relative bg-white/70 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                    >
                                        {/* IMAGE */}
                                        <div className="relative h-44">
                                            <img
                                                src={`${baseUrl}/${p.image}`}
                                                alt={p.title || "chit"}
                                                className="w-full h-full object-cover"
                                            />

                                            {/* Category Badge (Only for Schemes) */}
                                            {activeTab === 'schemes' && (
                                                <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full ${colorClass}`}>
                                                    {p.category}
                                                </span>
                                            )}

                                            {/* Floating Actions */}
                                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                                <ActionButton
                                                    onClick={() => handleShare(p)}
                                                    icon={<Share2 size={16} />}
                                                    color="purple"
                                                />
                                                <ActionButton
                                                    onClick={() => openEditModal(p)}
                                                    icon={<Pencil size={16} />}
                                                    color="blue"
                                                />
                                                <ActionButton
                                                    onClick={() => handleDownload(p.image)}
                                                    icon={<Download size={16} />}
                                                    color="green"
                                                />
                                            </div>
                                        </div>

                                        {/* CONTENT */}
                                        <div className="p-5 flex flex-col h-full">
                                            
                                            {/* Dynamic Content based on Tab */}
                                            {activeTab === 'schemes' ? (
                                                <>
                                                    <h3 className="text-2xl font-extrabold text-gray-900">₹ {p.chitValue}</h3>
                                                    <p className="mt-1 text-sm font-semibold text-indigo-600">Monthly: ₹ {p.installment}</p>
                                                    <p className="mt-3 text-sm text-gray-600 line-clamp-2">{p.description}</p>
                                                    <div className="my-4 h-px bg-gray-200" />
                                                    <div className="grid grid-cols-2 gap-4 text-center">
                                                        <div className="bg-gray-200 rounded-lg py-2">
                                                            <p className="text-xs font-semibold text-blue-600">Months</p>
                                                            <p className="font-bold text-gray-800">{p.months}</p>
                                                        </div>
                                                        <div className="bg-gray-200 rounded-lg py-2">
                                                            <p className="text-xs font-semibold text-blue-600">Members</p>
                                                            <p className="font-bold text-gray-800">{p.members}</p>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                // Poster / Brochure View
                                                <>
                                                      <h3 className="text-xl font-bold text-gray-900">{p.title || "Untitled"}</h3>
                                                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">{p.description}</p>
                                                    <div className="mt-auto pt-4">
                                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                            {activeTab === 'posters' ? 'Promotional Poster' : 'Digital Brochure'}
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                    ) : (
                        <div className="col-span-full text-center py-20 text-gray-500">
                            No {activeTab} found. Click "Add New" to create one.
                        </div>
                    )}
                </div>
            </div>


            {/* --- MODAL OVERLAY --- */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in-up">

                        {/* Modal Header */}
                        <div className="bg-slate-800 px-6 py-4 flex justify-between items-center border-b border-slate-700">
                            <div>
                                <h2 className="text-xl font-bold text-white">
                                    {editingId ? `Edit ${activeTab}` : `Add New ${activeTab}`}
                                </h2>
                                <p className="text-slate-300 text-xs">
                                    {editingId ? "Update the details" : "Fill in the details below"}
                                </p>
                            </div>
                            <button onClick={closeModal} className="text-gray-400 hover:text-white transition">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 max-h-[80vh] overflow-y-auto">
                            <form onSubmit={handleSubmit}>
                                
                                {/* --- CONDITIONAL FORM FIELDS --- */}
                                {activeTab === 'schemes' ? (
                                    // Scheme Fields
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Chit Value</label>
                                            <input type="number" name="chitValue" placeholder="Enter value" className="w-full px-4 py-3 border border-gray-300 rounded-lg" value={formData.chitValue} onChange={handleChange} required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Months</label>
                                            <input type="number" name="months" placeholder="Duration" className="w-full px-4 py-3 border border-gray-300 rounded-lg" value={formData.months} onChange={handleChange} required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Total Members</label>
                                            <input type="number" name="members" placeholder="Member count" className="w-full px-4 py-3 border border-gray-300 rounded-lg" value={formData.members} onChange={handleChange} required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Installment</label>
                                            <input type="number" name="installment" placeholder="Monthly amount" className="w-full px-4 py-3 border border-gray-300 rounded-lg" value={formData.installment} onChange={handleChange} required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                                            <input type="text" name="category" placeholder="e.g. Gold, Silver" className="w-full px-4 py-3 border border-gray-300 rounded-lg" value={formData.category} onChange={handleChange} required />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                            <textarea name="description" placeholder="Enter chit group details" rows="3" className="w-full px-4 py-3 border border-gray-300 rounded-lg" value={formData.description} onChange={handleChange} required />
                                        </div>
                                    </div>
                                ) : (
                                    // Poster / Brochure Fields (Simple)
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                                            <input 
                                                type="text" 
                                                name="title" 
                                                placeholder={`Enter ${activeTab} title`} 
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                                                value={formData.title} 
                                                onChange={handleChange} 
                                                required 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                            <textarea 
                                                name="description" 
                                                placeholder="Enter details or caption" 
                                                rows="3" 
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                                                value={formData.description} 
                                                onChange={handleChange} 
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Image Upload (Common) */}
                                <div className="mt-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Image</label>
                                    <div className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                                        <label className="flex flex-col items-center justify-center cursor-pointer w-full">
                                            <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            <p className="text-sm text-gray-500"><span className="font-semibold">Click to upload</span> {editingId && "or keep existing"}</p>
                                            <input type="file" name="image" className="hidden" onChange={handleFileChange} />
                                            {formData.image && <p className="text-xs text-blue-600 mt-2">New: {formData.image.name}</p>}
                                        </label>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="mt-8 flex gap-4">
                                    <button type="button" onClick={closeModal} className="w-1/3 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50">Cancel</button>
                                    <button type="submit" className="w-2/3 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg shadow-md">
                                        {editingId ? "Update" : "Submit"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}