import { ChevronLeft, ChevronRight, Globe } from "lucide-react";
import useStudyMaxer from "../hooks/useStudyMaxer";
import React, { useEffect, useState } from "react";
import type { Partner } from "../../types/types";
import { slides } from "../../config/mock";
import useSwipe from "../hooks/useSwipe";
import AnimatedCounter from "../ui/AnimtedCounter";

const PartnerMarquee: React.FC<{ partners: Partner[] }> = ({ partners }) => (
  <div className="w-full overflow-hidden py-6 bg-white/5 backdrop-blur-sm my-4 border-y border-white/10">
    <div className="flex gap-8 animate-marquee whitespace-nowrap min-w-full">
      {[...partners, ...partners, ...partners].map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-gray-300 font-medium opacity-70 hover:opacity-100 transition-opacity">
          <div className="p-2 bg-white/10 rounded-lg text-[#f59e0b]">
            {React.isValidElement(p.icon) ? React.cloneElement(p.icon as React.ReactElement<any>, { size: 20 }) : null}
          </div>
          <span className="text-sm uppercase tracking-wider">{p.name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function GetStarted() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const { setAppState } = useStudyMaxer();

  const handleSlideChange = (newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    handleSlideChange(newIndex);
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    handleSlideChange(newIndex);
  };

  const swipeHandlers = useSwipe({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide,
    minSwipeDistance: 50
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isAnimating]);

  const slide = slides[currentIndex];

  return (
    // h-[100dvh] und flex-col ist wichtig für Mobile Layouts ohne Scroll
    <div className="h-dvh w-full bg-[#0a1628] flex flex-col items-center overflow-hidden font-sans text-white relative select-none">

      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#f59e0b]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />

      {/* --- CONTENT AREA --- */}
      {/* pt-12 md:pt-0: Fügt Mobile oben Padding hinzu, damit Bild nicht klebt */}
      <div
        className="flex-1 w-full max-w-5xl flex items-center justify-between px-4 relative z-10 pt-12 md:pt-0 min-h-0"
        {...swipeHandlers}
      >
        {/* Desktop Arrow Left */}
        <button
          onClick={prevSlide}
          className="hidden md:flex p-3 rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-colors cursor-pointer shrink-0"
        >
          <ChevronLeft size={32} />
        </button>

        {/* --- DYNAMIC SLIDE CONTENT --- */}
        {/* min-h-0 ist wichtig für nested flex scrolling/shrinking */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto h-full min-h-0">

          {slide.type === 'hero' && (
            <div key="hero" className="flex flex-col items-center animate-fadeIn w-full h-full justify-center">
              {/* Bild Container: max-h-[45vh] begrenzt die Höhe auf fast die Hälfte des Screens */}
              <div className="w-full relative mb-6 rounded-2xl overflow-hidden shadow-2xl group shrink max-h-[40vh] md:max-h-[50vh] aspect-4/3 md:aspect-square">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a1628] via-transparent to-transparent opacity-60"></div>
              </div>

              <div className="shrink-0 flex flex-col items-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center tracking-tight">{slide.title}</h1>
                <p className="text-gray-400 text-center text-lg leading-relaxed max-w-xs md:max-w-sm">{slide.description}</p>
              </div>
            </div>
          )}

          {slide.type === 'partners' && (
            <div key="partners" className="flex flex-col items-center justify-center w-full animate-fadeInUp h-full">
              <div className="mb-6 p-4 bg-[#f59e0b]/10 rounded-full text-[#f59e0b] shrink-0">
                <Globe size={48} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center shrink-0">{slide.title}</h1>

              <PartnerMarquee partners={slide.partners} />

              <p className="text-gray-400 text-center mt-6 text-lg max-w-xs shrink-0">{slide.description}</p>
            </div>
          )}

          {slide.type === 'stats' && (
            <div key="stats" className="flex flex-col items-center justify-center w-full animate-fadeInUp h-full">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center shrink-0">{slide.title}</h1>
              <p className="text-gray-400 text-center mb-10 max-w-xs text-sm shrink-0">{slide.description}</p>

              <div className="grid grid-cols-2 gap-4 w-full shrink-0">
                {slide.stats.map((stat, i) => (
                  <div key={i} className={`bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center backdrop-blur-sm ${i === 0 ? 'col-span-2 bg-linear-to-br from-white/5 to-white/10' : ''}`}>
                    <div className="text-[#f59e0b] text-3xl md:text-4xl font-bold mb-1">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-gray-400 text-xs uppercase tracking-widest font-semibold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dots */}
          <div className="flex gap-2 mt-4 md:mt-8 shrink-0 py-4">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => handleSlideChange(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === idx ? 'w-8 bg-[#f59e0b]' : 'w-2 bg-gray-700 hover:bg-gray-600'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Arrow Right */}
        <button
          onClick={nextSlide}
          className="hidden md:flex p-3 rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-colors cursor-pointer shrink-0"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Footer - Fixed Height Container */}
      <div className="w-full p-6 pb-8 md:pb-12 z-20 bg-linear-to-t from-[#0a1628] via-[#0a1628] to-transparent shrink-0">
        <div className="max-w-md mx-auto space-y-3">
          <button
            onClick={() => setAppState('onboarding')}
            className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            Get Started
            <ChevronRight size={20} className="opacity-60 group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="w-full text-gray-500 hover:text-gray-300 py-2 text-sm font-medium transition-colors cursor-pointer">
            I already have an account
          </button>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}