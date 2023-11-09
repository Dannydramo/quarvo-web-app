import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { PrismaClient } from '@prisma/client'
import * as jose from 'jose'

const prisma = new PrismaClient()
export async function PATCH(req: NextRequest) {
    try {
        const { id,
            amenities,
            address,
            openingTime,
            closingTime,
            description,
            openDays,
            price } = await req.json()
        const eventCentreDetails = await prisma.eventCentreDetails.update({
            where: {
                event_centre_id: id
            },
            data: {
                description: description,
                open_time: openingTime,
                address: address,
                close_time: closingTime,
                open_days: openDays,
                price: price,
                amenities: amenities,
            }
        })
        return NextResponse.json({ message: 'Event Centre Details updated successfully', status: 200, eventCentreDetails });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred while updating the event center details.", status: 500, });
    }


}