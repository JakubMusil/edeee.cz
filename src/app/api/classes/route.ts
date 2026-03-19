import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const classes = await db.schoolClass.findMany({
      orderBy: {
        grade: 'asc',
      },
    });

    return NextResponse.json({ classes });
  } catch (error) {
    console.error('Get classes error:', error);
    return NextResponse.json(
      { error: 'Chyba při načítání tříd' },
      { status: 500 }
    );
  }
}
