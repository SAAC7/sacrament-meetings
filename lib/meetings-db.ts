import { neon } from '@neondatabase/serverless';
import { SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL || '');

interface MeetingRow extends Omit<SacramentMeeting, 'date'> {
  date: Date | string;
}

export async function getMeetings(
  query?: string,
  page: number = 1,
  limit: number = 10,
  dateFilter?: string
): Promise<SacramentMeeting[]> {
  const offset = (page - 1) * limit;
  let rows;

  if (dateFilter) {
    rows = await sql`
      SELECT 
        id, date, meeting_type AS "meetingType", presiding, conducting, announcements,
        opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
        ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
        sacrament_hymn AS "sacramentHymn", speakers, closing_hymn AS "closingHymn",
        closing_prayer AS "closingPrayer"
      FROM meetings 
      WHERE date = ${dateFilter}::date
      ORDER BY date DESC 
      LIMIT ${limit} OFFSET ${offset}
    `;
  } else if (query) {
    const formattedQuery = `%${query}%`;
    rows = await sql`
      SELECT 
        id, date, meeting_type AS "meetingType", presiding, conducting, announcements,
        opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
        ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
        sacrament_hymn AS "sacramentHymn", speakers, closing_hymn AS "closingHymn",
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
        id, date, meeting_type AS "meetingType", presiding, conducting, announcements,
        opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
        ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
        sacrament_hymn AS "sacramentHymn", speakers, closing_hymn AS "closingHymn",
        closing_prayer AS "closingPrayer"
      FROM meetings 
      ORDER BY date DESC 
      LIMIT ${limit} OFFSET ${offset}
    `;
  }

  return (rows as unknown as MeetingRow[]).map((row) => ({
    ...row,
    date: row.date instanceof Date ? row.date.toISOString().split('T')[0] : String(row.date),
  })) as SacramentMeeting[];
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT 
      id, date, meeting_type AS "meetingType", presiding, conducting, announcements,
      opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn", speakers, closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings 
    WHERE id = ${id}
  `;
  if (!rows[0]) return null;

  const row = rows[0] as unknown as MeetingRow;
  return {
    ...row,
    date: row.date instanceof Date ? row.date.toISOString().split('T')[0] : String(row.date),
  } as SacramentMeeting;
}

export async function addMeeting(meeting: Omit<SacramentMeeting, 'id'>) {
  const rows = await sql`
    INSERT INTO meetings (
      date, meeting_type, presiding, conducting, announcements,
      opening_hymn, opening_prayer, ward_business, stake_business,
      sacrament_hymn, speakers, closing_hymn, closing_prayer
    ) VALUES (
      ${meeting.date}, ${meeting.meetingType}, ${meeting.presiding}, ${meeting.conducting},
      ${meeting.announcements || null}, ${meeting.openingHymn || null}, ${meeting.openingPrayer || null},
      ${meeting.wardBusiness || null}, ${meeting.stakeBusiness || null}, ${meeting.sacramentHymn || null},
      ${JSON.stringify(meeting.speakers || [])}::jsonb, ${meeting.closingHymn || null}, ${meeting.closingPrayer || null}
    )
    RETURNING id
  `;
  return rows[0];
}

export async function updateMeetingDb(id: number, meeting: Partial<SacramentMeeting>) {
  await sql`
    UPDATE meetings SET
      date = ${meeting.date},
      meeting_type = ${meeting.meetingType},
      presiding = ${meeting.presiding},
      conducting = ${meeting.conducting},
      announcements = ${meeting.announcements || null},
      opening_hymn = ${meeting.openingHymn || null},
      opening_prayer = ${meeting.openingPrayer || null},
      ward_business = ${meeting.wardBusiness || null},
      stake_business = ${meeting.stakeBusiness || null},
      sacrament_hymn = ${meeting.sacramentHymn || null},
      speakers = ${JSON.stringify(meeting.speakers || [])}::jsonb,
      closing_hymn = ${meeting.closingHymn || null},
      closing_prayer = ${meeting.closingPrayer || null}
    WHERE id = ${id}
  `;
}

export async function deleteMeetingDb(id: number) {
  await sql`DELETE FROM meetings WHERE id = ${id}`;
}