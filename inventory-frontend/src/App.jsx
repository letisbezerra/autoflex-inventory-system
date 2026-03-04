import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Package, Truck, LayoutDashboard } from 'lucide-react';

import RawMaterials from './pages/RawMaterials';
import Products from './pages/Products';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <nav className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
          <div className="p-6 border-b border-slate-800">
            <h1 className="text-xl font-bold text-blue-400 tracking-tight">Autoflex</h1>
            <p className="text-xs text-slate-400">Inventory System</p>
          </div>
          
          <ul className="flex-1 p-4 space-y-2">
            <li>
              <Link to="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                <LayoutDashboard size={20} /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                <Package size={20} /> Products
              </Link>
            </li>
            <li>
              <Link to="/materials" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                <Truck size={20} /> Raw Materials
              </Link>
            </li>
          </ul>
        </nav>

        <main className="flex-1 overflow-y-auto bg-slate-50">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/materials" element={<RawMaterials />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;