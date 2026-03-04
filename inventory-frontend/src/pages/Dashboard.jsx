import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { BarChart3, TrendingUp, AlertCircle, Loader2, Package } from 'lucide-react';

const Dashboard = () => {
  const [data, setData] = useState({ grandTotalProductionValue: 0, suggestions: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/production/suggest')
      .then(res => {
        setData({
          grandTotalProductionValue: res.data.grandTotalProductionValue || 0,
          suggestions: res.data.suggestions || []
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex h-full items-center justify-center p-8 text-blue-600">
      <Loader2 className="animate-spin" size={48} />
    </div>
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BarChart3 className="text-blue-600" /> Production Strategy
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <p className="opacity-80 text-sm font-medium uppercase tracking-wider">Potential Revenue</p>
          <h2 className="text-4xl font-bold mt-1">
            ${data.grandTotalProductionValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h2>
          <div className="mt-4 flex items-center gap-2 text-blue-100 text-sm">
            <TrendingUp size={16} /> Based on high-value priority logic
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-orange-100 text-orange-600 rounded-full"><AlertCircle size={24} /></div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">Priority Rule</p>
            <p className="font-bold text-gray-800">Highest value products first</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {data.suggestions.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border-2 border-dashed border-gray-200">
            <Package size={48} className="mx-auto mb-4 opacity-20" />
            No suggestions. Please link raw materials to products.
          </div>
        ) : (
          data.suggestions.map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{item.productName}</h3>
                <p className="text-xs text-gray-400">Unit Price: ${item.unitPrice}</p>
              </div>
              <div className="text-center bg-slate-50 px-6 py-2 rounded-lg">
                <p className="text-[10px] text-gray-400 font-bold uppercase">Qty to Produce</p>
                {/* Alinhado com o DTO do Backend */}
                <p className="text-2xl font-black text-slate-800">{item.quantityPossible}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-bold uppercase">Total Value</p>
                <p className="text-xl font-bold text-emerald-600">${item.totalValue?.toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;