import { useState } from 'react';
import { ArrowLeft, Send, Search, Crown } from 'lucide-react';
import { ImageWithFallback } from '../ImageWithFallback';

const mentors = [
  {
    id: '1',
    name: 'Sarah Mueller',
    role: 'Software Engineer',
    company: 'Google',
    field: 'Computer Science',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    online: true,
    lastMessage: 'Happy to help with your questions!',
    unread: 2,
    lastActive: '2m ago',
    recentlyContacted: true,
  },
  {
    id: '2',
    name: 'Dr. Michael Schmidt',
    role: 'Clinical Psychologist',
    company: 'University Hospital',
    field: 'Psychology',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    online: false,
    lastMessage: 'The studies are very exciting...',
    unread: 0,
    lastActive: '1h ago',
    recentlyContacted: true,
  },
  {
    id: '3',
    name: 'Lisa Weber',
    role: 'UX Designer',
    company: 'BMW',
    field: 'Design',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    online: true,
    lastMessage: 'Creativity is the most important thing!',
    unread: 1,
    lastActive: '5m ago',
    recentlyContacted: true,
  },
  {
    id: '4',
    name: 'Thomas Becker',
    role: 'Data Scientist',
    company: 'Siemens',
    field: 'Computer Science',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    online: true,
    lastMessage: 'Machine Learning is the future',
    unread: 0,
    lastActive: '10m ago',
    recentlyContacted: false,
  },
  {
    id: '5',
    name: 'Anna Schneider',
    role: 'Medical Doctor',
    company: 'Charité Berlin',
    field: 'Medicine',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
    online: false,
    lastMessage: 'Medicine requires dedication',
    unread: 0,
    lastActive: '2h ago',
    recentlyContacted: false,
  },
  {
    id: '6',
    name: 'Mark Johnson',
    role: 'Master Carpenter',
    company: 'Johnson & Sons',
    field: 'Carpentry',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
    online: true,
    lastMessage: 'Craftsmanship is an art',
    unread: 0,
    lastActive: '30m ago',
    recentlyContacted: false,
  },
];

const mockChats: Record<string, Array<{ sender: 'user' | 'mentor'; message: string; time: string }>> = {
  '1': [
    { sender: 'mentor', message: 'Hello! Great to see you\'re interested in Computer Science. How can I help you?', time: '10:30' },
    { sender: 'user', message: 'Hi Sarah! I\'m not sure if Computer Science is right for me. How was your degree?', time: '10:32' },
    { sender: 'mentor', message: 'The studies were challenging but super exciting! You not only learn to program, but also to think in a problem-solving way.', time: '10:35' },
    { sender: 'mentor', message: 'What are your biggest concerns?', time: '10:35' },
    { sender: 'user', message: 'I\'m worried it will be too difficult, especially math...', time: '10:40' },
    { sender: 'mentor', message: 'Happy to help with your questions!', time: '10:42' },
  ],
  '2': [
    { sender: 'mentor', message: 'Hello! I\'m Dr. Schmidt. Are you interested in Psychology?', time: '14:20' },
    { sender: 'user', message: 'Yes, very much! How long did your studies take?', time: '14:25' },
    { sender: 'mentor', message: 'The studies are very exciting...', time: '14:30' },
  ],
  '3': [
    { sender: 'mentor', message: 'Hey! Lisa here. You\'re interested in Design?', time: '09:15' },
    { sender: 'user', message: 'Yes! How did you end up at BMW?', time: '09:20' },
    { sender: 'mentor', message: 'Creativity is the most important thing!', time: '09:25' },
  ],
  '4': [
    { sender: 'mentor', message: 'Hello! Thomas here. Data Science is an exciting field!', time: '16:00' },
    { sender: 'user', message: 'What skills do I need for it?', time: '16:05' },
    { sender: 'mentor', message: 'Machine Learning is the future', time: '16:10' },
  ],
  '5': [
    { sender: 'mentor', message: 'Hi! I\'m Dr. Schneider. Medicine is a rewarding but demanding path.', time: '11:00' },
    { sender: 'mentor', message: 'Medicine requires dedication', time: '11:01' },
  ],
  '6': [
    { sender: 'mentor', message: 'Hello! Mark here. Carpentry is both art and skill.', time: '13:00' },
    { sender: 'mentor', message: 'Craftsmanship is an art', time: '13:01' },
  ],
};

