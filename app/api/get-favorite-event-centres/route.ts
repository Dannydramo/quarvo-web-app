import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const userId = new URLSearchParams(url.searchParams).get('userId');
        if (!userId) {
            return NextResponse.json({
                message: 'User ID  are required',
                status: 400,
            });
        }
        const favorites = await prisma.favorite.findMany({
            where: {
                user_id: userId as string,
            },
            include: {
                eventCentre: {
                    include: {
                        event_centre_details: true,
                    },
                },
            },
        });

        const eventCentres = favorites.map(
            (favorite: {
                eventCentre: { [x: string]: any; password: any };
            }) => {
                const { password, ...eventCentreWithoutPassword } =
                    favorite.eventCentre;
                return eventCentreWithoutPassword;
            }
        );

        return NextResponse.json({
            message: 'This event centre is already in your favorites.',
            status: 200,
            eventCentres,
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Unable to get favorite event centres',
            status: 500,
        });
    }
}
