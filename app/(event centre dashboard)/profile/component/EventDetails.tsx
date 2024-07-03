'use client';
import { EventCentreDetails } from '@/types/eventTypes';
import { EventStore } from '@/store/eventInfo';
import EditProfile from './EditProfile';
import { Carousel } from 'antd';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Key } from 'react';

const EventDetails: React.FC<{
    eventCentreDetails: {
        eventDetails: EventCentreDetails;
    };
}> = ({ eventCentreDetails }) => {
    const { eventDetails } = EventStore();
    function capitalizeWords(inputString: string) {
        return inputString.replace(/\b\w/g, (char: string) =>
            char.toUpperCase()
        );
    }
    return (
        <>
            <Carousel autoplay>
                {eventCentreDetails.eventDetails.images?.map(
                    (
                        image: string | StaticImport,
                        index: Key | null | undefined
                    ) => (
                        <Image
                            width={300}
                            height={100}
                            src={image}
                            priority={true}
                            quality={100}
                            className="h-[300px] lg:min-h-[60vh] mt-4 lg:max-h-[70vh] w-full rounded-lg"
                            key={index}
                            alt={'Images'}
                        />
                    )
                )}
            </Carousel>

            <div className="bg-[#095A66] text-white rounded-xl p-8 flex flex-col text-sm sm:text-base max-w-[700px] space-y-4 mt-4">
                <p>
                    <span className="font-bold">Event Name: </span>
                    <span>{eventDetails?.event_centre_name}</span>
                </p>
                <p>
                    <span className="font-bold">Phone Number: </span>
                    <span>{eventDetails?.phone_number}</span>
                </p>
                <p>
                    <span className="font-bold">Email Address: </span>
                    <span>{eventDetails?.email}</span>
                </p>
                <p>
                    <span className="font-bold">State: </span>
                    <span>{eventDetails?.state}</span>
                </p>
                <p>
                    <span className="font-bold">L.G.A: </span>
                    <span>
                        {capitalizeWords(eventCentreDetails.eventDetails.lga)}
                    </span>
                </p>
                <p>
                    <span className="font-bold">Address: </span>
                    <span className="">
                        {eventCentreDetails.eventDetails.address}
                    </span>
                </p>
                <p>
                    <span className="font-bold">Opening Time: </span>
                    <span>{eventCentreDetails.eventDetails.open_time}</span>
                </p>
                <p>
                    <span className="font-bold">Closing Time: </span>
                    <span>{eventCentreDetails.eventDetails.close_time}</span>
                </p>
                <p>
                    <span className="font-bold">Price: </span>
                    <span>{eventCentreDetails.eventDetails.price}</span>
                </p>
                <p>
                    <span className="font-bold">Opening Days: </span>
                    <span>{eventCentreDetails.eventDetails.open_days}</span>
                </p>
            </div>

            <div className="">
                <p className="my-6 w-full md:w-[80%] lg:w-[70%] text-sm sm:text-base">
                    {eventCentreDetails.eventDetails.description ||
                        'No description available'}
                </p>
                <div className="flex flex-wrap">
                    {eventCentreDetails.eventDetails.amenities &&
                        eventCentreDetails.eventDetails.amenities.map(
                            (amenity, index) => (
                                <ul key={index} className="flex flex-wrap">
                                    <li
                                        key={index}
                                        className="mr-4 py-2 px-4 my-2 text-white bg-[#095A66] rounded text-sm"
                                    >
                                        {amenity || 'N/A'}
                                    </li>
                                </ul>
                            )
                        )}
                </div>
            </div>

            <div className="mt-6">
                <EditProfile
                    eventCentreDetails={eventCentreDetails.eventDetails}
                />
            </div>
        </>
    );
};

export default EventDetails;
