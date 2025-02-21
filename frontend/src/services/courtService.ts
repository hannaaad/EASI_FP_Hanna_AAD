import openDb from './database';

interface Court {
  name: string;
  section_name: string;
  section_type: 'indoor' | 'outdoor';
  open_time: string;
  close_time: string;
}

class CourtService {
  async createCourt(court: Court) {
    const db = await openDb();
    const result = await db.run(
      `INSERT INTO courts (name, section_name, section_type, open_time, close_time) 
       VALUES (?, ?, ?, ?, ?)`,
      [court.name, court.section_name, court.section_type, court.open_time, court.close_time]
    );
    return result;
  }

  async getCourtById(courtId: number) {
    const db = await openDb();
    const court = await db.get('SELECT * FROM courts WHERE court_id = ?', [courtId]);
    return court;
  }

  async updateCourt(courtId: number, court: Partial<Court>) {
    const db = await openDb();
    const result = await db.run(
      `UPDATE courts SET 
       name = ?, section_name = ?, section_type = ?, open_time = ?, close_time = ?
       WHERE court_id = ?`,
      [court.name, court.section_name, court.section_type, court.open_time, court.close_time, courtId]
    );
    return result;
  }

  async deleteCourt(courtId: number) {
    const db = await openDb();
    const result = await db.run('DELETE FROM courts WHERE court_id = ?', [courtId]);
    return result;
  }
}

export default new CourtService();