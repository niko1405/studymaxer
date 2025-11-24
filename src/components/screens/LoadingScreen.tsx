import { BrainCircuit, CheckCircle2, ScanLine, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing analysis...");

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        
        // Simuliere nicht-linearen Fortschritt
        const increment = Math.random() * 2 + 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 30); // ~3-4 Sekunden gesamt

    return () => clearInterval(timer);
  }, []);

  // Text Updates basierend auf Progress
  useEffect(() => {
    if (progress > 20 && progress < 50) setStatusText("Analyzing personality profile...");
    if (progress >= 50 && progress < 80) setStatusText("Matching with 1,500+ universities...");
    if (progress >= 80) setStatusText("Finalizing your top picks...");
    if (progress >= 100) {
      setTimeout(onComplete, 500); // Kurze Verzögerung bei 100%
    }
  }, [progress, onComplete]);

  return (
    <div className="h-dvh w-full bg-[#0a1628] text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>

      <div className="z-10 flex flex-col items-center w-full max-w-md px-6">
        {/* Animated Icon Container */}
        <div className="relative mb-12">
          <div className="w-32 h-32 rounded-full border-4 border-blue-500/30 flex items-center justify-center relative">
            <div 
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"
              style={{ animationDuration: '1.5s' }}
            ></div>
            <div 
              className="absolute inset-2 rounded-full border-4 border-transparent border-r-purple-500 animate-spin"
              style={{ animationDuration: '2s', animationDirection: 'reverse' }}
            ></div>
            <BrainCircuit className="w-12 h-12 text-blue-400 animate-pulse" />
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#0a1628] px-3 py-1 rounded-full border border-blue-500/30 text-xs font-mono text-blue-300">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Text Status */}
        <h2 className="text-2xl font-light mb-2 text-center h-8 transition-all duration-300">
          {statusText}
        </h2>
        
        {/* Progress Bar Container */}
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-8 relative">
          <div 
            className="h-full bg-linear-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-white/30 w-full h-full animate-[shimmer_1s_infinite] skew-x-12 -translate-x-full"></div>
          </div>
        </div>

        {/* "Scanning" details */}
        <div className="mt-8 grid grid-cols-3 gap-4 w-full opacity-50 text-[10px] font-mono uppercase tracking-widest text-center">
          <div className="flex flex-col items-center gap-1">
            <ScanLine className="w-4 h-4" />
            <span>Skills</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Sparkles className="w-4 h-4" />
            <span>Interests</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Goals</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;