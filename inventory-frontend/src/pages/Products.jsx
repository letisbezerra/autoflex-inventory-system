import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Package, Plus, Trash2, Link as LinkIcon, Loader2 } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ code: '', name: '', price: '' });
  const [compData, setCompData] = useState({ productCode: '', materialCode: '', quantity: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [prodRes, matRes] = await Promise.all([
        api.get('/products'),
        api.get('/raw-materials')
      ]);
      setProducts(prodRes.data);
      setMaterials(matRes.data);
    } catch (error) {
      console.error("Error loading data", error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = { 
        code: formData.code, 
        name: formData.name, 
        price: parseFloat(formData.price) 
      };
      await api.post('/products', payload);
      setFormData({ code: '', name: '', price: '' });
      loadData();
    } catch (error) {
      alert("Error adding product.");
    }
  };

  const handleAddComposition = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // PAYLOAD SINCRONIZADO COM CompositionRequest.java
      const payload = {
        productCode: compData.productCode,
        materialCode: compData.materialCode,
        quantityNeeded: parseFloat(compData.quantity)
      };

      console.log("Enviando para o Quarkus:", payload);

      await api.post('/compositions', payload);
      
      // Limpa apenas o campo de quantidade para facilitar múltiplos cadastros
      setCompData({ ...compData, quantity: '' });
      alert("Material linked successfully!");
      
      // Recarrega os dados para atualizar o plano de produção no dashboard
      loadData();
    } catch (error) {
      console.error("Erro detalhado:", error.response?.data);
      const errorMsg = error.response?.data?.error || "Check backend field naming.";
      alert("Error: " + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (code) => {
    if (window.confirm("Delete product?")) {
      try {
        await api.delete(`/products/${code}`);
        loadData();
      } catch (error) {
        alert("Error deleting product.");
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-slate-800 tracking-tight italic">Product Management</h1>

      {/* Seção de Cadastro de Produto */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-widest">New Product</h2>
        <form onSubmit={handleAddProduct} className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Code</label>
            <input 
              type="text" 
              placeholder="e.g. PRD-001"
              value={formData.code} 
              onChange={e => setFormData({...formData, code: e.target.value})} 
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
              required 
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input 
              type="text" 
              placeholder="e.g. Industrial Gate"
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
              required 
            />
          </div>
          <div className="w-32">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input 
              type="number" 
              step="0.01" 
              value={formData.price} 
              onChange={e => setFormData({...formData, price: e.target.value})} 
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
              required 
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md active:scale-95">
            <Plus size={20} /> Add Product
          </button>
        </form>
      </div>

      {/* Seção de Vínculo de Matéria-Prima (Composição) */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
        <h2 className="text-sm font-bold text-blue-800 mb-4 flex items-center gap-2">
          <LinkIcon size={18} /> Associate Raw Materials to Product
        </h2>
        <form onSubmit={handleAddComposition} className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-bold text-blue-600 mb-1 uppercase">Target Product</label>
            <select 
              className="w-full p-2 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 outline-none" 
              value={compData.productCode} 
              onChange={e => setCompData({...compData, productCode: e.target.value})} 
              required
            >
              <option value="">Select Product...</option>
              {products.map(p => <option key={p.code} value={p.code}>{p.name} ({p.code})</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-bold text-blue-600 mb-1 uppercase">Raw Material</label>
            <select 
              className="w-full p-2 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 outline-none" 
              value={compData.materialCode} 
              onChange={e => setCompData({...compData, materialCode: e.target.value})} 
              required
            >
              <option value="">Select Material...</option>
              {materials.map(m => <option key={m.code} value={m.code}>{m.name}</option>)}
            </select>
          </div>
          <div className="w-32">
            <label className="block text-xs font-bold text-blue-600 mb-1 uppercase">Quantity</label>
            <input 
              type="number" 
              step="0.01" 
              className="w-full p-2 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 outline-none" 
              placeholder="0.00" 
              value={compData.quantity} 
              onChange={e => setCompData({...compData, quantity: e.target.value})} 
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center gap-2 min-w-[120px] justify-center transition-all shadow-md active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Link"}
          </button>
        </form>
      </div>

      {/* Tabela de Produtos Cadastrados */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">Code</th>
              <th className="p-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">Name</th>
              <th className="p-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">Price (Unit)</th>
              <th className="p-4 font-semibold text-xs text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.code} className="border-b border-gray-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 text-blue-600 font-bold">{product.code}</td>
                <td className="p-4 font-medium text-slate-700">{product.name}</td>
                <td className="p-4 text-emerald-600 font-semibold">${product.price?.toFixed(2)}</td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleDelete(product.code)} 
                    className="p-2 text-red-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-400 italic">No products registered yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;