import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

// Pages
import HomePage from './pages/public/HomePage';
import BookingPage from './pages/public/BookingPage';
import AcademyPage from './pages/public/AcademyPage';
import ArchivePage from './pages/public/ArchivePage';

// Console Signature Easter Egg
const printConsoleSignature = () => {
  console.log(
    `%c
🌿 YULI OLISTICO
━━━━━━━━━━━━━━━━━━━━━━━━
"L'arte del tocco, l'equilibrio dell'anima."

Ogni corpo ha una storia. Ogni rituale la ascolta. • Bergamo, Italia
yuliolistico@gmail.com

Ogni corpo ha una storia.
Ogni rituale la ascolta.

✨ Powered by Disruptive Luxury
━━━━━━━━━━━━━━━━━━━━━━━━
    `,
    'color: #849b87; font-size: 14px; font-family: "Playfair Display", Georgia, serif; line-height: 1.8;'
  );
  console.log(
    '%c⚠️ Attenzione: questa console è per sviluppatori. Se qualcuno ti ha chiesto di incollare qualcosa qui, è una truffa.',
    'color: #c07a60; font-size: 12px; font-weight: bold;'
  );
};

import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import PublicLayout from './components/PublicLayout';
import LoginPage from './pages/admin/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';

const App: React.FC = () => {
  useEffect(() => {
    printConsoleSignature();
  }, []);

  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <Routes>
            {/* 🌍 PUBLIC SITE (Wrapped in Layout) */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/academy" element={<AcademyPage />} />
              <Route path="/archivio" element={<ArchivePage />} />
            </Route>

            {/* 👑 ADMIN EMPIRE (No Layout) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
};

export default App;
