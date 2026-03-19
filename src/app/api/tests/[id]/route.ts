import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const test = await db.test.findUnique({
      where: { id },
      include: {
        module: true,
      },
    });

    if (!test) {
      return NextResponse.json(
        { error: 'Test nenalezen' },
        { status: 404 }
      );
    }

    return NextResponse.json({ test });
  } catch (error) {
    console.error('Get test error:', error);
    return NextResponse.json(
      { error: 'Chyba při načítání testu' },
      { status: 500 }
    );
  }
}
