import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  schoolClassId: string | null;
  schoolClass: {
    id: string;
    grade: number;
    name: string;
  } | null;
  totalPoints: number;
  level: number;
  currentStreak: number;
  bestStreak: number;
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string | null;
  category: string;
  difficulty: string;
  estimatedTime: number | null;
  minGrade: number;
  maxGrade: number;
  tests: Test[];
  _count: {
    tests: number;
  };
}

export interface Test {
  id: string;
  title: string;
  type: string;
  timeLimit: number | null;
  questionsCount: number;
  pointsPerQuestion: number;
}

// Společný typ pro otázku - podporuje číselné i textové odpovědi
export interface Question {
  id: string;
  question: string;
  answer: number | string;  // Číslo pro matematiku, text pro češtinu
  options?: (number | string)[];  // Pole čísel nebo textů
  correctAnswer?: string;  // Pro český jazyk
  type: 'multiply' | 'add' | 'subtract' | 'word-type' | 'sentence-type';
}

export interface TestResult {
  id: string;
  score: number;
  totalQuestions: number;
  points: number;
  timeSpent: number;
  createdAt: string;
}

export interface Achievement {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  points: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  totalPoints: number;
  level: number;
  schoolClass: {
    name: string;
    grade: number;
  } | null;
}

interface AppState {
  // User
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  
  // UI State
  currentView: 'login' | 'register' | 'dashboard' | 'module' | 'test' | 'results' | 'achievements' | 'leaderboard';
  setView: (view: AppState['currentView']) => void;
  
  // Selected items
  selectedModule: Module | null;
  setSelectedModule: (module: Module | null) => void;
  selectedTest: Test | null;
  setSelectedTest: (test: Test | null) => void;
  
  // Test state
  currentQuestions: Question[];
  setCurrentQuestions: (questions: Question[]) => void;
  currentAnswers: Record<string, number | string>;  // Podporuje číslo i text
  setCurrentAnswer: (questionId: string, answer: number | string) => void;
  testStartTime: number | null;
  setTestStartTime: (time: number | null) => void;
  testResult: TestResult | null;
  setTestResult: (result: TestResult | null) => void;
  
  // Loading states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  
  // Reset
  reset: () => void;
}

const initialState = {
  user: null,
  isLoggedIn: false,
  currentView: 'login' as const,
  selectedModule: null,
  selectedTest: null,
  currentQuestions: [],
  currentAnswers: {},
  testStartTime: null,
  testResult: null,
  isLoading: false,
  error: null,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setUser: (user) => set({ 
        user, 
        isLoggedIn: !!user,
        currentView: user ? 'dashboard' : 'login'
      }),
      
      setView: (view) => set({ currentView: view }),
      
      setSelectedModule: (module) => set({ selectedModule: module }),
      setSelectedTest: (test) => set({ selectedTest: test }),
      
      setCurrentQuestions: (questions) => set({ currentQuestions: questions }),
      setCurrentAnswer: (questionId, answer) => set((state) => ({
        currentAnswers: { ...state.currentAnswers, [questionId]: answer }
      })),
      setTestStartTime: (time) => set({ testStartTime: time }),
      setTestResult: (result) => set({ testResult: result }),
      
      setIsLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'skolni-trenink-storage',
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
