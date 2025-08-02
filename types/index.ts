// src/types/index.ts
export interface Student {
  id: number;
  name: string;
  created_at: string;
}

// For displaying records with student names

export interface DailyRecord {
  id?: number;
  student_id: number;
  student_name?: string; // Optional for display purposes
  date: string;

  // Sabaq
  sabaq_surah_id: number | null;
  sabaq_from_ayah: number | null;
  sabaq_to_ayah: number | null;

  // Sabqi
  sabqi_surah_id: number | null;
  sabqi_from_ayah: number | null;
  sabqi_to_ayah: number | null;

  // Manzil
  manzil_juz_id: number | null;

  // Prayer attendance (stored as INTEGER in DB)
  zuhr: boolean;
  maghrib: boolean;
}

export interface DailyRecordWithStudentName extends DailyRecord {
  student_name: string;
  sabaq: string | null; // Surah name or identifier
  sabqi: string | null; // Surah name
  manzil: string | null; // Juz identifier
}
