import { ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, Brain, Building, CheckCircle2, CheckSquare, Clock, Crown, Lock, MessageCircle, Star } from "lucide-react";
import { colleges, companies, getDayInLife, getKeyLocations, getTasks, matches, matchMentors, quizQuestions, vocationalInstitutions } from "../../config/mock";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export function MatchesDetailView() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [isSaved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  // Mock Navigate/Params if router context missing
  let navigate: any;
  let id: string | undefined;

  try {
    navigate = useNavigate();
    const params = useParams<{ id: string }>();
    id = params.id;
  } catch (e) {
    navigate = () => console.log("Navigate called");
    id = 'computerscience';
  }

  const match = matches.find(m => m.id === id) || matches[0];
  const daySchedule = getDayInLife(match.type, match.title);
  const tasks = getTasks(match.id);
  const keyLocations = getKeyLocations(match.id);
  const Icon = match.icon;

  useEffect(() => {
    // Short delay to ensure browser render cycle allows transition
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => navigate('/home#matches');

  const toggleTask = (title: string) => {
    setCompletedTasks(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  // --- Helpers for Animation ---
  const getFadeUpClass = () =>
    `transition-all duration-700 ease-out transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
    }`;

  const getScaleInClass = () =>
    `transition-all duration-700 ease-out transform ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
    }`;

  // --- QUIZ MODE ---
  if (showQuiz) {
    return (
      <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-96 bg-blue-900/20 blur-[150px] pointer-events-none" />
        <div className="px-6 py-8 relative z-10 max-w-3xl mx-auto">
          <button
            onClick={() => setShowQuiz(false)}
            className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
          >
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span>Abort Assessment</span>
          </button>
          <div className="text-center mb-10 animate-in zoom-in duration-500">
            <div className="inline-flex w-24 h-24 rounded-3xl bg-linear-to-br from-blue-600 to-violet-600 items-center justify-center mb-6 shadow-2xl shadow-blue-900/40">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400">Discover Your Fit</h1>
            <p className="text-slate-400 text-lg">How well does {match.title} match your personality?</p>
          </div>
          <div className="space-y-6">
            {quizQuestions.map((q, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md animate-in slide-in-from-bottom duration-500 fill-mode-backwards"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <h3 className="text-xl font-medium mb-6 text-slate-200">{q.question}</h3>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button key={rating} className="flex-1 h-12 rounded-xl border border-white/10 hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400 transition-all font-medium text-slate-400">
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 bg-linear-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-900/20 transition-all duration-300">
            Complete Assessment
          </button>
        </div>
      </div>
    );
  }

  // --- DETAIL VIEW ---
  return (
    <div className="min-h-screen bg-[#020617] text-white pb-[100px] relative overflow-hidden">

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[100px_100px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Navigation Header */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 bg-linear-to-b from-[#020617]/90 to-transparent">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setSaved(!isSaved)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border backdrop-blur-md transition-all duration-300 shadow-lg ${isSaved
              ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
              : 'bg-black/20 border-white/10 text-slate-300 hover:bg-white/10'
              }`}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
            <span className="font-medium text-sm">{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-[60vh] min-h-[500px] flex items-end overflow-hidden bg-[#020617]">
        <div className="absolute inset-0 z-0">
          {/* Enhanced Image Handling for smoother feel */}
          <div className={`absolute inset-0 bg-[#020617] transition-opacity duration-1000 z-10 ${mounted ? 'opacity-0' : 'opacity-100'}`} />
          <img
            src={match.backgroundImage}
            alt={match.title}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[102%] h-[102%] max-w-none object-cover 
                 backface-hidden transform-gpu will-change-transform 
                 transition-transform duration-2000 ease-out 
                 ${mounted ? 'scale-100' : 'scale-110'}`}

            // Kleiner Hack für Webkit/Mobile, um Kanten zu glätten
            style={{ WebkitBackfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
          />
          <div className="absolute -inset-px bg-linear-to-b from-[#020617]/30 via-[#020617]/60 to-[#020617] z-20" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24 w-full">
          <div className={`flex flex-wrap items-center gap-3 mb-6 ${getFadeUpClass()}`}>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-bold text-sm tracking-wide">{match.match}% MATCH</span>
            </div>
            <div className="px-4 py-1.5 bg-white/10 border border-white/10 backdrop-blur-md rounded-full text-sm font-medium text-slate-200">
              {match.type}
            </div>
          </div>

          <div className="flex items-end gap-6">
            <div className={`hidden md:flex w-24 h-24 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl items-center justify-center shrink-0 shadow-2xl ${getScaleInClass()}`}>
              <Icon className="w-12 h-12" style={{ color: match.glowColor || 'white' }} />
            </div>
            <div className={`flex-1 ${getFadeUpClass()}`} style={{ transitionDelay: '100ms' }}>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight text-shadow-lg">{match.title}</h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">{match.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 -mt-8 space-y-20">

        {/* --- 1. RECOMMENDATIONS (Dynamic based on Type) --- */}
        <div className={`${getFadeUpClass()}`} style={{ transitionDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-bold">
                {match.type === 'Company' ? 'Key Locations & Hubs' :
                  match.type === 'Apprenticeship' ? 'Training Partners' : 'Top Universities'}
              </h2>
            </div>
          </div>

          {/* Logic: If Company -> Show Key Locations. If Study/Apprentice -> Show Institutions Logos */}
          {match.type === 'Company' ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* // KEY LOCATIONS (Company) */}
              {keyLocations.map((item, index) => {
                const RecIcon = item.icon;
                return (
                  <div key={index} className="group bg-white/5 border border-white/5 rounded-3xl p-1 md:p-5 hover:border-blue-500/30 hover:bg-white/10 transition-all cursor-pointer relative overflow-hidden">
                    <div className="flex flex-row md:flex-col items-center text-center gap-3 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-[#0f172a] border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-500">
                        <RecIcon className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{item.name}</h3>
                        <p className="text-xs text-slate-400 font-medium px-2 py-0.5 rounded-full bg-white/5 inline-block">{item.label}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* // INSTITUTIONS (Study/Apprentice) */}
              {(match.type === 'Apprenticeship' ? vocationalInstitutions : colleges).map((inst) => (
                <div key={inst.id} onClick={() => navigate(`/institutions/${inst.id}`)} className="group bg-white/5 border border-white/5 rounded-3xl p-5 hover:border-blue-500/30 hover:bg-white/10 transition-all cursor-pointer relative overflow-hidden">
                  <div className="flex flex-row md:flex-col items-center text-center gap-3 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white p-2 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500">
                      <img src={inst.logo} alt={inst.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="items-start flex flex-col md:items-center">
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-1">{inst.name}</h3>
                      <p className="text-xs text-slate-400 font-medium px-2 py-0.5 rounded-full bg-white/5 inline-block">{inst.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- 2. RELATED COMPANIES (Only for Company Match) --- */}
        {match.type === 'Company' && (
          <div className={`${getFadeUpClass()}`} style={{ transitionDelay: '250ms' }}>
            <div className="flex items-center gap-3 mb-8">
              <Building className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">Industry Leaders</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {companies.map((comp) => (
                <div key={comp.id} onClick={() => navigate(`/institutions/${comp.id}`)} className="bg-white/5 border border-white/5 rounded-3xl p-4 hover:bg-white/10 transition-all cursor-pointer flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white p-2 flex items-center justify-center shrink-0">
                    <img src={comp.logo} alt={comp.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{comp.name}</h3>
                    <p className="text-xs text-slate-400">{comp.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 3. REAL-WORLD TASKS --- */}
        <div className={`${getFadeUpClass()}`} style={{ transitionDelay: '300ms' }}>
          <div className="flex items-center gap-3 mb-8">
            <CheckSquare className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl font-bold">Real-world Tasks</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tasks.map((task, index) => (
              <div
                key={index}
                onClick={() => toggleTask(task.title)}
                className={`relative group p-6 rounded-3xl border transition-all cursor-pointer ${completedTasks.includes(task.title)
                  ? 'bg-blue-600/10 border-blue-500/50'
                  : 'bg-white/5 border-white/5 hover:border-white/10'
                  } ${getFadeUpClass()}`}
                style={{ transitionDelay: `${300 + (index * 100)}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded-md border ${task.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    task.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                    {task.difficulty}
                  </span>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${completedTasks.includes(task.title) ? 'bg-blue-500 border-blue-500' : 'border-slate-600'
                    }`}>
                    {completedTasks.includes(task.title) && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </div>
                <h3 className={`text-lg font-bold mb-2 ${completedTasks.includes(task.title) ? 'text-blue-100 line-through' : 'text-white'}`}>
                  {task.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{task.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- 4. DAY IN THE LIFE --- */}
        <div className={`${getFadeUpClass()}`} style={{ transitionDelay: '400ms' }}>
          <div className="flex items-center gap-3 mb-10">
            <Clock className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold">A Day in the Life</h2>
          </div>
          <div className="relative pl-4 md:pl-10 space-y-12 before:absolute before:left-2 md:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-linear-to-b before:from-blue-500 before:via-purple-500 before:to-transparent before:opacity-30">
            {daySchedule.map((item, index) => {
              const ScheduleIcon = item.icon;
              return (
                <div
                  key={index}
                  className={`relative group ${getFadeUpClass()}`}
                  style={{ transitionDelay: `${400 + (index * 100)}ms` }}
                >
                  <div className="absolute -left-[23px] md:-left-[29px] top-0 w-6 h-6 rounded-full bg-[#020617] border-2 border-slate-700 group-hover:border-blue-500 group-hover:scale-125 transition-all duration-300 z-10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-500 group-hover:bg-blue-400 transition-colors" />
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-3xl p-6 hover:bg-white/10 hover:border-white/10 transition-all duration-300 group-hover:translate-x-2">
                    <div className="flex flex-col sm:flex-row gap-5">
                      <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${item.color} flex items-center justify-center shrink-0 shadow-lg group-hover:shadow-blue-500/20 transition-shadow`}>
                        <ScheduleIcon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="inline-block px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                          {item.time}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-2">{item.activity}</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- 5. PREMIUM CONTACTS (REDESIGNED) --- */}
        <div className={`relative ${getFadeUpClass()}`} style={{ transitionDelay: '500ms' }}>
          {/* Premium Background Glow */}
          <div className="absolute inset-0 bg-linear-to-b from-amber-500/10 via-purple-500/5 to-transparent blur-[60px] pointer-events-none" />

          <div className="relative border border-white/10 bg-[#0f172a]/80 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl">

            {/* Header */}
            <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Talk to the Pros</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Live Network Available</p>
                  </div>
                </div>
              </div>

              <button className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-all flex items-center gap-2 text-slate-300">
                <Lock className="w-3.5 h-3.5" />
                Unlock Full Access
              </button>
            </div>

            {/* Content Grid */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchMentors.map((mentor, index) => (
                <div
                  key={mentor.id}
                  className={`group relative bg-[#0a0f1c] border border-white/5 p-4 sm:p-5 rounded-2xl hover:border-amber-500/50 transition-all duration-500 overflow-hidden cursor-pointer ${getFadeUpClass()}`}
                  style={{ transitionDelay: `${600 + (index * 100)}ms` }}
                >
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-amber-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                  <div className="flex items-start gap-4 relative z-10">
                    {/* Avatar with Status Ring */}
                    <div className="relative shrink-0">
                      <div className="w-16 h-16 rounded-2xl p-0.5 bg-linear-to-br from-white/10 to-transparent group-hover:from-amber-500 group-hover:to-orange-500 transition-colors duration-500">
                        <img src={mentor.image} alt={mentor.name} className="w-full h-full rounded-[14px] object-cover bg-slate-800" />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-[3px] border-[#0a0f1c] flex items-center justify-center ${mentor.status === 'online' ? 'bg-emerald-500' : 'bg-slate-600'}`}>
                        {mentor.status === 'online' && <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors truncate pr-2">{mentor.name}</h3>
                        {mentor.status === 'online' && (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">ONLINE</span>
                        )}
                      </div>

                      <p className="text-sm text-slate-400 mt-0.5 truncate">{mentor.role}</p>
                      <p className="text-xs text-slate-500 truncate mb-3">@ {mentor.company}</p>

                      {/* Tags/Stats */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium px-2 py-1 bg-white/5 text-slate-300 rounded-md border border-white/5">
                          {mentor.exp} exp
                        </span>
                        <span className="text-[10px] font-medium px-2 py-1 bg-white/5 text-slate-300 rounded-md border border-white/5 flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          4.9
                        </span>
                      </div>
                    </div>

                    {/* Action Button (Visible on Hover) */}
                    <div className="absolute right-4 bottom-4 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <button className="w-10 h-10 rounded-xl bg-amber-500 text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="bg-[#050912] p-4 text-center border-t border-white/5">
              <p className="text-xs text-slate-500">
                Unlock premium to chat directly with industry experts. <span className="text-amber-400 cursor-pointer hover:underline">Learn more</span>
              </p>
            </div>
          </div>
        </div>

        {/* --- 6. BOTTOM CTA (QUIZ) --- */}
        <div className={`relative rounded-[2.5rem] overflow-hidden ${getScaleInClass()}`} style={{ transitionDelay: '700ms' }}>
          <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 opacity-90" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay" />
          <div className="relative z-10 px-8 py-12 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
                <Brain className="w-3 h-3" />
                <span>AI Compatibility Check</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Is this the perfect fit?</h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                Take our 2-minute personality assessment to see how your skills align with the requirements of {match.title}.
              </p>
            </div>
            <button
              onClick={() => setShowQuiz(true)}
              className="shrink-0 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div >
  );
}

export default MatchesDetailView;