import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';
import * as jose from 'jose';
import jwt from 'jsonwebtoken';


export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({
                message: 'Unable to get event centre details',
                status: 401,
            });
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        try {
            await jose.jwtVerify(token, secret);
        } catch (error) {
            console.error('Token verification error:', error);
            return NextResponse.json({
                message: 'Unable to get event centre details',
                status: 401,
            });
        }

        const payload = jwt.decode(token) as { email: string };

        if (!payload || !payload.email) {
            return NextResponse.json({
                message: 'Unable to get event centre details',
                status: 401,
            });
        }

        const eventCentre = await prisma.eventCentre.findUnique({
            where: {
                email: payload.email,
            },
            select: {
                id: true,
            },
        });

        if (!eventCentre) {
            return NextResponse.json({
                message: 'Unable to get event centre details',
                status: 404,
            });
        }

        const eventDetails = await prisma.eventCentreDetails.findUnique({
            where: {
                event_centre_id: eventCentre.id,
            },
        });

        if (!eventDetails) {
            return NextResponse.json({
                message: 'Unable to get event centre details',
                status: 404,
            });
        }

        const eventCentreDetails = {
            eventDetails,
        };
        return NextResponse.json({
            message: 'Event Centre Details',
            status: 200,
            eventCentreDetails,
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Unable to get event centre details',
            status: 500,
        });
    }
}
