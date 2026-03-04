import React, { useEffect, useState } from 'react';
import { materialService } from '../services/api';
import { Trash2, PlusCircle, RefreshCw } from 'lucide-react';

const Materials = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ code: '', name: '', quantity: '' });

    const fetchMaterials = async () => {
        try {
            setLoading(true);
            const response = await materialService.getAll();
            setMaterials(response.data);
        } catch (error) {
            console.error("Error fetching materials:", error);
            alert("Failed to connect to Backend. Is Quarkus running?");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMaterials();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await materialService.create({
                code: formData.code, 
                name: formData.name,
                quantity: parseFloat(formData.quantity)
            });
            setFormData({ code: '', name: '', quantity: '' });
            fetchMaterials(); 
        } catch (error) {
            const errorMsg = error.response?.data?.error || "Error saving material";
            alert(errorMsg);
        }
    };

    const handleDelete = async (code) => {
        if (window.confirm(`Delete material ${code}?`)) {
            try {
                await materialService.delete(code);
                fetchMaterials();
            } catch (error) {
                const errorMsg = error.response?.data?.error || "Error deleting material";
                alert(errorMsg);
            }
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Raw Materials</h1>
                <button 
                    onClick={fetchMaterials}
                    className="p-2 hover:bg-gray-200 rounded-full transition"
                >
                    <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10 flex gap-4 items-end">
                <div className="w-1/4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Code</label>
                    <input
                        type="text"
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.code}
                        onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                        placeholder="Ex: RM-001"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Material Name</label>
                    <input
                        type="text"
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Ex: Steel Plate"
                    />
                </div>
                <div className="w-32">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                        type="number"
                        required
                        step="0.01"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.quantity}
                        onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                        placeholder="0.00"
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-700 transition">
                    <PlusCircle size={20} /> Add
                </button>
            </form>

            {/* Table Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Code</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Name</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Stock Quantity</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {materials.map((m) => (
                            <tr key={m.code} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-mono text-sm text-blue-600 font-bold">{m.code}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{m.name}</td>
                                <td className={`px-6 py-4 font-semibold ${m.quantity < 10 ? 'text-red-500' : 'text-green-600'}`}>
                                    {m.quantity.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button 
                                        onClick={() => handleDelete(m.code)}
                                        className="text-red-500 hover:text-red-700 p-2 transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {materials.length === 0 && !loading && (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-gray-500 italic">
                                    No materials found. Add your first one above!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Materials;