import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { eventCentreId, formattedDate } = await req.json();

    const isDateBooked = await prisma.booking.findFirst({
        where: {
            event_centre_id: eventCentreId,
            date: {
                equals: new Date(formattedDate),
            },
        },
    });

    if (isDateBooked) {
        return NextResponse.json({ message: 'This date has already been booked.', status: 200 });
    }

    return NextResponse.json({ message: 'Date Available', status: 200 });
}
