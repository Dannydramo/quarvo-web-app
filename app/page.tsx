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

  const eventCentreDetails = await Promise.all(
    eventCentres.map(async (eventCentre) => {
      return await prisma.eventCentreDetails.findUnique({
        where: {
          event_centre_id: eventCentre.id,
        },
        select: {
          main_image: true
        }
      })
    })
  )

  return { eventCentres, eventCentreDetails }
}

const Home = async () => {
  const { eventCentres, eventCentreDetails } = await fetchAllEvetCentre()

  console.log(eventCentres, eventCentreDetails)

  return (
    <>
      {eventCentres.map((eventCentre, index) => (
        <EventCard
          key={eventCentre.id}
          eventCentre={eventCentre}
          eventCentreDetails={eventCentreDetails[index]}
        />
      ))}
    </>
  )
}

export default Home
