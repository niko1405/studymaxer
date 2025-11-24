import { Bookmark, BookmarkCheck } from 'lucide-react';
import type { studyMatches } from '../config/mock';

interface StudyMatchCardProps {
  study: typeof studyMatches[0];
  onClick: () => void;
  isSaved: boolean;
  onSave: (e: React.MouseEvent) => void;
  isActive: boolean;
}

const StudyMatchCard = ({ study, onClick, isSaved, onSave, isActive }: StudyMatchCardProps) => {
  const Icon = study.icon;

  return (
    <div
      onClick={onClick}
      className={`
        relative w-full h-full bg-[#111e33] rounded-4xl overflow-hidden 
        border transition-all duration-500 flex flex-col cursor-pointer
        will-change-transform backface-hidden
        ${isActive 
          ? 'scale-100 opacity-100 border-gray-600/50 shadow-2xl shadow-black/50' 
          : 'scale-95 opacity-50 border-transparent shadow-none grayscale-[0.5]'}
      `}
      style={{
        transform: isActive ? 'scale(1) translateZ(0)' : 'scale(0.95) translateZ(0)',
      }}
    >
      <div className="absolute inset-0 z-0 select-none">
        <img 
          src={study.backgroundImage} 
          alt="" 
          className="w-full h-full object-cover opacity-25" 
          draggable="false"
          loading="eager"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#0a1628]/80 via-[#0a1628]/95 to-[#0a1628]"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full p-6 sm:p-8">
        <div className="flex justify-between items-start shrink-0 mb-4">
          <div className="flex gap-4 items-center">
            <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-lg">
              <Icon className="w-7 h-7" style={{ color: isActive ? study.glowColor : '#9ca3af' }} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest mb-0.5">Match Score</span>
              <span className="text-3xl font-bold leading-none tracking-tight" style={{ color: isActive ? study.glowColor : 'white' }}>
                {study.match}%
              </span>
            </div>
          </div>
          <button onClick={onSave} className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 active:scale-90 transition-all backdrop-blur-sm">
            {isSaved ? <BookmarkCheck className="w-5 h-5 text-blue-400" /> : <Bookmark className="w-5 h-5 text-gray-400" />}
          </button>
        </div>

        <div className="shrink-0 space-y-3 mt-2">
          <span className="inline-block px-3 py-1 bg-white/5 rounded-lg text-xs font-medium text-gray-300 border border-white/10">
            {study.type}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-[1.1] tracking-tight">
            {study.title}
          </h2>
        </div>

        {/* Spacer for visual balance - pushes bottom content down */}
        <div className="flex-1"></div>

        <div className="mt-auto shrink-0 space-y-5">
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed line-clamp-3">
            {study.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {study.careers.map((career: string) => (
              <span key={career} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300">
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

export default StudyMatchCard;