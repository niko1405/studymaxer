import { useState } from 'react';
import { ArrowLeft, GraduationCap, MapPin, BookOpen, Users, TrendingUp, Brain, Bookmark, BookmarkCheck } from 'lucide-react';
import { user } from '../../config/mock';

interface StudyDetailViewProps {
  study: {
    id: string;
    title: string;
    type: string;
    match: number;
    description: string;
    icon: any;
    careers: string[];
    glowColor: string;
    backgroundImage: string;
  };
  onBack: () => void;
  isSaved: boolean;
  onSave: () => void;
}

const dayScheduleIcons = [
  { icon: GraduationCap, color: 'from-blue-500 to-cyan-500' },
  { icon: BookOpen, color: 'from-purple-500 to-pink-500' },
  { icon: Users, color: 'from-orange-500 to-amber-500' },
  { icon: Users, color: 'from-teal-500 to-emerald-500' },
  { icon: BookOpen, color: 'from-green-500 to-lime-500' },
  { icon: TrendingUp, color: 'from-rose-500 to-red-500' },
];

export function StudyDetailView({ study, onBack, isSaved, onSave }: StudyDetailViewProps) {
  const [showQuiz, setShowQuiz] = useState(false);
  const Icon = study.icon;

  const dayInLife = [
    { time: '09:00 - 10:30', activity: 'Lecture: Intro to AI', description: 'Dive into the fundamentals of Artificial Intelligence and machine learning concepts.' },
    { time: '11:00 - 12:30', activity: 'Coding Session', description: 'Apply what you\'ve learned in a hands-on programming exercise. Today: Python basics.' },
    { time: '13:00 - 14:00', activity: 'Lunch at the Mensa', description: 'Recharge and socialize with fellow students over a healthy meal.' },
    { time: '14:00 - 16:00', activity: 'Teamwork on App Prototype', description: 'Collaborate with your group on the semester project. Brainstorming and wireframing.' },
    { time: '16:00 - 17:30', activity: 'Library Research', description: 'Independent study time for research for your upcoming essay on ethics in AI.' },
    { time: '18:00 - 19:00', activity: 'University Sports', description: 'Unwind and stay active with your favorite campus sports team.' },
  ];

  const institutions = study.type === 'Study Program' ? [
    { name: 'MIT', location: 'Cambridge, MA', rank: '#1 Worldwide' },
    { name: 'Stanford University', location: 'Stanford, CA', rank: '#2 Worldwide' },
    { name: 'ETH Zurich', location: 'Zurich, Switzerland', rank: '#1 Europe' },
    { name: 'Technical University Munich', location: 'Munich, Germany', rank: 'Top 50' },
  ] : [
    { name: 'Johnson & Sons Carpentry', location: 'Munich, Germany', rank: 'Master Training' },
    { name: 'Handwerk Excellence Center', location: 'Berlin, Germany', rank: 'Award-Winning' },
    { name: 'Traditional Crafts Guild', location: 'Hamburg, Germany', rank: 'Certified' },
  ];

  const quizQuestions = [
    { question: 'Do you enjoy solving complex problems?', type: 'rating' },
    { question: 'How comfortable are you with mathematics?', type: 'rating' },
    { question: 'Do you prefer working alone or in teams?', type: 'choice' },
  ];

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-[#0a1628] text-white animate-in fade-in duration-300">
        <div className="px-6 py-8">
          <button
            onClick={() => setShowQuiz(false)}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Details</span>
          </button>

          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className={`inline-flex w-20 h-20 rounded-full bg-linear-to-br items-center justify-center mb-4`}>
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h1 className="mb-2">Discover Your Fit</h1>
              <p className="text-gray-400">Answer these questions to learn more about your compatibility with {study.title}</p>
            </div>

            <div className="space-y-6">
              {quizQuestions.map((q, index) => (
                <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 animate-in slide-in-from-bottom duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                  <h3 className="mb-4">{q.question}</h3>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        className="flex-1 py-3 bg-gray-700/50 hover:bg-[#3b82f6] border border-gray-600 hover:border-[#3b82f6] rounded-xl transition-all"
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 bg-linear-to-r from-[#3b82f6] to-[#8b5cf6] hover:from-[#2563eb] hover:to-[#7c3aed] text-white py-4 rounded-full transition-all flex items-center justify-center">
              Complete Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1628] text-white animate-in fade-in duration-300 pb-[100px]">
      {/* Fixed Header */}
      <div className="sticky top-0 z-50 bg-[#0a1628]/95 backdrop-blur-sm border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-full transition-all"
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-5 h-5 text-[#3b82f6]" />
                <span className="text-[#3b82f6]">Saved</span>
              </>
            ) : (
              <>
                <Bookmark className="w-5 h-5" />
                <span>Save</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-6 py-12 max-w-4xl mx-auto">
        <div className="flex items-start gap-6 mb-8 animate-in slide-in-from-top duration-500">
          <div className={`w-20 h-20 rounded-2xl bg-linear-to-br flex items-center justify-center shadow-xl`}>
            <Icon className="w-10 h-10" style={{ color: study.glowColor }} />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="px-4 py-1.5 bg-[#3b82f6]/20 border border-[#3b82f6] rounded-full">
                <span className="text-[#3b82f6]">{study.match}% Match</span>
              </div>
              <div className="px-4 py-1.5 bg-gray-800/50 border border-gray-600 rounded-full">
                <span className="text-gray-300">{study.type}</span>
              </div>
            </div>
            <h1 className="text-4xl mb-3">{study.title}</h1>
            <p className="text-gray-300 text-lg leading-relaxed">{study.description}</p>
          </div>
        </div>

        {/* A Day in the Life - Styled like the image */}
        <div className="mb-8 animate-in slide-in-from-bottom duration-500 delay-100">
          <h2 className="mb-6 text-3xl">{`Here's what your day could look like, ${user.name.split(' ')[0]}!`}</h2>
          
          <div className="space-y-4">
            {dayInLife.map((item, index) => {
              const scheduleIcon = dayScheduleIcons[index];
              const ScheduleIcon = scheduleIcon.icon;
              
              return (
                <div 
                  key={index} 
                  className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-5 hover:bg-gray-800/50 transition-all animate-in slide-in-from-left duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${scheduleIcon.color} flex items-center justify-center shrink-0 shadow-lg`}>
                      <ScheduleIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[#3b82f6] mb-1">{item.time}</div>
                      <h3 className="mb-2 text-xl">{item.activity}</h3>
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Save Course Button (like in the image) */}
        <button 
          onClick={onSave}
          className={`w-full py-4 rounded-full transition-all flex items-center justify-center gap-3 mb-8 shadow-lg ${
            isSaved 
              ? 'bg-[#3b82f6] hover:bg-[#2563eb] text-white' 
              : 'bg-[#3b82f6] hover:bg-[#2563eb] text-white'
          }`}
        >
          {isSaved ? <BookmarkCheck className="w-6 h-6" /> : <Bookmark className="w-6 h-6" />}
          <span className="text-lg">{isSaved ? 'Course Saved' : 'Save Course'}</span>
        </button>

        {/* Top Institutions */}
        <div className="mb-8 animate-in slide-in-from-bottom duration-500 delay-200">
          <h2 className="mb-6 text-3xl">
            {study.type === 'Study Program' ? 'Top Universities' : 'Recommended Training Centers'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {institutions.map((inst, index) => (
              <div 
                key={index} 
                className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-5 hover:bg-gray-800/50 transition-all cursor-pointer animate-in fade-in duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center shrink-0">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">{inst.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{inst.location}</span>
                    </div>
                    <div className="inline-block px-3 py-1 bg-[#3b82f6]/20 border border-[#3b82f6] rounded-full text-sm text-[#3b82f6]">
                      {inst.rank}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Paths */}
        <div className="mb-8 animate-in slide-in-from-bottom duration-500 delay-300">
          <h2 className="mb-6 text-3xl">Career Opportunities</h2>
          <div className="flex flex-wrap gap-3">
            {study.careers.map((career, index) => (
              <span
                key={career}
                className="px-6 py-3 bg-gray-800/30 border border-gray-700/50 rounded-full text-lg hover:border-[#3b82f6] hover:bg-[#3b82f6]/10 transition-all cursor-pointer animate-in zoom-in duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {career}
              </span>
            ))}
          </div>
        </div>

        {/* Quiz CTA */}
        <div className="bg-linear-to-br from-[#3b82f6]/20 to-[#8b5cf6]/20 border-2 border-[#3b82f6]/50 rounded-3xl p-8 text-center animate-in zoom-in duration-500 delay-400">
          <div className="inline-flex w-16 h-16 rounded-full bg-linear-to-br from-[#3b82f6] to-[#8b5cf6] items-center justify-center mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h2 className="mb-3 text-2xl">Want to learn more?</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Take our personalized quiz to discover if {study.title} is the perfect fit for your skills and interests.
          </p>
          <button
            onClick={() => setShowQuiz(true)}
            className="bg-linear-to-r from-[#3b82f6] to-[#8b5cf6] hover:from-[#2563eb] hover:to-[#7c3aed] text-white px-8 py-4 rounded-full transition-all text-lg shadow-lg"
          >
            Start Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
