import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import ChatWidget from './ChatWidget';
import BookingModal from './BookingModal';

const PublicLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans relative">
            <Navigation />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
            <ChatWidget />
            <BookingModal /> {/* The Smart Popup */}
        </div>
    );
};

export default PublicLayout;
