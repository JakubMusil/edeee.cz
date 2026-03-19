import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Vytvoření tříd
  const classes = [];
  for (let i = 1; i <= 9; i++) {
    const schoolClass = await prisma.schoolClass.upsert({
      where: { grade: i },
      update: {},
      create: {
        grade: i,
        name: `${i}. třída`,
        description: getGradeDescription(i),
      },
    });
    classes.push(schoolClass);
  }

  // ==================== MATEMATIKA ====================
  
  const multiplicationModule = await prisma.module.upsert({
    where: { slug: 'mala-nasobilka' },
    update: {},
    create: {
      slug: 'mala-nasobilka',
      title: 'Malá násobilka',
      description: 'Nauč se násobilku od 1 do 10 pomocí zábavných cvičení a her.',
      icon: '✖️',
      category: 'matematika',
      difficulty: 'easy',
      estimatedTime: 15,
      minGrade: 2,
      maxGrade: 5,
      settings: JSON.stringify({
        minNumber: 1,
        maxNumber: 10,
        operations: ['multiply'],
      }),
      isActive: true,
      order: 1,
    },
  });

  const additionModule = await prisma.module.upsert({
    where: { slug: 'scitani-odcitani-do-100' },
    update: {},
    create: {
      slug: 'scitani-odcitani-do-100',
      title: 'Sčítání a odčítání do 100',
      description: 'Procvič si sčítání a odčítání čísel do 100.',
      icon: '➕',
      category: 'matematika',
      difficulty: 'easy',
      estimatedTime: 10,
      minGrade: 1,
      maxGrade: 4,
      settings: JSON.stringify({
        minNumber: 0,
        maxNumber: 100,
        operations: ['add', 'subtract'],
      }),
      isActive: true,
      order: 2,
    },
  });

  // ==================== ČESKÝ JAZYK ====================
  
  // Slovní druhy - pro 3. třídu
  const wordTypesModule = await prisma.module.upsert({
    where: { slug: 'slovni-druhy' },
    update: {},
    create: {
      slug: 'slovni-druhy',
      title: 'Slovní druhy',
      description: 'Nauč se rozpoznávat slovní druhy: podstatná jména, slovesa, přídavná jména, zájmena a další.',
      icon: '📝',
      category: 'čeština',
      difficulty: 'medium',
      estimatedTime: 15,
      minGrade: 3,
      maxGrade: 5,
      settings: JSON.stringify({
        wordTypes: [
          'podstatné jméno',
          'sloveso',
          'přídavné jméno',
          'zájmeno',
          'číslovka',
          'předložka',
          'spojka',
          'citoslovce',
        ],
        // Pro 3. třídu začínáme s základními druhy
        basicWordTypes: [
          'podstatné jméno',
          'sloveso',
          'přídavné jméno',
        ],
      }),
      isActive: true,
      order: 3,
    },
  });

  // Druhy vět - pro 3. třídu
  const sentenceTypesModule = await prisma.module.upsert({
    where: { slug: 'druhy-vet' },
    update: {},
    create: {
      slug: 'druhy-vet',
      title: 'Druhy vět',
      description: 'Nauč se rozlišovat druhy vět podle obsahu a cíle: oznamovací, tázací, rozkazovací a přací.',
      icon: '💬',
      category: 'čeština',
      difficulty: 'easy',
      estimatedTime: 10,
      minGrade: 3,
      maxGrade: 5,
      settings: JSON.stringify({
        sentenceTypes: [
          { type: 'oznamovací', description: 'Něco sdělují, končí tečkou', ending: '.' },
          { type: 'tázací', description: 'Položí otázku, končí otazníkem', ending: '?' },
          { type: 'rozkazovací', description: 'Vyjadřují příkaz nebo zákaz, končí vykřičníkem', ending: '!' },
          { type: 'přací', description: 'Vyjadřují přání, končí vykřičníkem', ending: '!' },
        ],
      }),
      isActive: true,
      order: 4,
    },
  });

  // ==================== TESTY - MATEMATIKA ====================
  
  await prisma.test.upsert({
    where: { id: 'multiplication-practice' },
    update: {},
    create: {
      id: 'multiplication-practice',
      moduleId: multiplicationModule.id,
      title: 'Procvičování násobilky',
      type: 'practice',
      timeLimit: 180,
      questionsCount: 10,
      pointsPerQuestion: 10,
      settings: JSON.stringify({
        showProgress: true,
        showTimer: true,
        allowSkip: false,
      }),
      isActive: true,
      order: 1,
    },
  });

  await prisma.test.upsert({
    where: { id: 'multiplication-challenge' },
    update: {},
    create: {
      id: 'multiplication-challenge',
      moduleId: multiplicationModule.id,
      title: 'Výzva násobilky',
      type: 'challenge',
      timeLimit: 120,
      questionsCount: 15,
      pointsPerQuestion: 15,
      settings: JSON.stringify({
        showProgress: true,
        showTimer: true,
        allowSkip: false,
        bonusForSpeed: true,
      }),
      isActive: true,
      order: 2,
    },
  });

  await prisma.test.upsert({
    where: { id: 'addition-practice' },
    update: {},
    create: {
      id: 'addition-practice',
      moduleId: additionModule.id,
      title: 'Procvičování sčítání a odčítání',
      type: 'practice',
      timeLimit: 180,
      questionsCount: 10,
      pointsPerQuestion: 10,
      settings: JSON.stringify({
        showProgress: true,
        showTimer: true,
        allowSkip: false,
      }),
      isActive: true,
      order: 1,
    },
  });

  await prisma.test.upsert({
    where: { id: 'addition-challenge' },
    update: {},
    create: {
      id: 'addition-challenge',
      moduleId: additionModule.id,
      title: 'Výzva sčítání a odčítání',
      type: 'challenge',
      timeLimit: 120,
      questionsCount: 15,
      pointsPerQuestion: 15,
      settings: JSON.stringify({
        showProgress: true,
        showTimer: true,
        allowSkip: false,
        bonusForSpeed: true,
      }),
      isActive: true,
      order: 2,
    },
  });

  // ==================== TESTY - ČESKÝ JAZYK ====================
  
  // Slovní druhy - testy
  await prisma.test.upsert({
    where: { id: 'word-types-practice' },
    update: {},
    create: {
      id: 'word-types-practice',
      moduleId: wordTypesModule.id,
      title: 'Procvičování slovních druhů',
      type: 'practice',
      timeLimit: 240,
      questionsCount: 10,
      pointsPerQuestion: 10,
      settings: JSON.stringify({
        showProgress: true,
        showTimer: true,
        allowSkip: false,
        difficulty: 'basic', // Pro 3. třídu
      }),
      isActive: true,
      order: 1,
    },
  });

  await prisma.test.upsert({
    where: { id: 'word-types-challenge' },
    update: {},
    create: {
      id: 'word-types-challenge',
      moduleId: wordTypesModule.id,
      title: 'Výzva slovní druhy',
      type: 'challenge',
      timeLimit: 180,
      questionsCount: 15,
      pointsPerQuestion: 15,
      settings: JSON.stringify({
        showProgress: true,
        showTimer: true,
        allowSkip: false,
        bonusForSpeed: true,
        difficulty: 'advanced', // Včetně předložek, spojek, číslovek
      }),
      isActive: true,
      order: 2,
    },
  });

  // Druhy vět - testy
  await prisma.test.upsert({
    where: { id: 'sentence-types-practice' },
    update: {},
    create: {
      id: 'sentence-types-practice',
      moduleId: sentenceTypesModule.id,
      title: 'Procvičování druhů vět',
      type: 'practice',
      timeLimit: 180,
      questionsCount: 10,
      pointsPerQuestion: 10,
      settings: JSON.stringify({
        showProgress: true,
        showTimer: true,
        allowSkip: false,
      }),
      isActive: true,
      order: 1,
    },
  });

  await prisma.test.upsert({
    where: { id: 'sentence-types-challenge' },
    update: {},
    create: {
      id: 'sentence-types-challenge',
      moduleId: sentenceTypesModule.id,
      title: 'Výzva druhy vět',
      type: 'challenge',
      timeLimit: 120,
      questionsCount: 15,
      pointsPerQuestion: 15,
      settings: JSON.stringify({
        showProgress: true,
        showTimer: true,
        allowSkip: false,
        bonusForSpeed: true,
      }),
      isActive: true,
      order: 2,
    },
  });

  // ==================== ÚSPĚCHY ====================
  
  const achievements = [
    {
      slug: 'first-test',
      title: 'První kroky',
      description: 'Dokončil jsi svůj první test!',
      icon: '🎯',
      points: 50,
      conditions: JSON.stringify({ type: 'tests_completed', value: 1 }),
    },
    {
      slug: 'streak-3',
      title: 'Začínající střelec',
      description: '3 dny v řadě!',
      icon: '🔥',
      points: 30,
      conditions: JSON.stringify({ type: 'streak', value: 3 }),
    },
    {
      slug: 'streak-7',
      title: 'Týdenní bojovník',
      description: '7 dní v řadě!',
      icon: '⚡',
      points: 100,
      conditions: JSON.stringify({ type: 'streak', value: 7 }),
    },
    {
      slug: 'multiplication-master',
      title: 'Mistr násobilky',
      description: 'Získej 100% v testu násobilky',
      icon: '🏆',
      points: 200,
      moduleId: multiplicationModule.id,
      conditions: JSON.stringify({ type: 'perfect_score', moduleId: multiplicationModule.id }),
    },
    {
      slug: 'addition-master',
      title: 'Mistr sčítání',
      description: 'Získej 100% v testu sčítání',
      icon: '🏅',
      points: 200,
      moduleId: additionModule.id,
      conditions: JSON.stringify({ type: 'perfect_score', moduleId: additionModule.id }),
    },
    {
      slug: 'word-types-master',
      title: 'Slovní druhý',
      description: 'Získej 100% v testu slovních druhů',
      icon: '📖',
      points: 200,
      moduleId: wordTypesModule.id,
      conditions: JSON.stringify({ type: 'perfect_score', moduleId: wordTypesModule.id }),
    },
    {
      slug: 'sentence-types-master',
      title: 'Větný mistr',
      description: 'Získej 100% v testu druhů vět',
      icon: '✍️',
      points: 200,
      moduleId: sentenceTypesModule.id,
      conditions: JSON.stringify({ type: 'perfect_score', moduleId: sentenceTypesModule.id }),
    },
    {
      slug: 'czech-language-expert',
      title: 'Český jazykovědec',
      description: 'Dokonč všechny testy z češtiny',
      icon: '📚',
      points: 300,
      conditions: JSON.stringify({ type: 'category_complete', category: 'čeština' }),
    },
    {
      slug: 'math-whiz',
      title: 'Matematický génius',
      description: 'Dokonč všechny testy z matematiky',
      icon: '🧮',
      points: 300,
      conditions: JSON.stringify({ type: 'category_complete', category: 'matematika' }),
    },
    {
      slug: 'speed-demon',
      title: 'Rychlý blesk',
      description: 'Dokonč test pod polovinou časového limitu',
      icon: '💨',
      points: 150,
      conditions: JSON.stringify({ type: 'speed_bonus', factor: 0.5 }),
    },
    {
      slug: 'level-5',
      title: 'Pátá úroveň',
      description: 'Dosáhl jsi 5. úrovně!',
      icon: '⭐',
      points: 100,
      conditions: JSON.stringify({ type: 'level', value: 5 }),
    },
    {
      slug: 'points-1000',
      title: 'Tisícovník',
      description: 'Nasbírej 1000 bodů!',
      icon: '💎',
      points: 100,
      conditions: JSON.stringify({ type: 'total_points', value: 1000 }),
    },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { slug: achievement.slug },
      update: {},
      create: achievement,
    });
  }

  // ==================== DEMO UŽIVATEL ====================
  
  const hashedPassword = await bcrypt.hash('demo123', 10);
  await prisma.user.upsert({
    where: { email: 'demo@skolka.cz' },
    update: {},
    create: {
      email: 'demo@skolka.cz',
      name: 'Demo Žák',
      password: hashedPassword,
      schoolClassId: classes[2].id, // 3. třída (pro český jazyk)
      totalPoints: 150,
      level: 2,
    },
  });

  console.log('✅ Seed data vytvořena úspěšně!');
  console.log('📚 Moduly: Malá násobilka, Sčítání/odčítání, Slovní druhy, Druhy vět');
}

function getGradeDescription(grade: number): string {
  const descriptions: Record<number, string> = {
    1: 'Prvňáčci - první kroky ve škole',
    2: 'Družáci - objevování nových vědomostí',
    3: 'Třetáci - rozvoj dovedností',
    4: 'Čtvrťáci - příprava na druhý stupeň',
    5: 'Páťáci - poslední rok prvního stupně',
    6: 'Sextáni - začátek druhého stupně',
    7: 'Sedmáci - prohlubování znalostí',
    8: 'Osmáci - příprava na závěr',
    9: 'Deváťáci - poslední rok základní školy',
  };
  return descriptions[grade] || `${grade}. třída`;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
