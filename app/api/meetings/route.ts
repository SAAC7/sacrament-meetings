// app/api/meetings/route.ts
import { NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date') || undefined;
  const query = searchParams.get('query') || undefined;

  try {
    const meetings = await getMeetings(query, 1, 10, date);
    return NextResponse.json(meetings);
  } catch (error) {
    console.error('Error in GET /api/meetings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meetings' },
      { status: 500 }
    );
  }
}