import { useState } from "react";
import { Header, Footer } from "./components/Layout";
import { FileUploader } from "./components/FileUploader";
import { QuizPlayer } from "./components/QuizPlayer";
import { ResultsDisplay } from "./components/ResultsDisplay";
import { Dashboard } from "./components/Dashboard";
import { FlashcardPlayer } from "./components/FlashcardPlayer";
import { NotesViewer } from "./components/NotesViewer";
import { SynthesisSelection } from "./components/SynthesisSelection";
import { StudyHub } from "./components/StudyHub";
import { RankingPage } from "./components/RankingPage";
import { generateQuizFromDocument, generateFlashcardsFromDocument, generateNotesFromDocument } from "./services/gemini";
import { Quiz, AppStage, Flashcard, StudyNote, SynthesisType } from "./types";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Loader2, Sparkles, X } from "lucide-react";

export default function App() {
  const [stage, setStage] = useState<AppStage>('dashboard');
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [notes, setNotes] = useState<StudyNote | null>(null);
  
  const [activeFile, setActiveFile] = useState<{ base64: string; type: string; name: string } | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setError(null);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      setActiveFile({ base64, type: file.type, name: file.name });
      setStage('selection');
    };
    reader.onerror = () => {
      setError("Failed to read file");
    };
  };

  const handleSynthesisSelect = async (type: SynthesisType) => {
    if (!activeFile) return;
    setStage('analyzing');
    
    try {
      if (type === 'quiz') {
        const generatedQuiz = await generateQuizFromDocument(activeFile.base64, activeFile.type);
        setQuiz(generatedQuiz);
        setStage('quiz');
      } else if (type === 'flashcards') {
        const generatedCards = await generateFlashcardsFromDocument(activeFile.base64, activeFile.type);
        setFlashcards(generatedCards);
        setStage('flashcards');
      } else if (type === 'notes') {
        const generatedNotes = await generateNotesFromDocument(activeFile.base64, activeFile.type);
        setNotes(generatedNotes);
        setStage('notes');
      }
    } catch (err: any) {
      setError(err.message || "Failed to generate study materials");
      setStage('dashboard');
    }
  };

  const handleQuizComplete = (scoreNum: number, total: number, answers: number[]) => {
    setScore({ correct: scoreNum, total });
    setUserAnswers(answers);
    setStage('results');
  };

  const handleReset = () => {
    setStage('dashboard');
    setQuiz(null);
    setFlashcards([]);
    setNotes(null);
    setActiveFile(null);
    setScore({ correct: 0, total: 0 });
    setUserAnswers([]);
    setError(null);
  };

  const handleModuleSelect = async (module: any) => {
    setStage('analyzing');
    await new Promise(r => setTimeout(r, 1500));
    
    if (module.type === 'Flashcards') {
      const mockCards = [
        { id: '1', front: `What are ${module.title} core components?`, back: "The fundamental building blocks that allow for modular architecture and scalability." },
        { id: '2', front: "Explain the primary objective.", back: "To maximize learning efficiency through targeted neural synthesis." },
        { id: '3', front: "What is the key terminology?", back: "Neural Maps, Synthesis Nodes, and Cognitive Bridges." }
      ];
      setFlashcards(mockCards);
      setStage('flashcards');
    } else if (module.type === 'Quiz') {
      const mockQuiz = {
        title: module.title,
        questions: [
          {
            id: 'q1',
            question: `In the context of ${module.title}, what is the most efficient method?`,
            options: ["Traditional Rote Learning", "Active Recall & Spaced Repetition", "Passive Reading", "Group Discussion"],
            correctAnswer: 1,
            explanation: "Active recall forces the brain to retrieve information, strengthening neural pathways."
          },
          {
            id: 'q2',
            question: "Which phase comes after synthesis?",
            options: ["Creation", "Evaluation", "Recall", "Application"],
            correctAnswer: 1,
            explanation: "Evaluation ensures the synthesized concepts are accurate and understood."
          }
        ]
      };
      setQuiz(mockQuiz);
      setStage('quiz');
    } else {
      const mockNotes = {
        title: module.title,
        summary: `Comprehensive analysis of ${module.title} structures.`,
        sections: [
          { heading: "Foundations", content: "Establishing the core principles is vital for long-term retention." },
          { heading: "Synthesis", content: "Merging different concepts creates a unique mental model." }
        ],
        keywords: ["Neural Mapping", "Cognitive Load", "Spaced Repetition", "Knowledge Nodes"]
      };
      setNotes(mockNotes);
      setStage('notes');
    }
  };

  return (
    <div className="min-h-screen text-slate-900 font-sans selection:bg-purple-100 selection:text-purple-900 overflow-x-hidden bg-[#FDFCFE]">
      <Header currentStage={stage} setStage={setStage} />
      
      <main className="pt-28 pb-20 relative z-10 min-h-[calc(100vh-160px)]">
        <AnimatePresence mode="wait">
          {stage === 'dashboard' && (
            <motion.section
              key="dashboard"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Dashboard onStartGenerator={() => setStage('upload')} onModuleSelect={handleModuleSelect} />
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-12 p-6 bg-rose-500 text-white rounded-3xl text-center max-w-md mx-auto font-black uppercase tracking-widest shadow-2xl shadow-rose-500/20 text-xs border border-rose-400"
                >
                  <div className="flex items-center justify-center gap-4">
                    {error}
                    <button onClick={() => setError(null)} className="p-1 hover:bg-white/20 rounded-lg">
                      <X size={16} />
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.section>
          )}

          {stage === 'upload' && (
            <motion.section
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, rotate: -2 }}
              className="max-w-7xl mx-auto px-4"
            >
              <div className="flex justify-between items-center mb-8 max-w-3xl mx-auto">
                 <h2 className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em]">Generator Module</h2>
                 <button onClick={() => setStage('dashboard')} className="p-2 bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-slate-900 transition-all shadow-sm">
                    <X size={16} />
                 </button>
              </div>
              <FileUploader onFileSelect={handleFileSelect} />
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-12 p-6 bg-rose-500 text-white rounded-3xl text-center max-w-md mx-auto font-black uppercase tracking-widest shadow-2xl shadow-rose-500/20 text-xs border border-rose-400"
                >
                  {error}
                </motion.div>
              )}
            </motion.section>
          )}

          {stage === 'selection' && activeFile && (
            <motion.section
              key="selection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <SynthesisSelection fileName={activeFile.name} onSelect={handleSynthesisSelect} />
            </motion.section>
          )}

          {stage === 'analyzing' && (
            <motion.section
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-40"
            >
              <div className="relative mb-16">
                <motion.div
                   animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                   className="w-48 h-48 border-4 border-purple-100 border-t-purple-600 rounded-[4rem] shadow-[0_0_50px_rgba(139,92,246,0.1)]"
                />
                <div className="absolute inset-0 flex items-center justify-center text-purple-600">
                   <Brain size={64} className="animate-pulse drop-shadow-[0_0_20px_rgba(139,92,246,0.2)]" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.5, 1], rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-gradient-to-tr from-purple-500 to-cyan-500 text-white p-5 rounded-3xl shadow-2xl"
                >
                  <Sparkles size={32} />
                </motion.div>
              </div>
              
              <h2 className="text-4xl font-black text-slate-900 mb-6 text-center font-display tracking-tight leading-none">
                Neural <span className="text-purple-600">Synthesis</span>
              </h2>
              <div className="flex items-center gap-4 text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] bg-white px-8 py-4 rounded-3xl shadow-sm border border-slate-100">
                <Loader2 size={18} className="animate-spin text-purple-500" />
                Building knowledge nodes...
              </div>
            </motion.section>
          )}

          {stage === 'quiz' && quiz && (
            <motion.section
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <QuizPlayer quiz={quiz} onComplete={handleQuizComplete} />
            </motion.section>
          )}

          {stage === 'flashcards' && flashcards.length > 0 && (
            <motion.section
              key="flashcards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FlashcardPlayer flashcards={flashcards} onComplete={handleReset} />
            </motion.section>
          )}

          {stage === 'notes' && notes && (
            <motion.section
              key="notes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <NotesViewer notes={notes} onExit={handleReset} />
            </motion.section>
          )}

          {stage === 'hub' && (
            <motion.section
              key="hub"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <StudyHub onStartGenerator={() => setStage('upload')} onModuleSelect={handleModuleSelect} />
            </motion.section>
          )}

          {stage === 'leaderboard' && (
            <motion.section
              key="leaderboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <RankingPage />
            </motion.section>
          )}

          {stage === 'results' && quiz && (
            <motion.section
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ResultsDisplay 
                quiz={quiz}
                userAnswers={userAnswers}
                score={score.correct} 
                total={score.total} 
                onReset={handleReset} 
              />
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
