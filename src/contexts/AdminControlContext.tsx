import React, { createContext, useContext, useState, useEffect } from 'react';
import { useData } from './DataContext';

interface AdminControlContextType {
  sectionVisibility: {
    students: boolean;
    academic: boolean;
    movement: boolean;
    about: boolean;
    teachers: boolean;
    houses: boolean;
    gallery: boolean;
  };
  toggleSection: (section: string) => void;
  exportStudentData: () => void;
  backupSystemData: () => void;
}

const AdminControlContext = createContext<AdminControlContextType | undefined>(undefined);

export const AdminControlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { saveData, loadData } = useData();
  
  const [sectionVisibility, setSectionVisibility] = useState(() => loadData('sectionVisibility', {
    students: true,
    academic: true,
    movement: true,
    about: true,
    teachers: true,
    houses: true,
    gallery: true,
  }));

  useEffect(() => {
    saveData('sectionVisibility', sectionVisibility);
  }, [sectionVisibility, saveData]);

  const toggleSection = (section: string) => {
    setSectionVisibility(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const exportStudentData = () => {
    try {
      const students = loadData('students', []);
      
      // Create CSV content
      const headers = [
        'Name', 'Class', 'Section', 'Roll Number', 'Date of Birth', 'Blood Group', 
        'House', 'Address', 'Father Name', 'Father Contact', 'Father Email',
        'Mother Name', 'Mother Contact', 'Mother Email', 'Emergency Contact',
        'Hobbies', 'Achievements', 'Latest Percentage', 'Latest Grade'
      ];
      
      const csvContent = [
        headers.join(','),
        ...students.map((student: any) => [
          `"${student.name}"`,
          student.class,
          student.section,
          student.rollNumber,
          student.dateOfBirth,
          student.bloodGroup,
          student.house,
          `"${student.address}"`,
          `"${student.parentDetails.father.name}"`,
          student.parentDetails.father.contact,
          student.parentDetails.father.email,
          `"${student.parentDetails.mother.name}"`,
          student.parentDetails.mother.contact,
          student.parentDetails.mother.email,
          student.parentDetails.emergencyContact,
          `"${student.hobbies.join('; ')}"`,
          `"${student.achievements.join('; ')}"`,
          student.academicRecords[0]?.percentage || 'N/A',
          student.academicRecords[0]?.grade || 'N/A'
        ].join(','))
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `student_data_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting student data:', error);
      alert('Error exporting student data. Please try again.');
    }
  };

  const backupSystemData = () => {
    try {
      // Get all localStorage data
      const allData: Record<string, any> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('shiwalik_')) {
          allData[key] = JSON.parse(localStorage.getItem(key) || '{}');
        }
      }

      // Create backup object with metadata
      const backup = {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        data: allData,
        metadata: {
          totalStudents: allData['shiwalik_students']?.length || 0,
          lastModified: new Date().toISOString(),
          sections: Object.keys(allData).length
        }
      };

      // Create and download backup file
      const backupContent = JSON.stringify(backup, null, 2);
      const blob = new Blob([backupContent], { type: 'application/json;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `shiwalik_backup_${new Date().toISOString().split('T')[0]}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error creating backup:', error);
      alert('Error creating backup. Please try again.');
    }
  };

  return (
    <AdminControlContext.Provider
      value={{
        sectionVisibility,
        toggleSection,
        exportStudentData,
        backupSystemData,
      }}
    >
      {children}
    </AdminControlContext.Provider>
  );
};

export const useAdminControl = () => {
  const context = useContext(AdminControlContext);
  if (context === undefined) {
    throw new Error('useAdminControl must be used within an AdminControlProvider');
  }
  return context;
};