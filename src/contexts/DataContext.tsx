import React, { createContext, useContext, useState, useEffect } from 'react';

interface DataContextType {
  saveData: (key: string, data: any) => void;
  loadData: (key: string, defaultValue?: any) => any;
  clearData: (key: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const saveData = (key: string, data: any) => {
    try {
      localStorage.setItem(`shiwalik_${key}`, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const loadData = (key: string, defaultValue: any = null) => {
    try {
      const saved = localStorage.getItem(`shiwalik_${key}`);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (error) {
      console.error('Error loading data:', error);
      return defaultValue;
    }
  };

  const clearData = (key: string) => {
    try {
      localStorage.removeItem(`shiwalik_${key}`);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  return (
    <DataContext.Provider value={{ saveData, loadData, clearData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};