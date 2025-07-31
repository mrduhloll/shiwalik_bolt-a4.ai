import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { StudentProvider } from './contexts/StudentContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { DataProvider } from './contexts/DataContext';
import { AdminControlProvider } from './contexts/AdminControlContext';
import MainLayout from './components/MainLayout';
import Layout from './components/Layout';
import MainHome from './pages/MainHome';
import Teachers from './pages/Teachers';
import Houses from './pages/Houses';
import Academic from './pages/Academic';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import StudentDetails from './pages/StudentDetails';
import StudentProfile from './pages/StudentProfile';
import AcademicPerformance from './pages/AcademicPerformance';
import MovementRegister from './pages/MovementRegister';
import AboutHouse from './pages/AboutHouse';
import AdminBlock from './pages/AdminBlock';
import LoginModal from './components/auth/LoginModal';
import LoadingScreen from './components/ui/LoadingScreen';
import DonateButton from './components/ui/DonateButton';
import { useLoading } from './contexts/LoadingContext';

const AppContent: React.FC = () => {
  const { isLoading } = useLoading();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Routes>
        {/* Main School Website Routes */}
        <Route path="/main" element={
          <MainLayout>
            <MainHome />
          </MainLayout>
        } />
        <Route path="/teachers" element={
          <MainLayout>
            <Teachers />
          </MainLayout>
        } />
        <Route path="/houses" element={
          <MainLayout>
            <Houses />
          </MainLayout>
        } />
        <Route path="/academic-main" element={
          <MainLayout>
            <Academic />
          </MainLayout>
        } />
        <Route path="/gallery" element={
          <MainLayout>
            <Gallery />
          </MainLayout>
        } />
        
        {/* Shiwalik House Routes */}
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/students" element={
          <Layout>
            <StudentDetails />
          </Layout>
        } />
        <Route path="/student/:id" element={
          <Layout>
            <StudentProfile />
          </Layout>
        } />
        <Route path="/academic" element={
          <Layout>
            <AcademicPerformance />
          </Layout>
        } />
        <Route path="/movement" element={
          <Layout>
            <MovementRegister />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout>
            <AboutHouse />
          </Layout>
        } />
        <Route path="/admin-block" element={
          <Layout>
            <AdminBlock />
          </Layout>
        } />
      </Routes>
      <LoginModal />
      <DonateButton />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <AdminControlProvider>
          <NotificationProvider>
            <AuthProvider>
              <StudentProvider>
                <LoadingProvider>
                  <Router>
                    <div className="min-h-screen transition-all duration-300">
                      <AppContent />
                    </div>
                  </Router>
                </LoadingProvider>
              </StudentProvider>
            </AuthProvider>
          </NotificationProvider>
        </AdminControlProvider>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;