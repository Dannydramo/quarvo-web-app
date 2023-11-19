import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { eventCentreId, date, userId } = await req.json();

        const isDateBooked = await prisma.booking.findFirst({
            where: {
                event_centre_id: eventCentreId,
                date: date,
            },
        });

        if (isDateBooked) {
            return NextResponse.json({ message: 'This date has already been booked.', status: 400 });
        }

        // const newBooking = await prisma.booking.create({
        //     data: {
        //         date: date,
        //         user: {
        //             connect: { id: userId },
        //         },
        //         event_centre: {
        //             connect: { id: eventCentreId },
        //         },
        //     },
        // });


        return NextResponse.json({ message: 'Date Available', status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Internal Server Error', status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
