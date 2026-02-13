import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { X, Delete } from 'lucide-react';

interface AdminPinModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const AdminPinModal: React.FC<AdminPinModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);
    const { login } = useAdmin();

    if (!isOpen) return null;

    const handleDigit = (digit: string) => {
        if (pin.length >= 4) return;
        const newPin = pin + digit;
        setPin(newPin);
        setError(false);

        if (newPin.length === 4) {
            setTimeout(() => {
                if (login(newPin)) {
                    setPin('');
                    onSuccess();
                } else {
                    setError(true);
                    setShake(true);
                    setTimeout(() => {
                        setShake(false);
                        setPin('');
                    }, 600);
                }
            }, 200);
        }
    };

    const handleDelete = () => {
        setPin(prev => prev.slice(0, -1));
        setError(false);
    };

    const handleClose = () => {
        setPin('');
        setError(false);
        onClose();
    };

    const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

    return (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center" onClick={handleClose}>
            <div
                className={`bg-gray-900 rounded-3xl p-8 w-[420px] shadow-2xl border border-gray-700 ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Mode Admin</h2>
                        <p className="text-gray-400 text-sm mt-1">Entrez le code PIN</p>
                    </div>
                    <button onClick={handleClose} className="text-gray-500 hover:text-white transition-colors p-2">
                        <X size={24} />
                    </button>
                </div>

                {/* PIN Dots */}
                <div className="flex justify-center gap-5 mb-8">
                    {[0, 1, 2, 3].map(i => (
                        <div
                            key={i}
                            className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${i < pin.length
                                ? error
                                    ? 'bg-red-500 border-red-500'
                                    : 'bg-white border-white'
                                : 'border-gray-600'
                                }`}
                        />
                    ))}
                </div>

                {error && (
                    <p className="text-red-400 text-center text-sm mb-4 font-medium">Code incorrect. Réessayez.</p>
                )}

                {/* Number Pad */}
                <div className="grid grid-cols-3 gap-3">
                    {digits.map((d, i) => {
                        if (d === '') return <div key={i} />;
                        if (d === 'del') {
                            return (
                                <button
                                    key={i}
                                    onClick={handleDelete}
                                    className="h-20 rounded-2xl bg-gray-800 text-gray-400 flex items-center justify-center hover:bg-gray-700 active:scale-95 transition-all"
                                >
                                    <Delete size={28} />
                                </button>
                            );
                        }
                        return (
                            <button
                                key={i}
                                onClick={() => handleDigit(d)}
                                className="h-20 rounded-2xl bg-gray-800 text-white text-3xl font-bold hover:bg-gray-700 active:bg-gray-600 active:scale-95 transition-all"
                            >
                                {d}
                            </button>
                        );
                    })}
                </div>

                <p className="text-gray-600 text-xs text-center mt-6">PIN par défaut: 0000</p>
            </div>

            <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }
      `}</style>
        </div>
    );
};
