import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function GET(req: NextRequest) {
    try {
        const eventCentres = await prisma.eventCentre.findMany({
            select: {
                id: true,
                email: true,
                event_centre_name: true,
                phone_number: true,
                state: true,
                slug: true,
                created_at: true,
                updatedAt: true,
                event_logo: true,
                event_centre_details: true,
            },
        });

        const filteredEventCentres = eventCentres.filter(
            (eventCentre) => eventCentre.event_centre_details !== null
        );
        return NextResponse.json({
            message: 'Évent centre fetched successfully',
            status: 200,
            eventCentres: filteredEventCentres,
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Unable to get favorite event centres',
            status: 500,
        });
    }
}
