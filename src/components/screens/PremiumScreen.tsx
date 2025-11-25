import { useEffect, useState } from 'react';
import { ArrowLeft, Send, Search, Crown, Library, Lock, Video, MessageCircle, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../ImageWithFallback';
import { mentors, mockChats } from '../../config/mock';
import { type SetState } from '../../types/types';
import useStudyMaxer from '../hooks/useStudyMaxer';

interface UpgradeScreenProps {
  setCurrentView: SetState<ViewType>;
}

const UpgradeScreen = ({ setCurrentView }: UpgradeScreenProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBack = () => {
    setCurrentView('features');
  };

  const baseTransition = "transition-all duration-700 ease-out";
  const getAnimClass = (_ = 0) => 
    `${baseTransition} ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`;

  return (
    <div className={`min-h-screen bg-[#0a1628] text-white px-6 py-8 ${baseTransition} ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-2xl mx-auto pb-[75px]">
        <button
          onClick={handleBack}
          className="flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        <div className={`text-center mb-8 ${getAnimClass(100)}`} style={{ transitionDelay: '100ms' }}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-[#f59e0b] to-[#d97706] rounded-full mb-4 shadow-lg shadow-orange-500/30">
            <Crown className="w-10 h-10 text-white animate-pulse" />
          </div>
          <h1 className="mb-2 text-3xl font-bold">Unlock Premium</h1>
          <p className="text-gray-400">Get unlimited access to all premium features</p>
        </div>

        <div className={`bg-linear-to-br from-[#3b82f6]/20 to-[#8b5cf6]/20 border-2 border-[#3b82f6] rounded-3xl p-8 mb-6 ${getAnimClass(200)}`} style={{ transitionDelay: '200ms' }}>
          <div className="text-center mb-6">
            <div className="text-5xl font-bold mb-2 tracking-tight">$9.99</div>
            <div className="text-gray-400 uppercase tracking-widest text-xs font-bold">per month</div>
          </div>

          <div className="space-y-4 mb-8">
            {[
              "Unlimited mentor chats",
              "Priority responses from experts",
              "Exclusive study guides & resources",
              "Access to live Q&A sessions"
            ].map((feature, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-3 ${getAnimClass()}`}
                style={{ transitionDelay: `${300 + (i * 100)}ms` }}
              >
                <div className="w-6 h-6 bg-[#3b82f6] rounded-full flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-200">{feature}</span>
              </div>
            ))}
          </div>

          <button className="w-full bg-linear-to-r from-[#3b82f6] to-[#8b5cf6] hover:from-[#2563eb] hover:to-[#7c3aed] text-white py-4 rounded-full transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95 font-bold text-lg">
            Subscribe Now
          </button>
        </div>

        <p className={`text-center text-sm text-gray-400 ${getAnimClass(500)}`} style={{ transitionDelay: '500ms' }}>
          Cancel anytime. No commitments.
        </p>
      </div>
    </div>
  );
}

type ViewType = 'features' | 'mentors' | 'chat' | 'upgrade';

export function PremiumScreen() {
  const [currentView, setCurrentView] = useState<ViewType>('features');
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessages, setChatMessages] = useState<Record<string, Array<{ sender: 'user' | 'mentor'; message: string; time: string }>>>(mockChats);
  const [mounted, setMounted] = useState(false);

  const { setShowNavigation } = useStudyMaxer();

  useEffect(() => {
    // Kurze Verzögerung für den Mount-Effekt, damit CSS-Transitions greifen
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, [currentView]); // Re-trigger animation on view change

  const handleSendMessage = () => {
    if (message.trim() && selectedMentor) {
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

      const newMessage = {
        sender: 'user' as const,
        message: message.trim(),
        time: timeStr,
      };

      setChatMessages(prev => ({
        ...prev,
        [selectedMentor]: [...(prev[selectedMentor] || []), newMessage],
      }));

      setMessage('');
    }
  };

  useEffect(() => {
    if(currentView !== 'features')
      setShowNavigation(false);
    else 
      setShowNavigation(true);
  }, [currentView]);

  const filteredMentors = mentors.filter(mentor =>
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.field.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentlyContacted = filteredMentors.filter(m => m.recentlyContacted);
  const others = filteredMentors.filter(m => !m.recentlyContacted);

  const baseTransition = "transition-all duration-500 ease-out";
  const slideUpClass = `${baseTransition} ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
  const slideRightClass = `${baseTransition} ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`;

  // Chat View
  if (currentView === 'chat' && selectedMentor) {
    const mentor = mentors.find(m => m.id === selectedMentor);
    const chat = chatMessages[selectedMentor] || [];

    if (!mentor) return null;

    return (
      <div className={`min-h-screen bg-[#0a1628] text-white flex flex-col ${slideRightClass}`}>
        {/* Fixed Chat Header */}
        <div className="sticky top-0 z-50 bg-[#0f1f36]/95 backdrop-blur-md px-6 py-4 border-b border-gray-700 shadow-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setMounted(false); // Reset animation state before unmount logic if needed, but simple switch works too
                setTimeout(() => {
                  setSelectedMentor(null);
                  setCurrentView('mentors');
                }, 10);
              }}
              className="text-gray-400 hover:text-white transition-colors p-1 -ml-1 hover:bg-white/5 rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <div className="relative">
              <ImageWithFallback
                src={mentor.avatar}
                alt={mentor.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-700"
              />
              {mentor.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0f1f36] shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-white font-medium">{mentor.name}</h3>
              <p className="text-sm text-gray-400">{mentor.role} @ {mentor.company}</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`flex ${baseTransition} ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div
                className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-sm ${msg.sender === 'user'
                    ? 'bg-[#3b82f6] text-white rounded-br-none'
                    : 'bg-gray-800 text-gray-100 rounded-bl-none'
                  }`}
              >
                <p className="leading-relaxed">{msg.message}</p>
                <span className={`text-[10px] mt-1 block ${msg.sender === 'user' ? 'text-blue-100/70' : 'text-gray-400'}`}>{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Fixed Message Input */}
        <div className="sticky bottom-0 bg-[#0f1f36]/95 backdrop-blur-md px-6 py-4 border-t border-gray-700">
          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Write a message..."
              className="flex-1 bg-gray-800/80 text-white px-5 py-3.5 rounded-full outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all placeholder:text-gray-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="w-12 h-12 bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Mentors List View
  if (currentView === 'mentors') {
    return (
      <div className={`min-h-screen bg-[#0a1628] text-white px-6 py-8 ${slideRightClass}`}>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setCurrentView('features')}
              className="text-gray-400 hover:text-white transition-colors p-1 -ml-1 hover:bg-white/5 rounded-full group"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <h1 className="text-xl font-bold">Mentor Chat</h1>
          </div>

          {/* Search */}
          <div className="relative mb-8 group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#3b82f6] transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mentors..."
              className="w-full bg-gray-800/50 border border-gray-700 text-white pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all"
            />
          </div>

          {/* Recently Contacted */}
          {recentlyContacted.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Recently Contacted</h2>
              <div className="space-y-3">
                {recentlyContacted.map((mentor, i) => (
                   <div key={mentor.id} className={`${slideUpClass}`} style={{ transitionDelay: `${i * 100}ms` }}>
                    <MentorCard
                        mentor={mentor}
                        onClick={() => {
                          setMounted(false);
                          setTimeout(() => {
                            setSelectedMentor(mentor.id);
                            setCurrentView('chat');
                          }, 10);
                        }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Others */}
          {others.length > 0 && (
            <div>
              <h2 className="mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">All Mentors</h2>
              <div className="space-y-3">
                {others.map((mentor, i) => (
                  <div key={mentor.id} className={`${slideUpClass}`} style={{ transitionDelay: `${(recentlyContacted.length * 100) + (i * 100)}ms` }}>
                    <MentorCard
                        mentor={mentor}
                        onClick={() => {
                          setMounted(false);
                          setTimeout(() => {
                            setSelectedMentor(mentor.id);
                            setCurrentView('chat');
                          }, 10);
                        }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredMentors.length === 0 && (
            <div className="text-center py-12 text-gray-400 animate-pulse">
              No mentors found matching your search.
            </div>
          )}
        </div>
      </div>
    );
  }

  // Upgrade View
  if (currentView === 'upgrade')
    return <UpgradeScreen setCurrentView={setCurrentView} />


  // DEFAULT FEATURES VIEW
  return (
    <div className={`flex-1 overflow-y-auto pb-32 bg-[#0a1628] scroll-smooth`}>
      <div className="max-w-2xl mx-auto px-6 py-8">

        {/* Header Section */}
        <div className={`flex items-center justify-between mb-8 ${slideUpClass}`} style={{ transitionDelay: '100ms' }}>
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Premium</h1>
            <p className="text-gray-400 text-sm">Unlock your full potential</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 animate-pulse">
            <Crown className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Hero Banner */}
        <div 
          className={`relative rounded-3xl overflow-hidden mb-10 group cursor-pointer border border-orange-500/30 shadow-2xl hover:shadow-orange-500/10 transition-all duration-700 ease-out ${mounted ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-amber-500 opacity-90 transition-opacity group-hover:opacity-100"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>

          <div className="relative p-6 sm:p-8 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm text-xs font-bold text-white mb-4 border border-white/10 shadow-sm">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              <span>PRO MEMBER</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Upgrade to Premium</h2>
            <p className="text-white/80 text-sm mb-6 max-w-xs leading-relaxed">Get unlimited swipes, direct mentor access, and detailed career roadmaps.</p>
            <button onClick={() => setCurrentView('upgrade')} className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
              <Zap className="w-4 h-4 fill-current" />
              Buy now
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <h3 className={`text-lg font-semibold text-white mb-4 flex items-center gap-2 ${slideUpClass}`} style={{ transitionDelay: '300ms' }}>
          Features
          <span className="text-xs font-normal text-gray-500 bg-gray-800 px-2 py-0.5 rounded-md border border-gray-700">3 Available</span>
        </h3>

        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${slideUpClass}`} style={{ transitionDelay: '400ms' }}>

          {/* Active Feature: Mentor Chat */}
          <div
            onClick={() => setCurrentView('mentors')}
            className="col-span-1 sm:col-span-2 bg-[#111e33] border border-blue-500/30 rounded-3xl p-6 relative overflow-hidden group cursor-pointer hover:border-blue-500/60 hover:bg-[#15233b] transition-all shadow-lg hover:shadow-blue-900/10 active:scale-[0.99]"
          >
            <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity group-hover:translate-x-1 duration-300">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/10">
                <ArrowRight className="w-5 h-5 text-blue-400" />
              </div>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-inner">
              <MessageCircle className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Mentor Chat</h3>
            <p className="text-gray-400 text-sm mb-4">Direct 1:1 conversations with experts.</p>

            {/* Avatars Pile */}
            <div className="flex items-center -space-x-3 pl-1">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-9 h-9 rounded-full border-2 border-[#111e33] bg-gray-600 flex items-center justify-center text-xs overflow-hidden transition-transform hover:-translate-y-1 relative z-0 hover:z-10">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-9 h-9 rounded-full border-2 border-[#111e33] bg-gray-700 flex items-center justify-center text-[10px] text-gray-300 font-bold">
                +12
              </div>
            </div>
          </div>

          {/* Locked Feature: Live Sessions */}
          <div className="bg-[#111e33]/50 border border-gray-700/50 rounded-3xl p-6 relative group overflow-hidden transition-all hover:bg-[#111e33]">
            {/* Glass Overlay with Lock */}
            <div className="absolute inset-0 bg-[#0a1628]/60 backdrop-blur-[2px] flex flex-col items-center justify-center z-10 transition-all group-hover:backdrop-blur-[1px] group-hover:bg-[#0a1628]/40">
              <div className="w-10 h-10 rounded-full bg-gray-800/80 border border-gray-600 flex items-center justify-center mb-2 shadow-xl group-hover:scale-110 transition-transform">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-gray-300">Coming Soon</span>
            </div>

            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center mb-3 grayscale group-hover:grayscale-0 transition-all">
              <Video className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-300 mb-1">Live Sessions</h3>
            <p className="text-gray-500 text-xs">Weekly Q&A with industry pros.</p>
          </div>

          {/* Locked Feature: Exclusive Content */}
          <div className="bg-[#111e33]/50 border border-gray-700/50 rounded-3xl p-6 relative group overflow-hidden transition-all hover:bg-[#111e33]">
            {/* Glass Overlay with Lock */}
            <div className="absolute inset-0 bg-[#0a1628]/60 backdrop-blur-[2px] flex flex-col items-center justify-center z-10 transition-all group-hover:backdrop-blur-[1px] group-hover:bg-[#0a1628]/40">
              <div className="w-10 h-10 rounded-full bg-gray-800/80 border border-gray-600 flex items-center justify-center mb-2 shadow-xl group-hover:scale-110 transition-transform">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-gray-300">Coming Soon</span>
            </div>

            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3 grayscale group-hover:grayscale-0 transition-all">
              <Library className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-300 mb-1">Roadmaps</h3>
            <p className="text-gray-500 text-xs">Detailed career guides & paths.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

function MentorCard({ mentor, onClick }: { mentor: typeof mentors[0]; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-gray-600 rounded-2xl p-4 transition-all text-left group hover:shadow-lg hover:shadow-black/20"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <ImageWithFallback
            src={mentor.avatar}
            alt={mentor.name}
            className="w-16 h-16 rounded-full object-cover group-hover:ring-2 ring-gray-600 transition-all"
          />
          {mentor.online && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800 group-hover:border-gray-700 transition-colors"></div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">{mentor.name}</h3>
            {mentor.unread > 0 && (
              <div className="w-5 h-5 bg-[#3b82f6] rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm">
                {mentor.unread}
              </div>
            )}
          </div>
          <p className="text-sm text-gray-400 mb-1">
            {mentor.role} @ {mentor.company}
          </p>
          <p className="text-sm text-gray-500 truncate group-hover:text-gray-400 transition-colors">{mentor.lastMessage}</p>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <span className="text-xs text-gray-500 font-medium">{mentor.lastActive}</span>
          <span className="px-2.5 py-1 bg-gray-700/50 group-hover:bg-gray-700 border border-white/5 rounded-lg text-xs text-gray-300 transition-colors">{mentor.field}</span>
        </div>
      </div>
    </button>
  );
}