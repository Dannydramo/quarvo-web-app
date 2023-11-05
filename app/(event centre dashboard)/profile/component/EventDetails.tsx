'use client'
import { EventCentreDetails } from "@/types/eventTypes";
import { EventStore } from "@/store/eventInfo";
import { Carousel } from "antd";
import EditProfile from "./EditProfile";


const EventDetails: React.FC<{ eventCentreDetails: EventCentreDetails }> = ({ eventCentreDetails }) => {
    const { eventDetails } = EventStore()
    console.log((eventCentreDetails))
    return (
        <>
            <Carousel autoplay>
                {eventCentreDetails.images.map((image, index) => (
                    <div key={index} className={`min-h-[60vh] lg:max-h-[70vh] bg-[${image}] bg-cover bg-center p-4 bg-no-repeat`}></div>
                ))}
            </Carousel>
            <div className="bg-[#F4F0EC] rounded-xl p-8 flex flex-col max-w-[700px] space-y-4 mt-4">
                <p>
                    <span className="font-bold">Event Name:</span>
                    <span>{eventDetails?.event_centre_name}</span>
                </p>
                <p>
                    <span className="font-bold">Phone Number:</span>
                    <span>{eventDetails?.phone_number}</span>
                </p>
                <p>
                    <span className="font-bold">Email Address:</span>
                    <span>{eventDetails?.email}</span>
                </p>
                <p>
                    <span className="font-bold">State:</span>
                    <span>{eventDetails?.state}</span>
                </p>
                <p>
                    <span className="font-bold">L.G.A:</span>
                    <span>{eventCentreDetails.lga}</span>
                </p>
                <p>
                    <span className="font-bold">Address:</span>
                    <span className="">
                        {eventCentreDetails.address}
                    </span>
                </p>
                <p>
                    <span className="font-bold">Opening Time:</span>
                    <span>{eventCentreDetails.open_time}</span>
                </p>
                <p>
                    <span className="font-bold">Closing Time:</span>
                    <span>{eventCentreDetails.close_time}</span>
                </p>
                <p>
                    <span className="font-bold">Price:</span>
                    <span>{eventCentreDetails.price}</span>
                </p>
                <p>
                    <span className="font-bold">Opening Days:</span>
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
                                    className="mr-4 p-4 my-2 bg-[#fbfaf8]"
                                >
                                    {amenity || "N/A"}
                                </li>
                            </ul>
                        ))}
                </div>
            </div>

            <div className="mt-8">
                <EditProfile eventCentreDetails={eventCentreDetails} />
            </div>
        </>
    )
}

export default EventDetails