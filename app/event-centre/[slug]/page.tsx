import { PrismaClient } from '@prisma/client'
import EventDetails from '../components/EventDetails'

const prisma = new PrismaClient()
const fetchEventCentreDetails = async (slug: string) => {
    const eventCentre = await prisma.eventCentre.findUnique({
        where: {
            slug: slug
        },
        select: {
            id: true,
            state: true,
            event_centre_name: true,
            email: true,
            phone_number: true,
            slug: true,
            event_logo: true
        }
    })
    const eventCentreDetails = await prisma.eventCentreDetails.findUnique({
        where: {
            event_centre_id: eventCentre?.id
        }
    })
    return { eventCentre, eventCentreDetails }
}

const EventCentreDetails = async ({ params }: { params: { slug: string } }) => {
    const { eventCentre, eventCentreDetails } = await fetchEventCentreDetails(params.slug)
    console.log(eventCentre, eventCentreDetails, params.slug);

    return (
        <>
            {eventCentreDetails && eventCentre && <EventDetails eventCentreDetails={eventCentreDetails} eventCentre={eventCentre} />}
        </>
    )
}

export default EventCentreDetails