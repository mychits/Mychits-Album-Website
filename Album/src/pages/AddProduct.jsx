import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import React from "react";
import { Pencil, Download, X, Share2 } from "lucide-react"; // Import icons

const baseUrl = "http://localhost:5000";

export default function AddProduct() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
const [categoryFilter, setCategoryFilter] = useState("");

    // 1. State for Modal Toggle
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 2. State for Form Data
    const [formData, setFormData] = useState({
        chitValue: "",
        months: "",
        members: "",
        installment: "",
        description: "",
        category: "",
        image: null
    });


    // 3. State to hold list of schemes
    const [schemes, setSchemes] = useState([]);

    // 4. State to track if we are Editing a specific ID
    const [editingId, setEditingId] = useState(null);

    // Fetch existing schemes on load
    useEffect(() => {
        fetchSchemes();
    }, []);

    const fetchSchemes = async () => {
        try {
            const res = await api.get("/chitgroup");
            setSchemes(res.data);
        } catch (err) {
            console.error("Error fetching schemes:", err);
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



    // OPEN Modal for "ADD NEW"const ActionButton = ({ onClick, icon, color }) => {
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



    const openAddModal = () => {
        setEditingId(null);
        setFormData({
            chitValue: "",
            months: "",
            members: "",
            installment: "",
            description: "",
            category: "",
            image: null
        });
        setIsModalOpen(true);
    };


    // OPEN Modal for "EDIT"
    const openEditModal = (scheme) => {
        setEditingId(scheme._id);
        setFormData({
            chitValue: scheme.chitValue || "",
            months: scheme.months || "",
            members: scheme.members || "",
            installment: scheme.installment || "",
            description: scheme.description || "",
            category: scheme.category || "",
            image: null
        });
        setIsModalOpen(true);
    };
    //      const openEditModal = (scheme) => {
    //   setEditingId(scheme._id);
    //   setIsModalOpen(true);
    // };


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
            a.download = `chit-scheme.jpg`;
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
        data.append("chitValue", formData.chitValue);
        data.append("months", formData.months);
        data.append("members", formData.members);
        data.append("installment", formData.installment);
        data.append("description", formData.description);
        data.append("category", formData.category);

        if (formData.image) {
            data.append("image", formData.image);
        }

        try {
            if (editingId) {
                await api.put(`/chitgroup/update/${editingId}`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await api.post("/chitgroup/create", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            closeModal();
            await fetchSchemes();
        } catch (err) {
            console.error(err);
            alert("Error saving product");
        } finally {
            setIsSubmitting(false);
        }
    };


    // Helper for colors
    const getCategoryColor = (category) => {
        const cat = category?.toLowerCase();
        if (cat === 'gold') return 'bg-emerald-500 text-white';
        if (cat === 'Premium') return 'bg-blue-500 text-white';
        if (cat === 'silver') return 'bg-gray-500 text-white';
        return 'bg-gray-500 text-white';
    };

    const handleShare = (p) => {
        const text = `MyChits Scheme

Chit Value: ₹${p.chitValue}
Monthly Installment: ₹${p.installment}
Duration: ${p.months} Months
Members: ${p.members}
Category: ${p.category}

${p.description}`;

        if (navigator.share) {
            navigator.share({
                title: "MyChits Scheme",
                text,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(text);
            alert("Scheme details copied to clipboard");
        }
    };
    useEffect(() => {
        if (editingId) {
            const scheme = schemes.find((s) => s._id === editingId);
            if (scheme) {
                setFormData({
                    chitValue: scheme.chitValue || "",
                    months: scheme.months || "",
                    members: scheme.members || "",
                    installment: scheme.installment || "",
                    description: scheme.description || "",
                    category: scheme.category || "",
                    image: null,
                });
            }
        }
    }, [editingId, schemes]);

    


    return (
        <div className="min-h-screen bg-gray-50 pb-20">

            {/* PAGE HEADER */}
            <div className="max-w-7xl mx-auto px-6 py-12 flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Chit Schemes</h2>
                    <p className="text-gray-500 mt-1">Manage and view your available groups</p>
                </div>

                {/* Add Button */}
                <button
                    onClick={openAddModal}
                    className="bg-gradient-to-r from-blue-400 to-purple-700 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Add New Chit Scheme
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 mb-6">
                <div className="flex justify-start">
                    <div className="flex flex-col gap-1 w-full sm:w-96">
                        <label className="text-sm font-bold text-blue-700">
                            Filter Schemes
                        </label>
                        <input
                            type="text"
                            placeholder="Search by category or amount..."
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

                    {schemes.length > 0 ? (
                        schemes
                            .filter((p) =>
                                p.category.toLowerCase().includes(search.toLowerCase()) ||
                                p.chitValue.toString().includes(search)
                            )
                            .map((p) => {
                                const colorClass = getCategoryColor(p.category);

                                return (
                                    <div
                                        key={p._id}
                                        className="relative bg-white/70 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                    >
                                        {/* IMAGE */}
                                        <div className="relative h-44">
                                            <img
                                                src={`${baseUrl}/${p.image}`}
                                                alt="chit"
                                                className="w-full h-full object-cover"
                                            />

                                            {/* Category Badge */}
                                            <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full ${colorClass}`}>
                                                {p.category}
                                            </span>

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
                                            <h3 className="text-2xl font-extrabold text-gray-900">
                                                ₹ {p.chitValue}
                                            </h3>

                                            <p className="mt-1 text-sm font-semibold text-indigo-600">
                                                Monthly Installment: ₹ {p.installment}
                                            </p>

                                            <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3">
                                                {p.description}
                                            </p>

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
                                        </div>
                                    </div>
                                );
                            })
                    ) : (
                        <div className="col-span-full text-center py-20 text-gray-500">
                            No Chit Schemes found. Click "Add New Chit Scheme" to create one.
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
                                {/* Dynamic Title */}
                                <h2 className="text-xl font-bold text-white">
                                    {editingId ? "Edit Chit Group" : "Add New Chit Group"}
                                </h2>
                                <p className="text-slate-300 text-xs">
                                    {editingId ? "Update the scheme details" : "Enter details to start a new scheme"}
                                </p>
                            </div>
                            <button onClick={closeModal} className="text-gray-400 hover:text-white transition">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 max-h-[80vh] overflow-y-auto">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Chit Value</label>
                                        <input type="number" name="chitValue" placeholder="Enter value" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.chitValue} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Months</label>
                                        <input type="number" name="months" placeholder="Duration" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.months} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Total Members</label>
                                        <input type="number" name="members" placeholder="Member count" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.members} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Monthly Installment
                                        </label>
                                        <input
                                            type="number"
                                            name="installment"
                                            placeholder="Monthly amount"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                            value={formData.installment}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                                        <input type="text" name="category" placeholder="e.g. Gold, Silver" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.category} onChange={handleChange} required />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            placeholder="Enter chit group details"
                                            rows="3"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                </div>

                                {/* Image Upload */}
                                <div className="mt-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Group Image</label>
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
                                        {editingId ? "Update Group" : "Submit Group"}
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