
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative bg-white">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {/* Discount Badge */}
        <div className="absolute top-4 left-0 bg-pink-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
          {product.discount}% OFF
        </div>
        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 bg-white/80 backdrop-blur rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:text-pink-500 transition shadow-sm">
          <i className="fa-regular fa-heart"></i>
        </button>
        {/* Quick Add Button */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/10 backdrop-blur-md">
          <button 
            onClick={() => onAddToCart(product)}
            className="w-full bg-pink-600 text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-pink-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-sm font-medium text-gray-900 mb-1 group-hover:text-pink-600 transition">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 mb-2 uppercase tracking-tight">{product.category} | {product.color}</p>
        <div className="flex items-center gap-3">
          <span className="text-pink-600 font-bold">Rp {product.price.toLocaleString()}</span>
          <span className="text-xs text-gray-400 line-through">Rp {product.originalPrice.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
