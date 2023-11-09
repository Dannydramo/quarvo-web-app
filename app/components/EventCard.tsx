
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
};

type EventProps = {
    eventCentre: EventCentre;
    eventCentreImages: EventCentreImages | null;
};
import Image from 'next/image';
const EventCard: React.FC<EventProps> = ({ eventCentre, eventCentreImages }) => {
    const imageUrl = eventCentreImages?.main_image;

    if (!imageUrl) {
        // Return some default image or placeholder
        return <p>No image available</p>;
    }

    return (
        <>
            <Link href={`/event-centre/${eventCentre?.slug}`}>
                <Image src={imageUrl} alt='image' width={100} height={200} />
                <p>{eventCentre.event_centre_name}</p>
            </Link>
        </>
    );
};

export default EventCard