import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {
  wordsByType,
  sentencesByType,
  getBasicWordTypes,
  getAllWordTypes,
  getAllSentenceTypes,
} from '@/lib/czech-language-data';

// ==================== TYPY ====================

interface MathQuestion {
  id: string;
  question: string;
  answer: number;
  options: number[];
  type: 'multiply' | 'add' | 'subtract';
}

interface CzechQuestion {
  id: string;
  question: string;
  correctAnswer: string;
  options: string[];
  type: 'word-type' | 'sentence-type';
}

type Question = MathQuestion | CzechQuestion;

// ==================== POMOCNÉ FUNKCE ====================

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// ==================== MATEMATIKA ====================

function generateMultiplicationQuestion(): MathQuestion {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const answer = a * b;
  
  const options = new Set<number>([answer]);
  while (options.size < 4) {
    const wrong = answer + (Math.floor(Math.random() * 20) - 10);
    if (wrong > 0 && wrong !== answer) {
      options.add(wrong);
    }
  }
  
  return {
    id: `mult-${a}-${b}-${Date.now()}-${Math.random()}`,
    question: `${a} × ${b} = ?`,
    answer,
    options: shuffleArray(Array.from(options)),
    type: 'multiply',
  };
}

function generateAdditionQuestion(maxNum: number = 100): MathQuestion {
  const a = Math.floor(Math.random() * maxNum);
  const b = Math.floor(Math.random() * (maxNum - a));
  const answer = a + b;
  
  const options = new Set<number>([answer]);
  while (options.size < 4) {
    const wrong = answer + (Math.floor(Math.random() * 20) - 10);
    if (wrong >= 0 && wrong !== answer) {
      options.add(wrong);
    }
  }
  
  return {
    id: `add-${a}-${b}-${Date.now()}-${Math.random()}`,
    question: `${a} + ${b} = ?`,
    answer,
    options: shuffleArray(Array.from(options)),
    type: 'add',
  };
}

function generateSubtractionQuestion(maxNum: number = 100): MathQuestion {
  const a = Math.floor(Math.random() * maxNum) + 1;
  const b = Math.floor(Math.random() * a);
  const answer = a - b;
  
  const options = new Set<number>([answer]);
  while (options.size < 4) {
    const wrong = answer + (Math.floor(Math.random() * 20) - 10);
    if (wrong >= 0 && wrong !== answer) {
      options.add(wrong);
    }
  }
  
  return {
    id: `sub-${a}-${b}-${Date.now()}-${Math.random()}`,
    question: `${a} - ${b} = ?`,
    answer,
    options: shuffleArray(Array.from(options)),
    type: 'subtract',
  };
}

// ==================== ČESKÝ JAZYK ====================

function generateWordTypeQuestion(difficulty: 'basic' | 'advanced' = 'basic'): CzechQuestion {
  // Získat dostupné slovní druhy podle obtížnosti
  const availableTypes = difficulty === 'basic' 
    ? getBasicWordTypes() 
    : getAllWordTypes();
  
  // Vybrat náhodný slovní druh a slovo
  const correctType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
  const words = wordsByType[correctType as keyof typeof wordsByType];
  const word = words[Math.floor(Math.random() * words.length)];
  
  // Vygenerovat špatné možnosti
  const wrongTypes = availableTypes.filter(t => t !== correctType);
  const selectedWrongTypes = shuffleArray(wrongTypes).slice(0, 3);
  const options = shuffleArray([correctType, ...selectedWrongTypes]);
  
  return {
    id: `word-type-${word}-${Date.now()}-${Math.random()}`,
    question: `Jaký slovní druh je slovo "${word}"?`,
    correctAnswer: correctType,
    options,
    type: 'word-type',
  };
}

function generateSentenceTypeQuestion(): CzechQuestion {
  const allTypes = getAllSentenceTypes();
  
  // Vybrat náhodný druh věty a větu
  const correctType = allTypes[Math.floor(Math.random() * allTypes.length)];
  const sentences = sentencesByType[correctType as keyof typeof sentencesByType];
  const sentence = sentences[Math.floor(Math.random() * sentences.length)];
  
  // Vygenerovat špatné možnosti
  const wrongTypes = allTypes.filter(t => t !== correctType);
  const selectedWrongTypes = shuffleArray(wrongTypes).slice(0, 3);
  const options = shuffleArray([correctType, ...selectedWrongTypes]);
  
  return {
    id: `sentence-type-${Date.now()}-${Math.random()}`,
    question: `Jaký druh věty je toto: "${sentence}"`,
    correctAnswer: correctType,
    options,
    type: 'sentence-type',
  };
}

// ==================== MAIN HANDLER ====================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { moduleId, testId, count = 10 } = body;
    
    // Get module settings
    const moduleData = await db.module.findUnique({
      where: { id: moduleId },
    });
    
    if (!moduleData) {
      return NextResponse.json(
        { error: 'Modul nenalezen' },
        { status: 404 }
      );
    }
    
    // Get test settings if testId provided
    let testSettings: { difficulty?: string } = {};
    if (testId) {
      const test = await db.test.findUnique({
        where: { id: testId },
      });
      if (test) {
        testSettings = JSON.parse(test.settings);
      }
    }
    
    const moduleSettings = JSON.parse(moduleData.settings);
    const questions: Question[] = [];
    
    // Generate questions based on module type
    switch (moduleData.slug) {
      case 'mala-nasobilka':
        for (let i = 0; i < count; i++) {
          questions.push(generateMultiplicationQuestion());
        }
        break;
        
      case 'scitani-odcitani-do-100':
        for (let i = 0; i < count; i++) {
          const operations = moduleSettings.operations || ['add', 'subtract'];
          const op = operations[Math.floor(Math.random() * operations.length)];
          if (op === 'add') {
            questions.push(generateAdditionQuestion(moduleSettings.maxNumber || 100));
          } else {
            questions.push(generateSubtractionQuestion(moduleSettings.maxNumber || 100));
          }
        }
        break;
        
      case 'slovni-druhy':
        const wordTypeDifficulty = testSettings.difficulty || 'basic';
        for (let i = 0; i < count; i++) {
          questions.push(generateWordTypeQuestion(wordTypeDifficulty as 'basic' | 'advanced'));
        }
        break;
        
      case 'druhy-vet':
        for (let i = 0; i < count; i++) {
          questions.push(generateSentenceTypeQuestion());
        }
        break;
        
      default:
        return NextResponse.json(
          { error: 'Neznámý typ modulu' },
          { status: 400 }
        );
    }
    
    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Generate questions error:', error);
    return NextResponse.json(
      { error: 'Chyba při generování otázek' },
      { status: 500 }
    );
  }
}
