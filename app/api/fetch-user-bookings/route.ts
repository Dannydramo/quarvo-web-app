import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';
import { verifyToken } from '@/utils/verifyToken';
import * as jose from 'jose';

const getEventCentreBooking = async (email: string) => {
    return prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            bookings: {
                select: {
                    id: true,
                    date: true,
                    amount: true,
                    event_centre: {
                        select: {
                            id: true,
                            event_centre_name: true,
                            email: true,
                            phone_number: true,
                            slug: true,
                            event_centre_details: {
                                select: {
                                    address: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
};

export async function GET(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({
            message: 'Authorization header missing or token missing',
            status: 401,
        });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    if (!(await verifyToken(token, secret))) {
        return NextResponse.json({
            message: 'Token verification failed',
            status: 401,
        });
    }

    const payload = jose.decodeJwt(token) as { email?: string };

    if (!payload.email) {
        return NextResponse.json({
            message: 'Invalid token payload',
            status: 401,
        });
    }

    try {
        const eventCentreBooking = await getEventCentreBooking(payload.email);

        if (!eventCentreBooking) {
            return NextResponse.json({
                message: 'Event centre not found',
                status: 404,
            });
        }

        return NextResponse.json({
            message: 'Event Centre Details',
            status: 200,
            eventCentreBooking,
        });
    } catch (error) {
        console.error('Database query error:', error);
        return NextResponse.json({
            message: 'Internal server error',
            status: 500,
        });
    }
}
