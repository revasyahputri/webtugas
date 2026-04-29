
import React, { useState } from 'react';
import { getStyleAdvice } from '../services/geminiService';

const GeminiConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setAdvice(null);
    const result = await getStyleAdvice(query);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white shadow-2xl rounded-2xl border border-pink-100 overflow-hidden flex flex-col max-h-[500px]">
          <div className="bg-pink-600 px-4 py-4 flex items-center gap-3">
            <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-pink-600">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">AI Style Consultant</h3>
              <p className="text-pink-100 text-[10px] uppercase tracking-widest">Always chic, always pink</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar min-h-[200px]">
            {advice ? (
              <div className="bg-pink-50 p-4 rounded-xl border border-pink-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="text-sm text-gray-700 leading-relaxed italic">"{advice}"</p>
                <button 
                  onClick={() => setAdvice(null)}
                  className="mt-4 text-[10px] uppercase font-bold text-pink-600 hover:text-pink-800 transition"
                >
                  Ask another question
                </button>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p className="text-xs mb-2">How can I help you today?</p>
                <p className="text-[10px] italic">Try: "What goes best with a fuchsia skirt?"</p>
              </div>
            )}

            {loading && (
              <div className="flex justify-center py-4">
                <div className="animate-bounce text-pink-400">
                  <i className="fa-solid fa-ellipsis text-2xl"></i>
                </div>
              </div>
            )}
          </div>

          {!advice && (
            <form onSubmit={handleAsk} className="p-4 bg-gray-50 border-t border-pink-50 flex gap-2">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask for advice..."
                className="flex-1 bg-white border border-pink-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-pink-600 text-white rounded-lg px-4 py-2 hover:bg-pink-700 transition disabled:opacity-50"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          )}
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 bg-gray-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-pink-600 transition duration-300 group"
      >
        {isOpen ? (
          <i className="fa-solid fa-xmark text-xl"></i>
        ) : (
          <div className="relative">
            <i className="fa-solid fa-message text-xl group-hover:scale-110 transition"></i>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
          </div>
        )}
      </button>
    </div>
  );
};

export default GeminiConsultant;
