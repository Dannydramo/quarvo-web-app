import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';
export async function PATCH(req: NextRequest) {
    try {
        const {
            id,
            amenities,
            address,
            openingTime,
            closingTime,
            description,
            openDays,
            price,
            images,
        } = await req.json();
        const eventCentreDetails = await prisma.eventCentreDetails.update({
            where: {
                event_centre_id: id,
            },
            data: {
                description,
                open_time: openingTime,
                address,
                close_time: closingTime,
                open_days: openDays,
                price,
                amenities,
                images,
            },
        });
        return NextResponse.json({
            message: 'Event Centre Details updated successfully',
            status: 200,
            eventCentreDetails,
        });
    } catch (error) {
        return NextResponse.json({
            message:
                'An error occurred while updating the event center details.',
            status: 500,
        });
    }
}
