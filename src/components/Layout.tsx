import { motion } from "motion/react";
import { Sparkles, GraduationCap, Github, Zap, LayoutDashboard, BookMarked, Trophy, Settings, BrainCircuit, FileQuestion, FileText, Flame } from "lucide-react";
import { AppStage } from "../types";

interface HeaderProps {
  currentStage: AppStage;
  setStage: (stage: AppStage) => void;
}

export function Header({ currentStage, setStage }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
       <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-2xl rounded-3xl px-6 py-2.5 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setStage('dashboard')}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-purple-500 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-10 h-10 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-sm border border-slate-100">
                <BrainCircuit size={20} className="neon-blue-icon" />
              </div>
            </div>
            <div>
              <span className="text-lg font-black tracking-tighter text-slate-900 font-display">StudySphere</span>
              <div className="flex items-center gap-1.5 -mt-1">
                <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Pro Edition</span>
              </div>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { id: 'upload', icon: FileText, label: 'Generator' },
              { id: 'hub', icon: BookMarked, label: 'Study Hub' },
              { id: 'leaderboard', icon: Trophy, label: 'Ranking' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setStage(item.id as AppStage)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all
                  ${currentStage === item.id 
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                <item.icon size={14} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-xl border border-orange-100 flex-shrink-0">
               <Flame size={14} fill="currentColor" className="animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest">14 Day Streak</span>
             </div>
             <button className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
               <Settings size={18} />
             </button>
             <button className="px-5 py-2.5 bg-purple-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-purple-700 transition-all active:scale-95 shadow-lg shadow-purple-100">
               Profile
             </button>
          </div>
        </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex p-5 bg-white rounded-3xl shadow-sm border border-slate-100 mb-8 text-purple-600">
          <GraduationCap size={32} className="neon-blue-icon" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 font-display mb-3 tracking-tighter">StudySphere AI</h3>
        <p className="text-slate-500 text-sm max-w-sm mx-auto mb-10 font-bold leading-relaxed">
          Advancing academic potential through neural concept synthesis and intelligent evaluation.
        </p>
        <div className="flex justify-center gap-6 text-slate-400 mb-12">
          <a href="#" className="hover:text-purple-600 transition-all hover:scale-110"><Github size={20} /></a>
        </div>
        <div className="pt-10 border-t border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">
          © 2026 Neural Learning Systems • Laboratory 7.2
        </div>
      </div>
    </footer>
  );
}
