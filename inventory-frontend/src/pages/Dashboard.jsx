import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { BarChart3, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [data, setData] = useState({ grandTotalProductionValue: 0, suggestions: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/production/suggest')
      .then(res => {
        // Ajuste para ler o objeto conforme o log do console
        setData({
          grandTotalProductionValue: res.data.grandTotalProductionValue || 0,
          suggestions: res.data.suggestions || []
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BarChart3 className="text-blue-600" /> Production Strategy
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <p className="opacity-80 text-sm font-medium">Potential Revenue</p>
          <h2 className="text-4xl font-bold mt-1">${data.grandTotalProductionValue.toFixed(2)}</h2>
          <div className="mt-4 flex items-center gap-2 text-blue-100 text-sm">
            <TrendingUp size={16} /> Based on optimized inventory usage
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-orange-100 text-orange-600 rounded-full"><AlertCircle size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">Priority Rule</p>
            <p className="font-bold text-gray-800">Highest value products first</p>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-bold mb-4">Suggested Production Plan</h2>
      <div className="grid grid-cols-1 gap-4">
        {data.suggestions.length === 0 ? (
          <div className="bg-white p-8 text-center rounded-xl border border-dashed text-gray-400">
            No suggestions. Associate materials to products first.
          </div>
        ) : (
          data.suggestions.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-blue-600">{item.productCode}</p>
                <h3 className="font-bold text-gray-800">{item.productName}</h3>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Qty to Produce</p>
                <p className="text-xl font-bold text-gray-900">{item.quantityToProduce}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Total Value</p>
                <p className="text-lg font-bold text-green-600">${item.totalValue?.toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;