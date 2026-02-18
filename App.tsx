import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
// import ChatWidget from './components/ChatWidget'; // DEFERRED - Fase 3

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
// import DashboardPage from './pages/DashboardPage'; // DEFERRED - Fase 3
import BookingPage from './pages/BookingPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans relative">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
        </main>
        <Footer />
        {/* <ChatWidget /> - DEFERRED */}
      </div>
    </Router>
  );
};

export default App;