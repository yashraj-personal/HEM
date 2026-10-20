export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface MemoryCard {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface ThisOrThatPair {
  id: number;
  optionA: { text: string; icon: string };
  optionB: { text: string; icon: string };
}

export interface NoteCard {
  id: string;
  text: string;
  author: string;
  color: string;
  rotation: string;
}

export type MilestoneId =
  | 'welcome_opened'
  | 'letter_read'
  | 'contract_sealed'
  | 'quiz_completed'
  | 'memory_won'
  | 'candles_blown'
  | 'gifts_opened'
  | 'finale_viewed';

export interface Milestone {
  id: MilestoneId;
  label: string;
  icon: string;
  unlocked: boolean;
}
