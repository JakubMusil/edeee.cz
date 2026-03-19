import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // For demo purposes, return the demo user
    // In production, you'd use proper session management
    const user = await db.user.findFirst({
      include: {
        schoolClass: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Uživatel nenalezen' },
        { status: 404 }
      );
    }

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Chyba při načítání uživatele' },
      { status: 500 }
    );
  }
}
