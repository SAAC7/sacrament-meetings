// components/MeetingCard.tsx
import Link from 'next/link';
import { SacramentMeeting } from '@/lib/types';
import { deleteMeeting } from '@/lib/actions';

export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
  const deleteWithId = deleteMeeting.bind(null, meeting.id);

  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
            {meeting.meetingType}
          </span>
          <span className="text-xs text-gray-500">#{meeting.id}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {meeting.date
            ? new Date(meeting.date).toLocaleDateString('en-US', {
                timeZone: 'UTC',
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
            : 'Unscheduled'}
        </h3>

        <div className="text-xs text-gray-600 space-y-1">
          <p><span className="font-medium text-gray-800">Presiding:</span> {meeting.presiding}</p>
          <p><span className="font-medium text-gray-800">Conducting:</span> {meeting.conducting}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-5 pt-3 border-t border-gray-100">
        {/* Botón para ver detalle completo */}
        <Link
          href={`/meetings/${meeting.id}`}
          className="flex-1 text-center text-xs font-semibold px-2.5 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
        >
          View
        </Link>

        {/* Botón para editar */}
        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="flex-1 text-center text-xs font-semibold px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
        >
          Edit
        </Link>

        {/* Formulario y botón eliminar */}
        <form action={deleteWithId} className="inline">
          <button
            type="submit"
            className="text-xs font-semibold px-2.5 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}