type ViewType = 'features' | 'mentors' | 'chat' | 'upgrade';

export function PremiumScreen() {
  const [currentView, setCurrentView] = useState<ViewType>('features');
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessages, setChatMessages] = useState<Record<string, Array<{ sender: 'user' | 'mentor'; message: string; time: string }>>>(mockChats);

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

  const filteredMentors = mentors.filter(mentor =>
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.field.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentlyContacted = filteredMentors.filter(m => m.recentlyContacted);
  const others = filteredMentors.filter(m => !m.recentlyContacted);

  // Chat View
  if (currentView === 'chat' && selectedMentor) {
    const mentor = mentors.find(m => m.id === selectedMentor);
    const chat = chatMessages[selectedMentor] || [];

    if (!mentor) return null;

    return (
      <div className="min-h-screen bg-[#0a1628] text-white flex flex-col animate-in fade-in duration-300">
        {/* Fixed Chat Header */}
        <div className="sticky top-0 z-50 bg-[#0f1f36]/95 backdrop-blur-sm px-6 py-4 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setSelectedMentor(null);
                setCurrentView('mentors');
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <div className="relative">
              <ImageWithFallback
                src={mentor.avatar}
                alt={mentor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {mentor.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0f1f36]"></div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-white">{mentor.name}</h3>
              <p className="text-sm text-gray-400">{mentor.role} @ {mentor.company}</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`flex animate-in slide-in-from-bottom duration-300 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-[#3b82f6] text-white'
                    : 'bg-gray-800 text-gray-100'
                }`}
              >
                <p>{msg.message}</p>
                <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Fixed Message Input */}
        <div className="sticky bottom-0 bg-[#0f1f36]/95 backdrop-blur-sm px-6 py-4 border-t border-gray-700">
          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Write a message..."
              className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-[#3b82f6]"
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="w-12 h-12 bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
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
      <div className="min-h-screen bg-[#0a1628] text-white px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setCurrentView('features')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1>Mentor Chat</h1>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mentors..."
              className="w-full bg-gray-800/50 border border-gray-700 text-white pl-12 pr-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-[#3b82f6]"
            />
          </div>

          {/* Recently Contacted */}
          {recentlyContacted.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-gray-400">Recently Contacted</h2>
              <div className="space-y-3">
                {recentlyContacted.map((mentor) => (
                  <MentorCard
                    key={mentor.id}
                    mentor={mentor}
                    onClick={() => {
                      setSelectedMentor(mentor.id);
                      setCurrentView('chat');
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Others */}
          {others.length > 0 && (
            <div>
              <h2 className="mb-4 text-gray-400">Others</h2>
              <div className="space-y-3">
                {others.map((mentor) => (
                  <MentorCard
                    key={mentor.id}
                    mentor={mentor}
                    onClick={() => {
                      setSelectedMentor(mentor.id);
                      setCurrentView('chat');
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {filteredMentors.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No mentors found matching your search.
            </div>
          )}
        </div>
      </div>
    );
  }

  // Upgrade View
  if (currentView === 'upgrade') {
    return (
      <div className="min-h-screen bg-[#0a1628] text-white px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setCurrentView('features')}
            className="flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-full mb-4">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h1 className="mb-2">Unlock Premium</h1>
            <p className="text-gray-400">Get unlimited access to all premium features</p>
          </div>

          <div className="bg-gradient-to-br from-[#3b82f6]/20 to-[#8b5cf6]/20 border-2 border-[#3b82f6] rounded-3xl p-8 mb-6">
            <div className="text-center mb-6">
              <div className="text-5xl mb-2">$9.99</div>
              <div className="text-gray-400">per month</div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#3b82f6] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Unlimited mentor chats</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#3b82f6] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Priority responses from experts</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#3b82f6] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Exclusive study guides & resources</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#3b82f6] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Access to live Q&A sessions</span>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:from-[#2563eb] hover:to-[#7c3aed] text-white py-4 rounded-full transition-colors flex items-center justify-center">
              Subscribe Now
            </button>
          </div>

          <p className="text-center text-sm text-gray-400">
            Cancel anytime. No commitments.
          </p>
        </div>
      </div>
    );
  }

  // Features View (Default)
  return (
    <div className="min-h-screen bg-[#0a1628] text-white px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1>Premium Features</h1>
          <button
            onClick={() => setCurrentView('upgrade')}
            className="flex items-center gap-2 bg-gradient-to-r from-[#f59e0b] to-[#d97706] px-4 py-2 rounded-full hover:from-[#d97706] hover:to-[#b45309] transition-colors"
          >
            <Crown className="w-4 h-4" />
            <span>Upgrade</span>
          </button>
        </div>
        
        <p className="text-gray-400 mb-8">
          Chat with real students and professionals from your areas of interest
        </p>

        {/* Premium Features Overview */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <button
            onClick={() => setCurrentView('mentors')}
            className="bg-gradient-to-r from-[#3b82f6]/20 to-transparent border border-[#3b82f6]/50 rounded-2xl p-6 text-left hover:from-[#3b82f6]/30 transition-all"
          >
            <h3 className="mb-2">💬 Mentor Chat</h3>
            <p className="text-gray-400 mb-4">
              Direct 1:1 conversations with experts from your desired fields
            </p>
            <div className="inline-block px-3 py-1 bg-green-500/20 border border-green-500 rounded-full text-sm text-green-400">
              Available
            </div>
          </button>

          <button
            onClick={() => setCurrentView('upgrade')}
            className="bg-gray-800/30 border border-gray-700 rounded-2xl p-6 text-left opacity-60 hover:opacity-80 transition-opacity"
          >
            <h3 className="mb-2">🎥 Live Sessions</h3>
            <p className="text-gray-400 mb-4">
              Weekly live Q&A sessions with industry experts
            </p>
            <div className="inline-block px-3 py-1 bg-gray-600/50 border border-gray-600 rounded-full text-sm text-gray-400">
              Coming Soon
            </div>
          </button>

          <button
            onClick={() => setCurrentView('upgrade')}
            className="bg-gray-800/30 border border-gray-700 rounded-2xl p-6 text-left opacity-60 hover:opacity-80 transition-opacity"
          >
            <h3 className="mb-2">📚 Exclusive Content</h3>
            <p className="text-gray-400 mb-4">
              Access to detailed study guides and career roadmaps
            </p>
            <div className="inline-block px-3 py-1 bg-gray-600/50 border border-gray-600 rounded-full text-sm text-gray-400">
              Coming Soon
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function MentorCard({ mentor, onClick }: { mentor: typeof mentors[0]; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-2xl p-4 transition-colors text-left"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <ImageWithFallback
            src={mentor.avatar}
            alt={mentor.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {mentor.online && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-white">{mentor.name}</h3>
            {mentor.unread > 0 && (
              <div className="w-5 h-5 bg-[#3b82f6] rounded-full flex items-center justify-center text-xs">
                {mentor.unread}
              </div>
            )}
          </div>
          <p className="text-sm text-gray-400 mb-1">
            {mentor.role} @ {mentor.company}
          </p>
          <p className="text-sm text-gray-500 truncate">{mentor.lastMessage}</p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-xs text-gray-500">{mentor.lastActive}</span>
          <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">{mentor.field}</span>
        </div>
      </div>
    </button>
  );
}