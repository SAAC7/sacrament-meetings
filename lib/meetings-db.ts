// lib/meetings-db.ts
import { SacramentMeeting } from './types';

// Arreglo con 5 reuniones de prueba
const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-09-20', // Usa fechas cercanas a tu fecha actual
    meetingType: 'regular',
    presiding: 'Obispo Smith',
    conducting: 'Hermano Jones',
    announcements: ['Actividad de jóvenes el miércoles', 'Limpieza del centro de estaca el sábado'],
    openingHymn: { number: 85, title: 'Qué firmes cimientos' },
    openingPrayer: 'Hermana Anderson',
    wardBusiness: [{ description: 'Relevo del Hermano White de la Escuela Dominical' }],
    stakeBusiness: false,
    sacramentHymn: { number: 105, title: 'Asombroso es el favor' },
    speakers: [
      { name: 'Hermano Clark', topic: 'La Fe', type: 'speaker' },
      { name: 'Coro del Barrio', topic: 'Yo te preciso', type: 'musical-number' },
      { name: 'Hermana Clark', topic: 'Perseverar hasta el fin', type: 'speaker' }
    ],
    closingHymn: { number: 89, title: 'Dios os guarde' },
    closingPrayer: 'Hermano Davis'
  },
  {
    id: 2,
    date: '2026-09-06',
    meetingType: 'testimony',
    presiding: 'Obispo Smith',
    conducting: 'Obispo Smith',
    announcements: ['Ayuno misional'],
    openingHymn: { number: 2, title: 'El Espíritu de Dios' },
    openingPrayer: 'Hermano Pérez',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 108, title: 'Jesús de Nazaret' },
    speakers: [], // En reunión de testimonio no hay discursantes fijos
    closingHymn: { number: 177, title: 'Testimonio' },
    closingPrayer: 'Hermana Gómez'
  },
  {
    id: 3,
    date: '2026-09-13',
    meetingType: 'stake',
    presiding: 'Presidente Johnson',
    conducting: 'Presidente Johnson',
    announcements: [],
    openingHymn: { number: 5, title: 'Oh Dios de Israel' },
    openingPrayer: 'Hermano Lee',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 110, title: 'En memoria de tu muerte' },
    speakers: [
      { name: 'Presidente Johnson', topic: 'Asuntos de Estaca', type: 'speaker' }
    ],
    closingHymn: { number: 152, title: 'Bandera de Sión' },
    closingPrayer: 'Hermana Lee'
  },
  {
    id: 4,
    date: '2026-09-27',
    meetingType: 'regular',
    presiding: 'Obispo Smith',
    conducting: 'Primer Consejero',
    announcements: ['Noche de hogar de barrio'],
    openingHymn: { number: 17, title: 'Bandera de Sión' },
    openingPrayer: 'Hermana White',
    wardBusiness: [{ description: 'Sostenimiento de la nueva presidencia de la Primaria' }],
    stakeBusiness: false,
    sacramentHymn: { number: 104, title: 'Jesús, en la corte celestial' },
    speakers: [
      { name: 'Hermano Martínez', topic: 'Historia Familiar', type: 'speaker' },
      { name: 'Hermana Martínez', topic: 'La obra del Templo', type: 'speaker' }
    ],
    closingHymn: { number: 4, title: 'Ya regocijemos' },
    closingPrayer: 'Hermano Black'
  },
  {
    id: 5,
    date: '2026-10-04',
    meetingType: 'general',
    presiding: 'Primera Presidencia',
    conducting: 'Primera Presidencia',
    announcements: [],
    openingHymn: { number: 13, title: 'Te damos Señor nuestras gracias' },
    openingPrayer: 'Por anunciar',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 0, title: 'N/A' }, // No hay sacramento en Conf. General
    speakers: [
      { name: 'Autoridades Generales', topic: 'Conferencia General', type: 'speaker' }
    ],
    closingHymn: { number: 153, title: 'Dulce tu obra es, Señor' },
    closingPrayer: 'Por anunciar'
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
