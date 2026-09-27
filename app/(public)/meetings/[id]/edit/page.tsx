// app/(public)/meetings/[id]/edit/page.tsx
import { getMeetingById } from '@/lib/meetings-db';
import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';

export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meetingId = Number(id);

  if (isNaN(meetingId)) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Sacrament Meeting</h1>
      <MeetingForm initialData={meeting} />
    </main>
  );
}