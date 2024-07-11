import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const userId = new URLSearchParams(url.searchParams).get('userId');
        const eventCentreId = new URLSearchParams(url.searchParams).get(
            'eventCentreId'
        );
        const favorite = await prisma.favorite.findUnique({
            where: {
                user_id_event_centre_id: {
                    user_id: userId as string,
                    event_centre_id: eventCentreId as string,
                },
            },
        });

        if (!favorite) {
            return NextResponse.json({
                status: 404,
                message: 'Event centre not found in favourite',
            });
        }

        // Remove the event centre from favorites
        await prisma.favorite.delete({
            where: {
                user_id_event_centre_id: {
                    user_id: userId,
                    event_centre_id: eventCentreId,
                },
            },
        });
        return NextResponse.json({
            status: 200,
            message: 'Event centre removed from favorites successfully.',
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            status: 500,
        });
    }
}
