import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import FilterSidebar from './components/FilterSidebar';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import GeminiConsultant from './components/GeminiConsultant';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSize = selectedSize === 'All' || p.size.includes(selectedSize);
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSize && matchSearch;
    });
  }, [selectedCategory, selectedSize, searchQuery]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = (total: number) => {
    setCheckoutTotal(total);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        onToggleSearch={() => setShowSearch(!showSearch)}
      />

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-green-500 text-white px-8 py-4 rounded-full shadow-2xl animate-in fade-in slide-in-from-top-8 duration-500 flex items-center gap-3">
          <i className="fa-solid fa-circle-check text-xl"></i>
          <span className="font-bold uppercase tracking-widest text-xs">Payment Successful! Your Choosebox items are on the way.</span>
        </div>
      )}

      {/* Global Search Bar */}
      {showSearch && (
        <div className="bg-pink-50 border-b border-pink-100 py-4 px-4 sticky top-20 z-40 animate-in slide-in-from-top duration-300">
          <div className="max-w-7xl mx-auto flex items-center">
            <input 
              type="text"
              placeholder="Search for pink perfection..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-gray-700 placeholder-pink-300 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button onClick={() => setShowSearch(false)} className="text-pink-400">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      )}

      <main className="flex-grow">
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar Filters */}
            <FilterSidebar 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />

            {/* Product Grid Area */}
            <div className="flex-1">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">The {selectedCategory} Collection</h2>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">{filteredProducts.length} items found</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-gray-500 cursor-pointer hover:text-pink-600 transition">
                  <span>Sort By: Recommended</span>
                  <i className="fa-solid fa-chevron-down text-[10px]"></i>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-32 text-center">
                  <div className="bg-pink-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fa-solid fa-magnifying-glass text-pink-200 text-3xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 italic">Nothing matches your style... yet!</h3>
                  <p className="text-gray-500 text-sm">Try adjusting your filters to find your next pink obsession.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter text-pink-600">
              CHOOSE<span className="text-pink-400 font-light">BOX</span>
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate destination for curated pink fashion. From soft blushes to bold magentas, we bring you the finest silhouettes for every occasion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 border border-pink-100 rounded-full flex items-center justify-center text-pink-400 hover:bg-pink-600 hover:text-white transition"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="h-10 w-10 border border-pink-100 rounded-full flex items-center justify-center text-pink-400 hover:bg-pink-600 hover:text-white transition"><i className="fa-brands fa-tiktok"></i></a>
              <a href="#" className="h-10 w-10 border border-pink-100 rounded-full flex items-center justify-center text-pink-400 hover:bg-pink-600 hover:text-white transition"><i className="fa-brands fa-facebook-f"></i></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 uppercase text-xs tracking-widest mb-6">Explore</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-pink-600 transition">Our Story</a></li>
              <li><a href="#" className="hover:text-pink-600 transition">Careers</a></li>
              <li><a href="#" className="hover:text-pink-600 transition">Sustainability</a></li>
              <li><a href="#" className="hover:text-pink-600 transition">Store Locator</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 uppercase text-xs tracking-widest mb-6">Customer Care</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-pink-600 transition">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-pink-600 transition">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-pink-600 transition">FAQ</a></li>
              <li><a href="tel:+6288213559243" className="hover:text-pink-600 transition">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 uppercase text-xs tracking-widest mb-6">Join The Club</h4>
            <p className="text-sm text-gray-500 mb-4">Subscribe for exclusive pink-themed drops and offers.</p>
            <div className="flex border-b border-pink-300 pb-2">
              <input 
                type="email" 
                placeholder="choosebox@gmail.com" 
                className="bg-transparent flex-1 focus:outline-none text-sm"
              />
              <button className="text-pink-600 font-bold uppercase text-xs tracking-widest hover:text-pink-800 transition">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-pink-50 text-center text-[10px] text-gray-400 uppercase tracking-[0.2em]">
          &copy; 2026 CHOOSEBOX FASHION. ALL RIGHTS RESERVED.
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={handleCheckout}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQty={handleUpdateQty}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        total={checkoutTotal}
        onSuccess={handlePaymentSuccess}
      />

      <GeminiConsultant />
    </div>
  );
};

export default App;