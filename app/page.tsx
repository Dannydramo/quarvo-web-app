import { PrismaClient } from '@prisma/client'
import EventCard from './components/EventCard'
import Navigation from './components/Navigation'

const prisma = new PrismaClient()

const fetchAllEvetCentre = async () => {
    const eventCentres = await prisma.eventCentre.findMany({
        select: {
            id: true,
            state: true,
            event_centre_name: true,
            email: true,
            phone_number: true,
            slug: true,
            event_logo: true
        },
    })

    const eventCentreDetails = await Promise.all(
        eventCentres.map(async (eventCentre) => {
            return await prisma.eventCentreDetails.findUnique({
                where: {
                    event_centre_id: eventCentre.id,
                },
            })
        })
    )

    const eventCentreImages = await Promise.all(
        eventCentres.map(async (eventCentre) => {
            return await prisma.eventCentreImages.findUnique({
                where: {
                    event_centre_id: eventCentre.id,
                },
                select: {
                    main_image: true
                }
            })
        })
    )

    return { eventCentres, eventCentreImages, eventCentreDetails }
}

const Home = async () => {
    const { eventCentres, eventCentreImages, eventCentreDetails } = await fetchAllEvetCentre()

    return (
        <>
            <Navigation />
            <section className='mx-auto overflow-x-hidden w-[95%] sm:w-[90%]'>
                <div className="my-4 text-center">
                    <p className='font-bold text-[#856D47] text-lg sm:text-xl my-4'>EVENTS</p>
                    <h1 className='text-2xl sm:text-3xl md:text-4xl my-4 font-bold'>Browse all the event centres</h1>
                </div>
                <div className="display_event mb-12 gap-4">
                    {eventCentres.map((eventCentre, index) => (
                        <EventCard
                            key={eventCentre.id}
                            eventCentre={eventCentre}
                            eventCentreImages={eventCentreImages[index]}
                            eventCentreDetails={eventCentreDetails[index]!}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}

export default Home
