import MeetingCard from '@/components/MeetingCard';
import { SacramentMeeting } from '@/lib/types';

// Función para obtener los datos (Server Component)
async function getMeetingsData() {
  // En Next.js App Router, debemos usar la URL absoluta para el fetch interno
  const res = await fetch('http://localhost:3000/api/meetings', { 
    cache: 'no-store' // Para que no guarde caché y traiga datos frescos
  });
  
  if (!res.ok) throw new Error('Error al cargar las reuniones');
  return res.json();
}

export default async function MeetingsPage() {
  const meetings: SacramentMeeting[] = await getMeetingsData();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">All Scheduled Meetings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}