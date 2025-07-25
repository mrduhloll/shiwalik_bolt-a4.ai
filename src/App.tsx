import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { StudentProvider } from './contexts/StudentContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { LoadingProvider } from './contexts/LoadingContext';
import Layout from './components/Layout';
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
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<StudentDetails />} />
          <Route path="/student/:id" element={<StudentProfile />} />
          <Route path="/academic" element={<AcademicPerformance />} />
          <Route path="/movement" element={<MovementRegister />} />
          <Route path="/about" element={<AboutHouse />} />
          <Route path="/admin-block" element={<AdminBlock />} />
        </Routes>
      </Layout>
      <LoginModal />
      <DonateButton />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;