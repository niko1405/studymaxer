import { useNavigate } from "react-router-dom";
import useStudyMaxer from "./hooks/useStudyMaxer";
import { Award, Home, User } from "lucide-react";
import { useEffect } from "react";

const Navigation = () => {
  const navigate = useNavigate();
  const { activeTab, showNavigation, setShowNavigation, currentPath } = useStudyMaxer();

  const handleNavigate = (tab: string) => {
    navigate(`${tab}${tab === 'home' ? '#matches' : ''}`);
  }

  useEffect(() => {
    if(currentPath.includes('matches') || currentPath.includes('institutions'))
      setShowNavigation(false);
    else
      !showNavigation && setShowNavigation(true);
  }, [currentPath]);

  if (!showNavigation) return <></>;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-auto pointer-events-none">
      <nav className="bg-[#0f1f36]/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl px-6 py-3 shadow-2xl flex items-center gap-10 ring-1 ring-white/5 pointer-events-auto transform translate-y-0 hover:scale-105 transition-transform duration-300">
        {[
          { id: 'home', icon: Home, label: 'Home' },
          { id: 'premium', icon: Award, label: 'Premium' },
          { id: 'profile', icon: User, label: 'Profile' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigate(item.id)}
            className="group relative flex flex-col items-center justify-center gap-1 min-w-12"
          >
            <div className={`
              p-2 rounded-xl transition-all duration-300 ease-out
              ${activeTab === item.id
                ? 'bg-blue-500/20 text-blue-400 -translate-y-0.5'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}
            `}>
              <item.icon className={`w-6 h-6 ${activeTab === item.id ? 'fill-blue-500/20' : ''}`} />
            </div>

            <span className={`
              absolute -bottom-2 w-1 h-1 rounded-full bg-blue-400 transition-all duration-300
              ${activeTab === item.id ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
            `} />
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;