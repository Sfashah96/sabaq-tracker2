import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns';
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';

// --- INTERFACES ---
export interface ProgressRecord {
  date: string; // 'yyyy-MM-dd'
  zuhr: boolean;
  maghrib: boolean;
}

export interface Student {
  id: string;
  name: string;
  sabaq: string;
  sabqi: string;
  manzil: string;
  progress: ProgressRecord[];
}

interface StudentContextType {
  students: Student[];
  isLoading: boolean;
  addStudent: (student: Omit<Student, 'id' | 'progress'>) => Promise<void>;
  updateStudent: (id: string, student: Partial<Omit<Student, 'id'>>) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  updateStudentProgress: (studentId: string, prayer: 'zuhr' | 'maghrib') => Promise<void>;
}

// --- CONTEXT & HOOK ---
const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const useStudentData = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudentData must be used within a StudentProvider');
  }
  return context;
};

// --- PROVIDER ---
const STORAGE_KEY = '@students';

export const StudentProvider: React.FC<{children: ReactNode}> = ({children}) => {
  // All hooks and functions MUST be inside this main component body.
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const storedStudents = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedStudents) {
          setStudents(JSON.parse(storedStudents));
        } else {
          console.log('No students found, seeding with initial data...');
          const initialStudents = getInitialSeedData();
          await saveStudents(initialStudents);
        }
      } catch (error) {
        console.error('Error loading students from storage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadStudents();
  }, []);

  const saveStudents = async (updatedStudents: Student[]) => {
    try {
      setStudents(updatedStudents);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStudents));
    } catch (error) {
      console.error('Error saving students to storage:', error);
    }
  };

  const addStudent = async (studentData: Omit<Student, 'id' | 'progress'>) => {
    const newStudent: Student = {...studentData, id: crypto.randomUUID(), progress: []};
    await saveStudents([...students, newStudent]);
  };

  const updateStudent = async (id: string, updatedData: Partial<Omit<Student, 'id'>>) => {
    const updatedStudents = students.map((s: Student) => (s.id === id ? {...s, ...updatedData} : s));
    await saveStudents(updatedStudents);
  };

  const deleteStudent = async (id: string) => {
    const updatedStudents = students.filter((s: Student) => s.id !== id);
    await saveStudents(updatedStudents);
  };

  const updateStudentProgress = async (studentId: string, prayer: 'zuhr' | 'maghrib') => {
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const updatedStudents = students.map((student: Student) => {
      if (student.id !== studentId) return student;

      const todayRecord = student.progress.find(p => p.date === todayStr);
      let updatedProgress: ProgressRecord[];

      if (todayRecord) {
        const updatedRecord = {...todayRecord, [prayer]: !todayRecord[prayer]};
        updatedProgress = student.progress.map((p: ProgressRecord) => (p.date === todayStr ? updatedRecord : p));
      } else {
        const newRecord: ProgressRecord = {date: todayStr, zuhr: false, maghrib: false, [prayer]: true};
        updatedProgress = [...student.progress, newRecord];
      }
      return {...student, progress: updatedProgress};
    });
    await saveStudents(updatedStudents);
  };

  // --- THE FIX ---
  // The return statement MUST be the last statement inside the component function.
  return (
    <StudentContext.Provider
      value={{
        students,
        isLoading,
        addStudent,
        updateStudent,
        deleteStudent,
        updateStudentProgress
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}; // <-- This is the correct closing brace for the StudentProvider component.

// --- HELPER FUNCTION (Outside the component) ---
function getInitialSeedData(): Student[] {
  return [
    {id: crypto.randomUUID(), name: 'Abdullah Khan', sabaq: 'Surah Al-Mulk (1-10)', sabqi: 'Juz 28', manzil: 'Juz 1', progress: []},
    {id: crypto.randomUUID(), name: 'Fatima Ahmed', sabaq: 'Surah Yasin (20-30)', sabqi: 'Juz 22', manzil: 'Juz 2', progress: []},
    {id: crypto.randomUUID(), name: 'Yusuf Ali', sabaq: 'Surah Ar-Rahman (1-15)', sabqi: 'Juz 27', manzil: 'Juz 3', progress: []}
  ];
}
