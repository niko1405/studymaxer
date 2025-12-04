import { Building2, MapPin, Search, GraduationCap, Briefcase, Globe, Code, ArrowRight } from "lucide-react";
import { forwardRef, useState, useMemo, useEffect, useRef } from "react";

// --- Types ---
type InstitutionType = 'University' | 'University of Applied Sciences' | 'Company' | 'Vocational Training' | 'Other';

interface Institution {
  id: string;
  name: string;
  type: InstitutionType;
  location: string;
  logo: string; // URL
  tags: string[];
  description: string;
  website?: string;
}

// --- Mock Data (Translated & Updated) ---
export const institutions: Institution[] = [
  // Universities
  {
    id: 'hka',
    name: 'Karlsruhe University of Applied Sciences (HKA)',
    type: 'University of Applied Sciences',
    location: 'Karlsruhe, DE',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Hochschule_Karlsruhe_Logo.svg/1200px-Hochschule_Karlsruhe_Logo.svg.png',
    tags: ['Technology', 'Computer Science', 'Engineering', 'Top Rank'],
    description: 'HKA offers high practical relevance and close cooperation with the industry.',
  },
  {
    id: 'kit',
    name: 'Karlsruhe Institute of Technology (KIT)',
    type: 'University',
    location: 'Karlsruhe, DE',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Logo_KIT.svg/1200px-Logo_KIT.svg.png',
    tags: ['Research', 'Elite University', 'Physics', 'Informatics'],
    description: 'One of the largest research and teaching institutions in Germany.',
  },
  {
    id: 'tum',
    name: 'Technical University of Munich (TUM)',
    type: 'University',
    location: 'Munich, DE',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/TUM_Logo_blau_auf_weiss.svg/1200px-TUM_Logo_blau_auf_weiss.svg.png',
    tags: ['Excellence', 'Innovation', 'Startups', 'Global'],
    description: 'The Entrepreneurial University. Fostering talent and innovation.',
  },
  // Companies
  {
    id: 'sap',
    name: 'SAP SE',
    type: 'Company',
    location: 'Walldorf, DE',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/2560px-SAP_2011_logo.svg.png',
    tags: ['Dual Study', 'Software', 'Global Player', 'Business'],
    description: 'Market leader for enterprise software. Powering businesses globally.',
  },
  {
    id: 'porsche',
    name: 'Porsche AG',
    type: 'Company',
    location: 'Stuttgart, DE',
    logo: 'https://upload.wikimedia.org/wikipedia/de/thumb/2/2d/Porsche_Wappen.svg/1200px-Porsche_Wappen.svg.png',
    tags: ['Automotive', 'Luxury', 'Engineering', 'Dual Study'],
    description: 'Shape the future of the sports car. Driven by dreams.',
  },
  {
    id: 'nvidia',
    name: 'NVIDIA Germany',
    type: 'Company',
    location: 'Munich/Berlin, DE',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/2560px-Nvidia_logo.svg.png',
    tags: ['AI', 'Hardware', 'Deep Learning', 'Gaming'],
    description: 'Pioneers of accelerated computing and artificial intelligence.',
  },
  // Vocational / Other
  {
    id: '42',
    name: '42 Heilbronn',
    type: 'Vocational Training',
    location: 'Heilbronn, DE',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/42_Logo.svg/1200px-42_Logo.svg.png',
    tags: ['Coding School', 'Free', 'Peer-to-Peer', 'JavaScript'],
    description: 'The revolutionary coding school without teachers or books.',
  },
  {
    id: 'fraunhofer',
    name: 'Fraunhofer IOSB',
    type: 'Other',
    location: 'Karlsruhe, DE',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Fraunhofer-Gesellschaft_2009_logo.svg/1200px-Fraunhofer-Gesellschaft_2009_logo.svg.png',
    tags: ['Research', 'Robotics', 'Artificial Intelligence'],
    description: 'Research for practice. Discover innovations of tomorrow.',
  },
  {
    id: 'ihk',
    name: 'IHK Karlsruhe',
    type: 'Other',
    location: 'Karlsruhe, DE',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/IHK-Logo.svg/1200px-IHK-Logo.svg.png',
    tags: ['Consulting', 'Education', 'Networking'],
    description: 'Partner of the economy for training and further education.',
  }
];

// --- Helpers ---

// Logic to determine visual theme based on category
const getThemeByType = (type: InstitutionType) => {
  switch (type) {
    case 'University':
    case 'University of Applied Sciences':
      return {
        color: 'text-indigo-400',
        bg: 'bg-indigo-500/10',
        border: 'border-indigo-500/20',
        icon: GraduationCap,
        label: 'Academic'
      };
    case 'Company':
      return {
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
        icon: Briefcase,
        label: 'Career'
      };
    case 'Vocational Training':
      return {
        color: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
        icon: Code,
        label: 'Training'
      };
    default:
      return {
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20',
        icon: Globe,
        label: 'Other'
      };
  }
};

