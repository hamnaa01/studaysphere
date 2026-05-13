import { motion } from "motion/react";
import { StudyNote } from "../types";
import { 
  FileText, Sparkles, Share2, Download, 
  ArrowLeft, CheckCircle2, Bookmark, Lightbulb,
  Volume2, VolumeX
} from "lucide-react";
import { useState } from "react";

interface NotesViewerProps {
  notes: StudyNote;
  onExit: () => void;
}

export function NotesViewer({ notes, onExit }: NotesViewerProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToSpeak = `Study Notes for ${notes.title}. Summary: ${notes.summary}. ` + 
        (notes.sections || []).map(s => `${s.heading}: ${s.content}`).join('. ');
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-12"
      >
        <button 
          onClick={onExit}
          className="p-4 bg-white rounded-2xl border border-slate-100 text-slate-400 hover:text-purple-600 transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex gap-4">
           <button 
              onClick={toggleSpeech}
              className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${isSpeaking ? 'bg-purple-600 text-white shadow-purple-100' : 'bg-white border border-slate-100 text-slate-500 hover:bg-slate-50'}`}
           >
             {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />} 
             {isSpeaking ? 'Stop Audio' : 'Listen'}
           </button>
           <button className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all flex items-center gap-2 md:inline-flex hidden">
             <Download size={16} /> Export
           </button>
           <button className="px-6 py-3 bg-purple-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-purple-100 hover:bg-purple-700 transition-all flex items-center gap-2">
             <Share2 size={16} /> Share
           </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="premium-card rounded-[4rem] p-12 md:p-20 relative overflow-hidden mb-12"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="px-4 py-1.5 bg-purple-600 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-purple-100">
               Neural Summary
             </div>
             <div className="flex items-center gap-2 text-slate-400">
               <Bookmark size={14} />
               <span className="text-[10px] font-black uppercase tracking-widest">Condensed Intelligence</span>
             </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 font-display tracking-tight leading-[1.1]">
            {notes.title}
          </h1>

          <div className="p-8 bg-purple-50/50 rounded-3xl border border-purple-100 mb-16 relative group">
             <div className="absolute top-6 right-6 text-purple-200">
                <Sparkles size={32} />
             </div>
             <h3 className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mb-4">Executive Abstract</h3>
             <p className="text-lg text-slate-800 font-bold leading-relaxed italic">
                "{notes.summary}"
             </p>
          </div>

          <div className="space-y-20">
            {(notes.sections || []).map((section, idx) => (
              <div key={idx} className="relative">
                <div className="flex items-baseline gap-6 mb-8">
                   <span className="text-5xl font-black text-slate-100 font-display tabular-nums select-none">
                     {(idx + 1).toString().padStart(2, '0')}
                   </span>
                   <h2 className="text-3xl font-black text-slate-900 tracking-tight font-display">{section.heading}</h2>
                </div>
                
                <p className="text-slate-600 text-lg leading-relaxed font-bold mb-8 pl-0 md:pl-20">
                  {section.content}
                </p>

                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0 md:pl-20">
                    {section.bulletPoints.map((bp, bIdx) => (
                      <div key={bIdx} className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-start gap-4">
                        <div className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                           <CheckCircle2 size={14} />
                        </div>
                        <span className="text-sm font-bold text-slate-700 leading-snug">{bp}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-24 pt-16 border-t border-slate-100">
             <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-3">
               <Lightbulb size={20} className="text-purple-500" /> Key Terminologies
             </h3>
             <div className="flex flex-wrap gap-3">
                {(notes.keywords || []).map((kw, idx) => (
                  <div key={idx} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-black text-slate-500 uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all cursor-default">
                    {kw}
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
           <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-200 rounded-full blur-[120px]" />
           <div className="absolute top-1/2 -left-32 w-96 h-96 bg-cyan-200 rounded-full blur-[120px]" />
        </div>
      </motion.div>

      <div className="flex justify-center">
         <button 
           onClick={onExit}
           className="px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all"
         >
           Close Report
         </button>
      </div>
    </div>
  );
}
