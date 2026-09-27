// components/MeetingCard.tsx
import Link from 'next/link';
import { SacramentMeeting } from '@/lib/types';
import { deleteMeeting } from '@/lib/actions';

export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
  const deleteWithId = deleteMeeting.bind(null, meeting.id);

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold text-gray-800">{meeting.date} - {meeting.meetingType}</h2>
        <p className="text-gray-600">Presiding: {meeting.presiding}</p>
        <p className="text-gray-600">Conducting: {meeting.conducting}</p>
      </div>
      <div className="flex gap-2">
        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="px-3 py-1.5 bg-amber-600 text-white text-sm font-medium rounded hover:bg-amber-700"
        >
          Edit
        </Link>
        <form action={deleteWithId}>
          <button
            type="submit"
            className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}