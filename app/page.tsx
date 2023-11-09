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
    },
  })

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

  return { eventCentres, eventCentreImages }
}

const Home = async () => {
  const { eventCentres, eventCentreImages } = await fetchAllEvetCentre()

  console.log(eventCentres, eventCentreImages)

  return (
    <>
      {eventCentres.map((eventCentre, index) => (
        <EventCard
          key={eventCentre.id}
          eventCentre={eventCentre}
          eventCentreImages={eventCentreImages[index]}
        />
      ))}
    </>
  )
}

export default Home
