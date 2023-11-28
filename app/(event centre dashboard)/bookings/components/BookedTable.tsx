import { bookedProps } from '@/types/eventTypes'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import UserBooking from './UserBooking'

const BookedTable: React.FC<{ bookedTable: bookedProps[] }> = ({ bookedTable }) => {
    return (
        <>
            <Table>
                <TableCaption>A list of your bookings.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">S/N</TableHead>
                        <TableHead>User Booking</TableHead>
                        <TableHead>Date Booked</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookedTable?.map((booked, index) => (
                        <TableRow key={booked.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell><UserBooking userId={booked.user_id} /></TableCell>
                            <TableCell>{new Date(booked.date).toISOString().split('T')[0]}</TableCell>
                            <TableCell>Paid</TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>

        </>
    )
}

export default BookedTable