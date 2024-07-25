import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import jwt from 'jsonwebtoken';
import prisma from '@/prisma/prisma';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
    const token = cookies().get('token')?.value;

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
        return NextResponse.json({
            message: 'Unable to get user details',
            status: 401,
        });
    }

    const payload = jwt.decode(token) as { email: string };

    if (!payload.email) {
        return NextResponse.json({
            message: 'Unable to get user details',
            status: 401,
        });
    }

    const eventCentre = await prisma.eventCentre.findUnique({
        where: {
            email: payload.email,
        },
        select: {
            id: true,
            state: true,
            event_centre_name: true,
            email: true,
            phone_number: true,
            slug: true,
            event_logo: true,
        },
    });
    return NextResponse.json({
        message: 'Event Centre Details',
        status: 200,
        eventCentre,
    });
}
