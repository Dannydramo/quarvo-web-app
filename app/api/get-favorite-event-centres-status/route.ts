import prisma from '@/prisma/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
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
        return NextResponse.json({
            status: 200,
            isFavourite: favorite !== null,
        });
    } catch (error) { console.error('Error:', error);
    return NextResponse.json({
        error: 'Internal Server Error',
        status: 500,
    });}
}
