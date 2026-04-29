
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onSuccess: () => void;
}

type PaymentMethod = 'qris' | 'va';

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, items, total, onSuccess }) => {
  const [method, setMethod] = useState<PaymentMethod>('qris');
  const [selectedBank, setSelectedBank] = useState('BCA');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  const vaNumber = "88012" + Math.floor(100000000 + Math.random() * 900000000);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-pink-600 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest">Secure Checkout</h2>
            <p className="text-pink-100 text-xs">Choose your payment method</p>
          </div>
          <button onClick={onClose} className="hover:rotate-90 transition-transform duration-300">
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* Summary Mini */}
          <div className="bg-pink-50 p-4 rounded-2xl flex justify-between items-center">
            <span className="text-gray-600 text-sm font-medium">Total Payment</span>
            <span className="text-xl font-bold text-pink-600 font-mono">Rp {total.toLocaleString()}</span>
          </div>

          {/* Payment Tabs */}
          <div className="flex p-1 bg-gray-100 rounded-xl">
            <button 
              onClick={() => setMethod('qris')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition ${method === 'qris' ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-400'}`}
            >
              <i className="fa-solid fa-qrcode mr-2"></i> QRIS
            </button>
            <button 
              onClick={() => setMethod('va')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition ${method === 'va' ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-400'}`}
            >
              <i className="fa-solid fa-building-columns mr-2"></i> Virtual Account
            </button>
          </div>

          {/* QRIS Content */}
          {method === 'qris' && (
            <div className="flex flex-col items-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="bg-white p-4 border-2 border-pink-100 rounded-2xl shadow-inner">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=CHOOSEBOX_PAYMENT_${total}`} 
                  alt="QRIS Code" 
                  className="w-48 h-48 opacity-90"
                />
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-bold">Scan with any bank or e-wallet</p>
                <div className="flex gap-3 justify-center">
                  <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 font-bold">GoPay</span>
                  <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 font-bold">OVO</span>
                  <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 font-bold">ShopeePay</span>
                  <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 font-bold">Dana</span>
                </div>
              </div>
            </div>
          )}

          {/* VA Content */}
          {method === 'va' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-2 gap-3">
                {['BCA', 'Mandiri', 'BNI', 'BRI'].map(bank => (
                  <button
                    key={bank}
                    onClick={() => setSelectedBank(bank)}
                    className={`p-4 border rounded-xl flex items-center justify-between transition ${selectedBank === bank ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-gray-100 text-gray-400 hover:border-pink-200'}`}
                  >
                    <span className="text-sm font-bold">{bank} Virtual Account</span>
                    {selectedBank === bank && <i className="fa-solid fa-circle-check text-pink-500"></i>}
                  </button>
                ))}
              </div>
              
              <div className="bg-gray-50 p-5 rounded-2xl border border-dashed border-gray-200">
                <p className="text-[10px] text-gray-400 uppercase font-bold mb-2">Account Number</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-mono font-bold text-gray-800 tracking-wider">{vaNumber}</span>
                  <button className="text-pink-600 text-xs font-bold hover:underline">Copy</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="p-6 border-t border-gray-50 bg-gray-50/50">
          <button 
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-pink-600 transition disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isProcessing ? (
              <><i className="fa-solid fa-spinner animate-spin"></i> Verifying Payment...</>
            ) : (
              <>Confirm Payment</>
            )}
          </button>
          <p className="text-center mt-4 text-[10px] text-gray-400">Payment secured by SSL Encryption</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
