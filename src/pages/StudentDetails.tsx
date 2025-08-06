import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, Upload, Download, UserPlus } from 'lucide-react';
import { useStudents } from '../contexts/StudentContext';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import StudentCard from '../components/student/StudentCard';
import AddStudentModal from '../components/student/AddStudentModal';
import Footer from '../components/ui/Footer';
import * as XLSX from 'xlsx';

const StudentDetails: React.FC = () => {
  const { students, searchQuery, setSearchQuery, classFilter, setClassFilter, addStudent } = useStudents();
  const { isAuthenticated, isEditorMode } = useAuth();
  const { addNotification } = useNotifications();
  const [sortBy, setSortBy] = useState<'name' | 'class' | 'performance'>('name');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const classes = Array.from(new Set(students.map(s => s.class))).sort((a, b) => a - b);

  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           student.rollNumber.includes(searchQuery) ||
                           student.parentDetails.father.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           student.parentDetails.mother.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesClass = classFilter === '' || student.class.toString() === classFilter;
      
      return matchesSearch && matchesClass;
    });

    // Sort students
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'class':
          return a.class - b.class || a.name.localeCompare(b.name);
        case 'performance':
          const aPerf = a.academicRecords[0]?.percentage || 0;
          const bPerf = b.academicRecords[0]?.percentage || 0;
          return bPerf - aPerf;
        default:
          return 0;
      }
    });

    return filtered;
  }, [students, searchQuery, classFilter, sortBy]);

  const handleExcelExport = () => {
    try {
      // Prepare data for Excel export
      const exportData = students.map(student => ({
        'Student Name': student.name,
        'Class': student.class,
        'Section': student.section,
        'Roll Number': student.rollNumber,
        'Date of Birth': student.dateOfBirth,
        'Blood Group': student.bloodGroup,
        'House': student.house,
        'Address': student.address,
        'Identification Mark': student.identificationMark,
        'Hobbies': student.hobbies.join(', '),
        'Achievements': student.achievements.join(', '),
        'Photo URL': student.photo,
        'Father Name': student.parentDetails.father.name,
        'Father Occupation': student.parentDetails.father.occupation,
        'Father Contact': student.parentDetails.father.contact,
        'Father Email': student.parentDetails.father.email,
        'Father Photo URL': student.parentDetails.father.photo,
        'Mother Name': student.parentDetails.mother.name,
        'Mother Occupation': student.parentDetails.mother.occupation,
        'Mother Contact': student.parentDetails.mother.contact,
        'Mother Email': student.parentDetails.mother.email,
        'Mother Photo URL': student.parentDetails.mother.photo,
        'Emergency Contact': student.parentDetails.emergencyContact,
        'Latest Semester': student.academicRecords[0]?.semester || '',
        'Latest Percentage': student.academicRecords[0]?.percentage || '',
        'Latest Grade': student.academicRecords[0]?.grade || '',
        'Mathematics Marks': student.academicRecords[0]?.subjects.find(s => s.name === 'Mathematics')?.marks || '',
        'Science Marks': student.academicRecords[0]?.subjects.find(s => s.name === 'Science')?.marks || '',
        'English Marks': student.academicRecords[0]?.subjects.find(s => s.name === 'English')?.marks || '',
        'Hindi Marks': student.academicRecords[0]?.subjects.find(s => s.name === 'Hindi')?.marks || '',
        'Social Studies Marks': student.academicRecords[0]?.subjects.find(s => s.name === 'Social Studies')?.marks || '',
        'Computer Science Marks': student.academicRecords[0]?.subjects.find(s => s.name === 'Computer Science')?.marks || '',
        'Physics Marks': student.academicRecords[0]?.subjects.find(s => s.name === 'Physics')?.marks || '',
        'Chemistry Marks': student.academicRecords[0]?.subjects.find(s => s.name === 'Chemistry')?.marks || '',
        'Biology Marks': student.academicRecords[0]?.subjects.find(s => s.name === 'Biology')?.marks || ''
      }));

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);

      // Set column widths
      const colWidths = [
        { wch: 20 }, // Student Name
        { wch: 8 },  // Class
        { wch: 8 },  // Section
        { wch: 12 }, // Roll Number
        { wch: 12 }, // Date of Birth
        { wch: 12 }, // Blood Group
        { wch: 10 }, // House
        { wch: 30 }, // Address
        { wch: 20 }, // Identification Mark
        { wch: 25 }, // Hobbies
        { wch: 30 }, // Achievements
        { wch: 40 }, // Photo URL
        { wch: 20 }, // Father Name
        { wch: 15 }, // Father Occupation
        { wch: 15 }, // Father Contact
        { wch: 25 }, // Father Email
        { wch: 40 }, // Father Photo URL
        { wch: 20 }, // Mother Name
        { wch: 15 }, // Mother Occupation
        { wch: 15 }, // Mother Contact
        { wch: 25 }, // Mother Email
        { wch: 40 }, // Mother Photo URL
        { wch: 15 }, // Emergency Contact
        { wch: 15 }, // Latest Semester
        { wch: 12 }, // Latest Percentage
        { wch: 10 }, // Latest Grade
        { wch: 12 }, // Mathematics Marks
        { wch: 12 }, // Science Marks
        { wch: 12 }, // English Marks
        { wch: 12 }, // Hindi Marks
        { wch: 15 }, // Social Studies Marks
        { wch: 15 }, // Computer Science Marks
        { wch: 12 }, // Physics Marks
        { wch: 12 }, // Chemistry Marks
        { wch: 12 }  // Biology Marks
      ];
      ws['!cols'] = colWidths;

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Students');

      // Generate filename with current date
      const date = new Date().toISOString().split('T')[0];
      const filename = `shiwalik_students_${date}.xlsx`;

      // Save file
      XLSX.writeFile(wb, filename);
      addNotification(`Student data exported successfully as ${filename}`);
    } catch (error) {
      console.error('Export error:', error);
      addNotification('Error exporting student data. Please try again.');
    }
  };

  const handleExcelImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setIsImporting(true);
      try {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        let importedCount = 0;
        let errorCount = 0;

        for (const row of jsonData as any[]) {
          try {
            // Calculate grade based on marks
            const calculateGrade = (marks: number): string => {
              if (marks >= 91) return 'A1';
              if (marks >= 81) return 'A2';
              if (marks >= 71) return 'B1';
              if (marks >= 61) return 'B2';
              if (marks >= 51) return 'C1';
              if (marks >= 41) return 'C2';
              if (marks >= 33) return 'D';
              return 'E';
            };

            // Prepare subjects array
            const subjects = [];
            const subjectNames = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer Science', 'Physics', 'Chemistry', 'Biology'];
            
            for (const subjectName of subjectNames) {
              const marks = row[`${subjectName} Marks`];
              if (marks && !isNaN(Number(marks))) {
                subjects.push({
                  name: subjectName,
                  marks: Number(marks),
                  grade: calculateGrade(Number(marks))
                });
              }
            }

            // Calculate overall percentage and grade
            const totalMarks = subjects.reduce((sum, subject) => sum + subject.marks, 0);
            const percentage = subjects.length > 0 ? Math.round((totalMarks / subjects.length) * 10) / 10 : 0;
            const overallGrade = calculateGrade(percentage);

            const newStudent = {
              id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
              name: row['Student Name'] || '',
              class: Number(row['Class']) || 6,
              section: row['Section'] || 'A',
              rollNumber: row['Roll Number'] || '',
              dateOfBirth: row['Date of Birth'] || '',
              bloodGroup: row['Blood Group'] || 'A+',
              house: row['House'] || 'Shiwalik',
              address: row['Address'] || '',
              identificationMark: row['Identification Mark'] || '',
              hobbies: row['Hobbies'] ? row['Hobbies'].split(',').map((h: string) => h.trim()).filter((h: string) => h) : [],
              achievements: row['Achievements'] ? row['Achievements'].split(',').map((a: string) => a.trim()).filter((a: string) => a) : [],
              photo: row['Photo URL'] || 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=300',
              parentDetails: {
                father: {
                  name: row['Father Name'] || '',
                  occupation: row['Father Occupation'] || '',
                  contact: row['Father Contact'] || '',
                  email: row['Father Email'] || '',
                  photo: row['Father Photo URL'] || 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=300'
                },
                mother: {
                  name: row['Mother Name'] || '',
                  occupation: row['Mother Occupation'] || '',
                  contact: row['Mother Contact'] || '',
                  email: row['Mother Email'] || '',
                  photo: row['Mother Photo URL'] || 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300'
                },
                emergencyContact: row['Emergency Contact'] || ''
              },
              academicRecords: subjects.length > 0 ? [{
                semester: row['Latest Semester'] || 'Mid-Term 2024',
                subjects: subjects,
                percentage: percentage,
                grade: overallGrade
              }] : []
            };

            // Validate required fields
            if (newStudent.name && newStudent.rollNumber) {
              addStudent(newStudent);
              importedCount++;
            } else {
              errorCount++;
            }
          } catch (error) {
            console.error('Error processing row:', error);
            errorCount++;
          }
        }

        if (importedCount > 0) {
          addNotification(`Successfully imported ${importedCount} students!`);
        }
        if (errorCount > 0) {
          addNotification(`${errorCount} rows had errors and were skipped.`);
        }
      } catch (error) {
        console.error('Import error:', error);
        addNotification('Error importing Excel file. Please check the format and try again.');
      } finally {
        setIsImporting(false);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50 dark:bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-red-600 dark:from-white dark:to-red-200 bg-clip-text text-transparent">
            Student Directory
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Complete student profiles and management system
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search students, parents, or roll numbers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Admin Controls */}
            {isAuthenticated && isEditorMode && (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Student
                </button>
                <button
                  onClick={handleExcelImport}
                  disabled={isImporting}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {isImporting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Importing...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Import Excel
                    </>
                  )}
                </button>
                <button
                  onClick={handleExcelExport}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Excel
                </button>
              </div>
            )}
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Class Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-red-700/50 rounded-lg bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">All Classes</option>
                {classes.map(cls => (
                  <option key={cls} value={cls.toString()}>Class {cls}</option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'class' | 'performance')}
                className="px-3 py-2 border border-gray-300 dark:border-red-700/50 rounded-lg bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="name">Name</option>
                <option value="class">Class</option>
                <option value="performance">Performance</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
              {filteredAndSortedStudents.length} of {students.length} students
            </div>
          </div>
        </div>

        {/* Student Grid */}
        {filteredAndSortedStudents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 dark:bg-red-800/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Students Found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery || classFilter 
                ? 'Try adjusting your search criteria or filters.'
                : 'No students have been added yet.'
              }
            </p>
          </div>
        )}
      </div>
      
      {/* Add Student Modal */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default StudentDetails;