import EventDetails from '../components/EventDetails';
import UserDashboardLayout from '@/app/components/UserDashboardLayout';
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
            event_centre_details: true,
        },
    });

    return { eventCentre };
};

const EventCentreDetails = async ({ params }: { params: { slug: string } }) => {
    const { eventCentre } = await fetchEventCentreDetails(params.slug);

    return (
        <UserDashboardLayout>
            <section className="mx-auto overflow-x-hidden w-[95%] sm:w-[90%]">
                {eventCentre && <EventDetails eventCentre={eventCentre} />}
            </section>
        </UserDashboardLayout>
    );
};

export default EventCentreDetails;
