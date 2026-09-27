// components/MeetingForm.tsx
'use client';

import { useActionState } from 'react';
import { createMeeting, updateMeeting, FormState } from '@/lib/actions';
import { SacramentMeeting } from '@/lib/types';

interface MeetingFormProps {
  initialData?: SacramentMeeting;
}

export default function MeetingForm({ initialData }: MeetingFormProps) {
  const initialState: FormState = { message: '', errors: {} };

  const actionToUse = initialData
    ? updateMeeting.bind(null, initialData.id)
    : createMeeting;

  const [state, formAction, isPending] = useActionState(actionToUse, initialState);

  // Formatear la fecha a YYYY-MM-DD
  const formattedDate = initialData?.date
    ? String(initialData.date).split('T')[0]
    : '';

  // Formatear arreglos a texto multilínea
  const initialAnnouncements = initialData?.announcements?.join('\n') || '';
  const initialWardBusiness = initialData?.wardBusiness
    ? initialData.wardBusiness.map((item) => item.description).join('\n')
    : '';

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

      {/* SECCIÓN 2: Himnos y Oraciones (Tipados como Hymn { number, title }) */}
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

      {/* SECCIÓN 3: Anuncios y Asuntos del Barrio/Estaca */}
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

      {/* Array de discursantes serializado como JSON */}
      <input
        type="hidden"
        name="speakersJson"
        value={JSON.stringify(initialData?.speakers || [])}
      />

      {/* Botón de envío habilitado con indicador de carga */}
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