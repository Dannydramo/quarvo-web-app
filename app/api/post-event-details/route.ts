import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function POST(req: NextRequest) {
    try {
        const {
            id,
            amenities,
            address,
            openingTime,
            closingTime,
            lga,
            description,
            openDays,
            price,
            images,
        } = await req.json();

        const eventCentreDetails = await prisma.eventCentreDetails.create({
            data: {
                open_time: openingTime,
                close_time: closingTime,
                open_days: openDays,
                description,
                address,
                lga,
                price,
                amenities,
                images,
                eventCentre: {
                    connect: {
                        id: id,
                    },
                },
            },
        });
        return NextResponse.json({
            message: 'Event Centre Details created successfully',
            status: 200,
            eventCentreDetails,
        });
    } catch (error) {
        return NextResponse.json({
            message:
                'An error occurred while creating the event center details.',
            status: 500,
        });
    }
}
