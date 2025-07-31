import React, { useState } from 'react';
import { Shield, UserPlus, Trash2, Eye, EyeOff, AlertTriangle, BarChart3, Users, Activity, Database, Settings, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { useStudents } from '../contexts/StudentContext';
import { useAdminControl } from '../contexts/AdminControlContext';
import Footer from '../components/ui/Footer';

const AdminBlock: React.FC = () => {
  const { adminUsers, addAdminUser, removeAdminUser, user } = useAuth();
  const { addNotification } = useNotifications();
  const { students } = useStudents();
  const { sectionVisibility, toggleSection, exportStudentData, backupSystemData } = useAdminControl();
  
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'controls'>('dashboard');

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUsername.trim() || !newPassword.trim()) {
      addNotification('Please fill in all fields');
      return;
    }

    if (newUsername.length < 3) {
      addNotification('Username must be at least 3 characters long');
      return;
    }

    if (newPassword.length < 4) {
      addNotification('Password must be at least 4 characters long');
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = addAdminUser(newUsername, newPassword);
    
    if (success) {
      setNewUsername('');
      setNewPassword('');
    } else {
      addNotification('Username already exists. Please choose a different one.');
    }

    setIsSubmitting(false);
  };

  const handleRemoveAdmin = (userId: string) => {
    if (user?.id === userId) {
      addNotification('You cannot remove your own admin account');
      return;
    }

    if (window.confirm('Are you sure you want to remove this admin user?')) {
      removeAdminUser(userId);
    }
  };

  // Calculate dashboard stats
  const totalStudents = students.length;
  const studentsWithRecords = students.filter(s => s.academicRecords.length > 0);
  const averagePerformance = studentsWithRecords.length > 0 
    ? Math.round(studentsWithRecords.reduce((sum, student) => sum + student.academicRecords[0].percentage, 0) / studentsWithRecords.length)
    : 0;
  const totalAchievements = students.reduce((sum, student) => sum + student.achievements.length, 0);
  const dataSize = Math.round((JSON.stringify(students).length / 1024) * 100) / 100; // KB

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50 dark:bg-gradient-to-br dark:from-red-950 dark:via-red-900 dark:to-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-700 rounded-2xl flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-red-600 dark:from-white dark:to-red-200 bg-clip-text text-transparent">
            Admin Block
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Manage administrator accounts and permissions
          </p>
        </div>

        {/* Warning Notice */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded-xl p-4 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                Important Notice
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                Admin user changes are stored in memory only and will be reset when the page is refreshed. 
                For persistent admin management, a backend database is required.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-xl p-1 mb-8 w-fit mx-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'dashboard'
                ? 'bg-white text-gray-900'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <BarChart3 className="h-4 w-4 mr-2 inline" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('controls')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'controls'
                ? 'bg-white text-gray-900'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Settings className="h-4 w-4 mr-2 inline" />
            Site Controls
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'users'
                ? 'bg-white text-gray-900'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <UserPlus className="h-4 w-4 mr-2 inline" />
            User Management
          </button>
        </div>

        {activeTab === 'dashboard' ? (
          /* Admin Dashboard */
          <div className="space-y-8">
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-8 w-8 text-blue-400" />
                  <span className="text-blue-300 text-sm font-medium">Total</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{totalStudents}</h3>
                <p className="text-blue-300">Students</p>
              </div>

              <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="h-8 w-8 text-green-400" />
                  <span className="text-green-300 text-sm font-medium">Average</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{averagePerformance}%</h3>
                <p className="text-green-300">Performance</p>
              </div>

              <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                <div className="flex items-center justify-between mb-4">
                  <Shield className="h-8 w-8 text-purple-400" />
                  <span className="text-purple-300 text-sm font-medium">Total</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{totalAchievements}</h3>
                <p className="text-purple-300">Achievements</p>
              </div>

              <div className="bg-gradient-to-br from-orange-900/50 to-orange-800/50 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30">
                <div className="flex items-center justify-between mb-4">
                  <Database className="h-8 w-8 text-orange-400" />
                  <span className="text-orange-300 text-sm font-medium">Data Size</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{dataSize}</h3>
                <p className="text-orange-300">KB</p>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white dark:bg-red-950/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-red-800/30 p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Activity className="h-6 w-6 mr-3 text-green-500" />
                System Health
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700/50">
                    <span className="text-gray-700 dark:text-gray-300">Data Storage</span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">Healthy</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700/50">
                    <span className="text-gray-700 dark:text-gray-300">User Authentication</span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">Active</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700/50">
                    <span className="text-gray-700 dark:text-gray-300">Theme System</span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">Operational</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700/50">
                    <span className="text-gray-700 dark:text-gray-300">Admin Users</span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">{adminUsers.length} Active</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700/50">
                    <span className="text-gray-700 dark:text-gray-300">Editor Mode</span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">Available</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700/50">
                    <span className="text-gray-700 dark:text-gray-300">Notifications</span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">Enabled</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-red-950/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-red-800/30 p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Settings className="h-6 w-6 mr-3 text-gray-600 dark:text-gray-400" />
                Quick Actions
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <button 
                  onClick={exportStudentData}
                  className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  Export Student Data
                </button>
                
                <button 
                  onClick={backupSystemData}
                  className="p-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  Backup System Data
                </button>
                
                <button className="p-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105">
                  Generate Reports
                </button>
              </div>
            </div>
          </div>
        ) : activeTab === 'controls' ? (
          /* Site Controls */
          <div className="space-y-8">
            <div className="bg-white dark:bg-red-950/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-red-800/30 p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Settings className="h-6 w-6 mr-3 text-red-600" />
                Section Visibility Controls
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Toggle sections on/off to control what visitors can see on the website.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(sectionVisibility).map(([section, isVisible]) => (
                  <div key={section} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-red-900/20 rounded-xl border border-gray-200 dark:border-red-700/30">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white capitalize">
                        {section === 'about' ? 'About House' : section} Section
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isVisible ? 'Currently visible to users' : 'Hidden from users'}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleSection(section)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                        isVisible ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isVisible ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Export & Backup Controls */}
            <div className="bg-white dark:bg-red-950/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-red-800/30 p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Database className="h-6 w-6 mr-3 text-red-600" />
                Data Management
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700/50">
                  <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-3">Export Student Data</h3>
                  <p className="text-blue-700 dark:text-blue-400 text-sm mb-4">
                    Download all student information in CSV format for external use or backup.
                  </p>
                  <button
                    onClick={exportStudentData}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105"
                  >
                    Download CSV File
                  </button>
                </div>
                
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700/50">
                  <h3 className="text-lg font-bold text-green-900 dark:text-green-300 mb-3">Backup System Data</h3>
                  <p className="text-green-700 dark:text-green-400 text-sm mb-4">
                    Create a complete backup of all website data and settings.
                  </p>
                  <button
                    onClick={backupSystemData}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105"
                  >
                    Create Backup
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* User Management */
          <div className="grid lg:grid-cols-2 gap-8">
          {/* Add New Admin */}
          <div className="bg-white dark:bg-red-950/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-red-800/30 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <UserPlus className="h-6 w-6 mr-3 text-red-600" />
              Add New Admin
            </h2>

            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter username (min 3 characters)"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter password (min 4 characters)"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !newUsername.trim() || !newPassword.trim()}
                className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Creating Admin...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-2" />
                    Add Admin User
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Current Admins */}
          <div className="bg-white dark:bg-red-950/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-red-800/30 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Shield className="h-6 w-6 mr-3 text-red-600" />
              Current Admins ({adminUsers.length})
            </h2>

            <div className="space-y-3">
              {adminUsers.map((admin) => (
                <div
                  key={admin.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-red-900/20 rounded-xl border border-gray-200 dark:border-red-700/30"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center mr-3">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {admin.username}
                        {user?.id === admin.id && (
                          <span className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-300 text-xs rounded-full">
                            You
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Administrator</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveAdmin(admin.id)}
                    disabled={user?.id === admin.id}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-800/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title={user?.id === admin.id ? "Cannot remove your own account" : "Remove admin"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {adminUsers.length === 0 && (
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4 opacity-50" />
                <p className="text-gray-500 dark:text-gray-400">No admin users found</p>
              </div>
            )}
          </div>
        </div>
        )}

        {/* Admin Management Tips */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">
            Admin Management Tips
          </h3>
          <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
            <li>• Admin users have full access to all system features and editor mode</li>
            <li>• You cannot remove your own admin account for security reasons</li>
            <li>• Use strong passwords and unique usernames for security</li>
            <li>• Changes are temporary and will reset on page refresh without a backend</li>
            <li>• Consider implementing proper user management with a database for production use</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminBlock;