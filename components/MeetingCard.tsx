import Link from 'next/link';
import { SacramentMeeting } from '@/lib/types';

export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
  // Convertimos la fecha a string por seguridad contra objetos Date de Postgres
  const formattedDate = String(meeting.date);

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-5 bg-white hover:shadow-md transition duration-200">
      <div className="flex justify-between items-center border-b pb-3 mb-3">
        <h2 className="text-lg font-bold text-gray-800">{formattedDate}</h2>
        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded uppercase tracking-wider font-semibold">
          {meeting.meetingType}
        </span>
      </div>
      <div className="space-y-1 mb-4">
        <p className="text-sm text-gray-600">
          <strong className="text-gray-800">Chaired by:</strong> {meeting.presiding}
        </p>
        <p className="text-sm text-gray-600">
          <strong className="text-gray-800">Conducting:</strong> {meeting.conducting}
        </p>
      </div>

      <Link
        href={`/meetings/${meeting.id}`}
        className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors"
      >
        View the full schedule &rarr;
      </Link>
    </div>
  );
}