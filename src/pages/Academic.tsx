import React from 'react';
import { BookOpen, Award, TrendingUp, Users, Calendar, Target } from 'lucide-react';

const Academic: React.FC = () => {
  const academicPrograms = [
    {
      title: 'Primary Education',
      classes: 'Classes VI - VIII',
      description: 'Foundation building with focus on core subjects and skill development',
      subjects: ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer Science'],
      color: 'from-blue-600 to-blue-700',
      bgColor: 'from-blue-900/50 to-blue-800/50',
      borderColor: 'border-blue-500/30'
    },
    {
      title: 'Secondary Education',
      classes: 'Classes IX - X',
      description: 'Comprehensive curriculum preparing students for board examinations',
      subjects: ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer Applications'],
      color: 'from-green-600 to-green-700',
      bgColor: 'from-green-900/50 to-green-800/50',
      borderColor: 'border-green-500/30'
    },
    {
      title: 'Senior Secondary',
      classes: 'Classes XI - XII',
      description: 'Specialized streams with career-oriented subjects',
      subjects: ['Science Stream', 'Commerce Stream', 'Arts Stream', 'Vocational Courses'],
      color: 'from-purple-600 to-purple-700',
      bgColor: 'from-purple-900/50 to-purple-800/50',
      borderColor: 'border-purple-500/30'
    }
  ];

  const achievements = [
    {
      title: 'Board Results 2024',
      description: 'Outstanding performance in CBSE examinations',
      stats: [
        { label: 'Class X Pass Rate', value: '100%' },
        { label: 'Class XII Pass Rate', value: '98%' },
        { label: 'Students above 90%', value: '45%' }
      ]
    },
    {
      title: 'Competitive Exams',
      description: 'Success in national level competitions',
      stats: [
        { label: 'JEE Qualifiers', value: '25' },
        { label: 'NEET Qualifiers', value: '18' },
        { label: 'Olympiad Winners', value: '12' }
      ]
    },
    {
      title: 'Academic Awards',
      description: 'Recognition at state and national level',
      stats: [
        { label: 'Best School Award', value: '2023' },
        { label: 'Excellence in Science', value: '2024' },
        { label: 'Innovation Award', value: '2023' }
      ]
    }
  ];

  const facilities = [
    {
      name: 'Smart Classrooms',
      description: 'Digital learning with interactive boards and multimedia content',
      icon: BookOpen
    },
    {
      name: 'Science Laboratories',
      description: 'Well-equipped Physics, Chemistry, and Biology labs',
      icon: Target
    },
    {
      name: 'Computer Lab',
      description: 'Modern computers with high-speed internet connectivity',
      icon: TrendingUp
    },
    {
      name: 'Library',
      description: 'Extensive collection of books, journals, and digital resources',
      icon: BookOpen
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent">
            Academic Excellence
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Committed to providing quality education that nurtures intellectual growth, 
            critical thinking, and prepares students for future challenges.
          </p>
        </div>

        {/* Academic Programs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Academic Programs</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {academicPrograms.map((program, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${program.bgColor} backdrop-blur-sm rounded-2xl border ${program.borderColor} hover:border-opacity-60 transition-all duration-300 transform hover:scale-105 overflow-hidden`}
              >
                <div className={`bg-gradient-to-r ${program.color} p-6 text-white`}>
                  <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                  <p className="text-lg opacity-90">{program.classes}</p>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-300 mb-6 leading-relaxed">{program.description}</p>
                  
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4">Key Subjects</h4>
                    <div className="space-y-2">
                      {program.subjects.map((subject, subIndex) => (
                        <div key={subIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                          <span className="text-gray-300">{subject}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Achievements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Academic Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{achievement.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{achievement.description}</p>
                </div>
                
                <div className="space-y-3">
                  {achievement.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <span className="text-gray-700 dark:text-gray-300">{stat.label}</span>
                      <span className="font-bold text-yellow-600 dark:text-yellow-400">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Facilities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Academic Facilities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, index) => {
              const IconComponent = facility.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{facility.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{facility.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Academic Calendar */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Academic Calendar 2024-25</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Session Start</h4>
              <p className="text-gray-600 dark:text-gray-400">April 2024</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Mid-Term Exams</h4>
              <p className="text-gray-600 dark:text-gray-400">September 2024</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Annual Exams</h4>
              <p className="text-gray-600 dark:text-gray-400">March 2025</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Results</h4>
              <p className="text-gray-600 dark:text-gray-400">April 2025</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-center text-gray-400 dark:text-gray-500 text-sm opacity-70">
            Guided by Sunil Rathod (TGT CS)
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Academic;