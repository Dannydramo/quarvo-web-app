'use client'
import React, { useEffect, useState } from 'react'
import { fetchEventBookings } from '@/utils/eventUtils'
import { bookedProps } from '@/types/eventTypes'
import BookedTable from './BookedTable'
import { BookingStore } from '@/store/bookingInfo'

const BookingData = () => {
    const { bookingDetails } = BookingStore()
    return (
        <>
            <BookedTable bookedTable={bookingDetails} />
        </>
    )
}

export default BookingData