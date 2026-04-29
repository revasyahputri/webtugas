
import React from 'react';
import { CATEGORIES, SIZES } from '../constants';

interface FilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  selectedSize: string;
  setSelectedSize: (s: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  selectedCategory, 
  setSelectedCategory,
  selectedSize,
  setSelectedSize
}) => {
  return (
    <div className="w-full md:w-64 space-y-10 pr-6">
      {/* Search Result Count */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 pb-2 border-b border-pink-100">Categories</h3>
        <div className="space-y-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`block w-full text-left text-sm transition ${selectedCategory === cat ? 'text-pink-600 font-bold' : 'text-gray-500 hover:text-pink-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 pb-2 border-b border-pink-100">Size</h3>
        <div className="grid grid-cols-3 gap-2">
          {SIZES.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-2 text-xs border transition ${selectedSize === size ? 'border-pink-500 bg-pink-500 text-white' : 'border-gray-200 text-gray-600 hover:border-pink-300'}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 pb-2 border-b border-pink-100">Price Range</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-pink-500 w-4 h-4" />
            <span className="text-sm text-gray-600">Under Rp 200.000</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-pink-500 w-4 h-4" />
            <span className="text-sm text-gray-600">Rp 200.000 - Rp 500.000</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-pink-500 w-4 h-4" />
            <span className="text-sm text-gray-600">Above Rp 500.000</span>
          </label>
        </div>
      </div>

      <div className="pt-6">
        <div className="p-5 bg-pink-50 border border-pink-100 rounded-lg">
          <p className="text-xs text-pink-700 italic">"Style is a way to say who you are without having to speak."</p>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
