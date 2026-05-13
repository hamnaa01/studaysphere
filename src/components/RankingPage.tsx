import { motion } from "motion/react";
import { Trophy, TrendingUp, TrendingDown, Minus, Medal, Star, Target, Zap } from "lucide-react";
import confetti from "canvas-confetti";

export function RankingPage() {
  const handleMilestoneClick = (label: string) => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8b5cf6', '#3b82f6', '#f59e0b']
    });
  };

  const leaders = [
    { name: "Ayesha", score: 9820, trend: "up", rank: 1, avatar: "A", color: "bg-amber-400" },
    { name: "Ahmed", score: 9450, trend: "up", rank: 2, avatar: "A", color: "bg-slate-300" },
    { name: "Hamna", score: 8200, trend: "down", rank: 3, avatar: "H", color: "bg-orange-400" },
    { name: "Mehar", score: 7550, trend: "up", rank: 4, avatar: "M", color: "bg-purple-400" },
    { name: "Wania", score: 7100, trend: "same", rank: 5, avatar: "W", color: "bg-cyan-400" },
    { name: "Ashna", score: 6800, trend: "up", rank: 6, avatar: "A", color: "bg-pink-400" },
    { name: "Shan", score: 6500, trend: "down", rank: 7, avatar: "S", color: "bg-indigo-400" },
    { name: "Mahad", score: 6200, trend: "up", rank: 8, avatar: "M", color: "bg-emerald-400" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
           <Trophy size={14} className="neon-blue-icon" />
           Academic Global Rank
        </div>
        <h1 className="text-6xl font-black text-slate-900 font-display tracking-tighter mb-4">World Class <span className="text-purple-600">Leaderboard</span></h1>
        <p className="text-slate-500 font-bold max-w-xl mx-auto leading-relaxed">
           Compete with scholars worldwide. Every synthesis, every quiz, and every streak counts towards your global standing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
         {/* Top 3 Podium Cards */}
         <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {leaders.slice(0, 3).map((leader, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`premium-card p-10 rounded-[4rem] text-center relative overflow-hidden ${i === 0 ? 'ring-4 ring-amber-400 ring-offset-4' : ''}`}
              >
                {i === 0 && (
                  <div className="absolute top-0 right-0 p-8 text-amber-100 opacity-50">
                    <Trophy size={80} />
                  </div>
                )}
                <div className={`w-24 h-24 ${leader.color} rounded-[2rem] mx-auto mb-8 flex items-center justify-center text-3xl font-black text-white shadow-2xl shadow-slate-200`}>
                  {leader.avatar}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-1">{leader.name}</h3>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6 block">Rank #0{leader.rank}</span>
                
                <div className="flex items-center justify-center gap-6">
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-black text-slate-900">{leader.score.toLocaleString()}</span>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Neural XP</span>
                  </div>
                  <div className="w-px h-8 bg-slate-100" />
                  <div className="flex flex-col items-center">
                    {leader.trend === 'up' ? <TrendingUp size={16} className="text-emerald-500" /> : <TrendingDown size={16} className="text-rose-500" />}
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{leader.trend}</span>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-50 grid grid-cols-3 gap-2">
                   <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 w-[80%]" />
                   </div>
                   <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 w-[60%]" />
                   </div>
                   <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-[95%]" />
                   </div>
                </div>
              </motion.div>
            ))}
         </div>

         {/* Detailed List */}
         <div className="lg:col-span-8 flex flex-col gap-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 pl-4">Neural Challengers</h3>
            {leaders.map((leader, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="premium-card p-6 rounded-3xl flex items-center justify-between hover:scale-[1.01] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-6">
                  <span className={`text-lg font-black w-8 text-center ${i < 3 ? 'text-amber-500 font-display' : 'text-slate-300'}`}>
                    {i + 1}
                  </span>
                  <div className={`w-12 h-12 ${leader.color} rounded-2xl flex items-center justify-center text-white font-black text-xs shadow-lg shadow-slate-100 group-hover:scale-110 transition-transform`}>
                    {leader.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-purple-600 transition-colors uppercase tracking-tight">{leader.name}</h4>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Active Streak: 12 Days</span>
                  </div>
                </div>

                <div className="flex items-center gap-12">
                   <div className="hidden md:flex items-center gap-1.5 text-slate-400">
                      <Star size={12} fill="currentColor" />
                      <span className="text-[10px] font-black uppercase tracking-widest italic font-serif">Legend</span>
                   </div>
                   <div className="text-right">
                      <div className="text-sm font-black text-slate-900 font-display tabular-nums tracking-tighter">
                        {leader.score.toLocaleString()} <span className="text-[9px] text-slate-400">XP</span>
                      </div>
                      <div className="flex items-center justify-end gap-1">
                        {leader.trend === 'up' ? <TrendingUp size={10} className="text-emerald-500" /> : <TrendingDown size={10} className="text-rose-500" />}
                        <span className={`text-[8px] font-black uppercase ${leader.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {leader.trend === 'up' ? '+120' : '-40'}
                        </span>
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
         </div>

         {/* Stats Sidebar */}
         <div className="lg:col-span-4 space-y-6">
            <div className="premium-card p-8 rounded-[3rem] bg-indigo-900 text-white relative overflow-hidden">
               <div className="relative z-10">
                  <div className="w-10 h-10 bg-indigo-800 rounded-xl flex items-center justify-center mb-6">
                    <Target className="text-teal-400" />
                  </div>
                  <h3 className="text-xl font-black mb-2">Next Goal</h3>
                  <p className="text-indigo-300 text-xs font-bold leading-relaxed mb-6">Surpass <span className="text-white">Mehar</span> by gaining 240 XP today.</p>
                  <div className="h-1.5 w-full bg-indigo-800 rounded-full overflow-hidden mb-8">
                     <div className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 w-[65%]" />
                  </div>
                  <button className="w-full py-4 bg-white text-indigo-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-400 hover:text-indigo-950 transition-all font-display">Fast Track</button>
               </div>
               <Zap className="absolute -bottom-4 -right-4 text-indigo-800" size={120} />
            </div>

            <div className="premium-card p-8 rounded-[3rem]">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">World Milestones</h3>
                <div className="space-y-4">
                  {[
                    { label: "Neural Pioneer", desc: "First 10 Quizzes", icon: Star, color: "text-amber-500" },
                    { label: "Memory Master", desc: "100 Flashcards", icon: Medal, color: "text-purple-500" },
                    { label: "Top 1% Global", desc: "Lead the pack", icon: Trophy, color: "text-cyan-500" },
                  ].map((m, i) => (
                    <div 
                      key={i} 
                      onClick={() => handleMilestoneClick(m.label)}
                      className="flex items-center gap-4 cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-all group"
                    >
                       <div className={`w-8 h-8 rounded-lg bg-slate-50 border border-transparent group-hover:border-slate-100 flex items-center justify-center ${m.color}`}>
                          <m.icon size={16} />
                       </div>
                       <div>
                          <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{m.label}</h4>
                          <p className="text-[9px] text-slate-400 font-bold">{m.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
