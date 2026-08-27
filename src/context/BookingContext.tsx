import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface BookingContextType {
    isBookingOpen: boolean;
    openBooking: () => void;
    closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    useEffect(() => {
        if (window.location.hash === '#booking') {
            setIsBookingOpen(true);
        }
    }, []);

    const openBooking = () => setIsBookingOpen(true);
    const closeBooking = () => setIsBookingOpen(false);

    return (
        <BookingContext.Provider value={{ isBookingOpen, openBooking, closeBooking }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};
