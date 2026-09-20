import { getMeetings } from '@/lib/meetings-db';
import MeetingSearch from '@/components/MeetingSearch';
import Pagination from '@/components/Pagination';
import MeetingCard from '@/components/MeetingCard';

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params?.query || '';
  const currentPage = Number(params?.page) || 1;

  const meetings = await getMeetings(query, currentPage, 5);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Sacrament Meetings</h1>
      </div>

      <MeetingSearch />

      <div className="space-y-4">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}

        {meetings.length === 0 && (
          <div className="text-center py-12 border border-dashed rounded-lg bg-white">
            <p className="text-gray-500">No meetings found matching your search query.</p>
          </div>
        )}
      </div>

      <Pagination />
    </main>
  );
}