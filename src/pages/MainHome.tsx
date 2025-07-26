import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import EditableContent from '../components/ui/EditableContent';
import EditableImage from '../components/ui/EditableImage';
import { Mail, Phone, Award, Calendar, MapPin } from 'lucide-react';

const MainHome: React.FC = () => {
  const { isEditorMode } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  
  const [homeContent, setHomeContent] = useState({
    title: 'Welcome to our Vidyalaya',
    subtitle: 'JNV Bengaluru Rural',
    description: 'Excellence in Education, Character Building and Holistic Development'
  });

  const [galleryImages, setGalleryImages] = useState([
    'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=800'
  ]);

  const [principal, setPrincipal] = useState({
    name: 'Dr. Rajesh Kumar',
    designation: 'Principal',
    qualifications: 'M.A. Education, Ph.D. Educational Administration, B.Ed.',
    experience: '25 years',
    contact: '+91 9876543000',
    email: 'principal@jnvbr.edu.in',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    message: 'Welcome to Jawahar Navodaya Vidyalaya, Bengaluru Rural. We are committed to providing quality education and nurturing young minds to become responsible citizens of tomorrow.'
  });

  const [vicePrincipal, setVicePrincipal] = useState({
    name: 'Mrs. Priya Sharma',
    designation: 'Vice Principal',
    qualifications: 'M.Sc. Mathematics, M.Ed., B.Ed.',
    experience: '20 years',
    contact: '+91 9876543001',
    email: 'vp@jnvbr.edu.in',
    photo: 'https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg?auto=compress&cs=tinysrgb&w=400',
    message: 'Our focus is on holistic development of students through academic excellence, co-curricular activities, and character building programs.'
  });

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const updatePrincipal = (field: string, value: string) => {
    setPrincipal(prev => ({ ...prev, [field]: value }));
  };

  const updateVicePrincipal = (field: string, value: string) => {
    setVicePrincipal(prev => ({ ...prev, [field]: value }));
  };

  const updateGalleryImage = (index: number, newSrc: string) => {
    setGalleryImages(prev => prev.map((img, i) => i === index ? newSrc : img));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-transparent">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-green-100/50 dark:from-blue-900/30 dark:to-green-900/30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-300/30 dark:bg-green-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className={`text-center z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-900 via-green-600 to-blue-800 dark:from-blue-300 dark:via-green-200 dark:to-blue-300 bg-clip-text text-transparent">
            <EditableContent
              content={homeContent.title}
              onSave={(value) => setHomeContent(prev => ({ ...prev, title: value }))}
            />
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-green-700 to-blue-700 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
            <EditableContent
              content={homeContent.subtitle}
              onSave={(value) => setHomeContent(prev => ({ ...prev, subtitle: value }))}
            />
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl leading-relaxed">
            <EditableContent
              content={homeContent.description}
              onSave={(value) => setHomeContent(prev => ({ ...prev, description: value }))}
            />
          </p>
          
          <button
            onClick={() => scrollToSection('gallery')}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Explore Our School
          </button>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section id="gallery" className="py-20 px-4 bg-gray-50 dark:bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">School Gallery</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Glimpses of our beautiful campus and vibrant school life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <EditableImage
                  src={image}
                  alt={`School Gallery ${index + 1}`}
                  onImageChange={(newSrc) => updateGalleryImage(index, newSrc)}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 px-4 bg-white dark:bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Leadership</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Meet the dedicated leaders who guide our institution towards excellence
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Principal */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 backdrop-blur-sm rounded-2xl border border-blue-200 dark:border-blue-700/30 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 p-6 border-b border-blue-200 dark:border-blue-700/30">
                <h4 className="text-2xl font-bold text-blue-900 dark:text-blue-200 text-center">Principal</h4>
              </div>
              
              <div className="p-8">
                <div className="flex flex-col items-center text-center">
                  <EditableImage
                    src={principal.photo}
                    alt={principal.name}
                    onImageChange={(newSrc) => updatePrincipal('photo', newSrc)}
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-blue-500/30 mb-6"
                  />
                  
                  <EditableContent
                    content={principal.name}
                    onSave={(value) => updatePrincipal('name', value)}
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                  />
                  <EditableContent
                    content={principal.designation}
                    onSave={(value) => updatePrincipal('designation', value)}
                    className="text-blue-600 dark:text-blue-400 font-semibold mb-4"
                  />
                  
                  <div className="space-y-3 mb-6 w-full">
                    <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
                      <Calendar className="h-5 w-5 mr-3 text-blue-500" />
                      <EditableContent
                        content={`${principal.experience} of experience`}
                        onSave={(value) => updatePrincipal('experience', value.replace(' of experience', ''))}
                      />
                    </div>
                    <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
                      <Phone className="h-5 w-5 mr-3 text-green-500" />
                      <EditableContent
                        content={principal.contact}
                        onSave={(value) => updatePrincipal('contact', value)}
                      />
                    </div>
                    <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
                      <Mail className="h-5 w-5 mr-3 text-purple-500" />
                      <EditableContent
                        content={principal.email}
                        onSave={(value) => updatePrincipal('email', value)}
                      />
                    </div>
                  </div>

                  <div className="w-full space-y-4">
                    <div>
                      <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Qualifications</h5>
                      <div className="flex items-center p-3 bg-white/50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700/30">
                        <Award className="h-5 w-5 text-yellow-500 mr-3" />
                        <EditableContent
                          content={principal.qualifications}
                          onSave={(value) => updatePrincipal('qualifications', value)}
                          className="text-gray-700 dark:text-gray-300 text-sm"
                          multiline
                        />
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Message</h5>
                      <div className="p-4 bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-xl border border-blue-500/30">
                        <EditableContent
                          content={`"${principal.message}"`}
                          onSave={(value) => updatePrincipal('message', value.replace(/^"|"$/g, ''))}
                          className="text-gray-700 dark:text-gray-300 leading-relaxed italic"
                          multiline
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vice Principal */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 backdrop-blur-sm rounded-2xl border border-green-200 dark:border-green-700/30 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600/20 to-green-700/20 p-6 border-b border-green-200 dark:border-green-700/30">
                <h4 className="text-2xl font-bold text-green-900 dark:text-green-200 text-center">Vice Principal</h4>
              </div>
              
              <div className="p-8">
                <div className="flex flex-col items-center text-center">
                  <EditableImage
                    src={vicePrincipal.photo}
                    alt={vicePrincipal.name}
                    onImageChange={(newSrc) => updateVicePrincipal('photo', newSrc)}
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-green-500/30 mb-6"
                  />
                  
                  <EditableContent
                    content={vicePrincipal.name}
                    onSave={(value) => updateVicePrincipal('name', value)}
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                  />
                  <EditableContent
                    content={vicePrincipal.designation}
                    onSave={(value) => updateVicePrincipal('designation', value)}
                    className="text-green-600 dark:text-green-400 font-semibold mb-4"
                  />
                  
                  <div className="space-y-3 mb-6 w-full">
                    <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
                      <Calendar className="h-5 w-5 mr-3 text-green-500" />
                      <EditableContent
                        content={`${vicePrincipal.experience} of experience`}
                        onSave={(value) => updateVicePrincipal('experience', value.replace(' of experience', ''))}
                      />
                    </div>
                    <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
                      <Phone className="h-5 w-5 mr-3 text-blue-500" />
                      <EditableContent
                        content={vicePrincipal.contact}
                        onSave={(value) => updateVicePrincipal('contact', value)}
                      />
                    </div>
                    <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
                      <Mail className="h-5 w-5 mr-3 text-purple-500" />
                      <EditableContent
                        content={vicePrincipal.email}
                        onSave={(value) => updateVicePrincipal('email', value)}
                      />
                    </div>
                  </div>

                  <div className="w-full space-y-4">
                    <div>
                      <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Qualifications</h5>
                      <div className="flex items-center p-3 bg-white/50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700/30">
                        <Award className="h-5 w-5 text-yellow-500 mr-3" />
                        <EditableContent
                          content={vicePrincipal.qualifications}
                          onSave={(value) => updateVicePrincipal('qualifications', value)}
                          className="text-gray-700 dark:text-gray-300 text-sm"
                          multiline
                        />
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Message</h5>
                      <div className="p-4 bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-xl border border-green-500/30">
                        <EditableContent
                          content={`"${vicePrincipal.message}"`}
                          onSave={(value) => updateVicePrincipal('message', value.replace(/^"|"$/g, ''))}
                          className="text-gray-700 dark:text-gray-300 leading-relaxed italic"
                          multiline
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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

export default MainHome;