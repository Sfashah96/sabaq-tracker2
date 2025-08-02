// src/db/index.ts
import {getSurahById} from '@/data/quran'; // Optional: for validation
import {DailyRecord, Student} from '@/types';
import * as SQLite from 'expo-sqlite/next';

const db = SQLite.openDatabaseSync('sabaq_student.db');

// --- Initialization ---
export async function initializeDatabase() {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;

      -- Students table
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now'))
      );

      -- Daily records with structured Quran references
      CREATE TABLE IF NOT EXISTS daily_records (
        id INTEGER PRIMARY KEY NOT NULL,
        student_id INTEGER NOT NULL,
        date TEXT NOT NULL,

        -- Sabaq (new lesson)
        sabaq_surah_id INTEGER,
        sabaq_from_ayah INTEGER,
        sabaq_to_ayah INTEGER,

        -- Sabqi (previous lesson)
        sabqi_surah_id INTEGER,
        sabqi_from_ayah INTEGER,
        sabqi_to_ayah INTEGER,

        -- Manzil (portion)
        manzil_juz_id INTEGER,

        -- Prayer attendance
        zuhr INTEGER DEFAULT 0,
        maghrib INTEGER DEFAULT 0,

        -- Constraints
        FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE,
        UNIQUE(student_id, date)
      );
    `);

    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

// --- Student Functions ---
export async function getStudents(): Promise<Student[]> {
  return await db.getAllAsync<Student>('SELECT * FROM students ORDER BY name ASC;');
}

export async function getStudentById(id: number): Promise<Student | null> {
  return await db.getFirstAsync<Student>('SELECT * FROM students WHERE id = ?;', id);
}

export async function addStudent(name: string): Promise<SQLite.SQLiteRunResult> {
  return await db.runAsync('INSERT INTO students (name) VALUES (?);', name);
}

export async function deleteStudent(id: number): Promise<SQLite.SQLiteRunResult> {
  return await db.runAsync('DELETE FROM students WHERE id = ?;', id);
}

// --- Daily Record Functions ---
export async function getRecordsForStudent(studentId: number): Promise<DailyRecord[]> {
  return await db.getAllAsync<DailyRecord>(`SELECT * FROM daily_records WHERE student_id = ? ORDER BY date DESC;`, studentId);
}

export async function getAllRecordsWithStudentNames(): Promise<(DailyRecord & {student_name: string})[]> {
  const query = `
    SELECT dr.*, s.name as student_name
    FROM daily_records dr
    JOIN students s ON dr.student_id = s.id
    ORDER BY dr.date DESC, s.name ASC;
  `;
  return await db.getAllAsync(query);
}

export async function getRecordForDate(studentId: number, date: string): Promise<DailyRecord | null> {
  return await db.getFirstAsync<DailyRecord>(`SELECT * FROM daily_records WHERE student_id = ? AND date = ?;`, [studentId, date]);
}

export async function addOrUpdateDailyRecord(record: Omit<DailyRecord, 'id'>): Promise<SQLite.SQLiteRunResult> {
  const {student_id, date, sabaq_surah_id, sabaq_from_ayah, sabaq_to_ayah, sabqi_surah_id, sabqi_from_ayah, sabqi_to_ayah, manzil_juz_id, zuhr, maghrib} = record;

  const zuhrInt = zuhr ? 1 : 0;
  const maghribInt = maghrib ? 1 : 0;

  const query = `
    INSERT INTO daily_records (
      student_id, date,
      sabaq_surah_id, sabaq_from_ayah, sabaq_to_ayah,
      sabqi_surah_id, sabqi_from_ayah, sabqi_to_ayah,
      manzil_juz_id,
      zuhr, maghrib
    )
    -- FIX: Removed one extra '?' from the VALUES clause. Now 11 placeholders match 11 columns.
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
    ON CONFLICT(student_id, date) DO UPDATE SET
      sabaq_surah_id = excluded.sabaq_surah_id,
      sabaq_from_ayah = excluded.sabaq_from_ayah,
      sabaq_to_ayah = excluded.sabaq_to_ayah,
      sabqi_surah_id = excluded.sabqi_surah_id,
      sabqi_from_ayah = excluded.sabqi_from_ayah,
      sabqi_to_ayah = excluded.sabqi_to_ayah,
      manzil_juz_id = excluded.manzil_juz_id,
      zuhr = excluded.zuhr,
      maghrib = excluded.maghrib;
  `;

  // Your parameters are already correct (11 of them). No change needed here.
  // The use of '?? null' is excellent practice to avoid sending 'undefined' to the DB.
  return await db.runAsync(query, [student_id, date, sabaq_surah_id ?? null, sabaq_from_ayah ?? null, sabaq_to_ayah ?? null, sabqi_surah_id ?? null, sabqi_from_ayah ?? null, sabqi_to_ayah ?? null, manzil_juz_id ?? null, zuhrInt, maghribInt]);
}

// export async function addOrUpdateDailyRecord(record: Omit<DailyRecord, 'id'>): Promise<SQLite.SQLiteRunResult> {
//   const {student_id, date, sabaq_surah_id, sabaq_from_ayah, sabaq_to_ayah, sabqi_surah_id, sabqi_from_ayah, sabqi_to_ayah, manzil_juz_id, zuhr, maghrib} = record;

//   const zuhrInt = zuhr ? 1 : 0;
//   const maghribInt = maghrib ? 1 : 0;

//   const query = `
//     INSERT INTO daily_records (
//       student_id, date,
//       sabaq_surah_id, sabaq_from_ayah, sabaq_to_ayah,
//       sabqi_surah_id, sabqi_from_ayah, sabqi_to_ayah,
//       manzil_juz_id,
//       zuhr, maghrib
//     )
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     ON CONFLICT(student_id, date) DO UPDATE SET
//       sabaq_surah_id = excluded.sabaq_surah_id,
//       sabaq_from_ayah = excluded.sabaq_from_ayah,
//       sabaq_to_ayah = excluded.sabaq_to_ayah,
//       sabqi_surah_id = excluded.sabqi_surah_id,
//       sabqi_from_ayah = excluded.sabqi_from_ayah,
//       sabqi_to_ayah = excluded.sabqi_to_ayah,
//       manzil_juz_id = excluded.manzil_juz_id,
//       zuhr = excluded.zuhr,
//       maghrib = excluded.maghrib;
//   `;

