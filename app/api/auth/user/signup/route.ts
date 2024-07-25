import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { UserReg } from '@/types/onboarding';
import * as jose from 'jose';
import prisma from '@/prisma/prisma';
import { cookies } from 'next/headers';


export async function POST(req: NextRequest) {
    const { firstName, lastName, email, phoneNumber, password } =
        (await req.json()) as UserReg;

    const userWithEmail = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (userWithEmail) {
        return NextResponse.json({
            message: 'Email is already associated with a user',
            status: 401,
        });
    }

    const hashedPassword = await hash(password, 12);
    const user = await prisma.user.create({
        data: {
            first_name: firstName,
            last_name: lastName,
            full_name: firstName + ' ' + lastName,
            email: email,
            phone_number: phoneNumber,
            password: hashedPassword,
        },
    });

    const alg = 'HS256';
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({ email: user.email })
        .setProtectedHeader({ alg })
        .setExpirationTime('7d')
        .sign(secret);

    const response = NextResponse.json({
        message: 'Account created successfully',
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
