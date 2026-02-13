import React, { useState } from 'react';
import { Save, RotateCcw, AlertTriangle, Check, Eye, EyeOff, Clock, Lock } from 'lucide-react';
import { useData } from '../context/DataContext';

export const AdminSettings: React.FC = () => {
    const { adminSettings, updateAdminSettings, resetToDefaults } = useData();
    const [newPin, setNewPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [showPin, setShowPin] = useState(false);
    const [timeout, setTimeout_] = useState(String(adminSettings.screensaverTimeout / 1000));
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [pinSaved, setPinSaved] = useState(false);
    const [timeoutSaved, setTimeoutSaved] = useState(false);

    const handleSavePin = () => {
        if (newPin.length !== 4 || newPin !== confirmPin) return;
        updateAdminSettings({ pinCode: newPin });
        setNewPin('');
        setConfirmPin('');
        setPinSaved(true);
        window.setTimeout(() => setPinSaved(false), 3000);
    };

    const handleSaveTimeout = () => {
        const val = parseInt(timeout);
        if (isNaN(val) || val < 10) return;
        updateAdminSettings({ screensaverTimeout: val * 1000 });
        setTimeoutSaved(true);
        window.setTimeout(() => setTimeoutSaved(false), 3000);
    };

    const handleReset = () => {
        resetToDefaults();
        setTimeout_('90');
        setShowResetConfirm(false);
    };

    const pinValid = newPin.length === 4 && newPin === confirmPin;

    return (
        <div className="max-w-3xl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Configuration</h1>
                <p className="text-gray-400">Paramètres du kiosque et de l'administration</p>
            </div>

            {/* PIN Section */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-purple-500/10 p-3 rounded-xl">
                        <Lock size={24} className="text-purple-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Code PIN Admin</h2>
                        <p className="text-gray-500 text-sm">Modifier le code d'accès au mode admin</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2 font-medium">Nouveau PIN (4 chiffres)</label>
                        <div className="relative">
                            <input
                                type={showPin ? 'text' : 'password'}
                                value={newPin}
                                onChange={e => {
                                    const v = e.target.value.replace(/\D/g, '').slice(0, 4);
                                    setNewPin(v);
                                }}
                                placeholder="••••"
                                maxLength={4}
                                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-purple-500 focus:outline-none transition-colors font-mono text-xl tracking-widest"
                            />
                            <button
                                onClick={() => setShowPin(!showPin)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                            >
                                {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2 font-medium">Confirmer le PIN</label>
                        <input
                            type={showPin ? 'text' : 'password'}
                            value={confirmPin}
                            onChange={e => {
                                const v = e.target.value.replace(/\D/g, '').slice(0, 4);
                                setConfirmPin(v);
                            }}
                            placeholder="••••"
                            maxLength={4}
                            className={`w-full bg-gray-800 border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors font-mono text-xl tracking-widest ${confirmPin && confirmPin !== newPin ? 'border-red-500' : 'border-gray-700 focus:border-purple-500'
                                }`}
                        />
                    </div>
                </div>

                <button
                    onClick={handleSavePin}
                    disabled={!pinValid}
                    className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-purple-700 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {pinSaved ? <Check size={18} /> : <Save size={18} />}
                    {pinSaved ? 'PIN sauvegardé !' : 'Enregistrer le PIN'}
                </button>
            </div>

            {/* Timeout Section */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-500/10 p-3 rounded-xl">
                        <Clock size={24} className="text-blue-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Écran de veille</h2>
                        <p className="text-gray-500 text-sm">Temps d'inactivité avant l'activation de l'écran de veille</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                        <input
                            type="number"
                            value={timeout}
                            onChange={e => setTimeout_(e.target.value)}
                            min={10}
                            max={600}
                            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors text-xl font-mono"
                        />
                    </div>
                    <span className="text-gray-400 font-medium text-lg">secondes</span>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                    Valeur actuelle : <span className="text-gray-400 font-bold">{adminSettings.screensaverTimeout / 1000}s</span> • Minimum : 10s • Maximum : 600s
                </p>

                <button
                    onClick={handleSaveTimeout}
                    disabled={isNaN(parseInt(timeout)) || parseInt(timeout) < 10}
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {timeoutSaved ? <Check size={18} /> : <Save size={18} />}
                    {timeoutSaved ? 'Timeout sauvegardé !' : 'Enregistrer le timeout'}
                </button>
            </div>

            {/* Reset Section */}
            <div className="bg-gray-900 border border-red-900/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-red-500/10 p-3 rounded-xl">
                        <AlertTriangle size={24} className="text-red-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Zone dangereuse</h2>
                        <p className="text-gray-500 text-sm">Réinitialiser toutes les données aux valeurs par défaut</p>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mb-4">
                    Cette action supprimera toutes les modifications faites via l'admin (actualités ajoutées, configuration personnalisée)
                    et restaurera les données originales du fichier <code className="text-gray-400 bg-gray-800 px-2 py-0.5 rounded">data.json</code>.
                </p>

                {showResetConfirm ? (
                    <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                        <AlertTriangle size={20} className="text-red-400 shrink-0" />
                        <p className="text-red-300 text-sm flex-1">Êtes-vous sûr ? Cette action est irréversible.</p>
                        <button
                            onClick={handleReset}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 active:scale-95 transition-all text-sm"
                        >
                            Confirmer
                        </button>
                        <button
                            onClick={() => setShowResetConfirm(false)}
                            className="text-gray-400 hover:text-white px-3 py-2 rounded-lg transition-colors text-sm"
                        >
                            Annuler
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setShowResetConfirm(true)}
                        className="flex items-center gap-2 bg-gray-800 text-red-400 px-5 py-2.5 rounded-xl font-medium hover:bg-red-500/10 hover:border-red-500/30 border border-gray-700 transition-all"
                    >
                        <RotateCcw size={18} />
                        Réinitialiser tout
                    </button>
                )}
            </div>
        </div>
    );
};
