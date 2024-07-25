import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import * as jose from 'jose';
import prisma from '@/prisma/prisma';
import { cookies } from 'next/headers';
export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    const userWithEmail = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!userWithEmail) {
        return NextResponse.json({ message: 'Account not found', status: 401 });
    }

    const passwordIsMatch = await compare(password, userWithEmail.password);
    if (!passwordIsMatch) {
        return NextResponse.json({
            message: 'Password is incorrect',
            status: 401,
        });
    }

    const alg = 'HS256';
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({ email: userWithEmail.email })
        .setProtectedHeader({ alg })
        .setExpirationTime('7d')
        .sign(secret);

    const response = NextResponse.json({
        message: 'Login successfully',
        status: 200,
        token,
    });

    cookies().set({
        name: 'token',
        value: token,
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 365 * 1000,
        expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
    });
    return response;
}
