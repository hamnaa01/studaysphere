import { motion } from "motion/react";
import { 
  Zap, Brain, Trophy, BookMarked, Clock, 
  ChevronRight, Star, TrendingUp, TrendingDown, Sparkles,
  MessageSquare, FileText, Lightbulb, HelpCircle,
  Flame
} from "lucide-react";
import confetti from "canvas-confetti";

interface DashboardProps {
  onStartGenerator: () => void;
  onModuleSelect: (module: any) => void;
}

export function Dashboard({ onStartGenerator, onModuleSelect }: DashboardProps) {
  const handleStreakClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f97316', '#fbbf24', '#ef4444']
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 relative">
      {/* Background Floating Orbs */}
      <div className="absolute -top-20 -left-20 w-64 h-64 glowing-orb" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 glowing-orb" style={{ animationDelay: '2s' }} />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Hero & Main Actions */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-card rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
          >
            {/* Soft Purple Glow Overlay */}
            <div className="absolute inset-0 bg-purple-500/5 pointer-events-none" />
            
            <div className="flex-1 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                <Sparkles size={12} className="neon-blue-icon" />
                AI Study Assistant
              </div>
              <h1 className="text-4xl font-black text-slate-900 mb-4 font-display tracking-tight">
                Welcome back, <span className="text-purple-600">Scholar</span>.
              </h1>
              <p className="text-slate-500 font-bold mb-8 leading-relaxed max-w-md">
                Ready to transform your learning? Upload your docs to generate a neural quiz instantly.
              </p>
              <button 
                onClick={onStartGenerator}
                className="px-8 py-4 bg-purple-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-purple-100 hover:bg-purple-700 transition-all flex items-center gap-2 group"
              >
                Launch Generator
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="w-48 h-48 md:w-64 md:h-64 relative flex items-center justify-center">
               {/* Floating Question Mark */}
               <motion.div 
                 animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute -top-4 -left-4 text-cyan-400 opacity-50"
               >
                 <HelpCircle size={40} className="neon-blue-icon" />
               </motion.div>

               <div className="absolute inset-0 bg-purple-50 rounded-full border border-purple-100 animate-pulse" />
               
               {/* Digital Representation - Simplified Premium Icon */}
               <div className="relative w-32 h-32 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center text-purple-600 border border-slate-50">
                  <div className="relative group">
                    <Brain size={56} className="neon-blue-icon group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-cyan-400/5 blur-2xl rounded-full scale-150 -z-10" />
                  </div>
                  
                  {/* Energy Zap Accent */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-100">
                    <Zap size={20} fill="currentColor" className="neon-blue-icon" />
                  </div>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="premium-card rounded-[3rem] p-10 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Library & Files</h3>
                <h2 className="text-2xl font-black text-slate-900 font-display">Study Hub</h2>
              </div>
              <button className="px-4 py-2 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100 hover:text-purple-600 transition-all">Manage Hub</button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <HubItem 
                 icon={Brain} label="Programming" count="12 Files" color="bg-purple-600" 
                 onClick={() => onModuleSelect({ title: "Programming Intro", type: "Flashcards" })}
               />
               <HubItem 
                 icon={FileText} label="AICT" count="8 Files" color="bg-cyan-500" 
                 onClick={() => onModuleSelect({ title: "AICT Concepts", type: "Study Notes" })}
               />
               <HubItem 
                 icon={Sparkles} label="English" count="15 Files" color="bg-amber-400" 
                 onClick={() => onModuleSelect({ title: "Grammar Master", type: "Quiz" })}
               />
               <HubItem 
                 icon={BookMarked} label="Islamic Studies" count="9 Files" color="bg-emerald-500" 
                 onClick={() => onModuleSelect({ title: "Islamic History", type: "Flashcards" })}
               />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <FeatureCard 
               icon={BookMarked} 
               title="Flashcard Hub" 
               desc="AI-generated deck based on your documents."
               accent="text-cyan-500" 
               bg="bg-cyan-50"
               onClick={onStartGenerator}
             />
             <FeatureCard 
               icon={Lightbulb} 
               title="Smart Notes" 
               desc="Condensed summaries for quick review."
               accent="text-purple-500" 
               bg="bg-purple-50"
               onClick={onStartGenerator}
             />
             <FeatureCard 
               icon={Zap} 
               title="Daily Circuit" 
               desc="Quick 2-minute blast to keep the streak alive."
               accent="text-amber-500" 
               bg="bg-amber-50"
               onClick={onStartGenerator}
             />
          </div>
        </div>

        {/* Right Column: Progress & Leaderboard */}
        <div className="lg:col-span-4 flex flex-col gap-8">
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             onClick={handleStreakClick}
             className="premium-card rounded-[3rem] p-8 bg-gradient-to-br from-orange-500 to-amber-500 text-white relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-all group"
           >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-black uppercase tracking-widest opacity-80">Daily Streak</h3>
                  <Flame size={20} className="text-white animate-pulse group-hover:scale-125 transition-transform" fill="currentColor" />
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-black font-display tracking-tighter">14</span>
                  <span className="text-xs font-black uppercase tracking-widest opacity-80">Days Active</span>
                </div>
                <div className="flex gap-2">
                   {[1,2,3,4,5,6,7].map((d) => (
                     <div key={d} className={`h-1.5 flex-1 rounded-full ${d <= 5 ? 'bg-white' : 'bg-white/30'}`} />
                   ))}
                </div>
                <p className="text-[10px] font-bold mt-4 opacity-90">Keep it up! 3 more days for a 2.5x XP Boost.</p>
              </div>
              <Flame size={120} className="absolute -bottom-4 -right-4 text-white/10" fill="currentColor" />
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.1 }}
             className="premium-card rounded-[3rem] p-8"
           >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Progress Tracking</h3>
                <TrendingUp size={16} className="text-cyan-500 neon-blue-icon" />
              </div>
              
              <div className="space-y-6">
                 <ProgressItem label="Programming" val={85} color="bg-purple-600" />
                 <ProgressItem label="AICT" val={68} color="bg-cyan-500" />
                 <ProgressItem label="English" val={94} color="bg-purple-400" />
                 <ProgressItem label="Islamic Studies" val={78} color="bg-cyan-400" />
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.1 }}
             className="premium-card rounded-[3rem] p-8"
           >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Leaderboard</h3>
                <Trophy size={16} className="text-purple-500 neon-blue-icon" />
              </div>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                 <RankItem rank={1} name="Ayesha" score={9820} trend="up" />
                 <RankItem rank={2} name="Ahmed" score={9450} trend="up" />
                 <RankItem rank={3} name="Hamna" score={8200} trend="down" />
                 <RankItem rank={4} name="Mehar" score={7550} trend="up" />
                 <RankItem rank={5} name="Wania" score={7100} trend="same" />
                 <RankItem rank={6} name="Shan" score={6800} trend="up" />
                 <RankItem rank={7} name="Ashna" score={6500} trend="down" />
                 <RankItem rank={8} name="Mahad" score={6200} trend="up" />
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, accent, bg, onClick }: any) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="premium-card rounded-[2.5rem] p-8 group cursor-pointer"
    >
       <div className={`w-14 h-14 ${bg} ${accent} rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110`}>
          <Icon size={28} />
       </div>
       <h3 className="text-lg font-black text-slate-900 mb-2 font-display">{title}</h3>
       <p className="text-xs font-bold text-slate-500 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function HubItem({ icon: Icon, label, count, color, onClick }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="p-6 bg-white rounded-[2rem] border border-slate-50 shadow-sm hover:shadow-xl hover:shadow-purple-100 transition-all cursor-pointer group"
    >
       <div className={`w-12 h-12 ${color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-100 group-hover:scale-110 transition-transform`}>
         <Icon size={24} />
       </div>
       <h4 className="text-sm font-black text-slate-900 mb-1">{label}</h4>
       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{count}</span>
    </motion.div>
  );
}

