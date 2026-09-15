// lib/meetings-db.ts
import { SacramentMeeting } from './types';

// Arreglo con 5 reuniones de prueba
const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-09-20',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    announcements: ['Youth activity on Wednesday', 'Stake center cleaning on Saturday'],
    openingHymn: { number: 85, title: 'How Firm a Foundation' },
    openingPrayer: 'Sister Anderson',
    wardBusiness: [{ description: 'Release of Brother White from the Sunday School' }],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: 'In Humility, Our Savior' }, // Official Sacrament Hymn
    speakers: [
      { name: 'Brother Clark', topic: 'Faith', type: 'speaker' },
      { name: 'Ward Choir', topic: 'I Need Thee Every Hour', type: 'musical-number' },
      { name: 'Sister Clark', topic: 'Enduring to the End', type: 'speaker' }
    ],
    closingHymn: { number: 152, title: 'God Be with You Till We Meet Again' },
    closingPrayer: 'Brother Davis'
  },
  {
    id: 2,
    date: '2026-09-06',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Bishop Smith',
    announcements: ['Ward Mission Fast'],
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Brother Perez',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' }, // Official Sacrament Hymn
    speakers: [], 
    closingHymn: { number: 137, title: 'Testimony' },
    closingPrayer: 'Sister Gomez'
  },
  {
    id: 3,
    date: '2026-09-13',
    meetingType: 'stake',
    presiding: 'President Johnson',
    conducting: 'President Johnson',
    announcements: [],
    openingHymn: { number: 5, title: 'High on the Mountain Top' },
    openingPrayer: 'Brother Lee',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 175, title: 'O God, the Eternal Father' }, // Official Sacrament Hymn
    speakers: [
      { name: 'President Johnson', topic: 'Stake Business', type: 'speaker' }
    ],
    closingHymn: { number: 249, title: 'Called to Serve' },
    closingPrayer: 'Sister Lee'
  },
  {
    id: 4,
    date: '2026-09-27',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'First Counselor',
    announcements: ['Ward Family Home Evening'],
    openingHymn: { number: 26, title: "Joseph Smith's First Prayer" },
    openingPrayer: 'Sister White',
    wardBusiness: [{ description: 'Sustaining of the new Primary presidency' }],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' }, // Official Sacrament Hymn
    speakers: [
      { name: 'Brother Martinez', topic: 'Family History', type: 'speaker' },
      { name: 'Sister Martinez', topic: 'Temple Work', type: 'speaker' }
    ],
    closingHymn: { number: 58, title: 'Come, Ye Children of the Lord' },
    closingPrayer: 'Brother Black'
  },
  {
    id: 5,
    date: '2026-10-04',
    meetingType: 'general',
    presiding: 'First Presidency',
    conducting: 'First Presidency',
    announcements: [],
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'To be announced',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 0, title: 'N/A' }, 
    speakers: [
      { name: 'General Authorities', topic: 'General Conference', type: 'speaker' }
    ],
    closingHymn: { number: 147, title: 'Sweet Is the Work' },
    closingPrayer: 'To be announced'
  }
];

// Función para obtener todas las reuniones (con filtro opcional por fecha)
export function getMeetings(date?: string): SacramentMeeting[] {
  if (date) {
    return meetings.filter(m => m.date === date);
  }
  return meetings; // Si no hay fecha, devuelve todas
}

// Función para obtener una sola reunión por su ID
export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find(m => m.id === id);
}