//   return await db.runAsync(query, [student_id, date, sabaq_surah_id ?? null, sabaq_from_ayah ?? null, sabaq_to_ayah ?? null, sabqi_surah_id ?? null, sabqi_from_ayah ?? null, sabqi_to_ayah ?? null, manzil_juz_id ?? null, zuhrInt, maghribInt]);
// }

// Optional: Delete a daily record by ID or student+date
export async function deleteDailyRecord(studentId: number, date: string): Promise<SQLite.SQLiteRunResult> {
  return await db.runAsync('DELETE FROM daily_records WHERE student_id = ? AND date = ?;', [studentId, date]);
}

// Optional: Utility to validate Surah ID before insertion
export async function isValidSurahId(id: number | null | undefined): Promise<boolean> {
  if (id == null || !Number.isInteger(id) || id < 1 || id > 114) return false;
  const surah = getSurahById(id);
  return !!surah;
}

// Optional: Validate Juz ID
export function isValidJuzId(id: number | null | undefined): boolean {
  return id != null && Number.isInteger(id) && id >= 1 && id <= 30;
}

// Optional: Get readable summary of a record (for display)
export async function getRecordSummary(record: DailyRecord): Promise<string> {
  const parts: string[] = [];

  if (record.sabaq_surah_id) {
    const from = record.sabaq_from_ayah ?? '?';
    const to = record.sabaq_to_ayah ?? '?';
    const surah = getSurahById(record.sabaq_surah_id)?.name || 'Unknown';
    parts.push(`Sabaq: ${surah} ${from}-${to}`);
  }

  if (record.sabqi_surah_id) {
    const from = record.sabqi_from_ayah ?? '?';
    const to = record.sabqi_to_ayah ?? '?';
    const surah = getSurahById(record.sabqi_surah_id)?.name || 'Unknown';
    parts.push(`Sabqi: ${surah} ${from}-${to}`);
  }

  if (record.manzil_juz_id) {
    parts.push(`Manzil: Juz ${record.manzil_juz_id}`);
  }

  return parts.length > 0 ? parts.join(', ') : 'No lesson';
}