function ProgressItem({ label, val, color }: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
         <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">{label}</span>
         <span className="text-[11px] font-black text-slate-400">{val}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
         <motion.div 
           initial={{ width: 0 }}
           animate={{ width: `${val}%` }}
           className={`h-full ${color} rounded-full`}
         />
      </div>
    </div>
  );
}

function RankItem({ rank, name, score, trend }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.1 }}
      className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group"
    >
       <div className="flex items-center gap-4">
          <span className={`text-xs font-black w-6 text-center ${rank <= 3 ? 'text-amber-500' : 'text-slate-300'}`}>0{rank}</span>
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-[10px] font-black text-slate-400">
               {name[0]}
            </div>
            {rank === 1 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white shadow-sm" />
            )}
          </div>
          <span className="text-xs font-bold text-slate-700">{name}</span>
       </div>
       <div className="flex items-center gap-2">
         {trend === 'up' ? (
            <div className="flex items-center gap-1 text-[8px] font-black text-emerald-500 uppercase tracking-tighter">
              <TrendingUp size={10} /> UP
            </div>
         ) : trend === 'down' ? (
            <div className="flex items-center gap-1 text-[8px] font-black text-rose-500 uppercase tracking-tighter">
              <TrendingDown size={10} /> DOWN
            </div>
         ) : null}
         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{score.toLocaleString()} XP</span>
       </div>
    </motion.div>
  );
}
