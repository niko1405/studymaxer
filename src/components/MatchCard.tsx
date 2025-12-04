import { Bookmark, BookmarkCheck } from 'lucide-react';
import type { matches } from '../config/mock';

interface MatchCardProps {
  match: typeof matches[0];
  onClick: () => void;
  isSaved: boolean;
  onSave: (e: React.MouseEvent) => void;
  isActive: boolean;
}

const MatchCard = ({ match, onClick, isSaved, onSave, isActive }: MatchCardProps) => {
  const Icon = match.icon;

  return (
    <div
      onClick={() => isActive && onClick()}
      className={`
        relative w-full h-full bg-[#111e33] rounded-4xl overflow-hidden 
        border transition-all duration-500 flex flex-col cursor-pointer
        will-change-transform backface-hidden
        ${isActive
          ? 'hover:scale-98 scale-95 opacity-100 border-gray-600/50 shadow-2xl shadow-black/50'
          : 'scale-90 opacity-50 border-transparent shadow-none grayscale-[0.5]'}
      `}
      style={{
        transform: isActive ? 'scale(1) translateZ(0)' : 'scale(0.95) translateZ(0)',
      }}
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src={match.backgroundImage}
          alt=""
          className="w-full h-full object-cover opacity-30 transition-opacity duration-500"
          draggable="false"
          loading="eager"
        />
        {/* Gradient: Transparent -> Black */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#0a1628]/40 to-black"></div>
      </div>

      {/* Decorative Layer: Glow + Circles (Centered) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">

        {/* 1. Large Background Glow */}
        <div
          className="absolute w-[150%] h-[150%] opacity-20 blur-[100px]"
          style={{
            background: `radial-gradient(circle, ${match.glowColor}, transparent 70%)`,
          }}
        />

        {/* 2. Concentric Circles Visual (Centered & Larger) */}
        <div className="relative lg:w-96 lg:h-96 flex items-center justify-center"> {/* w-96 macht es größer */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-white/20"
              style={{
                borderColor: match.glowColor,
                opacity: 0.3 - (i * 0.1), // Äußere Ringe transparenter
                transform: `scale(${1 - i * 0.25})`, // Abstände zwischen Ringen
              }}
            />
          ))}

          {/* Inner Core Glow */}
          <div
            className="absolute w-32 h-32 rounded-full blur-3xl opacity-80"
            style={{ background: match.glowColor }}
          />
        </div>
      </div>


      {/* Content Layer */}
      <div className="relative z-10 flex flex-col h-full p-6 sm:p-8">
        {/* Header */}
        <div className="flex justify-between items-start shrink-0 mb-4">
          <div className="flex gap-4 items-center p-2 -ml-2 rounded-3xl bg-black/20 backdrop-blur-md border border-white/5">
            <div className="w-12 h-12 rounded-2xl bg-[#0a1628] flex items-center justify-center border border-white/10 shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 opacity-20 bg-linear-to-br from-white to-transparent"></div>
              <Icon className="w-6 h-6 relative z-10" style={{ color: isActive ? match.glowColor : '#9ca3af' }} />
            </div>
            <div className="flex flex-col pr-2">
              <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mb-0.5 opacity-80">Match Score</span>
              <span className="text-3xl font-black leading-none tracking-tight drop-shadow-md" style={{ color: isActive ? match.glowColor : 'gray', textShadow: `0 0 20px ${match.glowColor}40` }}>
                {match.match}%
              </span>
            </div>
          </div>

          <button onClick={onSave} className="p-3 rounded-full bg-black/20 hover:bg-black/40 border border-white/10 active:scale-90 transition-all backdrop-blur-md shadow-lg">
            {isSaved ? <BookmarkCheck className="w-5 h-5 text-blue-400" /> : <Bookmark className="w-5 h-5 text-gray-300" />}
          </button>
        </div>

        {/* Title & Type */}
        <div className="shrink-0 space-y-3 mt-2">
          <span className="inline-block px-3 py-1 bg-white/10 rounded-lg text-xs font-bold text-gray-200 border border-white/10 backdrop-blur-md shadow-sm">
            {match.type}
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold leading-[1.1] tracking-tight transition-colors duration-300 drop-shadow-lg ${isActive ? 'text-white' : 'text-gray-600'}`}>
            {match.title}
          </h2>
        </div>

        {/* Spacer pushes bottom content down */}
        <div className="flex-1"></div>

        {/* Bottom Info */}
        <div className="mt-auto shrink-0 space-y-5">
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-3 text-shadow-sm">
            {match.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {match.careers.map((career: string) => (
              <span key={career} className="px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs text-gray-300 backdrop-blur-sm">
                {career}
              </span>
            ))}
          </div>
          <button className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white py-4 rounded-2xl font-semibold shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all text-lg">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;