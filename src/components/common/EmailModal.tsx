import React, { useState } from 'react';
import { X, Send, Check, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VirtualKeyboard } from './VirtualKeyboard';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, title = "Recevoir la brochure" }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setEmail('');
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="bg-aftral-red p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Mail size={32} />
                <h2 className="text-2xl font-bold">{title}</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            <div className="p-8">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center h-[400px]">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <Check size={48} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Envoyé !</h3>
                  <p className="text-xl text-gray-500">Vous recevrez les informations dans quelques instants.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-lg font-bold text-gray-700 mb-3">Votre adresse Email</label>
                    <input
                      type="email"
                      value={email}
                      readOnly
                      placeholder="votre.nom@email.com"
                      className="w-full text-2xl p-4 rounded-xl border-2 border-gray-200 focus:border-aftral-red focus:ring-4 focus:ring-red-100 outline-none transition-all bg-gray-50"
                    />
                  </div>

                  <div className="bg-gray-100 rounded-xl overflow-hidden pb-20"> {/* Keyboard Container */}
                      <div className="p-2 border-b border-gray-200 text-xs text-center text-gray-400 font-bold uppercase tracking-wider">Clavier Virtuel</div>
                      <VirtualKeyboard 
                        onChange={setEmail} 
                        inputName="email"
                        keyboardRef={React.useRef(null)}
                        className="relative shadow-none bg-transparent"
                        layout="email"
                      />
                  </div>

                  <button
                    type="submit"
                    disabled={!email.includes('@') || status === 'sending'}
                    className={`
                      absolute bottom-8 right-8 left-8 py-4 rounded-xl text-xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl z-20
                      ${!email.includes('@') 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-aftral-dark text-white hover:bg-black active:scale-95'
                      }
                    `}
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        Envoi...
                      </>
                    ) : (
                      <>
                        Envoyer maintenant <Send size={24} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
