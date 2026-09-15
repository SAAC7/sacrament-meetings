import { NextRequest, NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);

  // 1. Validar si el ID es un número (devuelve 400 si es "abc")
  if (isNaN(numericId)) {
    return NextResponse.json(
      { error: 'Invalid ID. Must be a number.' },
      { status: 400 }
    );
  }

  const meeting = getMeetingById(numericId);

  // 2. Devuelve 404 si el ID es numérico pero no existe la reunión
  if (!meeting) {
    return NextResponse.json(
      { error: 'Meeting not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(meeting);
}