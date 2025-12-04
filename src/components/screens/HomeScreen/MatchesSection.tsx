import { ChevronLeft, ChevronRight } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { matches } from "../../../config/mock";
import MatchCard from "../../MatchCard";
import { useNavigate } from "react-router-dom";

// --- Skeleton Component ---
const CardSkeleton = () => (
  <div className="w-full h-full bg-[#111e33] rounded-4xl border border-white/5 relative overflow-hidden flex flex-col p-6 sm:p-8 animate-pulse">
    <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent opacity-20" />
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

const MatchesSection = forwardRef<HTMLElement>((_, ref) => {
  const [currentIndex, setCurrentIndex] = useState(Math.round(matches.length / 2) - 1);
  const [savedItems, setSavedItems] = useState<string[]>([]);

  let navigate;
  try {
    navigate = useNavigate();
  } catch (e) {
    navigate = (path: string) => console.log('Navigate to:', path);
  }

  // Loading Logic: "isImagesLoading" is true ONLY during the initial mount phase.
  const [isImagesLoading, setIsImagesLoading] = useState(true);

  // Animation Logic: controlled by IntersectionObserver
  const [triggerEntrance, setTriggerEntrance] = useState(false);
  const [animFinished, setAnimFinished] = useState(false);
  const internalRef = useRef<HTMLElement | null>(null);

  // Combine Refs for Observer
  const setRefs = (node: HTMLElement | null) => {
    internalRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
  };

  // 1. Image Preloading (Runs once)
  useEffect(() => {
    const preloadImages = async () => {
      const promises = matches.map((study) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = study.backgroundImage;
          img.onload = () => resolve();
          img.onerror = () => resolve();
          if (img.complete) resolve();
        });
      });

      // Minimum load time to avoid flicker
      const minLoadTime = new Promise(resolve => setTimeout(resolve, 800));
      await Promise.all([Promise.all(promises), minLoadTime]);

      setIsImagesLoading(false);
    };

    preloadImages();
  }, []);

  // 2. Intersection Observer (Controls triggerEntrance)
  useEffect(() => {
    // Only run observer if initial loading is done, otherwise animations might trigger while invisible
    if (isImagesLoading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Entering viewport: Trigger Animation
          setTriggerEntrance(true);

          // Cleanup timer (matches the original logic)
          // Waits for animation (1000ms) + stagger (max ~300ms)
          setTimeout(() => {
            setAnimFinished(true);
          }, 1600);
        } else {
          // Leaving viewport: Reset Animation
          setTriggerEntrance(false);
          setAnimFinished(false);
        }
      },
      { threshold: 0.15 }
    );

    if (internalRef.current) observer.observe(internalRef.current);
    return () => {
      internalRef.current && observer.unobserve(internalRef.current);
    }
  }, [isImagesLoading]);

  // --- Interaction Handlers ---
  const handleSelectMatch = (id: string) => {
    navigate(`/matches/${id}`);
  }

  const handleSave = (id: string) => {
    setSavedItems(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const next = () => { if (currentIndex < matches.length - 1) setCurrentIndex(c => c + 1); };
  const prev = () => { if (currentIndex > 0) setCurrentIndex(c => c - 1); };

  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next(); else prev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      ref={setRefs}
      className="h-screen min-h-0 w-full snap-start flex flex-1 relative pb-28 flex-col bg-[#020617]"
    >
      {/* Animated Header Section */}
      <div className="h-14 mt-10 shrink-0 flex items-center justify-center px-6 relative">
        <h1 className={`text-xl font-medium tracking-[0.2em] uppercase text-gray-500 transition-all duration-1000 ease-out ${triggerEntrance ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Your Matches
        </h1>
        {/* Animated Underline (Center Out, More Visible) */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-px bg-white/20 transition-transform duration-1000 delay-300 ease-out origin-center`}
          style={{ transform: triggerEntrance ? 'scaleX(1)' : 'scaleX(0)' }}
        />
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center overflow-hidden py-4">

        <div className="w-full h-full md:max-w-3xl lg:max-w-5xl mx-auto relative flex flex-col">

          {/* Navigation Buttons */}
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
                disabled={currentIndex === matches.length - 1}
                className="pointer-events-auto p-4 rounded-full bg-[#111e33]/90 border border-gray-700/50 text-white hover:bg-gray-700 hover:scale-110 active:scale-95 disabled:opacity-0 disabled:cursor-not-allowed shadow-2xl backdrop-blur-md transition-all"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          )}

          <div className="flex-1 w-full relative">

            {isImagesLoading ? (
              // --- SKELETON STATE (Only on first load) ---
              <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8 py-2 z-30">
                <div className="w-full h-full max-w-full">
                  <CardSkeleton />
                </div>
              </div>
            ) : (
              // --- READY STATE ---
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
                  {matches.map((study, index) => {
                    // Original Animation Logic Restored
                    // 1. Start: hidden down
                    let animClass = "opacity-0 translate-y-32 scale-95";

                    // 2. Active: slide up
                    if (triggerEntrance) {
                      animClass = "opacity-100 translate-y-0 scale-100 transition-all duration-1000 ease-out";
                    }

                    // 3. Finished: cleanup for performance/hover effects
                    if (animFinished) {
                      animClass = "";
                    }

                    return (
                      <div
                        key={study.id}
                        className="min-w-full h-full px-4 md:px-8 py-2 flex items-center justify-center backface-hidden"
                      >
                        <div
                          className={`w-full h-full ${animClass}`}
                          style={{
                            transitionDelay: (!animFinished && triggerEntrance) ? `${index * 80}ms` : '0ms'
                          }}
                        >
                          <MatchCard
                            match={study}
                            isActive={index === currentIndex}
                            isSaved={savedItems.includes(study.id)}
                            onSave={(e) => { e.stopPropagation(); handleSave(study.id); }}
                            onClick={() => handleSelectMatch(study.id)}
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

      {/* Carousel Dots */}
      <div className={`h-6 shrink-0 flex items-center -mt-5 justify-center gap-2 z-10 transition-opacity duration-1000 delay-500 ${triggerEntrance ? 'opacity-100' : 'opacity-0'}`}>
        {matches.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full cursor-pointer hover:bg-blue-400 ${index === currentIndex ? 'bg-blue-500 w-8 h-1.5' : 'bg-gray-700 w-1.5 h-1.5'}`}
          />
        ))}
      </div>
    </section>
  );
});

export default MatchesSection;