import { useNavigate } from "react-router-dom";
import useStudyMaxer from "./hooks/useStudyMaxer";
import { Award, Home, User } from "lucide-react";

const Navigation = () => {
    const navigate = useNavigate();
    const { activeTab } = useStudyMaxer();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-[#0f1f36] border-t border-gray-800 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-around items-center h-20 max-w-2xl mx-auto">
                <button
                    onClick={() => navigate('/home')}
                    className={`flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === 'home' ? 'text-[#3b82f6]' : 'text-gray-400'
                        }`}
                >
                    <Home className="w-6 h-6" />
                    <span className="text-xs">Home</span>
                </button>

                <button
                    onClick={() => navigate('/premium')}
                    className={`flex flex-col items-center justify-center gap-1 transition-colors relative ${activeTab === 'premium' ? 'text-[#3b82f6]' : 'text-gray-400'
                        }`}
                >
                    <Award className="w-6 h-6" />
                    <span className="text-xs">Premium</span>
                    {activeTab !== 'premium' && (
                        <div className="absolute top-0 right-3 w-2 h-2 bg-[#3b82f6] rounded-full"></div>
                    )}
                </button>

                <button
                    onClick={() => navigate('/profile')}
                    className={`flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-[#3b82f6]' : 'text-gray-400'
                        }`}
                >
                    <User className="w-6 h-6" />
                    <span className="text-xs">Profile</span>
                </button>
            </div>
        </nav>
    );
}

export default Navigation;