'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { EventProps } from '@/types/eventTypes';
import { Calendar } from 'lucide-react';
import Location from '@/svgs/Location';

const EventCard: React.FC<EventProps> = ({ eventCentre }) => {
    const logoUrl = eventCentre?.event_logo;

    function capitalizeWords(inputString: string) {
        return inputString?.replace(/\b\w/g, (char: string) =>
            char.toUpperCase()
        );
    }
    return (
        <>
            <Card className="rounded-lg group overflow-x-hidden p-2 bg-gray-200 relative">
                <Link href={`/event-centre/${eventCentre?.slug}`}>
                    <Image
                        src={eventCentre.event_centre_details?.images[0]!}
                        alt="image"
                        priority={true}
                        width={400}
                        height={200}
                        className="w-full rounded-md h-[250px]"
                    />
                    <div className="bg-white px-2 py-4 mt-2  rounded-md">
                        <div className="flex gap-2 items-center">
                            {logoUrl ? (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={logoUrl}
                                        alt="event logo"
                                    />
                                </Avatar>
                            ) : (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={'/default_logo.jpg'}
                                        alt="event logo"
                                    />
                                </Avatar>
                            )}
                            <p className="font-semibold text-[#095A66] text-sm sm:text-base">
                                {eventCentre.event_centre_name}
                            </p>
                        </div>
                        <div className=" my-2">
                            <p className="font-bold">
                                ₦{eventCentre.event_centre_details?.price}
                            </p>
                        </div>
                        <div className="flex items-center mt-2 text-sm">
                            <Calendar className="h-4 text-[#095A66]" />
                            <p className="">
                                {eventCentre.event_centre_details?.open_days}
                            </p>
                        </div>
                        <div className="flex items-center text-sm mt-2">
                            <Location className="h-4" />
                            <p>
                                {capitalizeWords(eventCentre.state)},{' '}
                                {capitalizeWords(
                                    eventCentre.event_centre_details?.lga!
                                )}
                            </p>
                        </div>
                    </div>
                </Link>
            </Card>
        </>
    );
};

export default EventCard;
