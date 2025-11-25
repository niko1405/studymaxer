import { useEffect, useRef, useState } from 'react';
import { StudyDetailView } from './StudyDetailView';
import { studyMatches } from '../../config/mock';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StudyMatchCard from '../StudyMatchCard';
import useStudyMaxer from '../hooks/useStudyMaxer';

// --- Skeleton Component ---
const CardSkeleton = () => (
  <div className="w-full h-full bg-[#111e33] rounded-4xl border border-white/5 relative overflow-hidden flex flex-col p-6 sm:p-8 animate-pulse">
    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-20" />
    <div className="flex justify-between items-start mb-4">
      <div className="flex gap-4 items-center p-2 -ml-2 rounded-3xl bg-white/5 border border-white/5 w-32 h-16">
         <div className="w-12 h-12 rounded-2xl bg-white/10" />
      </div>
      <div className="w-12 h-12 rounded-full bg-white/5" />
    </div>
    <div className="space-y-4 mt-4">
      <div className="w-24 h-6 rounded-lg bg-white/10" />
      <div className="w-3/4 h-10 rounded-xl bg-white/10" />
    </div>
    <div className="flex-1" />
    <div className="space-y-4 mt-auto">
      <div className="space-y-2">
        <div className="w-full h-4 rounded bg-white/5" />
        <div className="w-5/6 h-4 rounded bg-white/5" />
        <div className="w-4/6 h-4 rounded bg-white/5" />
      </div>
      <div className="flex gap-2">
        <div className="w-20 h-8 rounded-lg bg-white/10" />
        <div className="w-24 h-8 rounded-lg bg-white/10" />
      </div>
      <div className="w-full h-14 rounded-2xl bg-white/10 mt-4" />
    </div>
  </div>
);

const HomeScreen = () => {
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(Math.round(studyMatches.length / 2) - 1);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  
  // Loading & Animation States
  const [isImagesLoading, setIsImagesLoading] = useState(true);
  const [triggerEntrance, setTriggerEntrance] = useState(false); // Startet die Slide-Animation
  const [animFinished, setAnimFinished] = useState(false); // Beendet den Animations-Modus für Performance

  const { setShowNavigation } = useStudyMaxer();

  // FIX: Preload Images
  useEffect(() => {
    const preloadImages = async () => {
      const promises = studyMatches.map((study) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = study.backgroundImage;
          const imgAny = img as any;
          if (imgAny.decode) {
            imgAny.decode().then(() => resolve()).catch(() => resolve());
          } else {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }
        });
      });

      // Wartezeit für Skeleton-Anzeige (verhindert Flackern)
      const minLoadTime = new Promise(resolve => setTimeout(resolve, 800));
      
      await Promise.all([Promise.all(promises), minLoadTime]);
      
      // 1. Loading beenden -> Skeleton verschwindet, echte Karten werden gerendert (aber noch unsichtbar/verschoben)
      setIsImagesLoading(false);

      // 2. Kurz warten, dann Animation triggern (Slide nach oben)
      requestAnimationFrame(() => {
        setTimeout(() => setTriggerEntrance(true), 50);
      });

      // 3. Nach Abschluss der Animation (z.B. 1.5s) aufräumen, damit der Slider performant ist
      setTimeout(() => {
        setAnimFinished(true);
      }, 1600);
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (selectedStudy) setShowNavigation(false);
    else setShowNavigation(true);
  }, [selectedStudy, setShowNavigation]);

  // Touch Handling
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
    <div className="flex-1 flex flex-col min-h-0 relative pb-28">
      
      <div className="h-14 mt-10 shrink-0 flex items-center justify-center px-6 border-b border-gray-800/30">
        <h1 className="text-xl font-medium tracking-[0.2em] uppercase text-gray-500">Your Matches</h1>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center overflow-hidden py-4">
        
        <div className="w-full h-full md:max-w-3xl lg:max-w-5xl mx-auto relative flex flex-col">
          
          {!isImagesLoading && (
            <div className={`hidden md:flex absolute inset-y-0 -left-16 -right-16 items-center justify-between pointer-events-none z-20 transition-opacity duration-1000 ${triggerEntrance ? 'opacity-100' : 'opacity-0'}`}>
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
          )}

          <div className="flex-1 w-full relative">
            
            {isImagesLoading ? (
              <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8 py-2 z-30">
                 <div className="w-full h-full max-w-full">
                    <CardSkeleton />
                 </div>
              </div>
            ) : (
              <div 
                className="flex-1 w-full h-full flex items-center touch-pan-y"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <div
                  className="flex h-full w-full transition-transform duration-500 ease-out will-change-transform"
                  style={{ 
                    transform: `translateX(-${currentIndex * 100}%) translateZ(0)`, 
                    transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)' 
                  }}
                >
                  {studyMatches.map((study, index) => {
                    // --- Animation Logic ---
                    // 1. Initial State (unsichtbar, weit unten): opacity-0 translate-y-32
                    // 2. Trigger State (sichtbar, Position 0): opacity-100 translate-y-0
                    // 3. Finished State (sauber): keine Klassen mehr, damit Hover/Active/Swipe perfekt funktionieren
                    
                    let animClass = "opacity-0 translate-y-32 scale-95"; // Startposition (Deutlich tiefer als vorher)
                    
                    if (triggerEntrance) {
                      animClass = "opacity-100 translate-y-0 scale-100 transition-all duration-1000 ease-out"; // Weiche Kurve nach oben
                    }
                    
                    if (animFinished) {
                      animClass = ""; // Cleanup für Performance
                    }

                    return (
                      <div 
                        key={study.id} 
                        className="min-w-full h-full px-4 md:px-8 py-2 flex items-center justify-center backface-hidden"
                      >
                        <div 
                          className={`w-full h-full ${animClass}`}
                          style={{ 
                            // Gestaffeltes Delay für den "Domino"-Effekt, aber diesmal vertikal
                            transitionDelay: (!animFinished && triggerEntrance) ? `${index * 80}ms` : '0ms' 
                          }} 
                        >
                          <StudyMatchCard
                            study={study}
                            isActive={index === currentIndex}
                            isSaved={savedItems.includes(study.id)}
                            onSave={(e: any) => { e.stopPropagation(); handleSave(study.id); }}
                            onClick={() => setSelectedStudy(study.id)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`h-6 shrink-0 flex items-center -mt-5 justify-center gap-2 z-10 transition-opacity duration-1000 delay-500 ${triggerEntrance ? 'opacity-100' : 'opacity-0'}`}>
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