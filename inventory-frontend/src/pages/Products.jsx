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
    } catch (e) { console.error("Erro ao carregar dados", e); }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    await api.post('/products', { ...formData, price: parseFloat(formData.price) });
    setFormData({ code: '', name: '', price: '' });
    loadData();
  };

  const handleAddComposition = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // CORREÇÃO CRÍTICA: Enviar apenas o código puro para o Quarkus
      const payload = {
        productCode: compData.productCode,
        materialCode: compData.materialCode,
        quantityNeeded: parseFloat(compData.quantity)
      };
      // Verifique se a URL no seu api.js termina com :8080/api ou similar
      await api.post('/compositions', payload);
      alert("Vinculado com sucesso!");
      setCompData({ productCode: '', materialCode: '', quantity: '' });
      loadData();
    } catch (error) {
      alert(error.response?.data?.error || "Erro ao vincular");
    } finally { setLoading(false); }
  };

  const handleDelete = async (code) => {
    if (window.confirm("Deseja excluir este produto?")) {
      await api.delete(`/products/${code}`);
      loadData();
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-left">
      <h1 className="text-2xl font-bold mb-8 text-slate-800">Product Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Card: New Product */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider">New Product</h2>
          <form onSubmit={handleAddProduct} className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[120px]">
              <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Business Code</label>
              <input type="text" placeholder="e.g. PRD-001" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div className="flex-[2] min-w-[180px]">
              <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Product Name</label>
              <input type="text" placeholder="e.g. Industrial Gate" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div className="w-24">
              <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Price</label>
              <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm">
              <Plus size={18} /> Add Product
            </button>
          </form>
        </div>

        {/* Card: Associate Materials (Design da Screenshot 02.11.39) */}
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <h2 className="text-xs font-bold text-blue-600 uppercase mb-4 tracking-wider flex items-center gap-2">
            <LinkIcon size={14} /> Associate Raw Materials to Product
          </h2>
          <form onSubmit={handleAddComposition} className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[140px]">
              <label className="block text-[10px] font-bold text-blue-800 mb-1 uppercase">Target Product</label>
              <select value={compData.productCode} onChange={e => setCompData({...compData, productCode: e.target.value})} className="w-full p-2 border border-blue-200 rounded-lg outline-none bg-white text-sm" required>
                <option value="">Select Product...</option>
                {products.map(p => <option key={p.code} value={p.code}>{p.name} ({p.code})</option>)}
              </select>
            </div>
            <div className="flex-1 min-w-[140px]">
              <label className="block text-[10px] font-bold text-blue-800 mb-1 uppercase">Raw Material</label>
              <select value={compData.materialCode} onChange={e => setCompData({...compData, materialCode: e.target.value})} className="w-full p-2 border border-blue-200 rounded-lg outline-none bg-white text-sm" required>
                <option value="">Select Material...</option>
                {materials.map(m => <option key={m.code} value={m.code}>{m.name}</option>)}
              </select>
            </div>
            <div className="w-24">
              <label className="block text-[10px] font-bold text-blue-800 mb-1 uppercase">Quantity</label>
              <input type="number" step="0.01" value={compData.quantity} onChange={e => setCompData({...compData, quantity: e.target.value})} className="w-full p-2 border border-blue-200 rounded-lg outline-none bg-white" placeholder="0.00" required />
            </div>
            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-sm min-w-[80px]">
              {loading ? <Loader2 className="animate-spin mx-auto" size={18} /> : "Link"}
            </button>
          </form>
        </div>
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Code</th>
              <th className="p-4 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Name</th>
              <th className="p-4 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Price (Unit)</th>
              <th className="p-4 font-bold text-slate-400 uppercase text-[10px] tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.code} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors group">
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