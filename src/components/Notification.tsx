import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, MessageSquare, Calendar, GraduationCap, X, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import useStudyMaxer from './hooks/useStudyMaxer';

// --- Utility für saubere Tailwind Klassen ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Typen & Mock Daten ---
type NotificationType = 'message' | 'alert' | 'success' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  linkText?: string;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'New message from Jonas',
    message: 'Hey Lena! Regarding your question about the "Media Psychology" module: It\'s super exciting, but also heavier on math than you\'d think...',
    time: '2 min ago',
    read: false,
    linkText: 'Go to chat',
  },
  {
    id: '2',
    type: 'success',
    title: 'Simulation complete',
    message: 'Congrats! Your results for "Crossmedia Design" are in. You have a 95% match in Visual Storytelling.',
    time: '1 hr ago',
    read: false,
    linkText: 'View results',
  },
  {
    id: '3',
    type: 'alert',
    title: 'Application deadline Uni Cologne',
    message: 'Heads up: The deadline for the winter semester ends in 3 days. Do you have all your portfolio documents ready?',
    time: '5 hrs ago',
    read: false, // Unread to show urgency
  },
  {
    id: '4',
    type: 'info',
    title: 'New module handbook available',
    message: 'TH Köln has updated the module handbook for "Online Editing". We\'ve highlighted the parts relevant to you.',
    time: 'Yesterday',
    read: true,
    linkText: 'Read now',
  },
];

export default function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const containerRef = useRef<HTMLDivElement>(null);

  const { activeTab, showNotification, setShowNotification, currentPath } = useStudyMaxer();

  // Zähler für ungelesene Nachrichten
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Klick außerhalb schließt das Menü
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (currentPath.includes('matches'))
      setShowNotification(false);
    else
      !showNotification && setShowNotification(true);
  }, [currentPath]);

  // Alle als gelesen markieren
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Einzelne Nachricht als gelesen markieren
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Nachricht entfernen
  const removeNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Icon Helper basierend auf Typ
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'message': return <MessageSquare size={18} className="text-blue-400" />;
      case 'alert': return <Calendar size={18} className="text-amber-400" />;
      case 'success': return <GraduationCap size={18} className="text-emerald-400" />;
      default: return <Check size={18} className="text-slate-400" />;
    }
  };

  if (activeTab === 'premium' || !showNotification) return null;

  return (
    <div className="fixed top-4 right-4 md:top-8 md:right-8 z-50 font-sans" ref={containerRef}>

      {/* --- GLOCKE BUTTON --- */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative p-3 rounded-full transition-colors duration-200 outline-none focus:ring-2 focus:ring-blue-500/50",
          isOpen ? "bg-slate-800 text-blue-400" : "bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white"
        )}
      >
        <Bell className='size-7 md:size-8' />

        {/* Badge Animation */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-2 right-2 flex h-5 w-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-lg shadow-blue-900/50 border border-slate-900"
            >
              {unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* --- DROPDOWN PANEL --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-4 w-80 md:w-96 origin-top-right z-50"
          >
            {/* Glassmorphism Container */}
            <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-[#0f172a]/95 shadow-2xl backdrop-blur-xl ring-1 ring-white/5">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-700/50 px-4 py-3 bg-slate-900/50">
                <h3 className="text-sm font-semibold text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {/* Liste */}
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                    <Bell size={32} className="mb-2 opacity-20" />
                    <p className="text-sm">Nothing here</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-800/50">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        onClick={() => markAsRead(notification.id)}
                        className={cn(
                          "group relative flex gap-4 p-4 transition-all duration-200 hover:bg-slate-800/50 cursor-pointer",
                          !notification.read ? "bg-blue-900/10" : "bg-transparent"
                        )}
                      >
                        {/* Indikator für ungelesen */}
                        {!notification.read && (
                          <div className="absolute left-0 top-4 h-8 w-0.5 rounded-r bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        )}

                        {/* Icon Container */}
                        <div className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-700/50 bg-slate-800 shadow-sm",
                          !notification.read && "border-blue-500/30 bg-blue-500/10"
                        )}>
                          {getIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between items-start">
                            <p className={cn("text-sm font-medium leading-none", !notification.read ? "text-white" : "text-slate-400")}>
                              {notification.title}
                            </p>
                            <span className="text-[10px] text-slate-500 ml-2 whitespace-nowrap">{notification.time}</span>
                          </div>

                          <p className="text-xs leading-relaxed text-slate-400 line-clamp-2">
                            {notification.message}
                          </p>

                          {notification.linkText && (
                            <div className="pt-1 flex items-center text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors group-hover:translate-x-1 duration-200">
                              {notification.linkText}
                              <ChevronRight size={12} className="ml-0.5" />
                            </div>
                          )}
                        </div>

                        {/* Löschen Button (sichtbar bei Hover) */}
                        <button
                          onClick={(e) => removeNotification(notification.id, e)}
                          className="absolute right-2 top-2 p-1 text-slate-600 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all hover:bg-slate-700 rounded"
                        >
                          <X size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-slate-700/50 bg-slate-900/80 p-2 text-center backdrop-blur-sm">
                <button className="w-full rounded-lg py-2 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                  Show All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles (Optional, falls nicht global vorhanden) */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0f172a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
}