import EventCard from '../components/EventCard';
import prisma from '@/prisma/prisma';
import UserDashboardLayout from '../components/UserDashboardLayout';

const fetchAllEventCentre = async () => {
    const eventCentres = await prisma.eventCentre.findMany({
        select: {
            id: true,
            email: true,
            event_centre_name: true,
            phone_number: true,
            state: true,
            slug: true,
            created_at: true,
            updatedAt: true,
            event_logo: true,
            event_centre_details: true,
        },
    });

    const filteredEventCentres = eventCentres.filter(
        (eventCentre) => eventCentre.event_centre_details !== null
    );

    return { eventCentres: filteredEventCentres };
};

const EventCentres = async () => {
    const { eventCentres } = await fetchAllEventCentre();

    return (
        <>
            <UserDashboardLayout>
                <section className="mx-auto overflow-x-hidden w-[95%] sm:w-[90%]">
                    <div className="my-2 sm:my-4 text-center">
                        <p className="font-bold text-[#095A66] text-lg sm:text-xl my-2 sm:my-4">
                            EVENTS
                        </p>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl my-2 sm:my-4 font-bold">
                            Browse all the event centres
                        </h1>
                    </div>
                    <div className="grid gap-8 my-8 sm:grid-cols-2 xl:grid-cols-3">
                        {eventCentres.map((eventCentre, index) => (
                            <EventCard
                                key={eventCentre.id}
                                eventCentre={eventCentre}
                            />
                        ))}
                    </div>
                </section>
            </UserDashboardLayout>
        </>
    );
};

export default EventCentres;