const ExplorerSection = forwardRef<HTMLElement>((_, ref) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [imgError, setImgError] = useState<Record<string, boolean>>({});
  
  // State for scroll-triggered animation
  const [isVisible, setIsVisible] = useState(false);
  const internalRef = useRef<HTMLElement | null>(null);

  // Combine parent ref and internal ref
  const setRefs = (node: HTMLElement | null) => {
    internalRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as React.RefObject<HTMLElement | null>).current = node;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 } // Reduced threshold slightly for better responsiveness
    );

    if (internalRef.current) {
      observer.observe(internalRef.current);
    }

    return () => {
      if (internalRef.current) observer.unobserve(internalRef.current);
    };
  }, []);

  const filtered = useMemo(() => {
    return institutions.filter(inst => {
      const matchesSearch = inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        inst.location.toLowerCase().includes(searchQuery.toLowerCase());

      if (activeFilter === 'All') return matchesSearch;
      if (activeFilter === 'Academic') return matchesSearch && (inst.type === 'University' || inst.type === 'University of Applied Sciences');
      if (activeFilter === 'Business') return matchesSearch && inst.type === 'Company';
      if (activeFilter === 'Other') return matchesSearch && (inst.type === 'Other' || inst.type === 'Vocational Training');

      return matchesSearch;
    });
  }, [searchQuery, activeFilter]);

  const handleSelect = (inst: Institution) => {
    console.log(`Selected: ${inst.name}`);
  };

  const handleImageError = (id: string) => {
    setImgError(prev => ({ ...prev, [id]: true }));
  };

  // Helper class for conditional animations
  // If not visible yet, we force opacity-0 so elements aren't seen before animating
  const getAnimClass = (baseClass: string) => 
    isVisible ? baseClass : 'opacity-0 translate-y-4';

  return (
    <section 
      ref={setRefs} 
      className="min-h-dvh w-full snap-start bg-[#020617] pt-24 px-6 pb-40 flex flex-col relative border-t border-white/5 overflow-y-auto"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-96 bg-blue-900/10 blur-[100px] pointer-events-none select-none" />
      <div className="absolute bottom-0 right-0 w-full h-96 bg-indigo-900/10 blur-[100px] pointer-events-none select-none" />

      {/* Header Section */}
      <div className="max-w-6xl mx-auto w-full mb-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className={`transition-all duration-700 ${getAnimClass('animate-in slide-in-from-bottom-5 fade-in')}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              Campus & <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">Career</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl">
              Discover your perfect place to study, work, or innovate. 
              Connect with top-tier universities and global players.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className={`flex gap-2 p-1.5 bg-[#0f172a]/80 backdrop-blur-md rounded-xl border border-white/10 overflow-x-auto no-scrollbar transition-all duration-700 delay-100 ${getAnimClass('animate-in slide-in-from-bottom-5 fade-in')}`}>
            {['All', 'Academic', 'Business', 'Other'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className={`relative group transition-all duration-700 delay-200 ${getAnimClass('animate-in slide-in-from-bottom-5 fade-in')}`}>
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative bg-[#0f172a] border border-white/10 rounded-2xl flex items-center shadow-xl group-focus-within:border-blue-500/50 transition-colors">
            <Search className="ml-5 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            <input
              type="text"
              placeholder="Search for Location, AI, SAP, Engineering..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none py-5 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-0 text-base"
            />
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {filtered.map((inst, index) => {
          const theme = getThemeByType(inst.type);
          const Icon = theme.icon;
          const hasError = imgError[inst.id];

          return (
            <div
              key={inst.id}
              onClick={() => handleSelect(inst)}
              className={`group relative bg-[#0f172a] rounded-3xl p-6 border border-white/5 hover:border-white/10 hover:bg-[#131c33] transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden fill-mode-backwards ${getAnimClass('animate-in fade-in slide-in-from-bottom-8')}`}
              style={{ 
                animationDelay: isVisible ? `${index * 100}ms` : '0ms',
                // Keep opacity 0 until visible to prevent flashing before animation
                opacity: isVisible ? undefined : 0
              }}
            >
              {/* Top Row: Logo & Category */}
              <div className="flex justify-between items-start mb-6">
                <div className="relative w-16 h-16 bg-white rounded-2xl p-2 shadow-lg flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  {!hasError ? (
                    <img 
                      src={inst.logo} 
                      alt={inst.name} 
                      className="w-full h-full object-contain" 
                      onError={() => handleImageError(inst.id)}
                    />
                  ) : (
                    <Building2 className="text-slate-800 w-8 h-8" />
                  )}
                </div>
                
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${theme.color} ${theme.bg} ${theme.border}`}>
                  <Icon className="w-3.5 h-3.5" />
                  {theme.label}
                </div>
              </div>

              {/* Main Info */}
              <div className="mb-auto">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                  {inst.name}
                </h3>
                
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                  <MapPin className="w-4 h-4 text-slate-600" />
                  <span className="truncate">{inst.location}</span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                  {inst.description}
                </p>
              </div>

              {/* Footer: Tags & Action */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2 overflow-hidden max-h-8">
                  {inst.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] font-medium px-2 py-1 bg-white/5 rounded-md text-slate-300 border border-white/5 whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                  {inst.tags.length > 2 && (
                    <span className="text-[10px] px-2 py-1 text-slate-500">+{inst.tags.length - 2}</span>
                  )}
                </div>
                
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full py-24 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-600" />
            </div>
            <p className="text-slate-300 font-medium">No results found for "{searchQuery}".</p>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your filters or search terms.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveFilter('All');}}
              className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
});

export default ExplorerSection;