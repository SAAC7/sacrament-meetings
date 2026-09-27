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
  // Obtener la fecha del domingo de esta semana (YYYY-MM-DD)
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 es Domingo
  const distanceToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  
  const currentSunday = new Date(today);
  currentSunday.setDate(today.getDate() + distanceToSunday);
  const currentSundayStr = getThisWeekSundayISO();

  // 1. IMPORTANTE: Usar await porque getMeetings() es asíncrona
  const meetings = await getMeetings();

  // 2. Buscar la reunión de este domingo
  let meeting = meetings.find((m) => m.date === currentSundayStr);

  // 3. Fallback: Si no existe reunión para hoy, redirige a la primera
  if (!meeting && meetings.length > 0) {
    meeting = meetings[0];
  }

  // 4. Redirigir al detalle de la reunión
  if (meeting) {
    redirect(`/meetings/${meeting.id}`);
  }

  return (
    <main className="max-w-4xl mx-auto p-6 text-center">
      <p className="text-gray-500">No meetings available.</p>
    </main>
  );
}