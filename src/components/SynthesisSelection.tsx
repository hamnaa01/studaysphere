import { motion } from "motion/react";
import { Brain, FileText, Zap, Sparkles, HelpCircle } from "lucide-react";
import { SynthesisType } from "../types";

interface SynthesisSelectionProps {
  onSelect: (type: SynthesisType) => void;
  fileName: string;
}

export function SynthesisSelection({ onSelect, fileName }: SynthesisSelectionProps) {
  const options: { id: SynthesisType; title: string; desc: string; icon: any; color: string; bg: string }[] = [
    { 
      id: 'quiz', 
      title: 'Neural Quiz', 
      desc: 'Test your mastery with AI-generated high-yield questions.', 
      icon: HelpCircle, 
      color: 'text-purple-600', 
      bg: 'bg-purple-50' 
    },
    { 
      id: 'flashcards', 
      title: 'Active Recall', 
      desc: 'Memorize key concepts with smart interactive flashcards.', 
      icon: Zap, 
      color: 'text-cyan-600', 
      bg: 'bg-cyan-50' 
    },
    { 
      id: 'notes', 
      title: 'Study Report', 
      desc: 'Condensed, structured, and organized smart notes.', 
      icon: FileText, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50' 
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-50 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-purple-100"
        >
           <Brain size={14} className="neon-blue-icon" /> Analysis Complete
        </motion.div>
        <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight font-display">
          How shall we <span className="text-purple-600">Proceed?</span>
        </h1>
        <p className="text-lg text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed">
          The neural engine has processed <span className="text-slate-800">"{fileName}"</span>. Choose your learning path to begin the synthesis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {options.map((opt, idx) => (
          <motion.button
            key={opt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => onSelect(opt.id)}
            className="premium-card rounded-[3rem] p-10 group text-left transition-all hover:scale-[1.03] active:scale-95 flex flex-col h-full"
          >
            <div className={`w-16 h-16 ${opt.bg} ${opt.color} rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-sm`}>
               <opt.icon size={32} className="neon-blue-icon" />
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 mb-4 font-display">{opt.title}</h3>
            <p className="text-slate-500 font-bold leading-relaxed mb-10 flex-1">
              {opt.desc}
            </p>

            <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-purple-500 transition-colors">Neural Sync Ready</span>
               <Sparkles size={16} className="text-slate-200 group-hover:text-purple-400 group-hover:rotate-12 transition-all" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
