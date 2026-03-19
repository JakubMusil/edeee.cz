import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, testId, score, totalQuestions, points, timeSpent, answers } = body;
    
    if (!userId || !testId) {
      return NextResponse.json(
        { error: 'Chybí povinné údaje' },
        { status: 400 }
      );
    }
    
    // Create test result
    const result = await db.testResult.create({
      data: {
        userId,
        testId,
        score,
        totalQuestions,
        points,
        timeSpent,
        answers: JSON.stringify(answers),
      },
    });
    
    // Update user points and level
    const user = await db.user.findUnique({
      where: { id: userId },
    });
    
    if (user) {
      const newTotalPoints = user.totalPoints + points;
      const newLevel = Math.floor(newTotalPoints / 500) + 1;
      
      await db.user.update({
        where: { id: userId },
        data: {
          totalPoints: newTotalPoints,
          level: newLevel,
        },
      });
      
      // Check for achievements
      await checkAchievements(userId, score, totalQuestions, timeSpent, testId);
    }
    
    return NextResponse.json({ result });
  } catch (error) {
    console.error('Save result error:', error);
    return NextResponse.json(
      { error: 'Chyba při ukládání výsledku' },
      { status: 500 }
    );
  }
}

async function checkAchievements(
  userId: string,
  score: number,
  totalQuestions: number,
  timeSpent: number,
  testId: string
) {
  try {
    // Get test with module
    const test = await db.test.findUnique({
      where: { id: testId },
      include: { module: true },
    });
    
    // First test achievement
    const testCount = await db.testResult.count({
      where: { userId },
    });
    
    if (testCount === 1) {
      await awardAchievement(userId, 'first-test');
    }
    
    // Perfect score
    if (score === totalQuestions && test?.module) {
      if (test.module.slug === 'mala-nasibilka') {
        await awardAchievement(userId, 'multiplication-master');
      } else if (test.module.slug === 'scitani-odcitani-do-100') {
        await awardAchievement(userId, 'addition-master');
      }
    }
    
    // Speed bonus (under half time limit)
    if (test?.timeLimit && timeSpent < test.timeLimit / 2) {
      await awardAchievement(userId, 'speed-demon');
    }
    
    // Points milestone
    const user = await db.user.findUnique({ where: { id: userId } });
    if (user && user.totalPoints >= 1000) {
      await awardAchievement(userId, 'points-1000');
    }
    
    // Level achievement
    if (user && user.level >= 5) {
      await awardAchievement(userId, 'level-5');
    }
  } catch (error) {
    console.error('Check achievements error:', error);
  }
}

async function awardAchievement(userId: string, slug: string) {
  try {
    const achievement = await db.achievement.findUnique({
      where: { slug },
    });
    
    if (!achievement) return;
    
    // Check if already has this achievement
    const existing = await db.userAchievement.findUnique({
      where: {
        userId_achievementId: {
          userId,
          achievementId: achievement.id,
        },
      },
    });
    
    if (existing) return;
    
    // Award achievement
    await db.userAchievement.create({
      data: {
        userId,
        achievementId: achievement.id,
      },
    });
    
    // Add achievement points to user
    await db.user.update({
      where: { id: userId },
      data: {
        totalPoints: { increment: achievement.points },
      },
    });
  } catch (error) {
    console.error('Award achievement error:', error);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Chybí ID uživatele' },
        { status: 400 }
      );
    }
    
    const results = await db.testResult.findMany({
      where: { userId },
      include: {
        test: {
          include: {
            module: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Get results error:', error);
    return NextResponse.json(
      { error: 'Chyba při načítání výsledků' },
      { status: 500 }
    );
  }
}
