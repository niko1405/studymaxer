import { useState } from 'react';
import { StudyMatchCard } from '../StudyMatchCard';
import { StudyDetailView } from './StudyDetailView';
import { studyMatches } from '../../config/mock';

export function HomeScreen() {
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedItems, setSavedItems] = useState<string[]>([]);

  const handleSave = (id: string) => {
    setSavedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      return [...prev, id];
    });
  };

  if (selectedStudy) {
    const study = studyMatches.find(s => s.id === selectedStudy);
    if (study) {
      return (
        <StudyDetailView
          study={study}
          onBack={() => setSelectedStudy(null)}
          isSaved={savedItems.includes(study.id)}
          onSave={() => handleSave(study.id)}
        />
      );
    }
  }

  const handleSwipeLeft = () => {
    if (currentIndex < studyMatches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="bg-[#0a1628] text-white px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-center mb-12 text-5xl">Your Career Matches</h1>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {studyMatches.map((study) => (
                <div key={study.id} className="min-w-full px-2">
                  <StudyMatchCard
                    study={study}
                    onClick={() => setSelectedStudy(study.id)}
                    isSaved={savedItems.includes(study.id)}
                    onSave={(e) => {
                      e.stopPropagation();
                      handleSave(study.id);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {studyMatches.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-[#3b82f6] w-6' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Swipe Instructions */}
          <div className="text-center mt-6 text-gray-400">
            <p>Swipe or click the dots to see more matches</p>
          </div>

          {/* Swipe Buttons for Desktop */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleSwipeRight}
              disabled={currentIndex === 0}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-full transition-colors flex items-center justify-center"
            >
              ← Previous
            </button>
            <button
              onClick={handleSwipeLeft}
              disabled={currentIndex === studyMatches.length - 1}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-full transition-colors flex items-center justify-center"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
