import React from 'react';
import { BookOpen, Award, Mail, Phone } from 'lucide-react';
import Footer from '../components/ui/Footer';

const Teachers: React.FC = () => {
  const teachers = [
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      subject: 'Mathematics',
      qualification: 'Ph.D. Mathematics, M.Sc.',
      experience: '15 years',
      email: 'rajesh.math@jnvbr.edu.in',
      phone: '+91 9876543100',
      photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
      achievements: ['Best Teacher Award 2023', 'Mathematics Olympiad Coach']
    },
    {
      id: '2',
      name: 'Mrs. Priya Sharma',
      subject: 'English Literature',
      qualification: 'M.A. English, B.Ed.',
      experience: '12 years',
      email: 'priya.english@jnvbr.edu.in',
      phone: '+91 9876543101',
      photo: 'https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg?auto=compress&cs=tinysrgb&w=300',
      achievements: ['Literary Club Coordinator', 'Debate Competition Judge']
    },
    {
      id: '3',
      name: 'Mr. Amit Singh',
      subject: 'Physics',
      qualification: 'M.Sc. Physics, B.Ed.',
      experience: '10 years',
      email: 'amit.physics@jnvbr.edu.in',
      phone: '+91 9876543102',
      photo: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300',
      achievements: ['Science Fair Organizer', 'Innovation Lab Coordinator']
    },
    {
      id: '4',
      name: 'Ms. Neha Gupta',
      subject: 'Chemistry',
      qualification: 'M.Sc. Chemistry, B.Ed.',
      experience: '8 years',
      email: 'neha.chemistry@jnvbr.edu.in',
      phone: '+91 9876543103',
      photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
      achievements: ['Research Publication Author', 'Lab Safety Coordinator']
    },
    {
      id: '5',
      name: 'Mr. Sunil Rathod',
      subject: 'Computer Science',
      qualification: 'M.Tech. CSE, B.Tech.',
      experience: '14 years',
      email: 'sunil.cs@jnvbr.edu.in',
      phone: '+91 9876543104',
      photo: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=300',
      achievements: ['Coding Club Mentor', 'Website Development Guide', 'TGT Computer Science']
    },
    {
      id: '6',
      name: 'Mrs. Lakshmi Devi',
      subject: 'Biology',
      qualification: 'M.Sc. Biology, B.Ed.',
      experience: '11 years',
      email: 'lakshmi.biology@jnvbr.edu.in',
      phone: '+91 9876543105',
      photo: 'https://images.pexels.com/photos/1181694/pexels-photo-1181694.jpeg?auto=compress&cs=tinysrgb&w=300',
      achievements: ['Environmental Club Head', 'Nature Study Coordinator']
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Our Faculty
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Meet our dedicated team of educators who are committed to nurturing young minds 
            and fostering academic excellence through innovative teaching methods.
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600/70 transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden"
            >
              {/* Teacher Photo */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={teacher.photo}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=6366f1&color=fff&size=300`;
                  }}
                />
              </div>

              {/* Teacher Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {teacher.name}
                </h3>
                
                <div className="flex items-center mb-3">
                  <BookOpen className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    {teacher.subject}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <p><strong>Qualification:</strong> {teacher.qualification}</p>
                  <p><strong>Experience:</strong> {teacher.experience}</p>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="h-4 w-4 mr-2 text-purple-500" />
                    <a
                      href={`mailto:${teacher.email}`}
                      className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      {teacher.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="h-4 w-4 mr-2 text-green-500" />
                    <a
                      href={`tel:${teacher.phone}`}
                      className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      {teacher.phone}
                    </a>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                    <Award className="h-4 w-4 mr-2 text-yellow-500" />
                    Achievements
                  </h4>
                  <div className="space-y-1">
                    {teacher.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Faculty Stats */}
        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Faculty Excellence</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{teachers.length}</h4>
              <p className="text-gray-600 dark:text-gray-400">Expert Teachers</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">25+</h4>
              <p className="text-gray-600 dark:text-gray-400">Awards Won</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">15+</h4>
              <p className="text-gray-600 dark:text-gray-400">Years Average Experience</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">100%</h4>
              <p className="text-gray-600 dark:text-gray-400">Qualified Teachers</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Teachers;