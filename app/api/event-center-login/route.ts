import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import * as jose from 'jose';
import { setCookie } from '@/utils/setCookie';
import prisma from '@/prisma/prisma';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        const eventCentreWithEmail = await prisma.eventCentre.findUnique({
            where: {
                email,
            },
        });

        if (!eventCentreWithEmail) {
            return NextResponse.json({
                message: 'Account not found',
                status: 401,
            });
        }

        const passwordIsMatch = await compare(
            password,
            eventCentreWithEmail.password
        );
        if (!passwordIsMatch) {
            return NextResponse.json({
                message: 'Password is incorrect',
                status: 401,
            });
        }

        const alg = 'HS256';
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        const token = await new jose.SignJWT({
            email: eventCentreWithEmail.email,
        })
            .setProtectedHeader({ alg })
            .setExpirationTime('7d')
            .sign(secret);

        const response = NextResponse.json({
            message: 'Login successfully',
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
