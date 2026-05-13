import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flashcard } from "../types";
import confetti from "canvas-confetti";
import { 
  ChevronLeft, ChevronRight, Rotate3d, 
  Sparkles, Brain, Clock, Zap, Lightbulb,
  Volume2
} from "lucide-react";

interface FlashcardPlayerProps {
  flashcards: Flashcard[];
  onComplete: () => void;
}

export function FlashcardPlayer({ flashcards, onComplete }: FlashcardPlayerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  const currentCard = flashcards[currentIdx];
  const progress = ((currentIdx + 1) / flashcards.length) * 100;

  const speak = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    if (currentIdx < flashcards.length - 1) {
      setDirection(1);
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIdx(prev => prev + 1);
      }, 50);
    } else {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#22d3ee', '#f59e0b']
      });
      setTimeout(onComplete, 2000);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setDirection(-1);
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIdx(prev => prev - 1);
      }, 50);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
             <div className="px-4 py-1.5 bg-cyan-600 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-cyan-100">
               Active Recall
             </div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                {currentIdx + 1} / {flashcards.length} Units
             </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 font-display leading-[1.1] tracking-tight">Flashcard Mastery</h1>
        </div>
        
        <div className="w-full md:w-72">
           <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-slate-400">
                 <Clock size={14} className="neon-blue-icon" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Progress</span>
              </div>
              <span className="text-sm font-black text-cyan-600">{Math.round(progress)}%</span>
           </div>
           <div className="h-2.5 w-full bg-cyan-50 rounded-full overflow-hidden border border-cyan-100 p-0.5">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               className="h-full bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.3)]"
             />
           </div>
        </div>
      </div>

      <div className="relative h-[450px] perspective-1000 mb-12">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIdx}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -direction * 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full h-full cursor-pointer touch-none"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
              className="w-full h-full relative preserve-3d"
            >
              {/* Front Side */}
              <div 
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                className="absolute inset-0 premium-card rounded-[4rem] p-12 flex flex-col items-center justify-center text-center"
              >
                <div className="absolute top-10 left-10 text-cyan-400/30">
                  <Lightbulb size={48} />
                </div>
                <button 
                  onClick={(e) => speak(e, currentCard.front)}
                  className="absolute top-10 right-10 p-4 bg-cyan-50 text-cyan-600 rounded-2xl hover:bg-cyan-100 transition-all shadow-sm"
                >
                   <Volume2 size={24} />
                </button>
                <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-8">Question</span>
                <h3 className="text-3xl font-bold text-slate-900 leading-tight">
                  {currentCard.front}
                </h3>
                <div className="mt-12 flex items-center gap-3 text-slate-400 group">
                   <Rotate3d size={20} className="animate-spin-slow group-hover:text-cyan-500" />
                   <span className="text-xs font-bold uppercase tracking-widest">Tap to reveal</span>
                </div>
              </div>

              {/* Back Side */}
              <div 
                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                className="absolute inset-0 premium-card rounded-[4rem] p-12 flex flex-col items-center justify-center text-center bg-purple-50/30 border-purple-100"
              >
                <div className="absolute top-10 right-10 text-purple-400/30">
                  <Brain size={48} />
                </div>
                <button 
                  onClick={(e) => speak(e, currentCard.back)}
                  className="absolute top-10 left-10 p-4 bg-purple-100 text-purple-600 rounded-2xl hover:bg-purple-200 transition-all shadow-sm"
                >
                   <Volume2 size={24} />
                </button>
                <span className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em] mb-8">Resolution</span>
                <p className="text-2xl font-bold text-slate-800 leading-relaxed italic">
                  "{currentCard.back}"
                </p>
                {currentCard.hint && (
                  <div className="mt-8 px-6 py-3 bg-white/50 border border-purple-100 rounded-2xl flex items-center gap-3">
                    <Sparkles size={16} className="text-purple-500" />
                    <span className="text-xs font-bold text-slate-500">{currentCard.hint}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-8">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="w-16 h-16 rounded-[2rem] bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-cyan-600 hover:border-cyan-200 transition-all disabled:opacity-20"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex-1 flex justify-center">
          <div className="px-8 py-4 bg-slate-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200">
            Concept {currentIdx + 1} of {flashcards.length}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="w-16 h-16 rounded-[2rem] bg-cyan-600 text-white flex items-center justify-center shadow-xl shadow-cyan-100 hover:bg-cyan-700 transition-all group"
        >
          {currentIdx === flashcards.length - 1 ? (
             <Zap size={24} fill="currentColor" className="neon-blue-icon" />
          ) : (
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          )}
        </button>
      </div>
    </div>
  );
}
