import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, TreePine, Home as HomeIcon, Sun } from 'lucide-react';
import Footer from '../components/ui/Footer';

const Houses: React.FC = () => {
  const houses = [
    {
      name: 'Aravali',
      description: 'Strength, Stability, and Endurance',
      color: 'from-blue-900 to-blue-700',
      bgColor: 'from-blue-900/50 to-blue-800/50',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400',
      icon: Mountain,
      link: '/aravali'
    },
    {
      name: 'Nilgiri',
      description: 'Growth, Harmony, and Nature',
      color: 'from-green-900 to-green-700',
      bgColor: 'from-green-900/50 to-green-800/50',
      borderColor: 'border-green-500/30',
      textColor: 'text-green-400',
      icon: TreePine,
      link: '/nilgiri'
    },
    {
      name: 'Shiwalik',
      description: 'Excellence in Education, Character, and Leadership',
      color: 'from-red-900 to-red-700',
      bgColor: 'from-red-900/50 to-red-800/50',
      borderColor: 'border-red-500/30',
      textColor: 'text-red-400',
      icon: HomeIcon,
      link: '/'
    },
    {
      name: 'Udayagiri',
      description: 'Rising Sun, New Beginnings, and Bright Future',
      color: 'from-yellow-700 to-orange-600',
      bgColor: 'from-yellow-900/50 to-orange-800/50',
      borderColor: 'border-yellow-500/30',
      textColor: 'text-yellow-400',
      icon: Sun,
      link: '/udayagiri'
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-green-600 via-red-600 to-yellow-600 bg-clip-text text-transparent">
            School Houses
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our four houses represent the pillars of character, excellence, and tradition. 
            Each house fosters a spirit of healthy competition, teamwork, and personal growth.
          </p>
        </div>

        {/* Houses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {houses.map((house, index) => {
            const IconComponent = house.icon;
            return (
              <Link
                key={house.name}
                to={house.link}
                className="group block"
              >
                <div className={`bg-gradient-to-br ${house.bgColor} backdrop-blur-sm rounded-2xl border ${house.borderColor} hover:border-opacity-60 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden h-80`}>
                  {/* House Header */}
                  <div className={`bg-gradient-to-r ${house.color} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 opacity-10">
                      <IconComponent className="h-32 w-32" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <h2 className="text-3xl font-bold">{house.name}</h2>
                      </div>
                      <p className="text-lg opacity-90">{house.description}</p>
                    </div>
                  </div>

                  {/* House Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">House Spirit</span>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full bg-gradient-to-r ${house.color}`}></div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">Achievements</span>
                        <span className={`${house.textColor} font-bold`}>Excellence</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">Values</span>
                        <span className={`${house.textColor} font-bold`}>Integrity</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">Click to explore</span>
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${house.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* House Philosophy */}
        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
          <h3 className="text-3xl font-bold text-white text-center mb-6">House System Philosophy</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mountain className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Leadership</h4>
              <p className="text-gray-300 text-sm">Developing future leaders through responsibility and guidance</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TreePine className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Teamwork</h4>
              <p className="text-gray-300 text-sm">Building strong bonds and collaborative spirit</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Excellence</h4>
              <p className="text-gray-300 text-sm">Striving for the highest standards in all endeavors</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sun className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Innovation</h4>
              <p className="text-gray-300 text-sm">Encouraging creativity and forward-thinking</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Houses;