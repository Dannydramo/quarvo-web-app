import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import BookingForm from './BookingForm';

const BookEvent = () => {
    return (
        <DashboardLayout>
            <section className="w-[95%] mx-auto">
                <h1 className="font-bold text-xl sm:text-2xl my-8">
                    Book Event
                </h1>
                <BookingForm />
            </section>
        </DashboardLayout>
    );
};

export default BookEvent;
