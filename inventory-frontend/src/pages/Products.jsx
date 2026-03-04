import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Package, Plus, Trash2, Link as LinkIcon, Loader2 } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ code: '', name: '', price: '' });
  const [compData, setCompData] = useState({ productCode: '', materialCode: '', quantity: '' });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [p, m] = await Promise.all([api.get('/products'), api.get('/raw-materials')]);
      setProducts(p.data);
      setMaterials(m.data);
    } catch (e) { 
      console.error("Error loading data:", e); 
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', { ...formData, price: parseFloat(formData.price) });
      setFormData({ code: '', name: '', price: '' });
      loadData();
    } catch (error) {
      alert(error.response?.data?.error || "Error adding product");
    }
  };

  const handleAddComposition = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/compositions', {
        productCode: compData.productCode,
        materialCode: compData.materialCode,
        quantityNeeded: parseFloat(compData.quantity)
      });
      alert("Material linked successfully!");
      setCompData({ productCode: '', materialCode: '', quantity: '' });
      loadData();
    } catch (error) {
      alert(error.response?.data?.error || "Error linking material");
    } finally { setLoading(false); }
  };

  const handleDelete = async (code) => {
    if (window.confirm(`Are you sure you want to delete product ${code}?`)) {
      try {
        await api.delete(`/products/${code}`);
        loadData();
      } catch (error) {
        alert("Error deleting product");
      }
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-left">
      <h1 className="text-2xl font-bold mb-8 text-slate-800">Product Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider">New Product</h2>
          <form onSubmit={handleAddProduct} className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[120px]">
              <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Business Code</label>
              <input type="text" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div className="flex-[2] min-w-[180px]">
              <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div className="w-24">
              <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Price</label>
              <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 shadow-sm">
              <Plus size={18} />
            </button>
          </form>
        </div>

        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <h2 className="text-xs font-bold text-blue-600 uppercase mb-4 tracking-wider">Link Materials</h2>
          <form onSubmit={handleAddComposition} className="flex flex-wrap gap-4 items-end">
            <select value={compData.productCode} onChange={e => setCompData({...compData, productCode: e.target.value})} className="flex-1 p-2 border rounded-lg bg-white text-sm" required>
              <option value="">Product...</option>
              {products.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
            </select>
            <select value={compData.materialCode} onChange={e => setCompData({...compData, materialCode: e.target.value})} className="flex-1 p-2 border rounded-lg bg-white text-sm" required>
              <option value="">Material...</option>
              {materials.map(m => <option key={m.code} value={m.code}>{m.name}</option>)}
            </select>
            <input type="number" step="0.01" value={compData.quantity} onChange={e => setCompData({...compData, quantity: e.target.value})} className="w-20 p-2 border rounded-lg bg-white" placeholder="Qty" required />
            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 shadow-sm">
              {loading ? <Loader2 className="animate-spin" size={18} /> : "Link"}
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 font-bold text-slate-400 uppercase text-[10px]">Code</th>
              <th className="p-4 font-bold text-slate-400 uppercase text-[10px]">Name</th>
              <th className="p-4 font-bold text-slate-400 uppercase text-[10px]">Price</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.code} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-blue-600">{p.code}</td>
                <td className="p-4 text-slate-700 font-medium">{p.name}</td>
                <td className="p-4 font-bold text-emerald-600">${p.price?.toFixed(2)}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(p.code)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
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

export default Products;