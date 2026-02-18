import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

// Pages
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';

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

const App: React.FC = () => {
  useEffect(() => {
    printConsoleSignature();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans relative">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
};

export default App;