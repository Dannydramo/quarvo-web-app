import { EventCentreReg } from '@/types/onboarding';
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import * as jose from 'jose';
import prisma from '@/prisma/prisma';
import { setCookie } from '@/utils/setCookie';

export async function POST(req: NextRequest) {
    try {
        const { eventCentreName, password, state, email, phoneNumber } =
            (await req.json()) as EventCentreReg;

        const eventCentreWithEmail = await prisma.eventCentre.findUnique({
            where: {
                email,
            },
        });

        if (eventCentreWithEmail) {
            return NextResponse.json({
                message: 'Email is already associated with an Event Centre',
                status: 401,
            });
        }

        const hashedPassword = await hash(password, 12);
        const slugText = eventCentreName.toLowerCase().replace(/ /g, '-');

        const eventCentre = await prisma.eventCentre.create({
            data: {
                event_centre_name: eventCentreName,
                email: email,
                password: hashedPassword,
                state: state,
                phone_number: phoneNumber,
                slug: slugText,
            },
        });

        const alg = 'HS256';
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        const token = await new jose.SignJWT({ email: eventCentre.email })
            .setProtectedHeader({ alg })
            .setExpirationTime('50m')
            .sign(secret);

        const response = NextResponse.json({
            message: 'Event Centre Account created successfully',
            status: 200,
        });
        setCookie(response, 'token', token);
        return response;
    } catch (error) {
        return NextResponse.json({
            message: 'Internal server error',
            status: 500,
        });
    }
}
