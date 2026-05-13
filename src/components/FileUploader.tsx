import { useDropzone } from "react-dropzone";
import { motion } from "motion/react";
import { Upload, FileText, X, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

export function FileUploader({ onFileSelect }: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
        onFileSelect(acceptedFiles[0]);
      }
    },
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false
  } as any);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight font-display">
          Document <span className="text-purple-600">Synthesis</span>
        </h1>
        <p className="text-lg text-slate-500 font-bold max-w-lg mx-auto leading-relaxed">
          Our specialized engine will extract key concepts and generate a custom evaluation based on your material.
        </p>
      </motion.div>

      <div
        {...getRootProps()}
        className={`relative group cursor-pointer border rounded-[3rem] p-16 transition-all duration-700 flex flex-col items-center justify-center min-h-[450px]
          ${isDragActive ? 'border-purple-500 bg-purple-50/30 scale-[1.02]' : 'border-slate-100 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.02)] hover:border-purple-200 hover:shadow-xl'}`}
      >
        <input {...getInputProps()} />
        
        <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mb-10 transition-all duration-700
          ${isDragActive ? 'bg-purple-600 text-white rotate-12 scale-110 shadow-xl' : 'bg-slate-50 text-slate-400 group-hover:bg-purple-50 group-hover:text-purple-600 group-hover:-rotate-6 shadow-sm'}`}>
          <Upload size={40} strokeWidth={2.5} className={isDragActive ? "neon-blue-icon" : ""} />
        </div>

        <h3 className="text-2xl font-black text-slate-900 mb-3 font-display">
          {isDragActive ? 'Ready for scan' : 'Upload Study Material'}
        </h3>
        <p className="text-slate-400 mb-12 font-black uppercase tracking-[0.3em] text-[10px]">
          PDF • TXT • Neural Ready
        </p>
        
        <div className="px-10 py-5 bg-purple-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-purple-200 group-hover:scale-105 transition-all active:scale-95 flex items-center gap-3">
          <Wand2 size={18} className="neon-blue-icon" />
          Select File
        </div>

        {selectedFile && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-white/95 backdrop-blur-md rounded-[3rem] p-10 flex flex-col items-center justify-center z-20"
          >
             <div className="w-24 h-24 bg-purple-50 text-purple-600 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner">
               <FileText size={48} className="neon-blue-icon" />
             </div>
             <p className="text-2xl font-black text-slate-900 mb-2 font-display">{selectedFile.name}</p>
             <p className="text-xs font-black text-purple-500 uppercase tracking-widest mb-12">
               {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • VERIFIED
             </p>
             
             <button 
               onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
               className="p-5 rounded-3xl bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all"
             >
               <X size={28} />
             </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
