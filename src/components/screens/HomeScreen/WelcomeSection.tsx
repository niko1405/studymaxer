import { useState, forwardRef, useRef, useEffect } from 'react';
import { ArrowDown, CheckCircle2, RotateCcw } from 'lucide-react';
import useHomeScreen from '../../hooks/useHomeScreen';
import useStudyMaxer from '../../hooks/useStudyMaxer';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  start?: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 50, delay = 0, start = true }) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  
  useEffect(() => {
    if (!start) {
      setDisplayedText('');
      return;
    }

    const startTimeout = setTimeout(() => {
      let index = 0;
      const intervalId = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, speed);
      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay, start]);

  return (
    <span className="inline-block min-h-[1.2em]">
      {displayedText}
      <span className="animate-pulse text-blue-400 font-light ml-0.5">|</span>
    </span>
  );
};

// --- Background Animation Component (Scribble) ---
const DrawingAnimation = ({ start }: { start: boolean }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 mix-blend-screen">
    <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="20%" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="80%" stopColor="rgba(100, 180, 255, 0.8)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      
      {/* Eine abstrakte, pfadartige Linie, die "den Weg" symbolisiert */}
      <path
        d="M -100,450 C 100,450 200,800 400,600 C 600,400 500,200 800,300 C 1100,400 1200,100 1600,200"
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#glow)"
        className={`transition-all duration-3000 ease-out ${start ? 'draw-active' : 'draw-reset'}`}
      />
      
      {/* Zweite, dünnere Linie für Tiefe */}
      <path
        d="M -50,550 C 150,550 250,700 450,650 C 650,600 550,300 850,350 C 1150,400 1300,600 1600,500"
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
        className={`transition-all duration-4000 ease-out delay-500 ${start ? 'draw-active' : 'draw-reset'}`}
      />
    </svg>
  </div>
);


const WelcomeSection = forwardRef<HTMLElement>((_, ref) => {
  const { scrollTo } = useHomeScreen();
  const { setAppState } = useStudyMaxer();

  const [isVisible, setIsVisible] = useState(false);
  const internalRef = useRef<HTMLElement | null>(null);

  const setRefs = (node: HTMLElement | null) => {
    internalRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as React.RefObject<HTMLElement | null>).current = node;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (internalRef.current) observer.observe(internalRef.current);

    return () => {
      if (internalRef.current) {
        observer.unobserve(internalRef.current);
      }
    };
  }, []);

  const handleRestartOnboarding = () => setAppState('onboarding');

  // Animation Utilities
  const fadeUpClass = (delay: string = '0') => 
    `transition-all duration-1000 delay-${delay} ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  return (
    <section
      className="h-screen snap-start relative w-full flex flex-col items-center justify-center overflow-hidden bg-[#020617] text-white"
      ref={setRefs}
    >
      {/* --- Styles für die SVG Animation --- */}
      <style>{`
        .draw-active {
          stroke-dasharray: 2500;
          stroke-dashoffset: 0;
        }
        .draw-reset {
          stroke-dasharray: 2500;
          stroke-dashoffset: 2500;
        }
      `}</style>

      {/* --- Background Elements --- */}
      
      {/* 1. Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[100px_100px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"></div>
      
      {/* 2. Ambient Glow Spots */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />

      {/* 3. The Scribble Animation */}
      <DrawingAnimation start={isVisible} />


      {/* --- Main Content --- */}
      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center">

        {/* 1. Status Badge */}
        <div 
          className={`mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-wide backdrop-blur-sm ${fadeUpClass()}`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span className="uppercase text-[11px] font-bold tracking-wider">Analysis Complete</span>
        </div>

        {/* 2. Headlines */}
        <div className="mb-10 space-y-4">
          <h1 
            className={`text-6xl md:text-8xl font-bold tracking-tight text-white ${fadeUpClass('100')}`}
            style={{ transitionDelay: '100ms' }}
          >
            Welcome to <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-sky-400">StudyMaxer</span>
          </h1>
          
          <div 
            className={`h-12 flex items-center justify-center text-xl md:text-2xl text-slate-400 font-light ${fadeUpClass('200')}`}
            style={{ transitionDelay: '200ms' }}
          >
            <TypewriterText
              text="Your path to the perfect career match."
              speed={40}
              delay={800}
              start={isVisible} 
            />
          </div>
        </div>

        {/* 3. Actions */}
        <div 
          className={`flex flex-col sm:flex-row items-center gap-5 w-full justify-center ${fadeUpClass('400')}`}
          style={{ transitionDelay: '400ms' }}
        >
          {/* Primary CTA */}
          <button
            onClick={() => scrollTo('matches')}
            className="group relative min-w-[200px] px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 overflow-hidden"
          >
            <span>See Results</span>
            <ArrowDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" />
          </button>

          {/* Secondary Action */}
          <button
            onClick={handleRestartOnboarding}
            className="group min-w-[200px] px-8 py-4 rounded-full text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium hover:border-white/20"
          >
            <RotateCcw className="w-4 h-4 transition-transform duration-500 group-hover:-rotate-180" />
            <span>Restart Analysis</span>
          </button>
        </div>

      </div>

      {/* --- Scroll Indicator --- */}
      <div 
        onClick={() => scrollTo('matches')}
        className={`absolute bottom-30 left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-1000 delay-1000 hover:opacity-100 hover:translate-y-1 ${isVisible ? 'opacity-40 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.2em] font-light">Scroll to Explore</span>
          <div className="w-px h-12 bg-linear-to-b from-white to-transparent"></div>
        </div>
      </div>
    </section>
  );
});

export default WelcomeSection;
