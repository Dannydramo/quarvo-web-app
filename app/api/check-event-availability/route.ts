import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function POST(req: NextRequest) {
    try {
        const { event_centre_id, date } = await req.json();

        const isDateBooked = await prisma.booking.findFirst({
            where: {
                event_centre_id,
                date: {
                    equals: new Date(date),
                },
            },
        });

        if (isDateBooked) {
            return NextResponse.json({
                message: 'This date has already been booked.',
                status: 200,
            });
        }

        return NextResponse.json({ message: 'Date Available', status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: 'Internal server error',
            status: 500,
        });
    }
}
