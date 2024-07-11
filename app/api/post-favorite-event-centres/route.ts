import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function POST(req: NextRequest) {
    try {
        const { userId, eventCentreId } = await req.json();

        const existingFavorite = await prisma.favorite.findUnique({
            where: {
                user_id_event_centre_id: {
                    user_id: userId,
                    event_centre_id: eventCentreId,
                },
            },
        });

        if (existingFavorite) {
            return NextResponse.json({
                message: 'This event centre is already in your favorites.',
                status: 400,
            });
        }
        const newFavorite = await prisma.favorite.create({
            data: {
                user_id: userId,
                event_centre_id: eventCentreId,
            },
        });

        return NextResponse.json({
            message: 'Event centre added to favorites successfully.',
            status: 200,
        });
    } catch (error) {
        return NextResponse.json({
            message:
                'An error occurred while adding event centres to favourite.',
            status: 500,
        });
    }
}
