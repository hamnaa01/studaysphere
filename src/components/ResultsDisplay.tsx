import { Quiz } from "../types";
import { motion } from "motion/react";
import { Trophy, RefreshCcw, Home, Share2, CheckCircle2, XCircle, Star, Sparkles, BookOpen, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface ResultsDisplayProps {
  quiz: Quiz;
  userAnswers: number[];
  score: number;
  total: number;
  onReset: () => void;
}

export function ResultsDisplay({ quiz, userAnswers, score, total, onReset }: ResultsDisplayProps) {
  const percentage = Math.round((score / total) * 100);
  
  useEffect(() => {
    if (percentage >= 70) {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#8b5cf6', '#22d3ee']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#8b5cf6', '#22d3ee']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      speakResult();
      frame();
    }
  }, [percentage]);

  const speakResult = () => {
    window.speechSynthesis.cancel();
    const text = `Congratulations! You scored ${percentage} percent. ${feedback}`;
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  let feedback = "Great effort! Keep studying.";
  let ColorClass = "text-purple-600";
  let BgClass = "bg-purple-50";
  
  if (percentage === 100) {
    feedback = "Perfect Mastery! You are a genius.";
    ColorClass = "text-purple-600";
    BgClass = "bg-purple-50";
  } else if (percentage >= 80) {
    feedback = "Exceptional performance! High honors.";
    ColorClass = "text-purple-600";
    BgClass = "bg-purple-50";
  } else if (percentage >= 50) {
    feedback = "Good foundation. Ready for review.";
    ColorClass = "text-cyan-600";
    BgClass = "bg-cyan-50";
  } else {
    ColorClass = "text-rose-600";
    BgClass = "bg-rose-50";
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="premium-card rounded-[4rem] p-16 mb-20 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
           <motion.div 
             animate={{ rotate: 360, scale: [1, 1.1, 1] }}
             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             className="absolute -top-32 -left-32 w-96 h-96 bg-purple-200 rounded-full blur-[100px]"
           />
           <motion.div 
             animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
             transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
             className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-200 rounded-full blur-[100px]"
           />
        </div>

        <div className="relative z-10 text-center">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`w-28 h-28 ${BgClass} ${ColorClass} rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-xl`}
          >
             <Trophy size={56} strokeWidth={2.5} className="neon-blue-icon" />
          </motion.div>
          
          <h1 className="text-5xl font-black text-slate-900 mb-2 font-display tracking-tight">Proficiency Review</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12">Session Evaluation Metadata</p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-20 my-16">
             <div className="text-center">
                <div className="flex items-baseline justify-center">
                   <span className={`text-9xl font-black ${ColorClass} font-display tabular-nums tracking-tighter leading-none`}>{percentage}</span>
                   <span className={`text-3xl font-black ${ColorClass}/30 ml-1`}>%</span>
                </div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-6">Overall Mastery</p>
             </div>
             
             <div className="hidden md:block w-px h-32 bg-purple-100" />
             
             <div className="text-center">
                <div className="flex items-baseline justify-center">
                   <span className="text-6xl font-black text-slate-900 font-display tabular-nums tracking-tighter">{score}</span>
                   <span className="text-2xl font-black text-slate-200 mx-3">/</span>
                   <span className="text-3xl font-black text-slate-400 font-display tabular-nums">{total}</span>
                </div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-6">Score Accuracy</p>
             </div>
          </div>

          <div className="max-w-xl mx-auto mb-16">
             <div className="p-10 bg-purple-50/50 rounded-[3rem] border border-white relative overflow-hidden">
               <p className="text-xl font-bold text-slate-800 leading-tight mb-4 italic">"{feedback}"</p>
               <div className="flex justify-center gap-1.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={18} fill={i <= (percentage / 20) ? "currentColor" : "none"} className={i <= (percentage / 20) ? "text-amber-400" : "text-purple-100"} strokeWidth={i <= (percentage / 20) ? 0 : 2} />
                  ))}
               </div>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-lg mx-auto">
            <button
              onClick={onReset}
              className="py-5 bg-purple-600 text-white rounded-[1.8rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-purple-100 transition-all hover:bg-purple-700 active:scale-95 flex items-center justify-center gap-3"
            >
              <RefreshCcw size={16} className="neon-blue-icon" />
              Re-Iterate
            </button>
            <button
              onClick={onReset}
              className="py-5 bg-slate-900 text-white rounded-[1.8rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <Home size={16} />
              Terminal
            </button>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] mb-10 text-center">Module Breakdown</h2>
        
        {quiz.questions.map((q, idx) => {
          const isCorrect = userAnswers[idx] === q.correctAnswer;
          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={q.id || idx}
              className="premium-card rounded-[2.5rem] p-8"
            >
              <div className="flex gap-6">
                <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${isCorrect ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
                   {isCorrect ? <CheckCircle2 size={24} className="neon-blue-icon" /> : <XCircle size={24} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Question {idx + 1}</span>
                  </div>
                  <p className="text-lg font-bold text-slate-800 mb-6 leading-tight">{q.question}</p>
                  
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                     <div className={`flex-1 p-5 rounded-2xl border text-sm font-bold ${isCorrect ? 'bg-emerald-50/50 border-emerald-100 text-emerald-900' : 'bg-rose-50/30 border-rose-100 text-rose-800'}`}>
                       <span className="text-[9px] uppercase tracking-widest opacity-40 block mb-1">Response</span>
                       {q.options[userAnswers[idx]] || "No response"}
                     </div>
                     {!isCorrect && (
                       <div className="flex-1 p-5 rounded-2xl border bg-purple-50 border-purple-100 text-purple-900 text-sm font-bold">
                         <span className="text-[9px] uppercase tracking-widest opacity-40 block mb-1">Target Answer</span>
                         {q.options[q.correctAnswer]}
                       </div>
                     )}
                  </div>
                  
                  <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100">
                    <p className="text-[13px] text-slate-500 font-medium leading-relaxed italic">
                      "{q.explanation}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
