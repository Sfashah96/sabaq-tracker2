// src/context/DatabaseProvider.tsx
import * as db from '@/db';
import {Student} from '@/types';
import React, {createContext, ReactNode, useCallback, useEffect, useState} from 'react';

interface DatabaseContextType {
  students: Student[];
  isLoading: boolean;
  refreshStudents: () => Promise<void>;
  addStudent: (name: string) => Promise<void>;
  deleteStudent: (id: number) => Promise<void>;
}

export const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider = ({children}: {children: ReactNode}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshStudents = useCallback(async () => {
    try {
      const fetchedStudents = await db.getStudents();
      setStudents(fetchedStudents);
    } catch (e) {
      console.error('Failed to refresh students:', e);
    }
  }, []);

  useEffect(() => {
    async function setup() {
      setIsLoading(true);
      try {
        await db.initializeDatabase();
        await refreshStudents();
      } catch (e) {
        console.error('Database setup failed:', e);
      } finally {
        setIsLoading(false);
      }
    }
    setup();
  }, [refreshStudents]);

  const addStudent = async (name: string) => {
    await db.addStudent(name);
    await refreshStudents(); // Refresh the list after adding
  };

  const deleteStudent = async (id: number) => {
    await db.deleteStudent(id);
    await refreshStudents(); // Refresh the list after deleting
  };

  return <DatabaseContext.Provider value={{students, isLoading, refreshStudents, addStudent, deleteStudent}}>{children}</DatabaseContext.Provider>;
};
