'use client'
import React, { useEffect } from 'react'
import { fetchEventBookings } from '@/utils/eventUtils'

const BookingData = () => {
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {

                const { message, data, status } = await fetchEventBookings()
                if (status !== 200) {
                    console.log(message);
                }
                // setEventDetails(data)
                console.log(data.bookings);

            } catch (error) {
                console.log('Unable to fetch event details');
            }
        }
        fetchEventDetails()
    }, [])
    return (
        <p>gfdgfdhfgd</p>
    )
}

export default BookingData