import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Database, Plus, Trash2, Edit3, Save, X } from 'lucide-react';

const RawMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [formData, setFormData] = useState({ code: '', name: '', quantity: '' });
  const [editingCode, setEditingCode] = useState(null);
  const [editQty, setEditQty] = useState('');

  useEffect(() => { loadMaterials(); }, []);

  const loadMaterials = async () => {
    try {
      const res = await api.get('/raw-materials');
      setMaterials(res.data);
    } catch (e) {
      console.error("Error loading materials", e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/raw-materials', { ...formData, quantity: parseFloat(formData.quantity) });
      setFormData({ code: '', name: '', quantity: '' });
      loadMaterials();
    } catch (e) {
      alert("Error adding material. Check if business code is unique.");
    }
  };

  const handleUpdateQty = async (code) => {
    try {
      await api.put(`/raw-materials/${code}`, { quantity: parseFloat(editQty) });
      setEditingCode(null);
      loadMaterials();
    } catch (e) {
      alert("Error updating stock quantity.");
    }
  };

  const handleDelete = async (code) => {
    if (window.confirm("Are you sure you want to delete this material? This may affect existing product compositions.")) {
      try {
        await api.delete(`/raw-materials/${code}`);
        loadMaterials();
      } catch (e) {
        alert("Error deleting material.");
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Database className="text-blue-600" /> Raw Materials Inventory
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-sm font-bold text-gray-400 uppercase mb-4 tracking-widest text-left">New Entry</h2>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[150px] text-left">
            <label className="block text-xs font-bold text-slate-500 mb-1">Business Code</label>
            <input 
              type="text" 
              value={formData.code} 
              onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})} 
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="e.g., RM-01" 
              required 
            />
          </div>
          <div className="flex-1 min-w-[200px] text-left">
            <label className="block text-xs font-bold text-slate-500 mb-1">Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="e.g., Steel Tube" 
              required 
            />
          </div>
          <div className="w-32 text-left">
            <label className="block text-xs font-bold text-slate-500 mb-1">Stock Qty</label>
            <input 
              type="number" 
              step="0.01" 
              value={formData.quantity} 
              onChange={e => setFormData({...formData, quantity: e.target.value})} 
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="0.00" 
              required 
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-md">
            <Plus size={18} /> Add
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-bold text-slate-400 uppercase">Code</th>
              <th className="p-4 font-bold text-slate-400 uppercase">Material Name</th>
              <th className="p-4 font-bold text-slate-400 uppercase">Current Stock</th>
              <th className="p-4 font-bold text-slate-400 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map(m => (
              <tr key={m.code} className="border-b border-gray-50 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-blue-600">{m.code}</td>
                <td className="p-4 font-medium text-slate-700">{m.name}</td>
                <td className="p-4">
                  {editingCode === m.code ? (
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        step="0.01" 
                        value={editQty} 
                        onChange={e => setEditQty(e.target.value)} 
                        className="w-24 p-1 border rounded bg-white" 
                      />
                      <button onClick={() => handleUpdateQty(m.code)} className="text-emerald-500 hover:text-emerald-700 p-1 bg-emerald-50 rounded">
                        <Save size={16} />
                      </button>
                      <button onClick={() => setEditingCode(null)} className="text-slate-400 hover:text-slate-600">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 group">
                      <span className={`font-bold px-2 py-1 rounded ${m.quantity < 10 ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-700'}`}>
                        {m.quantity}
                      </span>
                      <button onClick={() => {setEditingCode(m.code); setEditQty(m.quantity);}} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-blue-500 transition-all">
                        <Edit3 size={14} />
                      </button>
                    </div>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(m.code)} className="p-2 text-red-300 hover:text-red-600 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RawMaterials;