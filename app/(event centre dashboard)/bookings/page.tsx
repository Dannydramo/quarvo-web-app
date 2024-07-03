import React from 'react';
import Navigation from '../components/Navigation';
import BookingData from './components/booking-data';
import DashboardLayout from '../components/DashboardLayout';

const Bookings = () => {
    return (
        <>
            <DashboardLayout>
                <section className="w-[95%] mx-auto">
                    <BookingData />
                </section>
            </DashboardLayout>
        </>
    );
};

export default Bookings;
