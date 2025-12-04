import { ArrowLeft, Building2, ChevronRight, Download, FileText, Lock, MapPin } from "lucide-react";
import { useState } from "react";
import type { Institution } from "../types/types";
import { institutionDetailData } from "../config/mock";

const InstitutionDetail = ({ institution, onClose }: { institution: Institution; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'programs' | 'handbooks' | 'network'>('programs');

  // Determine if it's a company or education provider for correct wording
  const isCompany = ['Company', 'Vocational Training'].includes(institution.type);
  const tabLabel = isCompany ? 'Jobs & Karriere' : 'Studiengänge';
  
  // Choose correct data array
  const opportunities = isCompany ? institutionDetailData.companyOpportunities : institutionDetailData.universityPrograms;

  return (
    <div className="fixed inset-0 z-50 bg-[#020617] overflow-y-auto animate-in slide-in-from-bottom duration-500">
      <div className="relative h-64 sm:h-80 w-full overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#020617]" />
        <div 
          className="absolute inset-0 opacity-30 animate-pulse"
          style={{ 
            backgroundImage: `radial-gradient(circle at 50% 50%, ${institution.color}, transparent 70%)` 
          }}
        />
        <div className="absolute top-6 left-6 z-20">
          <button onClick={onClose} className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/20 transition-all text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 flex items-end gap-6 z-10 animate-in slide-in-from-bottom-10 fade-in duration-700">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white/90 p-4 shadow-2xl flex items-center justify-center shrink-0">
             {institution.logo ? (
                <img src={institution.logo} alt={institution.name} className="w-full h-full object-contain" />
             ) : (
               <Building2 className="w-12 h-12 text-black" />
             )}
          </div>
          <div className="mb-2">
            <div className="flex gap-2 mb-2">
              <span className="px-2 py-0.5 bg-white/10 border border-white/10 rounded text-[10px] uppercase tracking-wider text-white font-medium">
                {institution.type}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight mb-1">{institution.name}</h1>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <MapPin className="w-4 h-4" /> {institution.location}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 pb-24">
        <p className="text-gray-300 text-lg leading-relaxed mb-8 border-l-4 border-gray-700 pl-4 animate-in slide-in-from-bottom-4 duration-500 delay-100">
          {institution.description}
        </p>

        <div className="flex gap-4 border-b border-gray-800 mb-8 overflow-x-auto animate-in slide-in-from-bottom-4 duration-500 delay-200">
          {[
            { id: 'programs', label: tabLabel },
            { id: 'handbooks', label: 'Dokumente' },
            { id: 'network', label: 'Netzwerk (Premium)', premium: true }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-2 text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id 
                ? 'text-white border-b-2 border-blue-500' 
                : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.label}
              {tab.premium && <Lock className="w-3 h-3 text-yellow-500" />}
            </button>
          ))}
        </div>

        <div className="min-h-[300px]">
          {activeTab === 'programs' && (
            <div className="grid gap-4 animate-in fade-in zoom-in-95 duration-300">
              {opportunities.map((item, i) => (
                <div key={i} className="group bg-[#0f172a] p-5 rounded-2xl border border-white/5 hover:border-white/20 hover:scale-[1.01] transition-all cursor-pointer flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors">{item.title}</h3>
                    <div className="flex gap-3 mt-1 text-sm text-gray-500">
                      <span className="bg-white/5 px-2 py-0.5 rounded">{item.type}</span>
                      <span>•</span>
                      <span>{item.duration}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'handbooks' && (
            <div className="grid gap-4 sm:grid-cols-2 animate-in fade-in zoom-in-95 duration-300">
              {institutionDetailData.handbooks.map((doc, i) => (
                <div key={i} className="bg-[#0f172a] p-5 rounded-2xl border border-white/5 flex gap-4 items-center hover:bg-[#1e293b] transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">{doc.title}</h4>
                    <p className="text-xs text-gray-500">{doc.date} • {doc.size}</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-600 group-hover:text-white" />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'network' && (
            <div className="relative overflow-hidden rounded-3xl bg-[#0f172a] border border-yellow-500/20 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Lock className="w-5 h-5 text-yellow-500" />
                 </div>
                 <div>
                   <h3 className="text-white font-bold">Insider Netzwerk</h3>
                   <p className="text-sm text-gray-400">Verbinde dich mit Studenten, Azubis & Profs.</p>
                 </div>
              </div>

              <div className="grid gap-4 blur-sm select-none opacity-50 pointer-events-none">
                {institutionDetailData.contacts.map((contact, i) => (
                  <div key={i} className="flex items-center gap-4 bg-black/20 p-4 rounded-xl">
                    <img src={contact.image} className="w-12 h-12 rounded-full" alt="" />
                    <div>
                      <div className="h-4 w-32 bg-gray-600 rounded mb-2"></div>
                      <div className="h-3 w-20 bg-gray-700 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute inset-0 flex items-center justify-center bg-linear-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent z-10">
                <div className="text-center p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Netzwerk freischalten</h3>
                  <p className="text-gray-400 mb-6 max-w-xs mx-auto">Erhalte direkten Zugang zu Insidern vor Ort.</p>
                  <button className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-full shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform">
                    Upgrade auf Premium
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstitutionDetail;