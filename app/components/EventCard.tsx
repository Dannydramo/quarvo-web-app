
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
    lga: { lga: string };
};
import Image from 'next/image';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
const EventCard: React.FC<EventProps> = ({ eventCentre, eventCentreImages, lga }) => {
    const imageUrl = eventCentreImages?.main_image;
    const logoUrl = eventCentre?.event_logo
    if (!imageUrl || !logoUrl) {
        return (
            <>
                <Card>
                    <Link href={`/event-centre/${eventCentre?.slug}`}>
                        <Image src={'/auth_bg.jpg'} alt='image' priority={true} width={400} height={200} className="w-full h-[350px]" />
                        <div className="p-4">
                            <div className="flex justify-between items-center">
                                <p>{eventCentre.event_centre_name}</p>
                                {/* <Avatar className="h-8 w-8">
                                <AvatarImage src={logoUrl} alt="event logo" />
                            </Avatar> */}
                            </div>
                            <p>{capitalizeWords(eventCentre.state)}</p>
                        </div>
                    </Link>
                </Card>
            </>
        )
    }
    function capitalizeWords(inputString: string) {
        return inputString.replace(/\b\w/g, (char: string) => char.toUpperCase());
    }
    return (
        <>
            <Card>
                <Link href={`/event-centre/${eventCentre?.slug}`}>
                    <Image src={imageUrl} alt='image' priority={true} width={400} height={200} className="w-full h-[350px]" />
                    <div className="p-4">
                        <div className="flex justify-between items-center">
                            <p>{eventCentre.event_centre_name}</p>
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={logoUrl} alt="event logo" />
                            </Avatar>
                        </div>
                        <p>{capitalizeWords(eventCentre.state)}, {lga.lga}</p>
                    </div>
                </Link>
            </Card>
        </>
    );
};

export default EventCard