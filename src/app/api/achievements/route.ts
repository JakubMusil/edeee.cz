import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Získání všech úspěchů
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const achievements = await db.achievement.findMany({
      orderBy: {
        points: 'desc',
      },
    });

    let userAchievements: string[] = [];

    if (userId) {
      const earned = await db.userAchievement.findMany({
        where: { userId },
        select: { achievementId: true },
      });
      userAchievements = earned.map((e) => e.achievementId);
    }

    const achievementsWithStatus = achievements.map((achievement) => ({
      ...achievement,
      earned: userAchievements.includes(achievement.id),
    }));

    return NextResponse.json({ achievements: achievementsWithStatus });
  } catch (error) {
    console.error('Get achievements error:', error);
    return NextResponse.json(
      { error: 'Chyba při načítání úspěchů' },
      { status: 500 }
    );
  }
}

// Přidělení úspěchu uživateli
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, achievementId } = body;

    if (!userId || !achievementId) {
      return NextResponse.json(
        { error: 'Chybí povinná data' },
        { status: 400 }
      );
    }

    // Zkontroluj, zda uživatel už nemá tento úspěch
    const existing = await db.userAchievement.findUnique({
      where: {
        userId_achievementId: {
          userId,
          achievementId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ message: 'Úspěch již byl přidělen' });
    }

    // Přiděl úspěch
    const userAchievement = await db.userAchievement.create({
      data: {
        userId,
        achievementId,
      },
      include: {
        achievement: true,
      },
    });

    // Přidej body z úspěchu
    const achievement = await db.achievement.findUnique({
      where: { id: achievementId },
    });

    if (achievement) {
      await db.user.update({
        where: { id: userId },
        data: {
          totalPoints: {
            increment: achievement.points,
          },
        },
      });
    }

    return NextResponse.json({ userAchievement });
  } catch (error) {
    console.error('Award achievement error:', error);
    return NextResponse.json(
      { error: 'Chyba při přidělování úspěchu' },
      { status: 500 }
    );
  }
}
