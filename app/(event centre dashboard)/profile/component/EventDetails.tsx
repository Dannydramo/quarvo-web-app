'use client'
import { EventCentreDetails } from "@/types/eventTypes";
import { EventStore } from "@/store/eventInfo";
import EditProfile from "./EditProfile";
import EventCentreImages from "./EventCentreImages";


const EventDetails: React.FC<{ eventCentreDetails: EventCentreDetails }> = ({ eventCentreDetails }) => {
    const { eventDetails } = EventStore()
    function capitalizeWords(inputString: string) {
        return inputString.replace(/\b\w/g, (char: string) => char.toUpperCase());
    }
    return (
        <>

            <EventCentreImages />
            <div className="bg-[#856D47] text-white rounded-xl p-8 flex flex-col max-w-[700px] space-y-4 mt-4">
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
            </div>

            <div className="">
                <p className="my-4">{eventCentreDetails.description || "No description available"}</p>
                <div className="flex flex-wrap">
                    {eventCentreDetails.amenities &&
                        eventCentreDetails.amenities.map((amenity, index) => (
                            <ul key={index} className="flex flex-wrap">
                                <li
                                    key={index}
                                    className="mr-4 p-2 my-2 text-white bg-[#856D47]"
                                >
                                    {amenity || "N/A"}
                                </li>
                            </ul>
                        ))}
                </div>
            </div>

            <div className="mt-6">
                <EditProfile eventCentreDetails={eventCentreDetails} />
            </div>
        </>
    )
}

export default EventDetails