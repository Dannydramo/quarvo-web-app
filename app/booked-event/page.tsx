'use client';
import React, { useEffect, useState } from 'react';
import UserDashboardLayout from '../components/UserDashboardLayout';
import { fetchUserEventBookings } from '@/services/bookings';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
const BookedEvent = () => {
    const [bookedEvents, setBookedEvents] = useState<any[]>([]);
    const fetchBookingDetails = async () => {
        try {
            const { message, data, status } = await fetchUserEventBookings();
            if (status !== 200) {
                console.log(message);
            }
            setBookedEvents(data.bookings);
        } catch (error) {
            console.log('Unable to fetch event details');
        }
    };
    useEffect(() => {
        fetchBookingDetails();
    }, []);
    return (
        <UserDashboardLayout>
            <section className="mx-auto mt-8 overflow-x-hidden w-[95%] sm:w-[90%]">
                <Table>
                    <TableCaption>A list of your bookings.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">S/N</TableHead>
                            <TableHead>Event Centre</TableHead>
                            <TableHead>Date Booked</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookedEvents?.map((booked, index) => (
                            <TableRow key={booked.id}>
                                <TableCell className="font-medium">
                                    {index + 1}
                                </TableCell>
                                <TableCell>
                                    {booked.event_centre.event_centre_name}
                                </TableCell>
                                <TableCell>
                                    {
                                        new Date(booked.date)
                                            .toISOString()
                                            .split('T')[0]
                                    }
                                </TableCell>
                                <TableCell>{`${booked.amount}`}</TableCell>
                                <TableCell>
                                    {
                                        booked.event_centre.event_centre_details
                                            .address
                                    }
                                </TableCell>
                                <TableCell>
                                    +234{booked.event_centre.phone_number}
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={`/event-centre/${booked.event_centre.slug}`}
                                    >
                                        View Event Centre
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
        </UserDashboardLayout>
    );
};

export default BookedEvent;
