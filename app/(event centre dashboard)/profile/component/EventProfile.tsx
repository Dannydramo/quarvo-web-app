'use client'
import { EventCentreDetails } from "@/types/eventTypes";
import { fetchEventCentreDetails } from "@/utils/eventUtils"
import { useLayoutEffect, useState } from "react"
import Form from "./Form";


const EventProfile = () => {
    const [eventDetails, setEventDetails] = useState<EventCentreDetails>();

    useLayoutEffect(() => {
        const fetchEventDetails = async () => {
            try {

                const { message, data, status } = await fetchEventCentreDetails();
                if (status !== 200) {
                    console.log(message);
                } else {
                    setEventDetails(data);
                }
            } catch (error) {
                console.log('Unable to fetch event center details');
            }
        }
        fetchEventDetails()
    }, [])



    return (
        <>
            <div>
                {eventDetails ? (
                    <div>
                        <p>{eventDetails.description}</p>
                    </div>
                ) : (
                    <Form />
                )}
            </div>
        </>
    )
}

export default EventProfile