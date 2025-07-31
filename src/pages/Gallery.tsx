import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import EditableImage from '../components/ui/EditableImage';
import Footer from '../components/ui/Footer';
import { Camera, Award, Users, BookOpen, Palette, Music } from 'lucide-react';

const Gallery: React.FC = () => {
  const { isEditorMode } = useAuth();
  
  const [galleryCategories, setGalleryCategories] = useState([
    {
      title: 'Campus Life',
      description: 'Beautiful moments from our vibrant campus',
      icon: Users,
      images: [
        'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    {
      title: 'Academic Activities',
      description: 'Learning in action across all subjects',
      icon: BookOpen,
      images: [
        'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    {
      title: 'Sports & Events',
      description: 'Athletic achievements and sporting spirit',
      icon: Award,
      images: [
        'https://images.pexels.com/photos/163444/sport-treadmill-tor-route-163444.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1263348/pexels-photo-1263348.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    {
      title: 'Cultural Programs',
      description: 'Celebrating art, music, and cultural diversity',
      icon: Music,
      images: [
        'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    {
      title: 'Art & Creativity',
      description: 'Student artwork and creative expressions',
      icon: Palette,
      images: [
        'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    {
      title: 'Special Events',
      description: 'Memorable occasions and celebrations',
      icon: Camera,
      images: [
        'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState(0);

  const updateCategoryImage = (categoryIndex: number, imageIndex: number, newSrc: string) => {
    setGalleryCategories(prev => prev.map((category, catIdx) => 
      catIdx === categoryIndex 
        ? { ...category, images: category.images.map((img, imgIdx) => imgIdx === imageIndex ? newSrc : img) }
        : category
    ));
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            School Gallery
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Capturing the essence of our vibrant school life through memorable moments, 
            achievements, and the journey of learning and growth.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {galleryCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(index)}
                  className={`flex items-center px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === index
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20'
                  }`}
                >
                  <IconComponent className="h-5 w-5 mr-2" />
                  {category.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Category Display */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {galleryCategories[selectedCategory].title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {galleryCategories[selectedCategory].description}
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryCategories[selectedCategory].images.map((image, imageIndex) => (
              <div
                key={imageIndex}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <EditableImage
                  src={image}
                  alt={`${galleryCategories[selectedCategory].title} ${imageIndex + 1}`}
                  onImageChange={(newSrc) => updateCategoryImage(selectedCategory, imageIndex, newSrc)}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold">
                      {galleryCategories[selectedCategory].title} #{imageIndex + 1}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Stats */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Gallery Highlights</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">500+</h4>
              <p className="text-gray-600 dark:text-gray-400">Photos Captured</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-pink-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">50+</h4>
              <p className="text-gray-600 dark:text-gray-400">Events Documented</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">1000+</h4>
              <p className="text-gray-600 dark:text-gray-400">Students Featured</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">5</h4>
              <p className="text-gray-600 dark:text-gray-400">Years of Memories</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;