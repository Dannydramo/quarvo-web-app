import React from 'react';
import Navigation from '../components/Navigation';
import EventProfile from './component/EventProfile';
import DashboardLayout from '../components/DashboardLayout';

const Profile = () => {
    return (
        <>
            <DashboardLayout>
                <section className="w-[95%] mx-auto">
                    <EventProfile />
                </section>
            </DashboardLayout>
        </>
    );
};

export default Profile;
