export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation: string;
}

export interface Quiz {
  title: string;
  questions: Question[];
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  hint?: string;
}

export interface StudyNote {
  title: string;
  sections: {
    heading: string;
    content: string;
    bulletPoints?: string[];
  }[];
  summary: string;
  keywords: string[];
}

export type SynthesisType = 'quiz' | 'flashcards' | 'notes';

export type AppStage = 'dashboard' | 'upload' | 'analyzing' | 'selection' | 'quiz' | 'flashcards' | 'notes' | 'results' | 'hub' | 'leaderboard';
