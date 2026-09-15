"use client"; // Necesario para el botón de imprimir
import { SacramentMeeting } from '@/lib/types';

export default function MeetingDetail({ meeting }: { meeting: SacramentMeeting }) {
  return (
    <div className="bg-white p-6 sm:p-10 max-w-3xl mx-auto rounded-xl shadow-sm border border-gray-200 print:shadow-none print:border-none print:p-0">
      
      {/* Encabezado del Programa */}
      <div className="text-center mb-8 border-b pb-6 print:border-b-2 print:border-black">
        <h1 className="text-3xl font-serif text-gray-900 mb-2">Sacramental Meeting</h1>
        <p className="text-gray-600 text-lg">{meeting.date}</p>
      </div>

      <div className="space-y-4 text-gray-800 text-lg">
        {/* Autoridades */}
        <div className="flex justify-between">
          <span className="font-semibold">Chaired by:</span>
          <span>{meeting.presiding}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Conducting:</span>
          <span>{meeting.conducting}</span>
        </div>

        {/* Anuncios */}
        {meeting.announcements && meeting.announcements.length > 0 && (
          <div className="mt-6 pt-4 border-t border-dashed">
            <h3 className="font-bold text-gray-900 mb-2">Anuncios</h3>
            <ul className="list-disc pl-6 text-base text-gray-700 space-y-1">
              {meeting.announcements.map((ann, i) => <li key={i}>{ann}</li>)}
            </ul>
          </div>
        )}

        {/* Apertura */}
        <div className="flex justify-between mt-6 pt-4 border-t border-dashed">
          <span className="font-semibold">Opening Hymn:</span>
          <span className="text-right">{meeting.openingHymn.title} #{meeting.openingHymn.number}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">First Prayer:</span>
          <span>{meeting.openingPrayer}</span>
        </div>

        {/* Asuntos del Barrio */}
        {meeting.wardBusiness.length > 0 && (
          <div className="mt-6 pt-4 border-t border-dashed">
            <h3 className="font-bold text-gray-900 mb-2">Ward Business {meeting.stakeBusiness && "(Includes Stake Business)"}</h3>
            <ul className="list-disc pl-6 text-base text-gray-700 space-y-1">
              {meeting.wardBusiness.map((wb, i) => <li key={i}>{wb.description}</li>)}
            </ul>
          </div>
        )}

        {/* Sacramento */}
        <div className="flex justify-between mt-6 pt-4 border-t border-dashed">
          <span className="font-semibold">Sacramental Hymn:</span>
          <span className="text-right">{meeting.sacramentHymn.title} #{meeting.sacramentHymn.number}</span>
        </div>

        {/* Mensajes */}
        <div className="my-8 pt-4 border-t border-dashed">
          <h3 className="font-bold text-gray-900 mb-4 text-center">Program</h3>
          {meeting.speakers.length > 0 ? (
            <ul className="space-y-4">
              {meeting.speakers.map((speaker, i) => (
                <li key={i} className="flex flex-col text-center">
                  <span className="font-medium text-xl">{speaker.name}</span>
                  <span className="text-base text-gray-600 italic">
                    {speaker.topic} {speaker.type === 'musical-number' ? '(Número Musical)' : ''}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 italic">No speakers scheduled.</p>
          )}
        </div>

        {/* Cierre */}
        <div className="flex justify-between mt-8 pt-4 border-t border-dashed">
          <span className="font-semibold">Closing Hymn:</span>
          <span className="text-right">{meeting.closingHymn.title} #{meeting.closingHymn.number}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Last Prayer:</span>
          <span>{meeting.closingPrayer}</span>
        </div>
      </div>

      {/* Botón de imprimir */}
      <div className="mt-12 text-center print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-gray-800 text-white px-6 py-2 rounded-md shadow hover:bg-gray-700 transition"
        >
          Print Program
        </button>
      </div>
    </div>
  );
}