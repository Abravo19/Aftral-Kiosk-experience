import React, { useState } from 'react';
import { ArrowRight, CheckCircle, RefreshCcw } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Screen } from '../types/types';
import { useNavigation } from '../context/NavigationContext';

export const Quiz: React.FC = () => {
  const { navigate } = useNavigation();
  const { data } = useData();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  if (!data) return null;

  const questions = data.quizQuestions;

  const handleAnswer = (index: number) => {
    const newAnswers = [...answers, index];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center">
        <div className="bg-green-100 text-green-600 p-6 rounded-full mb-6">
          <CheckCircle size={64} />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Profil identifié !</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md">
          Il semble que les métiers de la <strong className="text-gray-900">Logistique et de l'Organisation</strong> soient faits pour vous.
        </p>

        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border border-gray-100 text-left mb-8">
          <h3 className="font-bold text-lg text-gray-800 mb-4">Formations suggérées :</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-gray-700">
              <span className="w-2 h-2 rounded-full bg-aftral-red"></span>
              TS Méthodes et Exploitation Logistique
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <span className="w-2 h-2 rounded-full bg-aftral-red"></span>
              Responsable de Production Transport
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          <button
            onClick={() => navigate(Screen.CATALOG)}
            className="w-full py-4 bg-aftral-red text-white text-xl font-bold rounded-xl shadow-lg active:scale-95 transition-transform"
          >
            Voir ces formations
          </button>
          <button
            onClick={resetQuiz}
            className="flex items-center justify-center gap-2 text-gray-500 font-medium py-2"
          >
            <RefreshCcw size={18} /> Recommencer le quiz
          </button>
        </div>
      </div>
    );
  }

  const question = questions[step];

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <div className="flex justify-between text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
          <span>Question {step + 1}/{questions.length}</span>
          <span>Orientation</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-aftral-red transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-10 leading-snug">{question.question}</h2>

      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            className="group flex items-center justify-between p-6 bg-white border-2 border-gray-100 rounded-xl shadow-sm hover:border-aftral-red hover:shadow-md active:scale-95 transition-all text-left"
          >
            <span className="text-xl font-medium text-gray-700 group-hover:text-aftral-red">{option}</span>
            <ArrowRight className="text-gray-300 group-hover:text-aftral-red transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
};
