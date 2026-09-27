import { getMeetingById } from '@/lib/meetings-db';
import MeetingDetail from '@/components/MeetingDetail';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);

  if (isNaN(id)) {
    notFound();
  }

  const meeting = await getMeetingById(id);

  if (!meeting) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="mb-6 print:hidden">
        <Link
          href="/meetings"
          className="text-blue-600 hover:underline text-sm font-medium flex items-center gap-1"
        >
          ← Back to Meetings List
        </Link>
      </div>

      <MeetingDetail meeting={meeting} />
    </main>
  );
}