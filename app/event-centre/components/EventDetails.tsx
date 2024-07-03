"use client";
import { EventCentreDetails, eventRegDetails } from "@/types/eventTypes";
import React from "react";
import EventCentreImages from "./EventCentreImages";
import Comments from "./Comments";
import Image from "next/image";
import AvailabiltyForm from "./AvailabilityForm";

const EventDetails: React.FC<{
    eventCentreDetails: EventCentreDetails;
    eventCentre: eventRegDetails;

}> = ({ eventCentreDetails, eventCentre, }) => {
    function capitalizeWords(inputString: string) {
        return inputString.replace(/\b\w/g, (char: string) =>
            char.toUpperCase()
        );
    }

    return (
        <>
            <Image
                src={eventCentreDetails.images[0]}
                alt="main_image"
                height={400}
                width={500}
                className="w-full h-[400px] lg:min-h-[60vh] xl:max-h-[70vh]"
            />
            <section className="mx-auto overflow-x-hidden w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%]">
                <div className="max-w-[800px]">
                    <p className="font-bold text-lg sm:text-xl md:text-2xl mt-8 lg:text-4xl">
                        {eventCentre.event_centre_name}
                    </p>
                    <p className="mt-6 text-base md:text-lg">
                        {eventCentreDetails.description ||
                            "No description available"}
                    </p>
                    <hr className="border my-8 opacity-70 border-[#856D47]" />
                    <div className="mt-4 text-base flex flex-col space-y-2 md:text-lg">
                        <h1 className="font-bold text-lg sm:text-xl md:text-2xl mb-4 lg:text-4xl">
                            EventCentre Details
                        </h1>
                        <p>
                            <span>Phone Number: </span>
                            <span>{eventCentre.phone_number}</span>
                        </p>
                        <p>
                            <span>Email Address: </span>
                            <span>{eventCentre.email}</span>
                        </p>
                        <p>
                            <span>State: </span>
                            <span>{capitalizeWords(eventCentre.state)}</span>
                        </p>
                        <p>
                            <span>L.G.A: </span>
                            <span>
                                {capitalizeWords(eventCentreDetails.lga)}
                            </span>
                        </p>
                        <p>
                            <span>Address: </span>
                            <span>{eventCentreDetails.address}</span>
                        </p>
                        <p>
                            <span>Opening Time: </span>
                            <span>{eventCentreDetails.open_time}</span>
                        </p>
                        <p>
                            <span>Closing Time: </span>
                            <span>{eventCentreDetails.close_time}</span>
                        </p>
                        <p>
                            <span>Price: </span>
                            <span>{eventCentreDetails.price}</span>
                        </p>
                        <p>
                            <span>Opening Days: </span>
                            <span>{eventCentreDetails.open_days}</span>
                        </p>
                        <AvailabiltyForm
                            eventCentre={eventCentre}
                            eventPrice={eventCentreDetails.price}
                        />
                    </div>
                </div>

                <div className="max-w-[800px]">
                    <hr className="border my-8 opacity-70 border-[#856D47]" />
                    <h1 className="font-bold text-lg sm:text-xl md:text-2xl my-4 lg:text-4xl">
                        Photo Gallery
                    </h1>
                    <EventCentreImages eventImages={eventCentreDetails.images} />
                </div>

                <div className="max-w-[800px]">
                    <h1 className="font-bold text-lg sm:text-xl md:text-2xl mt-8 mb-4 lg:text-4xl">
                        Amenities
                    </h1>
                    <div className="flex flex-wrap">
                        {eventCentreDetails.amenities &&
                            eventCentreDetails.amenities.map(
                                (amenity, index) => (
                                    <ul key={index} className="flex flex-wrap">
                                        <li
                                            key={index}
                                            className="mr-4 py-2 px-3 my-2 rounded-sm text-white bg-[#856D47]"
                                        >
                                            {amenity || "N/A"}
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
