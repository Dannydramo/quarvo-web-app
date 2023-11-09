
import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        const { id, amenities, address, openingTime, closingTime, lga, description, openDays, price } = await req.json()

        const eventCentreDetails = await prisma.eventCentreDetails.create({
            data: {
                description: description,
                open_time: openingTime,
                address: address,
                close_time: closingTime,
                open_days: openDays,
                lga: lga,
                price: price,
                amenities: amenities,
                event_centre: {
                    connect: {
                        id: id,
                    },
                },
            },
        });
        return NextResponse.json({ message: 'Event Centre Details created successfully', status: 200, eventCentreDetails });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred while creating the event center details.", status: 500, });
    }
}
