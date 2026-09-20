import { NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    // Es obligatorio el uso de await
    const meeting = await getMeetingById(id);

    if (!meeting) {
      return NextResponse.json(
        { error: 'Meeting not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(meeting);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch meeting' },
      { status: 500 }
    );
  }
}