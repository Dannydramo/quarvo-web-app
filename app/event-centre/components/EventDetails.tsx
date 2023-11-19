import { EventCentreDetails, eventRegDetails, reviewProps } from '@/types/eventTypes'
import React from 'react'
import EventCentreImages from './EventCentreImages';
import Comments from './Comments';
import Link from 'next/link';

const EventDetails: React.FC<{ eventCentreDetails: EventCentreDetails, eventCentre: eventRegDetails, eventCentreImage: { images: string[] } }> = ({ eventCentreDetails, eventCentre, eventCentreImage }) => {
    function capitalizeWords(inputString: string) {
        return inputString.replace(/\b\w/g, (char: string) => char.toUpperCase());
    }
    return (
        <>

            <EventCentreImages eventImages={eventCentreImage.images} />
            <section className='mx-auto overflow-x-hidden w-[95%] sm:w-[90%]'>
                < div className="text-white bg-[#856D47] rounded-xl p-4 sm:p-8 flex flex-col max-w-[700px] space-y-4 mt-12">
                    <p className='font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl'>{eventCentre.event_centre_name}</p>
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
                    <Link href={`/event-centre/checkout/${eventCentre.slug}`} className='border w-[200px] rounded-md border-white py-3 px-4' >Proced To Booking</Link>
                </div>

                <div className="max-w-[700px]">
                    <p className="my-4">{eventCentreDetails.description || "No description available"}</p>
                    <div className="flex flex-wrap">
                        {eventCentreDetails.amenities &&
                            eventCentreDetails.amenities.map((amenity, index) => (
                                <ul key={index} className="flex flex-wrap">
                                    <li
                                        key={index}
                                        className="mr-4 py-2 px-3 my-2 rounded-sm text-white bg-[#856D47]"
                                    >
                                        {amenity || "N/A"}
                                    </li>
                                </ul>
                            ))}
                    </div>
                    <Comments eventCentreId={eventCentre.id} />
                </div>
            </section>

        </>
    )
}

export default EventDetails