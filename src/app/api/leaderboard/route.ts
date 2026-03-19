import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const schoolClassId = searchParams.get('schoolClassId');

    const where = schoolClassId ? { schoolClassId } : {};

    const leaderboard = await db.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        avatar: true,
        totalPoints: true,
        level: true,
        schoolClass: {
          select: {
            name: true,
            grade: true,
          },
        },
      },
      orderBy: {
        totalPoints: 'desc',
      },
      take: limit,
    });

    // Přidat pořadí
    const leaderboardWithRank = leaderboard.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

    return NextResponse.json({ leaderboard: leaderboardWithRank });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    return NextResponse.json(
      { error: 'Chyba při načítání žebříčku' },
      { status: 500 }
    );
  }
}
