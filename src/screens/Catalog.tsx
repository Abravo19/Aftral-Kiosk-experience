import { useState, useMemo } from 'react';
import { Clock, MapPin, Award, ArrowRight, QrCode } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useUser } from '../context/UserContext';
import { useAnalytics } from '../context/AnalyticsContext';
import { QRCodeModal } from '../components/common/QRCodeModal';
import { motion } from 'framer-motion';

export const Catalog = () => {
    const { userProfile } = useUser();
    const { data } = useData();
    const { trackQrScan } = useAnalytics();
    const [filter, setFilter] = useState<'All' | 'Transport' | 'Logistique'>('All');
    const [qrItem, setQrItem] = useState<{ title: string; url: string } | null>(null);

    const filteredData = useMemo(() => {
        if (!data) return [];
        return data.trainingCatalog.filter(item => {
            if (filter !== 'All' && item.category !== filter) return false;
            return true;
        });
    }, [filter, data]);

    const featuredPromo = useMemo(() => {
        if (!data) return undefined;
        return data.newsItems.find(n => n.type === 'PROMOTION' && n.priority === 1);
    }, [data]);

    if (!data) return null;

    const handleShareQr = (item: typeof filteredData[0]) => {
        const url = `https://www.aftral.com/formations/${item.id}`;
        setQrItem({ title: item.title, url });
        trackQrScan();
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-kiosk-xl font-bold text-gray-900">Nos Formations</h1>
                    <p className="text-kiosk-sm text-gray-500 mt-1">
                        {userProfile ? `Profil: ${userProfile}` : 'Catalogue complet'}
                    </p>
                </div>

                <div className="flex bg-gray-100 p-2 rounded-2xl gap-2">
                    {['All', 'Transport', 'Logistique'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-8 py-4 rounded-xl text-kiosk-xs font-bold transition-all
                                ${filter === f ? 'bg-aftral-red text-white shadow-lg' : 'text-gray-500 hover:bg-gray-200'}
                            `}
                        >
                            {f === 'All' ? 'Tout' : f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto pb-32 pr-2">
                <div className="grid grid-cols-2 gap-6">
                    {/* Promo */}
                    {featuredPromo && (
                        <div className="col-span-2 bg-gradient-to-br from-aftral-red to-red-800 rounded-3xl p-8 text-white shadow-kiosk flex items-center justify-between relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                            <div className="relative z-10 max-w-2xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="bg-white/20 px-3 py-1 rounded text-sm font-bold uppercase backdrop-blur-sm">Offre Spéciale</span>
                                </div>
                                <h3 className="text-kiosk-lg font-bold mb-2">{featuredPromo.title}</h3>
                                <p className="text-kiosk-xs opacity-90">{featuredPromo.summary}</p>
                            </div>
                            <button className="bg-white text-aftral-red px-8 py-4 rounded-xl font-bold text-kiosk-sm shadow-lg active:scale-95 transition-transform z-10">
                                Voir l'offre
                            </button>
                        </div>
                    )}

                    {/* Training Cards */}
                    {filteredData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-[380px]"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide ${item.category === 'Transport' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                        {item.category}
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-400">
                                        <Clock size={20} />
                                        <span className="font-medium">{item.duration}</span>
                                    </div>
                                </div>

                                <h3 className="text-kiosk-base font-bold text-gray-900 leading-tight mb-4 line-clamp-2">
                                    {item.title}
                                </h3>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <MapPin className="text-aftral-red shrink-0" size={24} />
                                        <span className="text-lg line-clamp-1">{item.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Award className="text-aftral-red shrink-0" size={24} />
                                        <span className="text-lg line-clamp-1">Certifiant</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button className="flex-1 bg-gray-50 hover:bg-aftral-dark hover:text-white text-gray-900 font-bold py-4 rounded-xl flex items-center justify-between px-6 transition-colors group">
                                    <span>Voir le programme</span>
                                    <ArrowRight className="text-aftral-red group-hover:text-white" size={24} />
                                </button>
                                <button
                                    onClick={() => handleShareQr(item)}
                                    className="bg-gray-50 hover:bg-blue-50 text-gray-500 hover:text-blue-600 p-4 rounded-xl transition-colors border border-gray-200 hover:border-blue-300"
                                    title="Partager via QR Code"
                                >
                                    <QrCode size={22} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* QR Modal */}
            <QRCodeModal
                isOpen={!!qrItem}
                onClose={() => setQrItem(null)}
                title={qrItem?.title || ''}
                subtitle="Détails de la formation"
                url={qrItem?.url || ''}
            />
        </div>
    );
};
