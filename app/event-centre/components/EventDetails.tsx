import { EventCentreDetails, eventRegDetails, reviewProps } from '@/types/eventTypes'
import React from 'react'
import EventCentreImages from './EventCentreImages';
import Comments from './Comments';
import Link from 'next/link';

const EventDetails: React.FC<{ eventCentreDetails: EventCentreDetails, reviews: reviewProps[], eventCentre: eventRegDetails, eventCentreImage: { images: string[] } }> = ({ eventCentreDetails, eventCentre, reviews, eventCentreImage }) => {
    function capitalizeWords(inputString: string) {
        return inputString.replace(/\b\w/g, (char: string) => char.toUpperCase());
    }
    return (
        <>

            <EventCentreImages eventImages={eventCentreImage.images} />
            <section className='mx-auto overflow-x-hidden w-[95%] sm:w-[90%]'>
                < div className="bg-[#F4F0EC] rounded-xl p-8 flex flex-col max-w-[700px] space-y-4 mt-4">
                    <p>
                        <span className="font-bold">Event Name: </span>
                        <span>{eventCentre.event_centre_name}</span>
                    </p>
                    <p>
                        <span className="font-bold">Phone Number: </span>
                        <span>{eventCentre.phone_number}</span>
                    </p>
                    <p>
                        <span className="font-bold">Email Address: </span>
                        <span>{eventCentre.email}</span>
                    </p>
                    <p>
                        <span className="font-bold">State: </span>
                        <span>{eventCentre.state}</span>
                    </p>
                    <p>
                        <span className="font-bold">L.G.A: </span>
                        <span>{capitalizeWords(eventCentreDetails.lga)}</span>
                    </p>
                    <p>
                        <span className="font-bold">Address: </span>
                        <span className="">
                            {eventCentreDetails.address}
                        </span>
                    </p>
                    <p>
                        <span className="font-bold">Opening Time: </span>
                        <span>{eventCentreDetails.open_time}</span>
                    </p>
                    <p>
                        <span className="font-bold">Closing Time: </span>
                        <span>{eventCentreDetails.close_time}</span>
                    </p>
                    <p>
                        <span className="font-bold">Price: </span>
                        <span>{eventCentreDetails.price}</span>
                    </p>
                    <p>
                        <span className="font-bold">Opening Days: </span>
                        <span>{eventCentreDetails.open_days}</span>
                    </p>
                    <Link href={`/event-centre/checkout/${eventCentre.slug}`}>Proced To Booking</Link>
                </div>

                <div className="">
                    <p className="my-4">{eventCentreDetails.description || "No description available"}</p>
                    <div className="flex flex-wrap">
                        {eventCentreDetails.amenities &&
                            eventCentreDetails.amenities.map((amenity, index) => (
                                <ul key={index} className="flex flex-wrap">
                                    <li
                                        key={index}
                                        className="mr-4 p-2 my-2 bg-[#fbfaf8]"
                                    >
                                        {amenity || "N/A"}
                                    </li>
                                </ul>
                            ))}
                    </div>
                </div>
            </section>
            <Comments eventCentreReview={reviews} eventCentreId={eventCentre.id} />

        </>
    )
}

export default EventDetails