'use client';
import { EventCentreDetails } from '@/types/eventTypes';
import { fetchEventCentreDetails } from '@/utils/eventUtils';
import { useEffect, useState } from 'react';
import Form from './Form';
import EventDetails from './EventDetails';

const EventProfile = () => {
    const [eventDetails, setEventDetails] = useState<any>();

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const { message, data, status } =
                    await fetchEventCentreDetails();
                if (status !== 200) {
                    console.log(message);
                } else {
                    setEventDetails(data);
                }
            } catch (error) {
                console.log('Unable to fetch event center details');
            }
        };
        fetchEventDetails();
    }, []);

    return (
        <>
            <div>
                {eventDetails ? (
                    <EventDetails eventCentreDetails={eventDetails} />
                ) : (
                    <Form />
                )}
            </div>
        </>
    );
};

export default EventProfile;
