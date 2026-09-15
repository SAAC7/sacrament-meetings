// app/meetings/[id]/page.tsx
import MeetingDetail from '@/components/MeetingDetail';
import { SacramentMeeting } from '@/lib/types';
import Link from 'next/link';

async function getSingleMeeting(id: string) {
  const res = await fetch(`http://localhost:3000/api/meetings/${id}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) return null;
  return res.json();
}

// 1. Actualizamos el tipo a Promise
export default async function MeetingDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 2. Resolvemos la promesa
  const resolvedParams = await params;
  
  // 3. Usamos el id resuelto
  const meeting: SacramentMeeting | null = await getSingleMeeting(resolvedParams.id);

  if (!meeting) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Reunión no encontrada</h2>
        <Link href="/meetings" className="text-blue-600 hover:underline">
          &larr; Back to Meetings
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 print:hidden">
        <Link href="/meetings" className="text-blue-600 hover:underline text-sm font-medium">
          &larr; Back to Meetings
        </Link>
      </div>
      <MeetingDetail meeting={meeting} />
    </div>
  );
}