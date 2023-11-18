import { EventCentreDetails, eventRegDetails } from '@/types/eventTypes'
import Image from 'next/image'
import React from 'react'
import BookingForm from './BookingForm'
const EventCheckout: React.FC<{ eventCentreDetails: EventCentreDetails, eventCentre: eventRegDetails, eventCentreImage: { main_image: string } }> = ({ eventCentreDetails, eventCentre, eventCentreImage }) => {
    return (
        <>
            <section className='mx-auto md:w-[95%] lg:w-[90%]'>
                <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 justify-center md:flex-row items-center">
                    <div className='md:w-[50%] lg:w-[45%]'>
                        <Image src={eventCentreImage.main_image} alt='Event main image' width={600} height={400} priority={true} quality={100} className='h-[300px] rounded-md lg:min-h-[60vh] mt-4 lg:max-h-[70vh] w-full' />
                    </div>
                    <div className="w-full md:w-[50%] lg:w-[45%]">
                        <BookingForm eventCentreDetails={eventCentreDetails} eventCentre={eventCentre} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default EventCheckout