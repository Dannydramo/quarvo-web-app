import { PrismaClient } from '@prisma/client'
import EventCheckout from './components/EventCheckout'
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
            event_logo: true
        }
    })
    const eventCentreImage = await prisma.eventCentreImages.findUnique({
        where: {
            event_centre_id: eventCentre?.id
        },
        select: {
            main_image: true
        }
    })
    const eventCentreDetails = await prisma.eventCentreDetails.findUnique({
        where: {
            event_centre_id: eventCentre?.id
        }
    })
    return { eventCentre, eventCentreDetails, eventCentreImage }
}

const EventCentreDetails = async ({ params }: { params: { slug: string } }) => {
    const { eventCentre, eventCentreDetails, eventCentreImage } = await fetchEventCentreDetails(params.slug)

    return (
        <>
            <Navigation />
            <section className='mx-auto overflow-x-hidden w-[95%] sm:w-[90%]'>
                {eventCentreDetails && eventCentre && eventCentreImage && <EventCheckout eventCentreImage={eventCentreImage} eventCentreDetails={eventCentreDetails} eventCentre={eventCentre} />}
            </section>
        </>
    )
}

export default EventCentreDetails