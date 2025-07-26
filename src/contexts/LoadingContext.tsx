import React, { createContext, useContext, useState, useEffect } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Listen for navigation changes
    const handleBeforeUnload = () => setIsLoading(true);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Show loading on slow network
  useEffect(() => {
    const connection = (navigator as any).connection;
    if (connection) {
      const handleConnectionChange = () => {
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.effectiveType === '3g') {
          setIsLoading(true);
          setTimeout(() => setIsLoading(false), 4000);
        }
      };
      
      connection.addEventListener('change', handleConnectionChange);
      return () => connection.removeEventListener('change', handleConnectionChange);
    }
    
    // Also check for slow loading times
    const slowLoadingTimer = setTimeout(() => {
      if (document.readyState !== 'complete') {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 3000);
      }
    }, 5000);
    
    return () => clearTimeout(slowLoadingTimer);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};