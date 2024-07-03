import { bookedProps } from '@/types/eventTypes';
import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const BookedTable: React.FC<{ bookedTable: bookedProps[] }> = ({
    bookedTable,
}) => {
    return (
        <>
            <Table>
                <TableCaption>A list of your bookings.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">S/N</TableHead>
                        <TableHead>User Booking</TableHead>
                        <TableHead>Date Booked</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookedTable?.map((booked, index) => (
                        <TableRow key={booked.id}>
                            <TableCell className="font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell>
                                {booked.user.first_name +
                                    ' ' +
                                    booked.user.last_name}
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
                                <span className="bg-[#095A66] text-[#B5CDD1] py-2 px-6 text-center rounded-full">
                                    Paid
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default BookedTable;
