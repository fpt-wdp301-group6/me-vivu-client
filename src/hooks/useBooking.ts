'use client';
import { useContext } from 'react';
import { BookingContext } from '@/contexts/booking-provider';

const useBooking = () => {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within an AuthProvider');
    }
    return context;
};

export default useBooking;
