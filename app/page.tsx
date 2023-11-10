import { PrismaClient } from '@prisma/client'
import EventCard from './components/EventCard'

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

  const eventCentreLga = await Promise.all(
    eventCentres.map(async (eventCentre) => {
      return await prisma.eventCentreDetails.findUnique({
        where: {
          event_centre_id: eventCentre.id,
        },
        select: {
          lga: true
        }
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

  return { eventCentres, eventCentreImages, eventCentreLga }
}

const Home = async () => {
  const { eventCentres, eventCentreImages, eventCentreLga } = await fetchAllEvetCentre()

  return (
    <>
      <section className='mx-auto overflow-x-hidden w-[90%]'>
        <div className="display_event gap-4">
          {eventCentres.map((eventCentre, index) => (
            <EventCard
              key={eventCentre.id}
              eventCentre={eventCentre}
              eventCentreImages={eventCentreImages[index]}
              lga={eventCentreLga[index]!}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
