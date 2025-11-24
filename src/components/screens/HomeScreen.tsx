import { useRef, useState } from 'react';
import { StudyDetailView } from './StudyDetailView';
import { studyMatches } from '../../config/mock';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StudyMatchCard from '../StudyMatchCard';

const HomeScreen = () => {
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(Math.round(studyMatches.length/2) - 1);
  const [savedItems, setSavedItems] = useState<string[]>([]);

  // Touch Handling State
  const touchStartX = useRef<number | null>(null);

  const handleSave = (id: string) => {
    setSavedItems(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const next = () => {
    if (currentIndex < studyMatches.length - 1) setCurrentIndex(c => c + 1);
  };

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex(c => c - 1);
  };

  // Touch Event Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
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

  return (
    // pb-28: Platz für Navigation unten
    <div className="flex-1 flex flex-col min-h-0 relative pb-28"> 
      
      {/* Header */}
      <div className="h-14 shrink-0 flex items-center justify-center px-6 border-b border-gray-800/30">
        <h1 className="text-sm font-medium tracking-[0.2em] uppercase text-gray-500">Your Matches</h1>
      </div>

      {/* Main Carousel Wrapper - flex-1 füllt den verfügbaren Platz */}
      <div className="flex-1 w-full flex flex-col items-center justify-center overflow-hidden py-4">
        
        {/* Carousel Container mit angepassten Breiten für Desktop (md:max-w-3xl, lg:max-w-5xl) */}
        <div className="w-full h-full max-w-md md:max-w-3xl lg:max-w-5xl mx-auto relative flex flex-col">
          
          {/* Desktop Arrows - Außerhalb des Cards-Bereichs positioniert */}
          <div className="hidden md:flex absolute inset-y-0 -left-16 -right-16 items-center justify-between pointer-events-none z-20">
             <button 
                onClick={prev} 
                disabled={currentIndex === 0} 
                className="pointer-events-auto p-4 rounded-full bg-[#111e33]/90 border border-gray-700/50 text-white hover:bg-gray-700 hover:scale-110 active:scale-95 disabled:opacity-0 disabled:cursor-not-allowed shadow-2xl backdrop-blur-md transition-all"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button 
                onClick={next} 
                disabled={currentIndex === studyMatches.length - 1} 
                className="pointer-events-auto p-4 rounded-full bg-[#111e33]/90 border border-gray-700/50 text-white hover:bg-gray-700 hover:scale-110 active:scale-95 disabled:opacity-0 disabled:cursor-not-allowed shadow-2xl backdrop-blur-md transition-all"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
          </div>

          {/* Slider Track Wrapper */}
          <div 
            className="flex-1 w-full flex items-center touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Slider Track - h-full (wichtig!) statt h-[85%] */}
            <div
              className="flex h-full w-full transition-transform duration-500 ease-out will-change-transform"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%) translateZ(0)`, 
                transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)' 
              }}
            >
              {studyMatches.map((study, index) => (
                // px-4 auf Mobile, px-8 auf Desktop - sorgt dafür, dass die Karte nicht den kompletten Screen touchiert
                <div key={study.id} className="min-w-full h-full px-4 md:px-8 py-2 flex items-center justify-center">
                  <StudyMatchCard
                    study={study}
                    isActive={index === currentIndex}
                    isSaved={savedItems.includes(study.id)}
                    onSave={(e: any) => { e.stopPropagation(); handleSave(study.id); }}
                    onClick={() => setSelectedStudy(study.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dots - Unter dem Carousel, über der Nav */}
      <div className="h-6 shrink-0 flex items-center justify-center gap-2 z-10">
        {studyMatches.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full cursor-pointer hover:bg-blue-400 ${
              index === currentIndex ? 'bg-blue-500 w-8 h-1.5' : 'bg-gray-700 w-1.5 h-1.5'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;