import React, { useEffect, useState } from 'react';
import { ChevronDown, Sparkles, Users, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useStudents } from '../contexts/StudentContext';
import { useData } from '../contexts/DataContext';
import EditableContent from '../components/ui/EditableContent';
import Footer from '../components/ui/Footer';

const Home: React.FC = () => {
  const { isEditorMode } = useAuth();
  const { students } = useStudents();
  const { saveData, loadData } = useData();
  const [isVisible, setIsVisible] = useState(false);
  const [homeContent, setHomeContent] = useState(() => loadData('homeContent', {
    title: 'Welcome to',
    subtitle: 'Shiwalik House',
    description: 'Excellence in Education, Character, and Leadership',
    sectionTitle: 'House at a Glance',
    sectionDescription: 'Discover the achievements and excellence that define Shiwalik House',
    featuresTitle: 'What We Offer',
    featuresDescription: 'Comprehensive management and tracking for all aspects of student life'
  }));

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    saveData('homeContent', homeContent);
  }, [homeContent, saveData]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Calculate real-time stats from actual data
  const totalStudents = students.length;
  const totalAchievements = students.reduce((sum, student) => sum + student.achievements.length, 0);
  const studentsWithRecords = students.filter(s => s.academicRecords.length > 0);
  const averagePercentage = studentsWithRecords.length > 0 
    ? Math.round(studentsWithRecords.reduce((sum, student) => sum + student.academicRecords[0].percentage, 0) / studentsWithRecords.length)
    : 0;

  const stats = [
    { icon: Users, label: 'Total Students', value: totalStudents.toString(), color: 'from-blue-500 to-blue-600' },
    { icon: Award, label: 'Achievements', value: totalAchievements.toString(), color: 'from-purple-500 to-purple-600' },
    { icon: TrendingUp, label: 'Academic Excellence', value: `${averagePercentage}%`, color: 'from-pink-500 to-pink-600' },
    { icon: Sparkles, label: 'House Ranking', value: '#1', color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-transparent">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-pink-100/50 dark:from-red-900/30 dark:to-black/50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-red-200/30 dark:bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-300/30 dark:bg-red-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className={`text-center z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-600 to-pink-600 dark:from-white dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent">
            <EditableContent
              content={homeContent.title}
              onSave={(value) => setHomeContent(prev => ({ ...prev, title: value }))}
            />
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-red-600 to-red-800 dark:from-red-400 dark:to-red-300 bg-clip-text text-transparent">
            <EditableContent
              content={homeContent.subtitle}
              onSave={(value) => setHomeContent(prev => ({ ...prev, subtitle: value }))}
            />
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-2xl leading-relaxed">
            <EditableContent
              content={homeContent.description}
              onSave={(value) => setHomeContent(prev => ({ ...prev, description: value }))}
            />
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/students"
              className="group bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Explore Students
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              to="/about"
              className="bg-white/80 hover:bg-white dark:bg-red-950/50 dark:hover:bg-red-950/70 backdrop-blur-sm text-gray-900 dark:text-white px-8 py-4 rounded-2xl font-semibold text-lg border border-gray-300 dark:border-red-700/50 hover:border-gray-400 dark:hover:border-red-600/70 transition-all duration-300 transform hover:scale-105"
            >
              About House
            </Link>
          </div>
        </div>

        <button
          onClick={scrollToContent}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 p-4 rounded-full bg-white/80 hover:bg-white dark:bg-red-950/50 dark:hover:bg-red-950/70 backdrop-blur-sm border border-gray-300 dark:border-red-700/50 hover:border-gray-400 dark:hover:border-red-600/70 transition-all duration-300 animate-bounce"
        >
          <ChevronDown className="h-6 w-6 text-gray-900 dark:text-white" />
        </button>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <EditableContent
                content={homeContent.sectionTitle}
                onSave={(value) => setHomeContent(prev => ({ ...prev, sectionTitle: value }))}
              />
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              <EditableContent
                content={homeContent.sectionDescription}
                onSave={(value) => setHomeContent(prev => ({ ...prev, sectionDescription: value }))}
              />
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="group bg-white dark:bg-red-950/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-red-800/30 hover:border-gray-300 dark:hover:border-red-700/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${index === 0 ? 'from-red-500 to-red-600' : index === 1 ? 'from-red-600 to-red-700' : index === 2 ? 'from-red-700 to-red-800' : 'from-red-800 to-red-900'} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</h4>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <EditableContent
                content={homeContent.featuresTitle}
                onSave={(value) => setHomeContent(prev => ({ ...prev, featuresTitle: value }))}
              />
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              <EditableContent
                content={homeContent.featuresDescription}
                onSave={(value) => setHomeContent(prev => ({ ...prev, featuresDescription: value }))}
              />
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              to="/students"
              className="group bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/50 dark:to-red-800/50 backdrop-blur-sm rounded-2xl p-8 border border-red-200 dark:border-red-700/30 hover:border-red-300 dark:hover:border-red-600/50 transition-all duration-300 transform hover:scale-105"
            >
              <Users className="h-12 w-12 text-red-600 dark:text-red-400 mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Student Management</h4>
              <p className="text-gray-600 dark:text-gray-300">Complete student profiles with academic records, family details, and achievements.</p>
            </Link>

            <Link
              to="/academic"
              className="group bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/40 dark:to-red-800/40 backdrop-blur-sm rounded-2xl p-8 border border-red-200 dark:border-red-700/30 hover:border-red-300 dark:hover:border-red-600/50 transition-all duration-300 transform hover:scale-105"
            >
              <Award className="h-12 w-12 text-red-600 dark:text-red-400 mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Academic Performance</h4>
              <p className="text-gray-600 dark:text-gray-300">Track grades, performance trends, and academic achievements across all classes.</p>
            </Link>

            <Link
              to="/movement"
              className="group bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/50 dark:to-pink-800/50 backdrop-blur-sm rounded-2xl p-8 border border-pink-200 dark:border-pink-500/30 hover:border-pink-300 dark:hover:border-pink-400/50 transition-all duration-300 transform hover:scale-105"
            >
              <TrendingUp className="h-12 w-12 text-pink-600 dark:text-pink-400 mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Movement Register</h4>
              <p className="text-gray-600 dark:text-gray-300">Digital leave request system with approval workflow and notifications.</p>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;