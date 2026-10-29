import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import StatsBar from './components/Stats/StatsBar';
import Services from './components/Services/Services';
import ToolStack from './components/ToolStack/ToolStack';
import FAQ from './components/FAQ/FAQ';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import RequestModal from './components/RequestModal/RequestModal';
import AuthModal from './components/Auth/AuthModal';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { api } from './services/api';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('public'); // 'public' | 'student_dashboard' | 'admin_dashboard'
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  // Synchronize session and verify latest role from database
  useEffect(() => {
    const user = api.getSessionUser();
    if (user && user.id) {
      setCurrentUser(user);
      // Asynchronously refresh role from database in case admin modified role in server/db.json
      api.refreshMe(user.id).then((freshUser) => {
        if (freshUser) {
          setCurrentUser(freshUser);
        }
      });
    }
  }, []);

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    if (user.role === 'admin') {
      setCurrentView('admin_dashboard');
    } else {
      setCurrentView('student_dashboard');
    }
  };

  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
    setCurrentView('public');
  };

  const handleOpenDashboard = () => {
    if (!currentUser) {
      handleOpenAuth('login');
      return;
    }
    if (currentUser.role === 'admin') {
      setCurrentView('admin_dashboard');
    } else {
      setCurrentView('student_dashboard');
    }
  };

  const handleUploadClick = () => {
    if (!currentUser) {
      handleOpenAuth('register');
    } else if (currentUser.role === 'admin') {
      setCurrentView('admin_dashboard');
    } else {
      setCurrentView('student_dashboard');
    }
  };

  const handleOpenRequestModal = (service = '') => {
    setSelectedService(service);
    setIsRequestModalOpen(true);
  };

  return (
    <div className="app-wrapper">
      {/* 1. Student Dashboard View */}
      {currentView === 'student_dashboard' && currentUser && (
        <StudentDashboard 
          currentUser={currentUser} 
          onLogout={handleLogout} 
          onBackToSite={() => setCurrentView('public')}
        />
      )}

      {/* 2. Admin Dashboard View (Guarded by role === 'admin') */}
      {currentView === 'admin_dashboard' && currentUser && (
        <AdminDashboard 
          currentUser={currentUser} 
          onLogout={handleLogout} 
          onBackToSite={() => setCurrentView('public')}
        />
      )}

      {/* 3. Clean Public Website Landing Page */}
      {currentView === 'public' && (
        <>
          {/* Top Sticky Navigation */}
          <Navbar 
            onOpenAuth={handleOpenAuth}
            currentUser={currentUser}
            onOpenDashboard={handleOpenDashboard}
            onLogout={handleLogout}
          />

          <main>
            {/* Hero Section */}
            <Hero 
              onUploadClick={handleUploadClick}
              onRequestClick={() => handleOpenRequestModal()} 
            />

            {/* Live Trust & Stats Ribbon */}
            <StatsBar />

            {/* Core Services Section */}
            <Services 
              onRequestService={(serviceTitle) => handleOpenRequestModal(serviceTitle)} 
              onUploadClick={handleUploadClick}
            />

            {/* Analytical Software & Tool Stack */}
            <ToolStack />

            {/* Frequently Asked Questions */}
            <FAQ />

            {/* Contact & Consultation Form */}
            <Contact onUploadClick={handleUploadClick} />
          </main>

          {/* Footer */}
          <Footer 
            onOpenAuth={handleOpenAuth}
            onUploadClick={handleUploadClick}
          />

          {/* Floating WhatsApp Action Widget */}
          <WhatsAppButton />

          {/* Analysis Request Pop-up Modal */}
          <RequestModal 
            isOpen={isRequestModalOpen} 
            onClose={() => setIsRequestModalOpen(false)} 
            initialService={selectedService} 
            onDirectToUpload={handleUploadClick}
          />
        </>
      )}

      {/* Authentication Modal (Student Sign Up & Sign In) */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authMode}
      />
    </div>
  );
}

export default App;
