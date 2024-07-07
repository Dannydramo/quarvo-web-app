import EventDetails from '../components/EventDetails';
import Navigation from '@/app/components/Navigation';
import prisma from '@/prisma/prisma';
const fetchEventCentreDetails = async (slug: string) => {
    const eventCentre = await prisma.eventCentre.findUnique({
        where: {
            slug: slug,
        },
        select: {
            id: true,
            state: true,
            event_centre_name: true,
            email: true,
            phone_number: true,
            slug: true,
            event_logo: true,
        },
    });
    console.log(eventCentre);

    const eventCentreDetails = await prisma.eventCentreDetails.findUnique({
        where: {
            event_centre_id: eventCentre?.id,
        },
    });

    return { eventCentre, eventCentreDetails };
};

const EventCentreDetails = async ({ params }: { params: { slug: string } }) => {
    const { eventCentre, eventCentreDetails } = await fetchEventCentreDetails(
        params.slug
    );

    return (
        <>
            <Navigation />
            <section>
                {eventCentreDetails && eventCentre && (
                    <EventDetails
                        eventCentreDetails={eventCentreDetails}
                        eventCentre={eventCentre}
                    />
                )}
            </section>
        </>
    );
};

export default EventCentreDetails;
