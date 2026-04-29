
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden pink-gradient mb-8">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <span className="text-pink-600 font-bold tracking-widest uppercase text-sm mb-4">Summer Season Sale</span>
        <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          THE <span className="text-pink-500 italic">CHOOSEBOX</span> <br/> EVENT
        </h2>
        <p className="max-w-xl text-gray-600 mb-8 text-lg">
          Discover our curated collection of blush, rose, and magenta styles. 
          Limited time offer - up to 70% off selected items.
        </p>
        <div className="flex gap-4">
          <button className="bg-gray-900 text-white px-10 py-4 rounded-none hover:bg-pink-600 transition duration-300 font-medium uppercase tracking-tighter text-sm">
            Shop Everything
          </button>
        </div>
      </div>
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-pink-200/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-rose-200/50 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Hero;
