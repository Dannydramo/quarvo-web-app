import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { eventCentreId, formattedDate, userId, eventPrice } = await req.json();

    const newBooking = await prisma.booking.create({
        data: {
            date: new Date(formattedDate),
            amount: eventPrice,
            user: {
                connect: { id: userId },
            },
            event_centre: {
                connect: { id: eventCentreId },
            },
        },
    });

    return NextResponse.json({ message: 'Event centre booked successfully', status: 200 });
}
