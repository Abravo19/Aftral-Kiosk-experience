import { FC, ReactNode } from 'react';
import { X, QrCode, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QRCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    url: string;
}

export const QRCodeModal: FC<QRCodeModalProps> = ({ isOpen, onClose, title, subtitle, url }) => {
    const qrUrl = `https://chart.googleapis.com/chart?chs=280x280&cht=qr&chl=${encodeURIComponent(url)}&choe=UTF-8`;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.85, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="bg-white rounded-3xl p-10 max-w-md w-full mx-6 shadow-2xl text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors p-2"
                        >
                            <X size={28} />
                        </button>

                        {/* Header */}
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <div className="bg-aftral-red/10 p-3 rounded-xl">
                                <QrCode size={28} className="text-aftral-red" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">{title}</h2>
                        {subtitle && <p className="text-gray-500 text-sm mb-6">{subtitle}</p>}

                        {/* QR Code */}
                        <div className="bg-gray-50 rounded-2xl p-6 mb-6 inline-block border border-gray-100">
                            <img
                                src={qrUrl}
                                alt={`QR Code: ${title}`}
                                className="w-[280px] h-[280px] mx-auto"
                                crossOrigin="anonymous"
                            />
                        </div>

                        {/* Instructions */}
                        <div className="flex items-center justify-center gap-3 text-gray-500 mb-4">
                            <Smartphone size={24} className="text-aftral-red" />
                            <p className="text-lg font-medium">Scannez avec votre téléphone</p>
                        </div>
                        <p className="text-sm text-gray-400">
                            Scan with your phone to save this information
                        </p>

                        {/* URL Preview */}
                        <div className="mt-4 bg-gray-50 rounded-xl px-4 py-2 text-xs text-gray-400 truncate border border-gray-100">
                            {url}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
