import { useState, useEffect } from 'react';
import { Camera, Mail, Bell, Lock, CircleHelp, LogOut, ChevronRight, GraduationCap, Briefcase, Trophy, Sparkles, Building2 } from 'lucide-react';
import { user } from '../../config/mock';

const savedStudyPrograms = [
  { id: 1, title: 'Computer Science', institution: 'KIT Karlsruhe', location: 'Karlsruhe', image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=200' },
  { id: 2, title: 'Business Informatics', institution: 'TU Munich', location: 'Munich', image: 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763?q=80&w=200' },
];

const savedCareers = [
  { id: 3, title: 'Software Developer', institution: 'SAP SE', location: 'Walldorf', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200' },
];

const nextSteps = [
  { id: 1, title: 'Complete Profile', description: 'Add your grades to get better matches.', icon: GraduationCap, color: 'from-blue-500 to-cyan-500' },
  { id: 2, title: 'Upload CV', description: 'Companies want to know more about you.', icon: Briefcase, color: 'from-purple-500 to-pink-500' },
];

// --- Helper Components ---

// Einfacher Image Fallback, falls Bild nicht lädt
const ImageWithFallback = ({ src, alt, className }: { src: string, alt: string, className: string }) => {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`${className} bg-slate-800 flex items-center justify-center border border-white/10`}>
        <Building2 className="w-1/2 h-1/2 text-slate-500" />
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
};

// --- Main Component ---

export function ProfileScreen() {
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'study' | 'careers'>('study');
  const targetProgress = 65; 

  // Animation State
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // FIX: Kleine Verzögerung, damit der Browser den "initial state" (unsichtbar) 
    // sicher rendert, bevor die Klasse auf "sichtbar" wechselt.
    const mountTimer = setTimeout(() => {
      setMounted(true);
    }, 50);

    // Delay progress bar animation slightly
    const progressTimer = setTimeout(() => {
      setProgress(targetProgress);
    }, 600);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(progressTimer);
    };
  }, []);

  const currentItems = activeTab === 'study' ? savedStudyPrograms : savedCareers;

  // Helper function for staggered slide-up animations
  const getSlideUpClass = () => {
    return `transition-all duration-700 ease-out transform ${
      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`;
  };

  // Helper for staggered slide-in (from right) for list items
  const getSlideInRightClass = () => {
    return `transition-all duration-500 ease-out transform ${
      mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
    }`;
  };

  // Helper for pop-in animation (scale)
  const getPopInClass = () => {
    return `transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) transform ${
      mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
    }`;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden pb-24">
      
      {/* --- Background Ambience --- */}
      <div className="fixed top-0 left-0 w-full h-96 bg-blue-900/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-full h-96 bg-indigo-900/10 blur-[120px] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none" />

      <div className="max-w-2xl mx-auto px-6 pt-12 relative z-10">
        
        {/* --- Profile Header --- */}
        <div className="text-center mb-10">
          <div className={`relative inline-block mb-6 group ${getPopInClass()}`}>
            {/* Glow behind avatar */}
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            
            <div className="relative p-1 bg-linear-to-br from-white/10 to-transparent rounded-full backdrop-blur-sm border border-white/20">
              <ImageWithFallback
                src={user.avatar}
                alt={user.name}
                className="w-28 h-28 rounded-full object-cover shadow-2xl"
              />
            </div>
            
            <button className="absolute bottom-1 right-1 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-500 hover:scale-110 active:scale-95 transition-all border-2 border-[#020617] z-20 cursor-pointer">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className={`space-y-1 ${getSlideUpClass()}`} style={{ transitionDelay: '200ms' }}>
            <h1 className="text-3xl font-light text-slate-300">
              Hello, <span className="font-bold text-white tracking-tight">{user.name}</span>
            </h1>
            <p className="text-sm text-slate-500">Student & Career Explorer</p>
          </div>
        </div>

        {/* --- Progress Card (Glassmorphism) --- */}
        <div 
          className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 mb-10 shadow-xl relative overflow-hidden group ${getSlideUpClass()}`}
          style={{ transitionDelay: '300ms' }}
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-4 h-4 text-amber-400" />
                <h3 className="font-semibold text-slate-200">Readiness Score</h3>
              </div>
              <p className="text-xs text-slate-400">Complete tasks to improve matches</p>
            </div>
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-amber-200 to-amber-500">
              {progress}%
            </div>
          </div>
          
          <div className="w-full bg-black/40 rounded-full h-2.5 overflow-hidden border border-white/5 relative z-10">
            <div
              className="bg-linear-to-r from-amber-500 to-orange-600 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(245,158,11,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* --- Tabs --- */}
        <div 
          className={`bg-white/5 p-1 rounded-2xl flex mb-8 border border-white/5 ${getSlideUpClass()}`}
          style={{ transitionDelay: '400ms' }}
        >
          <button
            onClick={() => setActiveTab('study')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeTab === 'study'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            Study Programs
          </button>
          <button
            onClick={() => setActiveTab('careers')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeTab === 'careers'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            Apprenticeships
          </button>
        </div>

        {/* --- Saved Items List --- */}
        <div className="space-y-4 mb-10 min-h-[120px]">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <div
                key={item.id}
                className={`bg-[#0f172a]/60 border border-white/5 rounded-2xl p-3 flex items-center gap-4 hover:border-blue-500/30 hover:bg-[#1e293b]/60 transition-all cursor-pointer group ${getSlideUpClass()}`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 relative">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-200 truncate group-hover:text-blue-400 transition-colors">{item.title}</h3>
                  <p className="text-xs text-slate-400 truncate">{item.institution}</p>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-500 uppercase tracking-wider">
                    <span className="w-1 h-1 rounded-full bg-blue-500" />
                    {item.location}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))
          ) : (
            <div className={`text-center py-10 border border-dashed border-white/10 rounded-2xl ${getSlideUpClass()}`} style={{ transitionDelay: '500ms' }}>
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bookmark className="w-5 h-5 text-slate-500" />
              </div>
              <p className="text-slate-400 text-sm">No saved {activeTab === 'study' ? 'programs' : 'jobs'} yet.</p>
              <p className="text-xs text-slate-600 mt-1">Explore matches to add items here.</p>
            </div>
          )}
        </div>

        {/* --- Next Steps (Cards) --- */}
        <div className={`mb-10 ${getSlideUpClass()}`} style={{ transitionDelay: '700ms' }}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h2 className="font-semibold text-lg text-white">Recommended Actions</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {nextSteps.map((step) => {
              const Icon = step.icon;
              return (
                <button
                  key={step.id}
                  className="bg-[#0f172a]/60 border border-white/5 rounded-2xl p-4 hover:border-white/20 hover:bg-[#1e293b]/80 transition-all text-left group relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 p-20 bg-linear-to-br ${step.color} opacity-[0.03] blur-3xl group-hover:opacity-[0.08] transition-opacity rounded-full pointer-events-none`} />
                  
                  <div className="flex items-start gap-3 relative z-10">
                    <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${step.color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-slate-200 mb-1">{step.title}</h3>
                      <p className="text-[11px] text-slate-400 leading-tight">{step.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- Settings Menu --- */}
        <div 
          className={`bg-[#0f172a]/40 border border-white/5 rounded-3xl overflow-hidden mb-6 backdrop-blur-sm ${getSlideUpClass()}`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="px-6 py-4 border-b border-white/5">
            <h3 className="font-medium text-slate-300">Account Settings</h3>
          </div>
          
          <div className="divide-y divide-white/5">
            {[
              { icon: Mail, label: 'Change Email' },
              { icon: Bell, label: 'Notifications' },
              { icon: Lock, label: 'Privacy & Security' },
              { icon: CircleHelp, label: 'Help & Support' },
            ].map((item, index) => (
              <button 
                key={item.label} 
                className={`w-full flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors group ${getSlideInRightClass()}`}
                style={{ transitionDelay: `${900 + index * 50}ms` }}
              >
                <item.icon className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                <span className="flex-1 text-left text-sm text-slate-300 group-hover:text-white transition-colors">{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}

            <button 
              className={`w-full flex items-center gap-4 px-6 py-4 hover:bg-red-500/10 transition-colors group ${getSlideInRightClass()}`}
              style={{ transitionDelay: '1100ms' }}
            >
              <LogOut className="w-5 h-5 text-red-400/70 group-hover:text-red-400 transition-colors" />
              <span className="flex-1 text-left text-sm text-red-400/70 group-hover:text-red-400 transition-colors">Log Out</span>
            </button>
          </div>
        </div>
        
        {/* Version Info */}
        <div className={`text-center py-6 ${getSlideUpClass()}`} style={{ transitionDelay: '1200ms' }}>
          <p className="text-[10px] text-slate-700 uppercase tracking-widest font-semibold">StudyMaxer v1.0.2</p>
        </div>

      </div>
    </div>
  );
}

// Helper component for empty state icon
function Bookmark(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

export default ProfileScreen;