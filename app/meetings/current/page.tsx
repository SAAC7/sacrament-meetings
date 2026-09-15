import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';

// Fuerza la ejecución dinámica en cada petición (evita que la fecha quede fija en el build)
export const dynamic = 'force-dynamic';

function getThisWeekSundayISO(): string {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

  const sunday = new Date(now);
  sunday.setDate(now.getDate() - dayOfWeek);

  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, '0');
  const day = String(sunday.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default async function CurrentMeetingPage() {
  const currentSundayStr = getThisWeekSundayISO();
  const meetings = getMeetings();

  // 1. Busca la reunión que coincida con el domingo de esta semana
  let meeting = meetings.find((m) => m.date === currentSundayStr);

  // 2. Fallback: Si no existe reunión para esa fecha exacta en los datos simulados,
  //    redirige a la primera reunión de la lista para evitar un 404
  if (!meeting && meetings.length > 0) {
    meeting = meetings[0];
  }

  if (meeting) {
    redirect(`/meetings/${meeting.id}`);
  }

  redirect('/meetings');
}