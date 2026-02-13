import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, Megaphone, Newspaper as NewsIcon } from 'lucide-react';
import { useData } from '../context/DataContext';
import { NewsItem, NewsType, Screen } from '../types/types';

interface NewsFormData {
    type: NewsType;
    title: string;
    summary: string;
    body: string;
    priority: number;
    startDate: string;
    endDate: string;
    ctaLabel: string;
    ctaTarget: Screen | '';
}

const emptyForm: NewsFormData = {
    type: 'NEWS',
    title: '',
    summary: '',
    body: '',
    priority: 2,
    startDate: '',
    endDate: '',
    ctaLabel: '',
    ctaTarget: '',
};

export const AdminNews: React.FC = () => {
    const { data, addNewsItem, updateNewsItem, deleteNewsItem } = useData();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [form, setForm] = useState<NewsFormData>(emptyForm);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    if (!data) return null;

    const handleEdit = (item: NewsItem) => {
        setEditingId(item.id);
        setIsAdding(false);
        setForm({
            type: item.type,
            title: item.title,
            summary: item.summary,
            body: item.body,
            priority: item.priority,
            startDate: item.startDate || '',
            endDate: item.endDate || '',
            ctaLabel: item.ctaLabel,
            ctaTarget: item.ctaTarget || '',
        });
    };

    const handleAdd = () => {
        setIsAdding(true);
        setEditingId(null);
        setForm(emptyForm);
    };

    const handleCancel = () => {
        setEditingId(null);
        setIsAdding(false);
        setForm(emptyForm);
    };

    const handleSave = () => {
        if (!form.title.trim()) return;

        if (isAdding) {
            const newItem: NewsItem = {
                id: Date.now().toString(),
                type: form.type,
                title: form.title,
                summary: form.summary,
                body: form.body,
                priority: form.priority,
                startDate: form.startDate || undefined,
                endDate: form.endDate || undefined,
                ctaLabel: form.ctaLabel,
                ctaTarget: form.ctaTarget ? (form.ctaTarget as Screen) : undefined,
            };
            addNewsItem(newItem);
        } else if (editingId) {
            updateNewsItem(editingId, {
                type: form.type,
                title: form.title,
                summary: form.summary,
                body: form.body,
                priority: form.priority,
                startDate: form.startDate || undefined,
                endDate: form.endDate || undefined,
                ctaLabel: form.ctaLabel,
                ctaTarget: form.ctaTarget ? (form.ctaTarget as Screen) : undefined,
            });
        }
        handleCancel();
    };

    const handleDelete = (id: string) => {
        deleteNewsItem(id);
        setDeleteConfirm(null);
    };

    const showForm = isAdding || editingId;

    return (
        <div className="max-w-6xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Gestion des Actualités</h1>
                    <p className="text-gray-400">{data.newsItems.length} article(s) au total</p>
                </div>
                {!showForm && (
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 bg-aftral-red text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 active:scale-95 transition-all shadow-lg"
                    >
                        <Plus size={20} />
                        Ajouter
                    </button>
                )}
            </div>

            {/* Form */}
            {showForm && (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">
                            {isAdding ? 'Nouvelle actualité' : 'Modifier l\'actualité'}
                        </h2>
                        <button onClick={handleCancel} className="text-gray-500 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Type */}
                        <div>
                            <label className="block text-gray-400 text-sm mb-2 font-medium">Type</label>
                            <select
                                value={form.type}
                                onChange={e => setForm({ ...form, type: e.target.value as NewsType })}
                                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-aftral-red focus:outline-none transition-colors"
                            >
                                <option value="NEWS">Actualité</option>
                                <option value="PROMOTION">Promotion</option>
                            </select>
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="block text-gray-400 text-sm mb-2 font-medium">Priorité</label>
                            <select
                                value={form.priority}
                                onChange={e => setForm({ ...form, priority: Number(e.target.value) })}
                                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-aftral-red focus:outline-none transition-colors"
                            >
                                <option value={1}>⭐ Haute (Mise en avant)</option>
                                <option value={2}>Normal</option>
                            </select>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                        <label className="block text-gray-400 text-sm mb-2 font-medium">Titre *</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={e => setForm({ ...form, title: e.target.value })}
                            placeholder="Titre de l'actualité..."
                            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-aftral-red focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Summary */}
                    <div className="mb-4">
                        <label className="block text-gray-400 text-sm mb-2 font-medium">Résumé</label>
                        <input
                            type="text"
                            value={form.summary}
                            onChange={e => setForm({ ...form, summary: e.target.value })}
                            placeholder="Résumé court..."
                            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-aftral-red focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Body */}
                    <div className="mb-4">
                        <label className="block text-gray-400 text-sm mb-2 font-medium">Contenu</label>
                        <textarea
                            value={form.body}
                            onChange={e => setForm({ ...form, body: e.target.value })}
                            placeholder="Contenu détaillé de l'actualité..."
                            rows={4}
                            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-aftral-red focus:outline-none transition-colors resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Start Date */}
                        <div>
                            <label className="block text-gray-400 text-sm mb-2 font-medium">Date début</label>
                            <input
                                type="date"
                                value={form.startDate}
                                onChange={e => setForm({ ...form, startDate: e.target.value })}
                                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-aftral-red focus:outline-none transition-colors"
                            />
                        </div>
                        {/* End Date */}
                        <div>
                            <label className="block text-gray-400 text-sm mb-2 font-medium">Date fin</label>
                            <input
                                type="date"
                                value={form.endDate}
                                onChange={e => setForm({ ...form, endDate: e.target.value })}
                                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-aftral-red focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {/* CTA Label */}
                        <div>
                            <label className="block text-gray-400 text-sm mb-2 font-medium">Label bouton CTA</label>
                            <input
                                type="text"
                                value={form.ctaLabel}
                                onChange={e => setForm({ ...form, ctaLabel: e.target.value })}
                                placeholder="Ex: Voir les conditions"
                                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-aftral-red focus:outline-none transition-colors"
                            />
                        </div>
                        {/* CTA Target */}
                        <div>
                            <label className="block text-gray-400 text-sm mb-2 font-medium">Page cible CTA</label>
                            <select
                                value={form.ctaTarget}
                                onChange={e => setForm({ ...form, ctaTarget: e.target.value as Screen | '' })}
                                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-aftral-red focus:outline-none transition-colors"
                            >
                                <option value="">Aucune</option>
                                <option value="CATALOG">Catalogue</option>
                                <option value="CONTACT">Contact</option>
                                <option value="EVENTS">Événements</option>
                                <option value="NEWS">Actualités</option>
                            </select>
                        </div>
                    </div>

                    {/* Save */}
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={handleCancel}
                            className="px-6 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-all font-medium"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!form.title.trim()}
                            className="flex items-center gap-2 bg-aftral-red text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <Check size={20} />
                            {isAdding ? 'Créer' : 'Enregistrer'}
                        </button>
                    </div>
                </div>
            )}

            {/* News List */}
            <div className="space-y-3">
                {data.newsItems.map(item => (
                    <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-5 group hover:border-gray-700 transition-all">
                        {/* Type Icon */}
                        <div className={`shrink-0 p-3 rounded-xl ${item.type === 'PROMOTION' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-500/10 text-blue-400'
                            }`}>
                            {item.type === 'PROMOTION' ? <Megaphone size={24} /> : <NewsIcon size={24} />}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-white font-bold text-lg truncate">{item.title}</h3>
                                {item.priority === 1 && (
                                    <span className="shrink-0 bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2.5 py-1 rounded-full">
                                        ⭐ Featured
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-500 text-sm truncate">{item.summary}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleEdit(item)}
                                className="p-3 rounded-xl bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
                            >
                                <Pencil size={18} />
                            </button>
                            {deleteConfirm === item.id ? (
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all"
                                    >
                                        <Check size={18} />
                                    </button>
                                    <button
                                        onClick={() => setDeleteConfirm(null)}
                                        className="p-3 rounded-xl bg-gray-800 text-gray-400 hover:text-white transition-all"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setDeleteConfirm(item.id)}
                                    className="p-3 rounded-xl bg-gray-800 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {data.newsItems.length === 0 && (
                    <div className="text-center py-16">
                        <NewsIcon size={48} className="mx-auto text-gray-700 mb-4" />
                        <p className="text-gray-500 text-lg">Aucune actualité</p>
                        <p className="text-gray-600 text-sm">Cliquez sur "Ajouter" pour créer votre première actualité</p>
                    </div>
                )}
            </div>
        </div>
    );
};
