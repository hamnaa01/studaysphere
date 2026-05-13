import { motion, AnimatePresence } from "motion/react";
import { 
  Brain, CheckCircle2, AlertCircle, ChevronRight, 
  RotateCcw, Timer, Volume2, VolumeX, Zap 
} from "lucide-react";
import { useState, useEffect } from "react";
import { Quiz, Question } from "../types";
import confetti from "canvas-confetti";

interface QuizPlayerProps {
  quiz: Quiz;
  onComplete: (score: number, total: number, answers: number[]) => void;
}

export function QuizPlayer({ quiz, onComplete }: QuizPlayerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  const question = quiz.questions[currentIdx];
  const isCorrect = selectedOption === question.correctAnswer;

  // Voice Synthesis
  const speak = (text: string) => {
    if (!isVoiceEnabled) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (isVoiceEnabled) {
      speak(question.question);
    }
  }, [currentIdx, isVoiceEnabled]);

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    setUserAnswers(prev => [...prev, selectedOption]);
    if (isCorrect) setScore(prev => prev + 1);
    setShowExplanation(true);
    
    if (isVoiceEnabled) {
      speak(isCorrect ? "Correct!" : `Incorrect. ${question.explanation}`);
    }
  };

  const handleNext = () => {
    if (currentIdx < quiz.questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setShowExplanation(false);
    } else {
      const finalScore = score;
      const totalQuestions = quiz.questions.length;
      const percentage = (finalScore / totalQuestions) * 100;

      if (percentage >= 80) {
        confetti({
          particleCount: 200,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#22d3ee', '#f59e0b', '#10b981']
        });
      } else if (percentage >= 50) {
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
      
      setTimeout(() => {
        onComplete(score, quiz.questions.length, [...userAnswers, selectedOption!]);
      }, percentage >= 80 ? 2000 : 1000);
    }
  };

  const progress = ((currentIdx + 1) / quiz.questions.length) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
             <div className="px-4 py-1.5 bg-purple-600 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-purple-100">
               Session Active
             </div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                {currentIdx + 1} / {quiz.questions.length} Units
             </span>
             <button 
               onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
               className={`p-2 rounded-xl border transition-all ${isVoiceEnabled ? 'bg-cyan-50 border-cyan-200 text-cyan-600' : 'bg-slate-50 border-slate-100 text-slate-400 font-bold'}`}
               title={isVoiceEnabled ? "Disable Voice" : "Enable Voice"}
             >
               {isVoiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
             </button>
          </div>
          <h1 className="text-4xl font-black text-slate-900 font-display leading-[1.1] tracking-tight">{quiz.title}</h1>
        </div>
        
        <div className="w-full md:w-72">
           <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-slate-400">
                 <Timer size={14} className="neon-blue-icon" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Synchronization</span>
              </div>
              <span className="text-sm font-black text-purple-600">{Math.round(progress)}%</span>
           </div>
           <div className="h-2.5 w-full bg-purple-50 rounded-full overflow-hidden border border-purple-100 p-0.5">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               className="h-full bg-purple-600 rounded-full shadow-[0_0_15px_rgba(167,139,250,0.3)]"
             />
           </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
           key={currentIdx}
           initial={{ opacity: 0, scale: 0.98, x: 20 }}
           animate={{ opacity: 1, scale: 1, x: 0 }}
           exit={{ opacity: 0, scale: 0.98, x: -20 }}
           transition={{ type: "spring", stiffness: 300, damping: 30 }}
           className="premium-card rounded-[3rem] p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-50" />
          
          <h3 className="text-2xl font-bold text-slate-900 mb-12 leading-[1.3] relative z-10 font-sans">
            {question.question}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
            {question.options.map((option, idx) => {
              let state = 'default';
              if (isSubmitted) {
                if (idx === question.correctAnswer) state = 'correct';
                else if (idx === selectedOption) state = 'incorrect';
                else state = 'muted';
              } else if (selectedOption === idx) {
                state = 'selected';
              }

              return (
                <motion.button
                  key={idx}
                  whileHover={!isSubmitted ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitted ? { scale: 0.98 } : {}}
                  disabled={isSubmitted}
                  onClick={() => setSelectedOption(idx)}
                  className={`p-6 rounded-[2.5rem] text-left transition-all duration-300 flex items-center justify-between group border-2
                    ${state === 'default' && 'bg-slate-50/50 border-slate-50 text-slate-600 hover:border-purple-300 hover:bg-white'}
                    ${state === 'selected' && 'bg-white border-purple-600 text-purple-900 shadow-xl shadow-purple-100'}
                    ${state === 'correct' && 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xl shadow-emerald-500/10'}
                    ${state === 'incorrect' && 'bg-rose-50 border-rose-500 text-rose-900 shadow-xl shadow-rose-500/10'}
                    ${state === 'muted' && 'bg-slate-100 border-transparent opacity-40 text-slate-400'}`}
                >
                  <div className="flex items-center gap-6">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg transition-all duration-500
                      ${state === 'selected' ? 'bg-purple-600 text-white shadow-xl shadow-purple-500/20' : 'bg-white text-slate-400 group-hover:bg-purple-50 group-hover:text-purple-600'}`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-bold text-sm lg:text-base">{option}</span>
                  </div>
                  {isSubmitted && idx === question.correctAnswer && (
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <CheckCircle2 size={16} strokeWidth={3} className="neon-blue-icon" />
                    </div>
                  )}
                  {isSubmitted && idx === selectedOption && idx !== question.correctAnswer && (
                    <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/20">
                      <AlertCircle size={16} strokeWidth={3} />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          <div className="mt-16 flex flex-col gap-8 relative z-10">
             {showExplanation && (
               <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="p-8 bg-purple-50/50 rounded-[2rem] border border-purple-100/50"
               >
                 <div className="flex gap-3 items-center mb-4">
                    <div className="w-10 h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-purple-100">
                      <Brain size={20} className="neon-blue-icon" />
                    </div>
                    <div>
                      <span className="font-black text-[10px] uppercase tracking-[0.3em] text-purple-600 block">Neural Analysis</span>
                    </div>
                 </div>
                 <p className="text-slate-800 text-base leading-relaxed font-bold italic">
                   "{question.explanation}"
                 </p>
               </motion.div>
             )}

            <div className="flex justify-end pt-8">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  className="px-10 py-4 bg-purple-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-purple-100 disabled:opacity-30 disabled:shadow-none transition-all active:scale-95 flex items-center gap-3"
                >
                  Confirm Choice
                  <Zap size={18} fill="currentColor" className="neon-blue-icon" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-10 py-4 bg-slate-900 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-200 transition-all active:scale-95 flex items-center gap-3"
                >
                  {currentIdx === quiz.questions.length - 1 ? 'Finish Unit' : 'Next Module'}
                  <ChevronRight size={18} />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
