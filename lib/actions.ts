// lib/actions.ts
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addMeeting, updateMeetingDb, deleteMeetingDb } from './meetings-db';
import { SacramentMeeting, MeetingType, Hymn, WardBusinessItem, SpeakerItem } from './types';

export type FormState = {
  message?: string;
  errors?: Record<string, string[]>;
};

// Validación con Zod adaptada a las propiedades de lib/types.ts
const MeetingFormSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general'] as const, {
    message: 'Meeting type is required',
  }),
  presiding: z.string().min(1, 'Presiding officer is required'),
  conducting: z.string().min(1, 'Conducting officer is required'),
  
  // Himnos
  openingHymnNumber: z.coerce.number().default(0),
  openingHymnTitle: z.string().default(''),
  sacramentHymnNumber: z.coerce.number().default(0),
  sacramentHymnTitle: z.string().default(''),
  closingHymnNumber: z.coerce.number().default(0),
  closingHymnTitle: z.string().default(''),
  
  // Oraciones
  openingPrayer: z.string().default(''),
  closingPrayer: z.string().default(''),
  
  // Asuntos y Anuncios
  stakeBusiness: z.preprocess((val) => val === 'on' || val === 'true' || val === true, z.boolean()),
  announcementsRaw: z.string().optional(),
  wardBusinessRaw: z.string().optional(),
  
  // Discursantes
  speakersJson: z.string().optional(),
});

export async function createMeeting(prevState: FormState, formData: FormData): Promise<FormState> {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = MeetingFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please review the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  const openingHymn: Hymn = { number: data.openingHymnNumber, title: data.openingHymnTitle };
  const sacramentHymn: Hymn = { number: data.sacramentHymnNumber, title: data.sacramentHymnTitle };
  const closingHymn: Hymn = { number: data.closingHymnNumber, title: data.closingHymnTitle };

  const announcements: string[] = data.announcementsRaw
    ? data.announcementsRaw.split('\n').map((s) => s.trim()).filter(Boolean)
    : [];

  const wardBusiness: WardBusinessItem[] = data.wardBusinessRaw
    ? data.wardBusinessRaw.split('\n').map((s) => s.trim()).filter(Boolean).map((desc) => ({ description: desc }))
    : [];

  let speakers: SpeakerItem[] = [];
  if (data.speakersJson) {
    try {
      speakers = JSON.parse(data.speakersJson);
    } catch {
      speakers = [];
    }
  }

  const meetingPayload: Omit<SacramentMeeting, 'id'> = {
    date: data.date,
    meetingType: data.meetingType as MeetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    openingPrayer: data.openingPrayer,
    closingPrayer: data.closingPrayer,
    openingHymn,
    sacramentHymn,
    closingHymn,
    stakeBusiness: data.stakeBusiness,
    announcements,
    wardBusiness,
    speakers,
  };

try {
    await addMeeting(meetingPayload);
 } catch (error: unknown) {
  console.error('Error creating meeting:', error);

  const dbError = error as { code?: string; message?: string };

  if (dbError?.code === '23505' || dbError?.message?.includes('meetings_date_key')) {
    return {
      message: 'A meeting already exists for the selected date.',
      errors: {
        date: ['A sacrament meeting is already scheduled for this date. Please choose another date or edit the existing meeting.'],
      },
    };
  }

  return { message: 'Database Error: Failed to create sacrament meeting record.' };
}

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(id: number, prevState: FormState, formData: FormData): Promise<FormState> {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = MeetingFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please review the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  const openingHymn: Hymn = { number: data.openingHymnNumber, title: data.openingHymnTitle };
  const sacramentHymn: Hymn = { number: data.sacramentHymnNumber, title: data.sacramentHymnTitle };
  const closingHymn: Hymn = { number: data.closingHymnNumber, title: data.closingHymnTitle };

  const announcements: string[] = data.announcementsRaw
    ? data.announcementsRaw.split('\n').map((s) => s.trim()).filter(Boolean)
    : [];

  const wardBusiness: WardBusinessItem[] = data.wardBusinessRaw
    ? data.wardBusinessRaw.split('\n').map((s) => s.trim()).filter(Boolean).map((desc) => ({ description: desc }))
    : [];

  let speakers: SpeakerItem[] = [];
  if (data.speakersJson) {
    try {
      speakers = JSON.parse(data.speakersJson);
    } catch {
      speakers = [];
    }
  }

  const meetingPayload: Partial<SacramentMeeting> = {
    date: data.date,
    meetingType: data.meetingType as MeetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    openingPrayer: data.openingPrayer,
    closingPrayer: data.closingPrayer,
    openingHymn,
    sacramentHymn,
    closingHymn,
    stakeBusiness: data.stakeBusiness,
    announcements,
    wardBusiness,
    speakers,
  };

  try {
    await updateMeetingDb(id, meetingPayload);
  } catch (error) {
    console.error('Error updating meeting:', error);
    return { message: 'Database Error: Failed to update sacrament meeting record.' };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

// Función requerida por MeetingCard.tsx
export async function deleteMeeting(id: number): Promise<void> {
  try {
    await deleteMeetingDb(id);
  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw new Error('Failed to delete sacrament meeting record.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}