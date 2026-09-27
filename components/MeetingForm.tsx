// components/MeetingForm.tsx
'use client';

import { useState, useActionState } from 'react';
import { createMeeting, updateMeeting, FormState } from '@/lib/actions';
import { SacramentMeeting, SpeakerItem } from '@/lib/types';

interface MeetingFormProps {
  initialData?: SacramentMeeting;
}

export default function MeetingForm({ initialData }: MeetingFormProps) {
  const initialState: FormState = { message: '', errors: {} };

  const actionToUse = initialData
    ? updateMeeting.bind(null, initialData.id)
    : createMeeting;

  const [state, formAction, isPending] = useActionState(actionToUse, initialState);

  // Estado dinámico para manejar discursantes y números musicales
  const [speakers, setSpeakers] = useState<SpeakerItem[]>(
    initialData?.speakers || []
  );

  // Funciones para manipular la lista de discursantes
  const handleAddSpeaker = () => {
    setSpeakers([...speakers, { name: '', topic: '', type: 'speaker' }]);
  };

  const handleRemoveSpeaker = (index: number) => {
    setSpeakers(speakers.filter((_, i) => i !== index));
  };

  const handleSpeakerChange = (
    index: number,
    field: keyof SpeakerItem,
    value: string
  ) => {
    const updated = [...speakers];
    updated[index] = { ...updated[index], [field]: value };
    setSpeakers(updated);
  };

  // Formatear la fecha a YYYY-MM-DD
  const formattedDate = initialData?.date
    ? String(initialData.date).split('T')[0]
    : '';

  // Obtener anuncios de forma segura
  const initialAnnouncements = Array.isArray(initialData?.announcements)
    ? initialData.announcements.join('\n')
    : typeof initialData?.announcements === 'string'
    ? initialData.announcements
    : '';

  // Obtener asuntos del barrio de forma segura
  const initialWardBusiness = (() => {
    const wb = initialData?.wardBusiness;
    if (!wb) return '';

    // Si ya es un arreglo de JavaScript
    if (Array.isArray(wb)) {
      return wb
        .map((item) => (typeof item === 'string' ? item : item?.description || ''))
        .filter(Boolean)
        .join('\n');
    }

    // Si viene como string o JSON stringificado
    if (typeof wb === 'string') {
      try {
        const parsed = JSON.parse(wb);
        if (Array.isArray(parsed)) {
          return parsed
            .map((item) => (typeof item === 'string' ? item : item?.description || ''))
            .filter(Boolean)
            .join('\n');
        }
      } catch {
        return wb;
      }
    }

    return '';
  })();

  return (
    <form action={formAction} className="space-y-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm max-w-4xl mx-auto">
      {state.message && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded" role="alert">
          <p className="font-semibold">{state.message}</p>
        </div>
      )}

      {/* SECCIÓN 1: Información General */}
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">General Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              defaultValue={formattedDate}
              className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {state.errors?.date && <p className="text-red-600 text-xs mt-1">{state.errors.date[0]}</p>}
          </div>

          <div>
            <label htmlFor="meetingType" className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Type *
            </label>
            <select
              id="meetingType"
              name="meetingType"
              defaultValue={initialData?.meetingType || 'regular'}
              className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="regular">Regular Sacrament</option>
              <option value="testimony">Fast & Testimony</option>
              <option value="stake">Stake Conference</option>
              <option value="general">General Conference</option>
            </select>
            {state.errors?.meetingType && <p className="text-red-600 text-xs mt-1">{state.errors.meetingType[0]}</p>}
          </div>

          <div>
            <label htmlFor="presiding" className="block text-sm font-medium text-gray-700 mb-1">
              Presiding *
            </label>
            <input
              type="text"
              id="presiding"
              name="presiding"
              defaultValue={initialData?.presiding || ''}
              placeholder="e.g. Bishop Smith"
              className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm"
            />
            {state.errors?.presiding && <p className="text-red-600 text-xs mt-1">{state.errors.presiding[0]}</p>}
          </div>

          <div>
            <label htmlFor="conducting" className="block text-sm font-medium text-gray-700 mb-1">
              Conducting *
            </label>
            <input
              type="text"
              id="conducting"
              name="conducting"
              defaultValue={initialData?.conducting || ''}
              placeholder="e.g. Brother Jones"
              className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm"
            />
            {state.errors?.conducting && <p className="text-red-600 text-xs mt-1">{state.errors.conducting[0]}</p>}
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: Himnos y Oraciones */}
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Hymns & Prayers</h2>
        
        {/* Opening Hymn */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Opening Hymn</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="number"
              name="openingHymnNumber"
              placeholder="Hymn #"
              defaultValue={initialData?.openingHymn?.number || ''}
              className="rounded-md border border-gray-300 p-2 text-sm shadow-sm"
            />
            <input
              type="text"
              name="openingHymnTitle"
              placeholder="Hymn Title"
              defaultValue={initialData?.openingHymn?.title || ''}
              className="sm:col-span-2 rounded-md border border-gray-300 p-2 text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Opening Prayer */}
        <div className="mb-4">
          <label htmlFor="openingPrayer" className="block text-sm font-medium text-gray-700 mb-1">Opening Prayer</label>
          <input
            type="text"
            id="openingPrayer"
            name="openingPrayer"
            defaultValue={initialData?.openingPrayer || ''}
            placeholder="Name of person offering prayer"
            className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm"
          />
        </div>

        {/* Sacrament Hymn */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Sacrament Hymn</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="number"
              name="sacramentHymnNumber"
              placeholder="Hymn #"
              defaultValue={initialData?.sacramentHymn?.number || ''}
              className="rounded-md border border-gray-300 p-2 text-sm shadow-sm"
            />
            <input
              type="text"
              name="sacramentHymnTitle"
              placeholder="Hymn Title"
              defaultValue={initialData?.sacramentHymn?.title || ''}
              className="sm:col-span-2 rounded-md border border-gray-300 p-2 text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Closing Hymn */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Closing Hymn</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="number"
              name="closingHymnNumber"
              placeholder="Hymn #"
              defaultValue={initialData?.closingHymn?.number || ''}
              className="rounded-md border border-gray-300 p-2 text-sm shadow-sm"
            />
            <input
              type="text"
              name="closingHymnTitle"
              placeholder="Hymn Title"
              defaultValue={initialData?.closingHymn?.title || ''}
              className="sm:col-span-2 rounded-md border border-gray-300 p-2 text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Closing Prayer */}
        <div>
          <label htmlFor="closingPrayer" className="block text-sm font-medium text-gray-700 mb-1">Closing Prayer</label>
          <input
            type="text"
            id="closingPrayer"
            name="closingPrayer"
            defaultValue={initialData?.closingPrayer || ''}
            placeholder="Name of person offering prayer"
            className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm"
          />
        </div>
      </div>

      {/* SECCIÓN 3: Program / Speakers (GESTIÓN DINÁMICA) */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Program & Speakers</h2>
          <button
            type="button"
            onClick={handleAddSpeaker}
            className="px-3 py-1.5 text-xs font-semibold bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            + Add Program Item
          </button>
        </div>

        {speakers.length === 0 ? (
          <p className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded text-center border border-dashed border-gray-300">
  No speakers or musical numbers added yet. Click &quot;+ Add Program Item&quot; above.
</p>
        ) : (
          <div className="space-y-3">
            {speakers.map((speaker, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end bg-gray-50 p-3 rounded-md border border-gray-200"
              >
                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                  <select
                    value={speaker.type}
                    onChange={(e) =>
                      handleSpeakerChange(index, 'type', e.target.value as 'speaker' | 'musical-number')
                    }
                    className="w-full rounded border border-gray-300 p-1.5 text-xs bg-white"
                  >
                    <option value="speaker">Speaker</option>
                    <option value="musical-number font-semibold">Musical Number</option>
                  </select>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    {speaker.type === 'speaker' ? 'Speaker Name' : 'Performer / Group'}
                  </label>
                  <input
                    type="text"
                    value={speaker.name}
                    onChange={(e) => handleSpeakerChange(index, 'name', e.target.value)}
                    placeholder={speaker.type === 'speaker' ? 'Sister Wilson' : 'Ward Choir'}
                    className="w-full rounded border border-gray-300 p-1.5 text-xs bg-white"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    {speaker.type === 'speaker' ? 'Topic' : 'Title / Hymn Name'}
                  </label>
                  <input
                    type="text"
                    value={speaker.topic}
                    onChange={(e) => handleSpeakerChange(index, 'topic', e.target.value)}
                    placeholder={speaker.type === 'speaker' ? 'Ministering with Christlike Love' : 'I Know That My Redeemer Lives'}
                    className="w-full rounded border border-gray-300 p-1.5 text-xs bg-white"
                  />
                </div>

                <div className="sm:col-span-1 text-right">
                  <button
                    type="button"
                    onClick={() => handleRemoveSpeaker(index)}
                    className="w-full sm:w-auto px-2 py-1.5 text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECCIÓN 4: Anuncios y Asuntos del Barrio/Estaca */}
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Announcements & Business</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="stakeBusiness"
              name="stakeBusiness"
              defaultChecked={initialData?.stakeBusiness || false}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="stakeBusiness" className="text-sm font-medium text-gray-700">
              Stake Business Conducted
            </label>
          </div>

          <div>
            <label htmlFor="announcementsRaw" className="block text-sm font-medium text-gray-700 mb-1">
              Announcements (one per line)
            </label>
            <textarea
              id="announcementsRaw"
              name="announcementsRaw"
              rows={3}
              defaultValue={initialAnnouncements}
              placeholder="Example Announcement 1&#10;Example Announcement 2"
              className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="wardBusinessRaw" className="block text-sm font-medium text-gray-700 mb-1">
              Ward Business (one item per line)
            </label>
            <textarea
              id="wardBusinessRaw"
              name="wardBusinessRaw"
              rows={3}
              defaultValue={initialWardBusiness}
              placeholder="Sustaining Brother John Doe as Elder...&#10;Releasing Sister Jane Doe..."
              className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Input oculto que envía el estado formateado a la Server Action */}
      <input
        type="hidden"
        name="speakersJson"
        value={JSON.stringify(speakers)}
      />

      {/* Botón de envío */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 min-w-[180px]"
        >
          {isPending ? (
            <>
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              <span>{initialData ? 'Saving Changes...' : 'Creating Meeting...'}</span>
            </>
          ) : (
            <span>{initialData ? 'Update Sacrament Meeting' : 'Create Sacrament Meeting'}</span>
          )}
        </button>
      </div>
    </form>
  );
}