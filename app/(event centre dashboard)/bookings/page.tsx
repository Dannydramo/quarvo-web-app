import React from 'react'
import Navigation from '../components/Navigation'
import { PrismaClient } from '@prisma/client'
import BookingData from './components/booking-data'
const prisma = new PrismaClient()


const Bookings = () => {
    return (
        <>
            <Navigation>
                <section className="w-[95%] mx-auto">

                    <BookingData />
                </section>
            </Navigation>
        </>
    )
}

export default Bookings