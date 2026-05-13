import { motion } from "motion/react";
import { Brain, FileText, Sparkles, BookMarked, Search, Plus, Clock, Filter } from "lucide-react";

interface StudyHubProps {
  onStartGenerator: () => void;
  onModuleSelect: (module: any) => void;
}

export function StudyHub({ onStartGenerator, onModuleSelect }: StudyHubProps) {
  const categories = ["All", "Programming", "AICT", "English", "Islamic Studies"];
  
  const recentModules = [
    { title: "React Fundamentals", type: "Flashcards", date: "2 hours ago", color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Data Structures", type: "Study Notes", date: "Yesterday", color: "text-cyan-600", bg: "bg-cyan-100" },
    { title: "Network Protocols", type: "Quiz", date: "2 days ago", color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Cloud Computing", type: "Flashcards", date: "3 days ago", color: "text-amber-600", bg: "bg-amber-100" },
    { title: "English Grammar", type: "Study Notes", date: "1 week ago", color: "text-indigo-600", bg: "bg-indigo-100" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
             <BookMarked size={12} />
             Knowledge Repository
          </div>
          <h1 className="text-5xl font-black text-slate-900 font-display tracking-tight">Study Hub</h1>
        </div>
        
        <button 
          onClick={onStartGenerator}
          className="px-8 py-4 bg-purple-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-purple-100 hover:bg-purple-700 transition-all flex items-center gap-2"
        >
          <Plus size={18} /> New Module
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Controls */}
        <div className="lg:col-span-3 space-y-8">
           <div>
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Search & Filters</h3>
             <div className="relative mb-4">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input 
                 type="text" 
                 placeholder="Search modules..."
                 className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50 transition-all"
               />
             </div>
             
             <div className="flex flex-wrap gap-2">
               {categories.map((cat, i) => (
                 <button 
                   key={i} 
                   className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-slate-900 text-white' : 'bg-white border border-slate-100 text-slate-400 hover:border-purple-200 hover:text-purple-600'}`}
                 >
                   {cat}
                 </button>
               ))}
             </div>
           </div>

           <div className="p-6 bg-slate-900 rounded-[2.5rem] relative overflow-hidden group">
              <div className="relative z-10">
                <Sparkles size={24} className="text-purple-400 mb-4" />
                <h4 className="text-white font-black text-lg mb-2">Pro Perks</h4>
                <p className="text-slate-400 text-xs font-bold leading-relaxed mb-6">Unlock unlimited cloud storage for your neural maps.</p>
                <button className="w-full py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-400 hover:text-white transition-all">Upgrade Now</button>
              </div>
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none" />
           </div>
        </div>

        {/* Modules List */}
        <div className="lg:col-span-9">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Activity</h3>
              <button className="text-[10px] font-black text-purple-600 uppercase tracking-widest flex items-center gap-2">
                <Filter size={12} /> Sort by Date
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentModules.map((module, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => onModuleSelect(module)}
                  className="premium-card p-8 rounded-[2.5rem] group hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className={`w-12 h-12 ${module.bg} ${module.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      {module.type === 'Quiz' ? <Brain size={24} /> : module.type === 'Flashcards' ? <BookMarked size={24} /> : <FileText size={24} />}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Clock size={12} />
                      <span className="text-[9px] font-black uppercase">{module.date}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-black text-slate-900 mb-2 font-display">{module.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className={`text-[9px] font-black uppercase tracking-widest py-1 px-2 rounded-lg ${module.bg} ${module.color}`}>
                      {module.type}
                    </span>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">86% Mastery</span>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                     <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Open Module</span>
                     <ChevronRight size={16} className="text-slate-200 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight({ size, className }: any) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
