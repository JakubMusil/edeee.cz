import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const grade = searchParams.get('grade');

    const where: {
      isActive: boolean;
      OR?: Array<{ minGrade: { lte: number }; maxGrade: { gte: number } }>;
    } = {
      isActive: true,
    };

    if (grade) {
      const gradeNum = parseInt(grade, 10);
      where.OR = [
        {
          minGrade: { lte: gradeNum },
          maxGrade: { gte: gradeNum },
        },
      ];
    }

    const modules = await db.module.findMany({
      where,
      orderBy: {
        order: 'asc',
      },
      include: {
        tests: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
        _count: {
          select: { tests: true },
        },
      },
    });

    return NextResponse.json({ modules });
  } catch (error) {
    console.error('Get modules error:', error);
    return NextResponse.json(
      { error: 'Chyba při načítání modulů' },
      { status: 500 }
    );
  }
}
