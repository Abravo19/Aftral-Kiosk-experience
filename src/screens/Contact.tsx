import React, { useState, useRef } from 'react';
import { Send, Check } from 'lucide-react';
import { VirtualKeyboard } from '../components/common/VirtualKeyboard';

export const Contact: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [inputs, setInputs] = useState({ name: '', phone: '', subject: 'Chercher une formation' });
  const [activeInput, setActiveInput] = useState('');
  const keyboardRef = useRef<any>(null);

  const onChange = (input: string) => {
    setInputs({ ...inputs, [activeInput]: input });
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name;
    setActiveInput(name);
    // Sync keyboard with current input value
    if (keyboardRef.current) {
      keyboardRef.current.setInput(inputs[name as keyof typeof inputs] || "");
    }
  };

  // Close keyboard on submit or if user clicks outside (optional, simplified here)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setActiveInput('');
  };

  if (sent) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-bounce">
          <Check size={48} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Demande enregistrée !</h2>
        <p className="text-xl text-gray-600 mb-8">Un conseiller AFTRAL vous rappellera sous 24h.</p>
        <button onClick={() => setSent(false)} className="text-aftral-red font-bold underline">Nouvelle demande</button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col max-w-lg mx-auto pt-4 relative">
      <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Être rappelé</h1>
      <p className="text-gray-500 mb-6 text-center text-lg">Laissez vos coordonnées, nous vous contactons rapidement.</p>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex-1 overflow-y-auto mb-20">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Votre Nom</label>
          <input
            name="name"
            value={inputs.name}
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            onFocus={handleInputFocus}
            required
            type="text"
            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-aftral-red outline-none text-lg"
            placeholder="Ex: Jean Dupont"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Numéro de téléphone</label>
          <input
            name="phone"
            value={inputs.phone}
            onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
            onFocus={handleInputFocus}
            required
            type="tel"
            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-aftral-red outline-none text-lg"
            placeholder="06 12 34 56 78"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Sujet</label>
          <select
            name="subject"
            value={inputs.subject}
            onChange={(e) => setInputs({ ...inputs, subject: e.target.value })}
            onFocus={(e) => setActiveInput('')} // Hide keyboard for select
            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-aftral-red outline-none text-lg"
          >
            <option>Chercher une formation</option>
            <option>Trouver une alternance</option>
            <option>Information entreprise</option>
            <option>Autre</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-aftral-red text-white font-bold text-xl py-4 rounded-xl shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-3">
          <Send size={24} />
          Envoyer
        </button>
      </form>

      {/* Virtual Keyboard */}
      {activeInput && (
        <VirtualKeyboard
          inputName={activeInput}
          onChange={onChange}
          keyboardRef={keyboardRef}
        />
      )}
    </div>
  );
};
