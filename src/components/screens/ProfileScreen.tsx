import { useState, useEffect } from 'react';
import { Camera, Mail, Bell, Lock, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../ImageWithFallback';
import { nextSteps, savedCareers, savedStudyPrograms, user } from '../../config/mock';

export function ProfileScreen() {
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'study' | 'careers'>('study');
  const targetProgress = 40;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(targetProgress);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const currentItems = activeTab === 'study' ? savedStudyPrograms : savedCareers;

  return (
    <div className="min-h-screen bg-[#0a1628] text-white px-6 py-8 animate-in fade-in duration-500">
      <div className="max-w-2xl mx-auto pb-[75px]">
        {/* Profile Header */}
        <div className="text-center mb-8 animate-in slide-in-from-top duration-500">
          <div className="relative inline-block mb-4">
            <ImageWithFallback
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#3b82f6] rounded-full flex items-center justify-center hover:bg-[#2563eb] transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <h1 className="mb-1">Hello, {user.name}!</h1>
        </div>

        {/* Progress Section */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 mb-6 animate-in slide-in-from-bottom duration-500 delay-100">
          <div className="flex items-center justify-between mb-3">
            <h3>Your Progress to Decision</h3>
            <span className="text-[#f59e0b]">{targetProgress}%</span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
            <div
              className="bg-linear-to-r from-[#f59e0b] to-[#d97706] h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-700 animate-in slide-in-from-bottom duration-500 delay-200">
          <button
            onClick={() => setActiveTab('study')}
            className={`pb-3 px-1 transition-all ${
              activeTab === 'study'
                ? 'text-[#3b82f6] border-b-2 border-[#3b82f6]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Study Programs
          </button>
          <button
            onClick={() => setActiveTab('careers')}
            className={`pb-3 px-1 transition-all ${
              activeTab === 'careers'
                ? 'text-[#3b82f6] border-b-2 border-[#3b82f6]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Apprenticeships
          </button>
        </div>

        {/* Saved Items */}
        <div className="space-y-4 mb-8">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4 flex items-center gap-4 hover:bg-gray-800 transition-all cursor-pointer animate-in slide-in-from-left duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400 mb-1">{item.institution}</p>
                  <p className="text-xs text-gray-500">{item.location}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400 animate-in fade-in duration-500">
              <p className="mb-4">No saved {activeTab === 'study' ? 'programs' : 'apprenticeships'} yet</p>
              <p className="text-sm">Bookmark items from your matches to see them here</p>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="mb-6 animate-in slide-in-from-bottom duration-500 delay-300">
          <h2 className="mb-4">Your Next Steps</h2>
          <div className="space-y-3">
            {nextSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <button
                  key={step.id}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl p-4 hover:bg-gray-800 transition-all text-left group animate-in zoom-in duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${step.color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-400">{step.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden mb-6 animate-in slide-in-from-bottom duration-500 delay-400">
          <h3 className="p-6 pb-4">Settings</h3>
          
          <button className="w-full flex items-center justify-center gap-4 px-6 py-4 hover:bg-gray-700/50 transition-colors border-t border-gray-700">
            <Mail className="w-5 h-5 text-gray-400" />
            <span className="flex-1 text-left">Change Email</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-center gap-4 px-6 py-4 hover:bg-gray-700/50 transition-colors border-t border-gray-700">
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="flex-1 text-left">Notifications</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-center gap-4 px-6 py-4 hover:bg-gray-700/50 transition-colors border-t border-gray-700">
            <Lock className="w-5 h-5 text-gray-400" />
            <span className="flex-1 text-left">Change Password</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-center gap-4 px-6 py-4 hover:bg-gray-700/50 transition-colors border-t border-gray-700">
            <HelpCircle className="w-5 h-5 text-gray-400" />
            <span className="flex-1 text-left">Help & Support</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-center gap-4 px-6 py-4 hover:bg-gray-700/50 transition-colors border-t border-gray-700 text-red-400">
            <LogOut className="w-5 h-5" />
            <span className="flex-1 text-left">Log Out</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
