import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface QuestionGenerator {
  id: string;
  question: string;
  answer: number;
  options: number[];
  type: 'multiply' | 'add' | 'subtract';
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function generateMultiplicationQuestion(): QuestionGenerator {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const answer = a * b;
  
  // Generate wrong options
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

function generateAdditionQuestion(maxNum: number = 100): QuestionGenerator {
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

function generateSubtractionQuestion(maxNum: number = 100): QuestionGenerator {
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
    
    const settings = JSON.parse(moduleData.settings);
    const questions: QuestionGenerator[] = [];
    
    if (moduleData.slug === 'mala-nasobilka') {
      for (let i = 0; i < count; i++) {
        questions.push(generateMultiplicationQuestion());
      }
    } else if (moduleData.slug === 'scitani-odcitani-do-100') {
      const operations = settings.operations || ['add', 'subtract'];
      for (let i = 0; i < count; i++) {
        const op = operations[Math.floor(Math.random() * operations.length)];
        if (op === 'add') {
          questions.push(generateAdditionQuestion(settings.maxNumber || 100));
        } else {
          questions.push(generateSubtractionQuestion(settings.maxNumber || 100));
        }
      }
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
