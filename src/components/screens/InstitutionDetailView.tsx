import { useEffect, useState } from "react";
import { colleges, companies, extendedDetails, institutionContacts, vocationalInstitutions } from "../../config/mock";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Briefcase, CheckCircle2, ChevronRight, Crown, Download, ExternalLink, Globe, GraduationCap, Layers, Lock, MapPin, MessageCircle, Star } from "lucide-react";

const allInstitutions = [...colleges, ...companies, ...vocationalInstitutions];

const ImageWithLoader = ({ 
  src, 
  alt, 
  className, 
  containerClassName 
}: { 
  src: string, 
  alt: string, 
  className?: string, 
  containerClassName?: string 
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Skeleton Pulse (Nur sichtbar wenn nicht geladen) */}
      {!loaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse z-10" />
      )}
      
      {/* Actual Image with Blur-Up Transition */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`${className} transition-all duration-1000 ease-out ${
          loaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-xl'
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

// --- INNER COMPONENT ---

function InstitutionDetailView() {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Fallback Logic
  const currentId = id || 'sap'; 
  const institution = allInstitutions.find(i => i.id === currentId) || companies[0];
  
  // Fallback to SAP data if specific ID data is missing in mocks
  const details = extendedDetails[currentId as keyof typeof extendedDetails] || extendedDetails['sap'];
  const contacts = institutionContacts[currentId as keyof typeof institutionContacts] || institutionContacts['sap'];

  useEffect(() => {
    window.scrollTo(0,0);
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, [currentId]);

  // --- Animation Helpers ---
  const getFadeUp = (delay = 0) => 
    `transition-all delay-${delay} duration-700 ease-out transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`;
  
  const getScaleIn = () => 
    `transition-all duration-1000 ease-out transform ${mounted ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`;

  // --- RENDER CONTENT BASED ON TYPE ---
  
  const renderUniversityContent = () => (
    <div className="space-y-12">
      {/* Stats Grid */}
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${getFadeUp(100)}`} style={{ transitionDelay: '100ms' }}>
        {['Students', 'Founded', 'Staff', 'Faculties'].map((label) => (
          <div key={label} className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">{(details as any).stats?.[label.toLowerCase()] || 'N/A'}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">{label}</div>
          </div>
        ))}
      </div>

      {/* Programs */}
      <div className={`${getFadeUp(200)}`} style={{ transitionDelay: '200ms' }}>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-400" /> Study Programs
        </h3>
        <div className="grid gap-3">
          {(details as any).programs?.map((prog: any, i: number) => (
            <div key={i} className="group bg-white/5 border border-white/5 hover:border-blue-500/30 rounded-2xl p-4 flex items-center justify-between transition-all cursor-pointer">
              <div>
                <div className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{prog.name}</div>
                <div className="text-sm text-slate-500 mt-1">{prog.type} • {prog.duration} • {prog.language}</div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600 group-hover:translate-x-1 transition-transform" />
            </div>
          ))}
        </div>
      </div>

      {/* Downloads */}
      <div className={`${getFadeUp(300)}`} style={{ transitionDelay: '300ms' }}>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Download className="w-5 h-5 text-blue-400" /> Documents & Guides
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(details as any).resources?.map((res: any, i: number) => (
            <div key={i} className="bg-[#0f172a] border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-slate-200 truncate">{res.name}</div>
                <div className="text-xs text-slate-500">{res.size}</div>
              </div>
              <Download className="w-4 h-4 text-slate-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCompanyContent = () => (
    <div className="space-y-12">
      {/* Departments */}
      <div className={`${getFadeUp(100)}`} style={{ transitionDelay: '100ms' }}>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-400" /> Departments
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(details as any).departments?.map((dept: any, i: number) => (
            <div key={i} className="bg-linear-to-br from-white/5 to-transparent border border-white/5 rounded-3xl p-6 hover:scale-[1.02] transition-transform cursor-default">
              <div className="w-12 h-12 rounded-xl bg-[#0f172a] border border-white/10 flex items-center justify-center mb-4">
                <dept.icon className="w-6 h-6 text-purple-400" />
              </div>
              <div className="font-bold text-lg text-white mb-2">{dept.name}</div>
              <p className="text-sm text-slate-400 leading-relaxed">{dept.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      <div className={`${getFadeUp(200)}`} style={{ transitionDelay: '200ms' }}>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-purple-400" /> Open Positions
        </h3>
        <div className="space-y-3">
          {(details as any).jobs?.map((job: any, i: number) => (
            <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/10 transition-colors cursor-pointer group">
              <div>
                <div className="font-bold text-slate-200 group-hover:text-purple-400 transition-colors">{job.title}</div>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.loc}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5">{job.type}</span>
                </div>
              </div>
              <button className="px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-white transition-all">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className={`${getFadeUp(300)}`} style={{ transitionDelay: '300ms' }}>
        <div className="p-6 rounded-3xl bg-purple-900/10 border border-purple-500/20">
          <h4 className="font-bold text-purple-300 mb-4">Why work at {institution.name}?</h4>
          <div className="flex flex-wrap gap-2">
            {(details as any).benefits?.map((ben: string) => (
              <span key={ben} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-300 text-sm border border-purple-500/10">
                <CheckCircle2 className="w-3.5 h-3.5" /> {ben}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderVocationalContent = () => (
    <div className="space-y-12">
      {/* Curriculum */}
      <div className={`${getFadeUp(100)}`} style={{ transitionDelay: '100ms' }}>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-orange-400" /> Curriculum Tracks
        </h3>
        <div className="grid gap-4">
          {(details as any).tracks?.map((track: any, i: number) => (
            <div key={i} className="relative overflow-hidden bg-[#0f172a] border border-white/5 rounded-2xl p-6 group cursor-pointer hover:border-orange-500/30 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-orange-500/10 transition-colors" />
              <div className="relative z-10">
                <div className="text-lg font-bold text-white mb-1">{track.name}</div>
                <div className="text-slate-400 text-sm">{track.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Info */}
      <div className={`${getFadeUp(200)}`} style={{ transitionDelay: '200ms' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(details as any).info?.map((info: any, i: number) => (
            <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-5 text-center">
              <div className="text-orange-400 font-bold text-xl mb-1">{info.value}</div>
              <div className="text-slate-500 text-xs uppercase tracking-widest">{info.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden pb-24">
      
      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[100px_100px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
      </div>

      {/* --- NAV --- */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-linear-to-b from-[#020617] to-transparent">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-3">
          <button className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
            <Globe className="w-5 h-5 text-slate-300" />
          </button>
          <a href={institution.website} target="_blank" rel="noreferrer" className="px-4 h-10 rounded-full bg-blue-600 text-white font-medium flex items-center gap-2 hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20">
            <span>Visit Website</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-[55vh] min-h-[450px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithLoader 
            src={institution.background} 
            alt="Background" 
            className={`w-full h-full object-cover ${getScaleIn()}`} 
            containerClassName="w-full h-full bg-[#020617]"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#020617]/40 via-[#020617]/80 to-[#020617]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-12 w-full flex flex-col md:flex-row items-start md:items-end gap-8">
          {/* Logo Card */}
          <div className={`w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl p-4 shadow-2xl shrink-0 flex items-center justify-center overflow-hidden ${getFadeUp(0)}`}>
            <ImageWithLoader 
              src={institution.logo} 
              alt={institution.name} 
              className="w-full h-full object-contain" 
              containerClassName="w-full h-full"
            />
          </div>
          
          <div className={`flex-1 ${getFadeUp(100)}`}>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                {institution.type === 'University' || institution.type === 'University of Applied Sciences' ? 'University' : institution.type}
              </span>
              {institution.tags.slice(0, 2).map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-slate-300 text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">{institution.name}</h1>
            <div className="flex items-center gap-2 text-slate-400 mb-4">
              <MapPin className="w-4 h-4" />
              <span>{institution.location}</span>
            </div>
            <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">{institution.description}</p>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="max-w-5xl mx-auto px-6 relative z-10 -mt-4 space-y-24">
        
        {/* Dynamic Details */}
        <div>
          {institution.type.includes('University') && renderUniversityContent()}
          {institution.type === 'Company' && renderCompanyContent()}
          {(institution.type.includes('Vocational') || institution.type === 'Other') && renderVocationalContent()}
        </div>

        {/* --- PREMIUM INSIDER NETWORK --- */}
        <div className={`${getFadeUp(400)}`}>
          {/* Section Glow */}
          <div className="relative">
            <div className="absolute inset-0 -m-8 bg-linear-to-b from-amber-500/5 via-amber-600/5 to-transparent blur-[80px] pointer-events-none" />
            
            <div className="relative bg-[#0f172a]/80 backdrop-blur-2xl border border-amber-500/20 rounded-[2.5rem] overflow-hidden shadow-2xl">
              
              {/* Premium Header */}
              <div className="p-8 md:p-10 border-b border-white/5 bg-linear-to-r from-amber-500/5 to-transparent flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
                    <Crown className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Insider Network</h2>
                    <p className="text-slate-400 text-sm">Connect with alumni, recruiters, and current students.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  3 Online Now
                </div>
              </div>

              {/* Profiles Grid */}
              <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                {contacts.map((person, idx) => (
                  <div 
                    key={idx}
                    className="group relative bg-[#0a0f1c] border border-white/5 hover:border-amber-500/40 p-5 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    <div className="flex items-center gap-4 relative z-10">
                      {/* Avatar */}
                      <div className="relative w-16 h-16 shrink-0">
                        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/10 to-white/5 group-hover:from-amber-500 group-hover:to-orange-500 transition-colors duration-500 p-0.5">
                          <ImageWithLoader 
                            src={person.img} 
                            alt={person.name} 
                            className="w-full h-full rounded-[14px] object-cover bg-slate-800" 
                            containerClassName="w-full h-full rounded-[14px] bg-slate-800"
                          />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-[3px] border-[#0a0f1c] ${person.status === 'online' ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors truncate">{person.name}</h4>
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-sm text-slate-400">{person.role}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5 group-hover:border-amber-500/20 group-hover:text-amber-200 transition-colors">
                            Verifiziert
                          </span>
                        </div>
                      </div>

                      <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-amber-500 group-hover:text-black transition-all shadow-lg">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Unlock Footer */}
              <div className="bg-[#050912] p-6 text-center border-t border-white/5">
                <button className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-linear-to-r from-amber-500 to-orange-600 text-white font-bold shadow-lg shadow-amber-900/20 hover:scale-105 active:scale-95 transition-all">
                  <Lock className="w-4 h-4" />
                  Unlock Full Access
                </button>
                <p className="text-xs text-slate-600 mt-3">Premium members get unlimited messages & priority replies.</p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
export default InstitutionDetailView;