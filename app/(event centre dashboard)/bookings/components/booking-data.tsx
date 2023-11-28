'use client'
import React, { useEffect, useState } from 'react'
import { fetchEventBookings } from '@/utils/eventUtils'
import { bookedProps } from '@/types/eventTypes'
import BookedTable from './BookedTable'

const BookingData = () => {
    const [bookedData, setBokedData] = useState<bookedProps[]>()
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {

                const { message, data, status } = await fetchEventBookings()
                if (status !== 200) {
                    console.log(message);
                }
                console.log(data.bookings);
                setBokedData(data.bookings)
            } catch (error) {
                console.log('Unable to fetch event details');
            }
        }
        fetchEventDetails()
    }, [])
    return (
        <>
            <BookedTable bookedTable={bookedData!} />
        </>
    )
}

export default BookingData