import React, { createContext, useContext, useState } from 'react';
import { sampleStudents } from '../data/sampleData';

export interface Student {
  id: string;
  name: string;
  class: number;
  section: string;
  rollNumber: string;
  dateOfBirth: string;
  bloodGroup: string;
  house: string;
  address: string;
  identificationMark: string;
  hobbies: string[];
  achievements: string[];
  photo: string;
  parentDetails: {
    father: {
      name: string;
      occupation: string;
      contact: string;
      email: string;
      photo: string;
    };
    mother: {
      name: string;
      occupation: string;
      contact: string;
      email: string;
      photo: string;
    };
    emergencyContact: string;
  };
  academicRecords: {
    semester: string;
    subjects: Array<{
      name: string;
      marks: number;
      grade: string;
    }>;
    percentage: number;
    grade: string;
  }[];
}

interface StudentContextType {
  students: Student[];
  updateStudent: (id: string, updates: Partial<Student>) => void;
  addStudent: (student: Student) => void;
  deleteStudent: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  classFilter: string;
  setClassFilter: (classNum: string) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(() => {
    // Load from localStorage if available, otherwise use sample data
    const saved = localStorage.getItem('shiwalik_students');
    return saved ? JSON.parse(saved) : sampleStudents;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('');

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev => {
      const updatedStudents = prev.map(student => 
        student.id === id ? { ...student, ...updates } : student
      );
      // Save to localStorage for persistence
      localStorage.setItem('shiwalik_students', JSON.stringify(updatedStudents));
      return updatedStudents;
    });
  };

  const addStudent = (student: Student) => {
    setStudents(prev => {
      const updatedStudents = [...prev, student];
      // Save to localStorage for persistence
      localStorage.setItem('shiwalik_students', JSON.stringify(updatedStudents));
      return updatedStudents;
    });
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => {
      const updatedStudents = prev.filter(student => student.id !== id);
      // Save to localStorage for persistence
      localStorage.setItem('shiwalik_students', JSON.stringify(updatedStudents));
      return updatedStudents;
    });
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        updateStudent,
        addStudent,
        deleteStudent,
        searchQuery,
        setSearchQuery,
        classFilter,
        setClassFilter,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
};