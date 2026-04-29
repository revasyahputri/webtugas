
import React, { useState } from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onToggleSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onToggleSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-pink-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-pink-500 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
          </button>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-3xl font-bold tracking-tighter text-pink-600 cursor-pointer">
              CHOOSE<span className="text-pink-400 font-light">BOX</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-pink-500 transition font-medium uppercase text-xs tracking-widest">New Arrivals</a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition font-medium uppercase text-xs tracking-widest">Collections</a>
            <a href="#" className="text-pink-600 hover:text-pink-700 transition font-bold uppercase text-xs tracking-widest border-b-2 border-pink-500">Sale</a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition font-medium uppercase text-xs tracking-widest">Store Locator</a>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <button onClick={onToggleSearch} className="text-gray-500 hover:text-pink-500 transition">
              <i className="fa-solid fa-magnifying-glass text-lg"></i>
            </button>
            <button className="hidden sm:block text-gray-500 hover:text-pink-500 transition">
              <i className="fa-regular fa-user text-lg"></i>
            </button>
            <button className="hidden sm:block text-gray-500 hover:text-pink-500 transition">
              <i className="fa-regular fa-heart text-lg"></i>
            </button>
            <button 
              onClick={onOpenCart}
              className="relative text-gray-500 hover:text-pink-500 transition"
            >
              <i className="fa-solid fa-cart-shopping text-lg"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-pink-50 border-b border-pink-200">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <a href="#" className="block text-gray-700 font-medium py-2">NEW ARRIVALS</a>
            <a href="#" className="block text-gray-700 font-medium py-2">COLLECTIONS</a>
            <a href="#" className="block text-pink-600 font-bold py-2">SALE</a>
            <a href="#" className="block text-gray-700 font-medium py-2">STORE LOCATOR</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
