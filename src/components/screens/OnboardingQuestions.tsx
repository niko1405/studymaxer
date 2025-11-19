import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Code, Palette, Beaker, Heart, Briefcase, Leaf, Dumbbell, Music, BookOpen, Landmark } from 'lucide-react';

interface OnboardingQuestionsProps {
  onComplete: (data: any) => void;
}

const questions = [
  {
    id: 1,
    title: 'Your Interests',
    question: 'Which topics fascinate you the most?',
    description: 'Choose up to 5 areas that you are really passionate about. This helps us understand your passions.',
    type: 'multiple-choice',
    options: [
      { id: 'tech', label: 'Technology & IT', icon: Code },
      { id: 'art', label: 'Art & Design', icon: Palette },
      { id: 'science', label: 'Science', icon: Beaker },
      { id: 'health', label: 'Health', icon: Heart },
      { id: 'social', label: 'Social', icon: Heart },
      { id: 'business', label: 'Business', icon: Briefcase },
      { id: 'nature', label: 'Nature', icon: Leaf },
      { id: 'sports', label: 'Sports', icon: Dumbbell },
      { id: 'music', label: 'Music', icon: Music },
      { id: 'history', label: 'History', icon: BookOpen },
      { id: 'politics', label: 'Politics', icon: Landmark },
    ],
    maxSelections: 5,
  },
  {
    id: 2,
    title: 'Your Strengths',
    question: 'What are your favorite subjects?',
    description: 'Select the subjects you enjoy most in school.',
    type: 'multiple-choice',
    options: [
      { id: 'math', label: 'Mathematics', icon: Code },
      { id: 'physics', label: 'Physics', icon: Beaker },
      { id: 'chemistry', label: 'Chemistry', icon: Beaker },
      { id: 'biology', label: 'Biology', icon: Leaf },
      { id: 'languages', label: 'Languages', icon: BookOpen },
      { id: 'arts', label: 'Arts', icon: Palette },
      { id: 'sports', label: 'Sports', icon: Dumbbell },
      { id: 'music', label: 'Music', icon: Music },
    ],
    maxSelections: 5,
  },
  {
    id: 3,
    title: 'Your Goals',
    question: 'What are your career goals?',
    description: 'Tell us about what you want to achieve in your professional life.',
    type: 'text-input',
    placeholder: 'e.g., I want to work in technology and help solve real-world problems...',
  },
  {
    id: 4,
    title: 'Your Hobbies',
    question: 'What do you enjoy doing in your free time?',
    description: 'Tell us about your hobbies and activities.',
    type: 'multiple-choice',
    options: [
      { id: 'coding', label: 'Programming', icon: Code },
      { id: 'gaming', label: 'Gaming', icon: Code },
      { id: 'reading', label: 'Reading', icon: BookOpen },
      { id: 'sports-activity', label: 'Sports', icon: Dumbbell },
      { id: 'music-activity', label: 'Making Music', icon: Music },
      { id: 'art-activity', label: 'Creating Art', icon: Palette },
      { id: 'volunteering', label: 'Volunteering', icon: Heart },
      { id: 'travel', label: 'Traveling', icon: Landmark },
    ],
    maxSelections: 5,
  },
  {
    id: 5,
    title: 'How Others See You',
    question: 'How would others describe you?',
    description: 'Select traits that best describe your personality.',
    type: 'multiple-choice',
    options: [
      { id: 'analytical', label: 'Analytical', icon: Code },
      { id: 'creative', label: 'Creative', icon: Palette },
      { id: 'helpful', label: 'Helpful', icon: Heart },
      { id: 'leader', label: 'Leadership', icon: Briefcase },
      { id: 'curious', label: 'Curious', icon: Beaker },
      { id: 'organized', label: 'Organized', icon: Briefcase },
      { id: 'social', label: 'Social', icon: Heart },
      { id: 'innovative', label: 'Innovative', icon: Code },
    ],
    maxSelections: 5,
  },
];

export function OnboardingQuestions({ onComplete }: OnboardingQuestionsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});

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
      onComplete(answers);
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
