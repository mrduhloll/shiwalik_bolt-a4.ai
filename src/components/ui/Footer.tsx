import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 py-8 border-t border-gray-200 dark:border-red-800/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Development Team</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <p className="text-white font-bold text-lg">Frontend Development</p>
              <p className="text-sm md:text-base text-white">Abhishek A</p>
              <p className="text-xs text-white">12th Computer Science</p>
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              <p className="font-semibold">UI/UX Design</p>
              <p className="text-sm">Design Team</p>
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              <p className="font-semibold">Backend Systems</p>
              <p className="text-sm">Tech Team</p>
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              <p className="font-semibold">Content Management</p>
              <p className="text-sm">Content Team</p>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400 dark:text-gray-500 text-sm opacity-70">
          Guided by Sunil Rathod (TGT CS)
        </div>
      </div>
    </footer>
  );
};

export default Footer;