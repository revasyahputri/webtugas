
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (total: number) => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQty: (id: number, delta: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckout, items, onRemove, onUpdateQty }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="px-6 py-6 border-b border-pink-50 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 italic">Shopping Bag</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-pink-500 transition">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="bg-pink-50 h-20 w-20 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-bag-shopping text-pink-300 text-3xl"></i>
              </div>
              <p className="text-gray-500 uppercase tracking-widest text-xs">Your bag is empty</p>
              <button 
                onClick={onClose}
                className="text-pink-600 border-b border-pink-600 font-bold py-1 px-4 text-sm"
              >
                Go Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-24 w-20 bg-gray-100 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                        <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-pink-500">
                          <i className="fa-solid fa-trash-can text-xs"></i>
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-tight">{item.color} | S</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center border border-pink-100">
                        <button 
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="px-2 py-1 text-gray-500 hover:text-pink-500"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-bold text-gray-800">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="px-2 py-1 text-gray-500 hover:text-pink-500"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-bold text-pink-600">Rp {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-8 border-t border-pink-50 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 uppercase tracking-widest text-xs">Subtotal</span>
              <span className="text-xl font-bold text-gray-900">Rp {total.toLocaleString()}</span>
            </div>
            <button 
              onClick={() => onCheckout(total)}
              className="w-full bg-gray-900 text-white py-4 uppercase tracking-widest text-sm font-bold hover:bg-pink-600 transition"
            >
              Checkout Now
            </button>
            <p className="text-[10px] text-center text-gray-400">Taxes and shipping calculated at checkout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
