import Link from "next/link";

type EventCentreDetails = {
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
    eventCentreDetails: EventCentreDetails | null;
};

const EventCard: React.FC<EventProps> = ({ eventCentre, eventCentreDetails }) => {

    return (
        <>
            <Link href={`/event-centre/${eventCentre?.slug}`}>
                <p>{eventCentre.event_centre_name}</p>
            </Link>
        </>
    );
};

export default EventCard