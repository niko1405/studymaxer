import { Bookmark, BookmarkCheck } from 'lucide-react';

interface StudyMatchCardProps {
  study: {
    id: string;
    title: string;
    type: string;
    match: number;
    description: string;
    icon: any;
    careers: string[];
    gradient: string;
    glowColor: string;
    backgroundImage: string;
  };
  onClick: () => void;
  isSaved: boolean;
  onSave: (e: React.MouseEvent) => void;
}

export function StudyMatchCard({ study, onClick, isSaved, onSave }: StudyMatchCardProps) {
  const Icon = study.icon;

  return (
    <div
      onClick={onClick}
      className="relative rounded-3xl p-6 cursor-pointer transform transition-all hover:scale-[1.02] border border-gray-700/50 overflow-hidden animate-in fade-in duration-500"
      style={{
        background: `linear-gradient(to bottom, ${study.glowColor}, transparent)`,
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={study.backgroundImage} 
          alt="" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a1628] via-[#0a1628]/90 to-[#0a1628]/60"></div>
      </div>

      {/* Glowing Circle Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-64 h-64 rounded-full opacity-30 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${study.glowColor}, transparent)`,
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col max-h-1/3">
        {/* Top Row */}
        <div className="flex items-start justify-between mb-4">
          {/* Left: Icon and Type Badge */}
          <div className="flex flex-col gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gray-900/80 backdrop-blur-sm flex items-center justify-center border-2 border-gray-600 shadow-lg">
              <Icon className="w-7 h-7 text-[#3b82f6]" />
            </div>
            <span className="text-sm px-3 py-1.5 bg-gray-900/80 backdrop-blur-sm border border-gray-600 rounded-full inline-block shadow-lg">
              {study.type}
            </span>
          </div>
          
          {/* Right: Match Percentage and Save Button */}
          <div className="flex flex-col items-end gap-3">
            <button
              onClick={onSave}
              className="w-10 h-10 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-600 flex items-center justify-center hover:bg-gray-800/90 transition-all shadow-lg"
            >
              {isSaved ? (
                <BookmarkCheck className="w-5 h-5 text-[#3b82f6]" />
              ) : (
                <Bookmark className="w-5 h-5 text-gray-300" />
              )}
            </button>
            <div className="text-right bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-2xl border border-gray-600 shadow-lg">
              <div className="text-4xl mb-1">{study.match}%</div>
              <div className="text-xs text-gray-400 tracking-wider">MATCH</div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-6 text-3xl">{study.title}</h2>

        {/* Description */}
        <p className="text-gray-200 mb-auto leading-relaxed">
          {study.description}
        </p>

        {/* Concentric Circles Visual */}
        <div className="flex items-center justify-center my-8">
          <div className="relative w-48 h-48">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border-2 opacity-30"
                style={{
                  borderColor: study.glowColor,
                  transform: `scale(${1 - i * 0.2})`,
                  top: `${i * 10}%`,
                  left: `${i * 10}%`,
                  right: `${i * 10}%`,
                  bottom: `${i * 10}%`,
                }}
              ></div>
            ))}
            <div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{
                background: study.glowColor,
                transform: 'scale(0.4)',
                top: '30%',
                left: '30%',
                right: '30%',
                bottom: '30%',
              }}
            ></div>
          </div>
        </div>

        {/* Career Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {study.careers.map((career) => (
            <span
              key={career}
              className="px-4 py-2 bg-gray-900/70 backdrop-blur-sm border border-gray-600 rounded-full text-gray-200 shadow-lg"
            >
              {career}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <button className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white text-lg py-4 rounded-full transition-colors flex items-center justify-center shadow-lg">
          Discover Details
        </button>
      </div>
    </div>
  );
}
