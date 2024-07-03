'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import ProfileForm from '../component/ProfileForm';
import { fetchEventCentreDetails } from '@/utils/eventUtils';

const EditProfile = () => {
    const [eventDetails, setEventDetails] = useState<any>();

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const { message, data, status } =
                    await fetchEventCentreDetails();
                if (status !== 200) {
                    console.log(message);
                }
                setEventDetails(data);
            } catch (error) {
                console.log('Unable to fetch event center details');
            }
        };
        fetchEventDetails();
    }, []);

    return (
        <DashboardLayout>
            <section className="w-[95%] mx-auto">
                <ProfileForm isEditing={true} initialValues={eventDetails} />
            </section>
        </DashboardLayout>
    );
};

export default EditProfile;
