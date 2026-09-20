import { NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date') || undefined;

  try {
    // Es obligatorio el uso de await
    const meetings = await getMeetings(date);
    return NextResponse.json(meetings);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch meetings' },
      { status: 500 }
    );
  }
}