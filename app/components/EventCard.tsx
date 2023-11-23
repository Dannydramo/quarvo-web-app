
import Link from "next/link";

type EventCentreImages = {
    main_image: string | null;
};

type EventCentre = {
    id: string;
    state: string;
    event_centre_name: string;
    email: string;
    phone_number: string;
    slug: string;
    event_logo: string | null
};

type EventProps = {
    eventCentre: EventCentre;
    eventCentreImages: EventCentreImages | null;
    eventCentreDetails: EventCentreDetails;
};
import Image from 'next/image';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { EventCentreDetails } from "@/types/eventTypes";
import { Calendar } from "lucide-react";
import Location from "@/svgs/Location";
const EventCard: React.FC<EventProps> = ({ eventCentre, eventCentreImages, eventCentreDetails }) => {
    const imageUrl = eventCentreImages?.main_image;
    const logoUrl = eventCentre?.event_logo

    if (!eventCentreDetails?.price || !eventCentreDetails?.open_days) {
        return
    }

    if (!imageUrl || !logoUrl) {
        return (
            <>
                <Card className="rounded-xl overflow-x-hidden group cursor-pointer relative">
                    <p className='absolute top-3 left-3 z-50 text-white bg-[#856D47] py-2 px-6 rounded-[2rem]'>Not Available</p>
                    <Image src={'/auth_bg.jpg'} alt='image' priority={true} width={400} height={200} className="w-full transform duration-300 transition group-hover:scale-105 rounded-t-xl group-hover:opacity-70 h-[250px]" />
                    <div className="p-4">
                        <div className="flex justify-between items-center">
                            <p className='font-bold text-xl hover:text-[#856D47]'>{eventCentre.event_centre_name}</p>
                        </div>
                        <p className='font-bold text-xl my-2'>${eventCentreDetails?.price}</p>
                        <div className="flex space-x-3 my-2 items-center">
                            <Calendar className="text-base text-[#856D47]" />
                            <p className="text-base md:text-lg">{eventCentreDetails?.open_days}</p>
                        </div>
                        <div className="flex space-x-3 my-2 items-center">
                            <Location />
                            <p className="text-base md:text-lg">{capitalizeWords(eventCentre.state)}, {capitalizeWords(eventCentreDetails.lga)}</p>
                        </div>
                    </div>

                </Card>
            </>
        )
    }
    function capitalizeWords(inputString: string) {
        return inputString?.replace(/\b\w/g, (char: string) => char.toUpperCase());
    }
    return (
        <>
            <Card className="rounded-xl group overflow-x-hidden relative">
                <p className='absolute top-3 left-3 text-white bg-[#856D47] py-2 z-50 px-6 rounded-[2rem]'>Available</p>
                <Link href={`/event-centre/${eventCentre?.slug}`}>
                    <Image src={imageUrl} alt='image' priority={true} width={400} height={200} className="w-full transform duration-300 transition group-hover:scale-105 rounded-t-xl group-hover:opacity-70 h-[250px]" />
                    <div className="p-4 px-6">
                        <div className="flex justify-between mb-2 space-x-4 items-center">
                            <p className='font-bold text-lg sm:text-xl hover:text-[#856D47]'>{eventCentre.event_centre_name}</p>
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={logoUrl} alt="event logo" />
                            </Avatar>
                        </div>
                        <p className='font-bold text-lg sm:text-xl my-2'>${eventCentreDetails.price}</p>
                        <div className="flex space-x-3 my-2 items-center">
                            <Calendar className="text-base text-[#856D47]" />
                            <p className="text-base md:text-lg">{eventCentreDetails.open_days}</p>
                        </div>
                        <div className="flex space-x-3 my-2 items-center">
                            <Location />
                            <p className="text-base md:text-lg">{capitalizeWords(eventCentre.state)}, {capitalizeWords(eventCentreDetails.lga)}</p>
                        </div>
                    </div>
                </Link>
            </Card>
        </>
    );
};

export default EventCard