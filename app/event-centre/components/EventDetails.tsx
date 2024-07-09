'use client';
import { eventRegDetails } from '@/types/eventTypes';
import React from 'react';
import EventCentreImages from './EventCentreImages';
import Comments from './Comments';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Key } from 'react';
import AvailabiltyForm from './AvailabilityForm';
import { Carousel } from 'antd';
const EventDetails: React.FC<{
    eventCentre: eventRegDetails;
}> = ({ eventCentre }) => {
    function capitalizeWords(inputString: string) {
        return inputString.replace(/\b\w/g, (char: string) =>
            char.toUpperCase()
        );
    }

    return (
        <>
            <Carousel autoplay>
                {eventCentre?.event_centre_details?.images?.map(
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

            <section className="mx-auto overflow-x-hidden md:w-[95%] lg:w-[90%]">
                <div className="max-w-[700px]">
                    <p className="font-bold text-lg sm:text-xl md:text-2xl mt-8 lg:text-4xl">
                        {eventCentre.event_centre_name}
                    </p>
                    <p className="mt-6 text-base md:text-lg">
                        {eventCentre?.event_centre_details?.description}
                    </p>
                    <hr className="border my-8 opacity-70 border-[#095A66]" />
                    <div className="mt-4 bg-[#095A66] text-sm sm:text-base text-[#B5CDD1] rounded-xl p-4 flex flex-col space-y-2 ">
                        <h1 className="font-extrabold text-lg sm:text-xl md:text-2xl mb-4 lg:text-4xl">
                            EventCentre Details
                        </h1>
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
                            <span>{capitalizeWords(eventCentre.state)}</span>
                        </p>
                        <p>
                            <span className="font-bold">L.G.A: </span>
                            <span>
                                {capitalizeWords(
                                    eventCentre?.event_centre_details?.lga!
                                )}
                            </span>
                        </p>
                        <p>
                            <span className="font-bold">Address: </span>
                            <span>
                                {eventCentre?.event_centre_details?.address}
                            </span>
                        </p>
                        <p>
                            <span className="font-bold">Opening Time: </span>
                            <span>
                                {eventCentre?.event_centre_details?.open_time}
                            </span>
                        </p>
                        <p>
                            <span className="font-bold">Closing Time: </span>
                            <span>
                                {eventCentre?.event_centre_details?.close_time}
                            </span>
                        </p>
                        <p>
                            <span className="font-bold">Price: </span>
                            <span>
                                {eventCentre?.event_centre_details?.price}
                            </span>
                        </p>
                        <p>
                            <span className="font-bold">Opening Days: </span>
                            <span>
                                {eventCentre?.event_centre_details?.open_days}
                            </span>
                        </p>
                    </div>
                    <AvailabiltyForm
                        eventCentre={eventCentre}
                        eventPrice={eventCentre?.event_centre_details?.price!}
                    />
                </div>

                <div className="max-w-[800px]">
                    <hr className="border my-8 opacity-70 border-[#856D47]" />
                    <h1 className="font-bold text-lg sm:text-xl md:text-2xl my-4 lg:text-4xl">
                        Photo Gallery
                    </h1>
                    <EventCentreImages
                        eventImages={eventCentre?.event_centre_details?.images!}
                    />
                </div>

                <div className="max-w-[800px]">
                    <h1 className="font-bold text-lg sm:text-xl md:text-2xl mt-8 mb-4 lg:text-4xl">
                        Amenities
                    </h1>
                    <div className="flex flex-wrap">
                        {eventCentre?.event_centre_details?.amenities &&
                            eventCentre?.event_centre_details?.amenities.map(
                                (amenity, index) => (
                                    <ul key={index} className="flex flex-wrap">
                                        <li
                                            key={index}
                                            className="mr-4 py-2 px-3 my-2 rounded-sm text-white bg-[#856D47]"
                                        >
                                            {amenity || 'N/A'}
                                        </li>
                                    </ul>
                                )
                            )}
                    </div>
                    <hr className="border my-8 opacity-70 border-[#856D47]" />
                    <Comments eventCentreId={eventCentre.id} />
                </div>
            </section>
        </>
    );
};

export default EventDetails;
