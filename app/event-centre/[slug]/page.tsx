import { PrismaClient } from '@prisma/client'
import EventDetails from '../components/EventDetails'
import Navigation from '@/app/components/Navigation'

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
            event_logo: true,
            reviews: {
                select: {
                    id: true,
                    full_name: true,
                    review_comment: true,
                    created_at: true,
                    updatedAt: true,
                },
            },
        }
    })
    const eventCentreImage = await prisma.eventCentreImages.findUnique({
        where: {
            event_centre_id: eventCentre?.id
        },
        select: {
            images: true
        }
    })
    const eventCentreDetails = await prisma.eventCentreDetails.findUnique({
        where: {
            event_centre_id: eventCentre?.id
        }
    })

    const reviews = eventCentre?.reviews || [];

    return { eventCentre, eventCentreDetails, eventCentreImage, reviews };
}

const EventCentreDetails = async ({ params }: { params: { slug: string } }) => {
    const { eventCentre, eventCentreDetails, eventCentreImage, reviews } = await fetchEventCentreDetails(params.slug)

    return (
        <>
            <Navigation />
            {eventCentreDetails && eventCentre && eventCentreImage && <EventDetails eventCentreImage={eventCentreImage} eventCentreDetails={eventCentreDetails} eventCentre={eventCentre} reviews={reviews} />}
        </>
    )
}

export default EventCentreDetails