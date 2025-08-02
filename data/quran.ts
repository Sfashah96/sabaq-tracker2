// src/data/quran.ts

export interface Surah {
  id: number;
  name: string;
  arabicName: string;
  revelationType: 'Meccan' | 'Medinan';
  totalAyahs: number;
}

export const surahs: Surah[] = [
  {id: 1, name: 'Al-Fatihah', arabicName: 'الفاتحة', totalAyahs: 7, revelationType: 'Meccan'},
  {id: 2, name: 'Al-Baqarah', arabicName: 'البقرة', totalAyahs: 286, revelationType: 'Medinan'},
  {id: 3, name: 'Aal-E-Imran', arabicName: 'آل عمران', totalAyahs: 200, revelationType: 'Medinan'},
  {id: 4, name: 'An-Nisa', arabicName: 'النساء', totalAyahs: 176, revelationType: 'Medinan'},
  {id: 5, name: "Al-Ma'idah", arabicName: 'المائدة', totalAyahs: 120, revelationType: 'Medinan'},
  {id: 6, name: "Al-An'am", arabicName: 'الأنعام', totalAyahs: 165, revelationType: 'Meccan'},
  {id: 7, name: "Al-A'raf", arabicName: 'الأعراف', totalAyahs: 206, revelationType: 'Meccan'},
  {id: 8, name: 'Al-Anfal', arabicName: 'الأنفال', totalAyahs: 75, revelationType: 'Medinan'},
  {id: 9, name: 'At-Tawbah', arabicName: 'التوبة', totalAyahs: 129, revelationType: 'Medinan'},
  {id: 10, name: 'Yunus', arabicName: 'يونس', totalAyahs: 109, revelationType: 'Meccan'},
  {id: 11, name: 'Hud', arabicName: 'هود', totalAyahs: 123, revelationType: 'Meccan'},
  {id: 12, name: 'Yusuf', arabicName: 'يوسف', totalAyahs: 111, revelationType: 'Meccan'},
  {id: 13, name: "Ar-Ra'd", arabicName: 'الرعد', totalAyahs: 43, revelationType: 'Medinan'},
  {id: 14, name: 'Ibrahim', arabicName: 'إبراهيم', totalAyahs: 52, revelationType: 'Meccan'},
  {id: 15, name: 'Al-Hijr', arabicName: 'الحجر', totalAyahs: 99, revelationType: 'Meccan'},
  {id: 16, name: 'An-Nahl', arabicName: 'النحل', totalAyahs: 128, revelationType: 'Meccan'},
  {id: 17, name: 'Al-Isra', arabicName: 'الإسراء', totalAyahs: 111, revelationType: 'Meccan'},
  {id: 18, name: 'Al-Kahf', arabicName: 'الكهف', totalAyahs: 110, revelationType: 'Meccan'},
  {id: 19, name: 'Maryam', arabicName: 'مريم', totalAyahs: 98, revelationType: 'Meccan'},
  {id: 20, name: 'Ta-Ha', arabicName: 'طه', totalAyahs: 135, revelationType: 'Meccan'},
  {id: 21, name: 'Al-Anbiya', arabicName: 'الأنبياء', totalAyahs: 112, revelationType: 'Meccan'},
  {id: 22, name: 'Al-Hajj', arabicName: 'الحج', totalAyahs: 78, revelationType: 'Medinan'},
  {id: 23, name: "Al-Mu'minun", arabicName: 'المؤمنون', totalAyahs: 118, revelationType: 'Meccan'},
  {id: 24, name: 'An-Nur', arabicName: 'النور', totalAyahs: 64, revelationType: 'Medinan'},
  {id: 25, name: 'Al-Furqan', arabicName: 'الفرقان', totalAyahs: 77, revelationType: 'Meccan'},
  {id: 26, name: "Ash-Shu'ara", arabicName: 'الشعراء', totalAyahs: 227, revelationType: 'Meccan'},
  {id: 27, name: 'An-Naml', arabicName: 'النمل', totalAyahs: 93, revelationType: 'Meccan'},
  {id: 28, name: 'Al-Qasas', arabicName: 'القصص', totalAyahs: 88, revelationType: 'Meccan'},
  {id: 29, name: 'Al-Ankabut', arabicName: 'العنكبوت', totalAyahs: 69, revelationType: 'Meccan'},
  {id: 30, name: 'Ar-Rum', arabicName: 'الروم', totalAyahs: 60, revelationType: 'Meccan'},
  {id: 31, name: 'Luqman', arabicName: 'لقمان', totalAyahs: 34, revelationType: 'Meccan'},
  {id: 32, name: 'As-Sajda', arabicName: 'السجدة', totalAyahs: 30, revelationType: 'Meccan'},
  {id: 33, name: 'Al-Ahzab', arabicName: 'الأحزاب', totalAyahs: 73, revelationType: 'Medinan'},
  {id: 34, name: 'Saba', arabicName: 'سبأ', totalAyahs: 54, revelationType: 'Meccan'},
  {id: 35, name: 'Fatir', arabicName: 'فاطر', totalAyahs: 45, revelationType: 'Meccan'},
  {id: 36, name: 'Ya-Sin', arabicName: 'يس', totalAyahs: 83, revelationType: 'Meccan'},
  {id: 37, name: 'As-Saffat', arabicName: 'الصافات', totalAyahs: 182, revelationType: 'Meccan'},
  {id: 38, name: 'Sad', arabicName: 'ص', totalAyahs: 88, revelationType: 'Meccan'},
  {id: 39, name: 'Az-Zumar', arabicName: 'الزمر', totalAyahs: 75, revelationType: 'Meccan'},
  {id: 40, name: 'Ghafir', arabicName: 'غافر', totalAyahs: 85, revelationType: 'Medinan'},
  {id: 41, name: 'Fussilat', arabicName: 'فصلت', totalAyahs: 54, revelationType: 'Meccan'},
  {id: 42, name: 'Ash-Shura', arabicName: 'الشورى', totalAyahs: 53, revelationType: 'Meccan'},
  {id: 43, name: 'Az-Zukhruf', arabicName: 'الزخرف', totalAyahs: 89, revelationType: 'Meccan'},
  {id: 44, name: 'Ad-Dukhan', arabicName: 'الدخان', totalAyahs: 59, revelationType: 'Meccan'},
  {id: 45, name: 'Al-Jathiya', arabicName: 'الجاثية', totalAyahs: 37, revelationType: 'Meccan'},
  {id: 46, name: 'Al-Ahqaf', arabicName: 'الأحقاف', totalAyahs: 35, revelationType: 'Meccan'},
  {id: 47, name: 'Muhammad', arabicName: 'محمد', totalAyahs: 38, revelationType: 'Medinan'},
  {id: 48, name: 'Al-Fath', arabicName: 'الفتح', totalAyahs: 29, revelationType: 'Medinan'},
  {id: 49, name: 'Al-Hujurat', arabicName: 'الحجرات', totalAyahs: 18, revelationType: 'Medinan'},
  {id: 50, name: 'Qaf', arabicName: 'ق', totalAyahs: 45, revelationType: 'Meccan'},
  {id: 51, name: 'Adh-Dhariyat', arabicName: 'الذاريات', totalAyahs: 60, revelationType: 'Meccan'},
  {id: 52, name: 'At-Tur', arabicName: 'الطور', totalAyahs: 49, revelationType: 'Meccan'},
  {id: 53, name: 'An-Najm', arabicName: 'النجم', totalAyahs: 62, revelationType: 'Meccan'},
  {id: 54, name: 'Al-Qamar', arabicName: 'القمر', totalAyahs: 55, revelationType: 'Meccan'},
  {id: 55, name: 'Ar-Rahman', arabicName: 'الرحمن', totalAyahs: 78, revelationType: 'Medinan'},
  {id: 56, name: 'Al-Waqia', arabicName: 'الواقعة', totalAyahs: 96, revelationType: 'Meccan'},
  {id: 57, name: 'Al-Hadid', arabicName: 'الحديد', totalAyahs: 29, revelationType: 'Medinan'},
  {id: 58, name: 'Al-Mujadila', arabicName: 'المجادلة', totalAyahs: 22, revelationType: 'Medinan'},
  {id: 59, name: 'Al-Hashr', arabicName: 'الحشر', totalAyahs: 24, revelationType: 'Medinan'},
  {id: 60, name: 'Al-Mumtahana', arabicName: 'الممتحنة', totalAyahs: 13, revelationType: 'Medinan'},
  {id: 61, name: 'As-Saff', arabicName: 'الصّفّ', totalAyahs: 14, revelationType: 'Medinan'},
  {id: 62, name: "Al-Jumu'a", arabicName: 'الجمعة', totalAyahs: 11, revelationType: 'Medinan'},
  {id: 63, name: 'Al-Munafiqun', arabicName: 'المنافقون', totalAyahs: 11, revelationType: 'Medinan'},
  {id: 64, name: 'At-Taghabun', arabicName: 'التغابن', totalAyahs: 18, revelationType: 'Medinan'},
  {id: 65, name: 'At-Talaq', arabicName: 'الطلاق', totalAyahs: 12, revelationType: 'Medinan'},
  {id: 66, name: 'At-Tahrim', arabicName: 'التحريم', totalAyahs: 12, revelationType: 'Medinan'},
  {id: 67, name: 'Al-Mulk', arabicName: 'الملك', totalAyahs: 30, revelationType: 'Meccan'},
  {id: 68, name: 'Al-Qalam', arabicName: 'القلم', totalAyahs: 52, revelationType: 'Meccan'},
  {id: 69, name: 'Al-Haaqqa', arabicName: 'الحاقة', totalAyahs: 52, revelationType: 'Meccan'},
  {id: 70, name: "Al-Ma'arij", arabicName: 'المعارج', totalAyahs: 44, revelationType: 'Meccan'},
  {id: 71, name: 'Nuh', arabicName: 'نوح', totalAyahs: 28, revelationType: 'Meccan'},
  {id: 72, name: 'Al-Jinn', arabicName: 'الجن', totalAyahs: 28, revelationType: 'Meccan'},
  {id: 73, name: 'Al-Muzzammil', arabicName: 'المزمل', totalAyahs: 20, revelationType: 'Meccan'},
  {id: 74, name: 'Al-Muddaththir', arabicName: 'المدثر', totalAyahs: 56, revelationType: 'Meccan'},
  {id: 75, name: 'Al-Qiyama', arabicName: 'القيامة', totalAyahs: 40, revelationType: 'Meccan'},
  {id: 76, name: 'Al-Insan', arabicName: 'الإنسان', totalAyahs: 31, revelationType: 'Medinan'},
  {id: 77, name: 'Al-Mursalat', arabicName: 'المرسلات', totalAyahs: 50, revelationType: 'Meccan'},
  {id: 78, name: 'An-Naba', arabicName: 'النبأ', totalAyahs: 40, revelationType: 'Meccan'},
  {id: 79, name: "An-Nazi'at", arabicName: 'النازعات', totalAyahs: 46, revelationType: 'Meccan'},
  {id: 80, name: 'Abasa', arabicName: 'عبس', totalAyahs: 42, revelationType: 'Meccan'},
  {id: 81, name: 'At-Takwir', arabicName: 'التكوير', totalAyahs: 29, revelationType: 'Meccan'},
  {id: 82, name: 'Al-Infitar', arabicName: 'الإنفطار', totalAyahs: 19, revelationType: 'Meccan'},
  {id: 83, name: 'Al-Mutaffifin', arabicName: 'المطففين', totalAyahs: 36, revelationType: 'Meccan'},
  {id: 84, name: 'Al-Inshiqaq', arabicName: 'الإنشقاق', totalAyahs: 25, revelationType: 'Meccan'},
  {id: 85, name: 'Al-Buruj', arabicName: 'البروج', totalAyahs: 22, revelationType: 'Meccan'},
  {id: 86, name: 'At-Tariq', arabicName: 'الطارق', totalAyahs: 17, revelationType: 'Meccan'},
  {id: 87, name: "Al-A'la", arabicName: 'الأعلى', totalAyahs: 19, revelationType: 'Meccan'},
  {id: 88, name: 'Al-Ghashiya', arabicName: 'الغاشية', totalAyahs: 26, revelationType: 'Meccan'},
  {id: 89, name: 'Al-Fajr', arabicName: 'الفجر', totalAyahs: 30, revelationType: 'Meccan'},
  {id: 90, name: 'Al-Balad', arabicName: 'البلد', totalAyahs: 20, revelationType: 'Meccan'},
  {id: 91, name: 'Ash-Shams', arabicName: 'الشمس', totalAyahs: 15, revelationType: 'Meccan'},
  {id: 92, name: 'Al-Layl', arabicName: 'الليل', totalAyahs: 21, revelationType: 'Meccan'},
  {id: 93, name: 'Ad-Duha', arabicName: 'الضحى', totalAyahs: 11, revelationType: 'Meccan'},
  {id: 94, name: 'Al-Inshirah', arabicName: 'الإنشراح', totalAyahs: 8, revelationType: 'Meccan'},
  {id: 95, name: 'At-Tin', arabicName: 'التين', totalAyahs: 8, revelationType: 'Meccan'},
  {id: 96, name: 'Al-Alaq', arabicName: 'العلق', totalAyahs: 19, revelationType: 'Meccan'},
  {id: 97, name: 'Al-Qadr', arabicName: 'القدر', totalAyahs: 5, revelationType: 'Meccan'},
  {id: 98, name: 'Al-Bayyina', arabicName: 'البينة', totalAyahs: 8, revelationType: 'Medinan'},
  {id: 99, name: 'Az-Zalzala', arabicName: 'الزلزلة', totalAyahs: 8, revelationType: 'Meccan'},
  {id: 100, name: 'Al-Adiyat', arabicName: 'العاديات', totalAyahs: 11, revelationType: 'Meccan'},
  {id: 101, name: "Al-Qari'a", arabicName: 'القارعة', totalAyahs: 11, revelationType: 'Meccan'},
  {id: 102, name: 'At-Takathur', arabicName: 'التكاثر', totalAyahs: 8, revelationType: 'Meccan'},
  {id: 103, name: 'Al-Asr', arabicName: 'العصر', totalAyahs: 3, revelationType: 'Meccan'},
  {id: 104, name: 'Al-Humaza', arabicName: 'الهمزة', totalAyahs: 9, revelationType: 'Meccan'},
  {id: 105, name: 'Al-Fil', arabicName: 'الفيل', totalAyahs: 5, revelationType: 'Meccan'},
  {id: 106, name: 'Quraysh', arabicName: 'قريش', totalAyahs: 4, revelationType: 'Meccan'},
  {id: 107, name: "Al-Ma'un", arabicName: 'الماعون', totalAyahs: 7, revelationType: 'Meccan'},
  {id: 108, name: 'Al-Kawthar', arabicName: 'الكوثر', totalAyahs: 3, revelationType: 'Meccan'},
  {id: 109, name: 'Al-Kafirun', arabicName: 'الكافرون', totalAyahs: 6, revelationType: 'Meccan'},
  {id: 110, name: 'An-Nasr', arabicName: 'النصر', totalAyahs: 3, revelationType: 'Medinan'},
  {id: 111, name: 'Al-Masad', arabicName: 'المسد', totalAyahs: 5, revelationType: 'Meccan'},
  {id: 112, name: 'Al-Ikhlas', arabicName: 'الإخلاص', totalAyahs: 4, revelationType: 'Meccan'},
  {id: 113, name: 'Al-Falaq', arabicName: 'الفلق', totalAyahs: 5, revelationType: 'Meccan'},
  {id: 114, name: 'An-Nas', arabicName: 'الناس', totalAyahs: 6, revelationType: 'Meccan'}
];

export interface Juz {
  id: number;
  name: string;
}

// A simple array for Juz selection
export const juz: Juz[] = Array.from({length: 30}, (_, i) => ({
  id: i + 1,
  name: `Juz ${i + 1}`
}));

// Helper function to find a surah by its ID
export const getSurahById = (id: number): Surah | undefined => {
  return surahs.find(s => s.id === id);
};

// Optional: Export total number of ayahs in the Quran
export const getTotalAyahs = (): number => {
  return surahs.reduce((sum, surah) => sum + surah.totalAyahs, 0);
};

// Optional: Get Surah by name (case-insensitive)
export const getSurahByName = (name: string): Surah | undefined => {
  return surahs.find(s => s.name.toLowerCase() === name.trim().toLowerCase() || s.arabicName === name.trim());
};
