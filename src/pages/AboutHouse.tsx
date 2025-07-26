import React from 'react';
import { Mail, Phone, Award, Users, Calendar, MapPin, Star, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStudents } from '../contexts/StudentContext';
import EditableContent from '../components/ui/EditableContent';
import EditableImage from '../components/ui/EditableImage';

const AboutHouse: React.FC = () => {
  const { isEditorMode } = useAuth();
  const { students } = useStudents();
  const [pageContent, setPageContent] = React.useState({
    title: 'About Shiwalik House',
    subtitle: 'A home away from home where excellence meets character'
  });

  const [houseMaster, setHouseMaster] = React.useState({
    name: 'Dr. Rajesh Kumar',
    designation: 'House Master, Shiwalik House',
    qualifications: 'M.A. English Literature, Ph.D. Educational Psychology, B.Ed.',
    experience: '15 years',
    contact: '+91 9876543100',
    email: 'rajesh.kumar@school.edu.in',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    message: 'Welcome to Shiwalik House, where we nurture young minds to become responsible global citizens. Our focus is on holistic development that encompasses academic excellence, character building, and leadership skills.'
  });

  const [staff, setStaff] = React.useState([
    {
      id: '1',
      name: 'Ms. Priya Sharma',
      designation: 'Assistant House Master',
      contact: '+91 9876543101',
      email: 'priya.sharma@school.edu.in',
      photo: 'https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '2',
      name: 'Mr. Amit Singh',
      designation: 'House Warden',
      contact: '+91 9876543102',
      email: 'amit.singh@school.edu.in',
      photo: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '3',
      name: 'Ms. Neha Gupta',
      designation: 'House Tutor',
      contact: '+91 9876543103',
      email: 'neha.gupta@school.edu.in',
      photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ]);

  const [achievements, setAchievements] = React.useState([
    'Inter-House Academic Competition - 1st Place (2023)',
    'Best House for Cultural Activities - 2nd Place (2023)',
    'Sports Championship - Overall Winners (2023)',
    'Community Service Initiative - Excellence Award (2023)',
    'Cleanliness and Discipline - Best House Award (2023)',
    'Literary Competition - 1st Place (2023)'
  ]);

  const [facilities, setFacilities] = React.useState([
    'Modern dormitories with attached bathrooms',
    'Dedicated study halls with Wi-Fi connectivity',
    'Recreation room with indoor games',
    'Library corner with academic resources',
    '24/7 medical assistance',
    'Secure and monitored environment',
    'Nutritious dining facilities',
    'Gymnasium access for physical fitness'
  ]);

  const houseValues = [
    {
      title: 'Excellence',
      description: 'Striving for the highest standards in academics and character',
      icon: Star
    },
    {
      title: 'Integrity',
      description: 'Building honest and ethical future leaders',
      icon: Award
    },
    {
      title: 'Community',
      description: 'Fostering a supportive and inclusive environment',
      icon: Users
    },
    {
      title: 'Growth',
      description: 'Encouraging continuous learning and development',
      icon: BookOpen
    }
  ];

  const updateHouseMaster = (field: string, value: string) => {
    setHouseMaster(prev => ({ ...prev, [field]: value }));
  };

  const updateStaffMember = (id: string, field: string, value: string) => {
    setStaff(prev => prev.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  const updateAchievement = (index: number, value: string) => {
    setAchievements(prev => prev.map((achievement, i) => 
      i === index ? value : achievement
    ));
  };

  const updateFacility = (index: number, value: string) => {
    setFacilities(prev => prev.map((facility, i) => 
      i === index ? value : facility
    ));
  };

  // Calculate real statistics from students data
  const totalStudents = students.length;
  const totalAchievements = students.reduce((sum, student) => sum + student.achievements.length, 0);

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50 dark:bg-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-purple-600 dark:from-white dark:to-purple-200 bg-clip-text text-transparent">
            <EditableContent
              content={pageContent.title}
              onSave={(value) => setPageContent(prev => ({ ...prev, title: value }))}
            />
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            <EditableContent
              content={pageContent.subtitle}
              onSave={(value) => setPageContent(prev => ({ ...prev, subtitle: value }))}
            />
          </p>
        </div>

        {/* House Master Profile */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 mb-12 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 border-b border-white/10">
            <h2 className="text-3xl font-bold text-white text-center">House Master</h2>
          </div>
          
          <div className="p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="text-center">
                  <EditableImage
                    src={houseMaster.photo}
                    alt={houseMaster.name}
                    onImageChange={(newSrc) => {
                      // In a real app, this would update the houseMaster data
                      console.log('Update house master photo:', newSrc);
                    }}
                    className="w-48 h-48 mx-auto rounded-3xl object-cover border-4 border-purple-500/30 mb-6"
                  />
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    <EditableContent
                      content={houseMaster.name}
                      onSave={(value) => updateHouseMaster('name', value)}
                    />
                  </h3>
                  <p className="text-purple-300 font-semibold mb-4">
                    <EditableContent
                      content={houseMaster.designation}
                      onSave={(value) => updateHouseMaster('designation', value)}
                    />
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-center text-gray-300">
                      <Calendar className="h-5 w-5 mr-3 text-blue-400" />
                      <EditableContent
                        content={`${houseMaster.experience} of experience`}
                        onSave={(value) => updateHouseMaster('experience', value.replace(' of experience', ''))}
                      />
                    </div>
                    <div className="flex items-center justify-center text-gray-300">
                      <Phone className="h-5 w-5 mr-3 text-green-400" />
                      <EditableContent
                        content={houseMaster.contact}
                        onSave={(value) => updateHouseMaster('contact', value)}
                      />
                    </div>
                    <div className="flex items-center justify-center text-gray-300">
                      <Mail className="h-5 w-5 mr-3 text-purple-400" />
                      <EditableContent
                        content={houseMaster.email}
                        onSave={(value) => updateHouseMaster('email', value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4">Qualifications</h4>
                    <div className="flex items-center p-3 bg-white/5 rounded-xl border border-white/10">
                      <Award className="h-5 w-5 text-yellow-400 mr-3" />
                      <EditableContent
                        content={houseMaster.qualifications}
                        onSave={(value) => updateHouseMaster('qualifications', value)}
                        className="text-gray-300"
                        multiline
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-white mb-4">Message from House Master</h4>
                    <div className="p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/30">
                      <EditableContent
                        content={`"${houseMaster.message}"`}
                        onSave={(value) => updateHouseMaster('message', value.replace(/^"|"$/g, ''))}
                        className="text-gray-300 leading-relaxed italic text-lg"
                        multiline
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* House Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {houseValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105 text-center"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{value.title}</h4>
                  <p className="text-gray-300 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30 text-center">
            <Users className="h-8 w-8 text-blue-400 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-1">{totalStudents}</h3>
            <p className="text-blue-300">Total Students</p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 text-center">
            <Award className="h-8 w-8 text-purple-400 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-1">{totalAchievements}</h3>
            <p className="text-purple-300">Achievements</p>
          </div>

          <div className="bg-gradient-to-br from-pink-900/50 to-pink-800/50 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/30 text-center">
            <Star className="h-8 w-8 text-pink-400 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-1">#1</h3>
            <p className="text-pink-300">House Ranking</p>
          </div>

          <div className="bg-gradient-to-br from-orange-900/50 to-orange-800/50 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30 text-center">
            <Calendar className="h-8 w-8 text-orange-400 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-1">15</h3>
            <p className="text-orange-300">Years Legacy</p>
          </div>
        </div>

        {/* Staff Directory */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {staff.map((member, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden border-4 border-white/20 mb-4">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=8b5cf6&color=fff&size=96`;
                      }}
                    />
                  </div>
                  
                  <EditableContent
                    content={member.name}
                    onSave={(value) => updateStaffMember(member.id, 'name', value)}
                    className="text-xl font-bold text-white mb-1"
                  />
                  <EditableContent
                    content={member.designation}
                    onSave={(value) => updateStaffMember(member.id, 'designation', value)}
                    className="text-purple-300 text-sm mb-4"
                  />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center text-gray-300 text-sm">
                      <Phone className="h-4 w-4 mr-2" />
                      <EditableContent
                        content={member.contact}
                        onSave={(value) => updateStaffMember(member.id, 'contact', value)}
                      />
                    </div>
                    <div className="flex items-center justify-center text-gray-300 text-sm">
                      <Mail className="h-4 w-4 mr-2" />
                      <EditableContent
                        content={member.email}
                        onSave={(value) => updateStaffMember(member.id, 'email', value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements and Facilities */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Achievements */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 p-6">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Award className="h-6 w-6 mr-3 text-yellow-400" />
              Recent Achievements
            </h3>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-start p-3 bg-white/5 rounded-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-300"
                >
                  <Star className="h-5 w-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                  <EditableContent
                    content={achievement}
                    onSave={(value) => updateAchievement(index, value)}
                    className="text-gray-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 p-6">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <MapPin className="h-6 w-6 mr-3 text-green-400" />
              House Facilities
            </h3>
            <div className="space-y-3">
              {facilities.map((facility, index) => (
                <div
                  key={index}
                  className="flex items-start p-3 bg-white/5 rounded-xl border border-white/10 hover:border-green-400/30 transition-all duration-300"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-3 flex-shrink-0"></div>
                  <EditableContent
                    content={facility}
                    onSave={(value) => updateFacility(index, value)}
                    className="text-gray-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold text-white mb-4">Development Team</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-gray-300">
              <p className="font-semibold">Frontend Development</p>
              <p className="text-sm">Student Team</p>
            </div>
            <div className="text-gray-300">
              <p className="font-semibold">UI/UX Design</p>
              <p className="text-sm">Design Team</p>
            </div>
            <div className="text-gray-300">
              <p className="font-semibold">Backend Systems</p>
              <p className="text-sm">Tech Team</p>
            </div>
            <div className="text-gray-300">
              <p className="font-semibold">Content Management</p>
              <p className="text-sm">Content Team</p>
            </div>
          </div>
          <div className="text-center text-gray-400 text-sm opacity-70">
            Guided by Sunil Rathod (TGT CS)
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutHouse;