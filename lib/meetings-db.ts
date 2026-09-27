// lib/meetings-db.ts
import { neon } from '@neondatabase/serverless';
import { SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL || '');

// Función para obtener todas las reuniones (con filtro opcional por fecha)

export async function getMeetings(query?: string, page: number = 1, limit: number = 10): Promise<SacramentMeeting[]> {

  const offset = (page - 1) * limit;
  let rows;
  if (query) {
    const formattedQuery = `%${query}%`;
    rows = await sql`
      SELECT 
        id,
        date,
        meeting_type AS "meetingType",
        presiding,
        conducting,
        announcements,
        opening_hymn AS "openingHymn",
        opening_prayer AS "openingPrayer",
        ward_business AS "wardBusiness",
        stake_business AS "stakeBusiness",
        sacrament_hymn AS "sacramentHymn",
        speakers,
        closing_hymn AS "closingHymn",
        closing_prayer AS "closingPrayer"
      FROM meetings 
      WHERE presiding ILIKE ${formattedQuery}
         OR conducting ILIKE ${formattedQuery}
         OR meeting_type ILIKE ${formattedQuery}
         OR EXISTS (
            SELECT 1 FROM jsonb_array_elements(speakers) AS s 
            WHERE s->>'name' ILIKE ${formattedQuery}
         )
      ORDER BY date DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
  } else {
    rows = await sql`
      SELECT 
        id,
        date,
        meeting_type AS "meetingType",
        presiding,
        conducting,
        announcements,
        opening_hymn AS "openingHymn",
        opening_prayer AS "openingPrayer",
        ward_business AS "wardBusiness",
        stake_business AS "stakeBusiness",
        sacrament_hymn AS "sacramentHymn",
        speakers,
        closing_hymn AS "closingHymn",
        closing_prayer AS "closingPrayer"
      FROM meetings 
      ORDER BY date DESC 
      LIMIT ${limit} OFFSET ${offset}
    `;
  }

  return rows.map((row: any) => ({
    ...row,
    date: row.date instanceof Date ? row.date.toISOString().split('T')[0] : String(row.date),
  })) as SacramentMeeting[];
}


// Función para obtener una sola reunión por su ID

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT 
      id,
      date,
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings 
    WHERE id = ${id}
  `;
  if (!rows[0]) return null;

  const row = rows[0] as any;
  return {
    ...row,
    date: row.date instanceof Date ? row.date.toISOString().split('T')[0] : String(row.date),
  } as SacramentMeeting;
}

// Stubs para la Semana 04
export async function addMeeting(meeting: any) { throw new Error('Not implemented until Week 04'); }
export async function updateMeeting(id: number, meeting: any) { throw new Error('Not implemented until Week 04'); }
export async function deleteMeeting(id: number) { throw new Error('Not implemented until Week 04'); }
