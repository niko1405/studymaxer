import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

import { questions } from '../../config/mock';
import useStudyMaxer from '../hooks/useStudyMaxer';


export function OnboardingQuestions() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});

  const { setAppState } = useStudyMaxer();

  const currentQuestion = questions[currentStep];
  const currentAnswers = answers[currentQuestion.id] || (currentQuestion.type === 'text-input' ? '' : []);

  const toggleAnswer = (optionId: string) => {
    const newAnswers = { ...answers };
    const current = newAnswers[currentQuestion.id] || [];
    
    if (current.includes(optionId)) {
      newAnswers[currentQuestion.id] = current.filter((id: string) => id !== optionId);
    } else if (current.length < (currentQuestion.maxSelections || 5)) {
      newAnswers[currentQuestion.id] = [...current, optionId];
    }
    
    setAnswers(newAnswers);
  };

  const handleTextInput = (value: string) => {
    const newAnswers = { ...answers };
    newAnswers[currentQuestion.id] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setAppState('main');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isValid = currentQuestion.type === 'text-input' 
    ? (currentAnswers as string).trim().length > 0
    : (currentAnswers as string[]).length > 0;

  return (
    <div className="min-h-screen bg-[#0a1628] text-white px-6 py-8 animate-in fade-in duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-30"
            disabled={currentStep === 0}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <h2 className="text-white">{currentQuestion.title}</h2>
          
          <div className="w-6"></div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Progress</span>
            <span className="text-gray-400">{currentStep + 1}/{questions.length}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-[#3b82f6] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h1 className="mb-4">
          {currentQuestion.question}
        </h1>

        <p className="text-gray-400 mb-8">
          {currentQuestion.description}
        </p>

        {currentQuestion.type === 'text-input' ? (
          <textarea
            value={currentAnswers as string}
            onChange={(e) => handleTextInput(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="w-full bg-gray-800/50 border-2 border-gray-700 focus:border-[#3b82f6] text-white px-6 py-4 rounded-2xl outline-none transition-all mb-12 min-h-[200px] resize-none"
          />
        ) : (
          <div className="grid grid-cols-2 gap-3 mb-12">
            {currentQuestion.options?.map((option) => {
              const Icon = option.icon;
              const isSelected = (currentAnswers as string[]).includes(option.id);
              
              return (
                <button
                  key={option.id}
                  onClick={() => toggleAnswer(option.id)}
                  className={`flex items-center justify-center gap-3 px-4 py-3 rounded-full border-2 transition-all animate-in zoom-in duration-300 ${
                    isSelected
                      ? 'border-[#3b82f6] bg-[#3b82f6]/20'
                      : 'border-gray-600 bg-transparent hover:border-gray-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed text-white py-4 rounded-full transition-all flex items-center justify-center"
          >
            Back
          </button>
          
          <button
            onClick={handleNext}
            disabled={!isValid}
            className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-full transition-all flex items-center justify-center"
          >
            {currentStep === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
