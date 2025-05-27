import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Rockforestbanner.png';



const AppBar: React.FC = () => {
  return (
    <header className=" bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span className="text-2xl font-extrabold text-red-600 tracking-wide rock-font">
           ROCK FOREST
           </span>
           </Link>
        </div>

        <div className="text-sm text-gray-300">15 พฤศจิกายน 2025</div>

        <div className="flex items-center space-x-6">
          <nav className="space-x-6">
            <Link to="/shop" className="hover:text-yellow-400 transition">Shop</Link>
            <Link to="/contact" className="hover:text-yellow-400 transition">Contact us</Link>
          </nav>
          
        </div>
      </div>
    </header>
  );
};

export default AppBar;